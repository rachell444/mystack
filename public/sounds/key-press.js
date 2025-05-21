// Script para generar sonido de tecleo
window.addEventListener('load', function() {
  // Crear un botón para generar el archivo de audio
  const button = document.createElement('button');
  button.textContent = 'Generar sonido de tecla';
  button.style.padding = '10px';
  button.style.margin = '20px';
  document.body.appendChild(button);

  button.addEventListener('click', function() {
    // Crear contexto de audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Duración del sonido en segundos
    const duration = 0.1;
    
    // Crear un buffer para el sonido
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const channelData = buffer.getChannelData(0);
    
    // Generar datos de audio (sonido de clic suave)
    for (let i = 0; i < buffer.length; i++) {
      // Sonido inicial con rápido desvanecimiento
      const progress = i / buffer.length;
      channelData[i] = Math.random() * 0.2 * Math.exp(-progress * 20);
    }
    
    // Crear un nodo de origen del sonido
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    
    // Conectar a la salida y reproducir
    source.connect(audioContext.destination);
    source.start();
    
    // Guardar como archivo (añadir enlace de descarga)
    const offlineContext = new OfflineAudioContext(1, sampleRate * duration, sampleRate);
    const offlineSource = offlineContext.createBufferSource();
    offlineSource.buffer = buffer;
    offlineSource.connect(offlineContext.destination);
    offlineSource.start();
    
    offlineContext.startRendering().then(function(renderedBuffer) {
      // Convertir buffer a WAV
      const wav = audioBufferToWav(renderedBuffer);
      const blob = new Blob([wav], { type: 'audio/wav' });
      
      // Crear enlace de descarga
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'key-press.wav';
      a.textContent = 'Descargar sonido de tecla';
      a.style.display = 'block';
      a.style.margin = '20px';
      document.body.appendChild(a);
    });
  });

  // Función para convertir AudioBuffer a WAV
  function audioBufferToWav(buffer) {
    const numChannels = buffer.numberOfChannels;
    const length = buffer.length * numChannels * 2;
    const sampleRate = buffer.sampleRate;
    
    // Crear ArrayBuffer para el archivo WAV
    const arrayBuffer = new ArrayBuffer(44 + length);
    const view = new DataView(arrayBuffer);
    
    // Escribir encabezado RIFF
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    writeString(view, 8, 'WAVE');
    
    // Escribir encabezado fmt
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true);
    
    // Escribir encabezado data
    writeString(view, 36, 'data');
    view.setUint32(40, length, true);
    
    // Escribir datos de audio
    const dataIndex = 44;
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      let offset = dataIndex;
      
      for (let i = 0; i < buffer.length; i++) {
        // Convertir float a int16
        const sample = Math.max(-1, Math.min(1, channelData[i]));
        const int16 = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        
        view.setInt16(offset, int16, true);
        offset += 2;
      }
    }
    
    return arrayBuffer;
  }
  
  // Función auxiliar para escribir strings en DataView
  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }
});
