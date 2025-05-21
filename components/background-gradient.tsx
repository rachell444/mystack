export function BackgroundGradient() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-[40rem] -left-[40rem] w-[120rem] h-[120rem] rounded-full bg-[radial-gradient(circle,rgba(39,100,255,0.15),transparent_50%)]"></div>
      <div className="absolute -top-[30rem] -right-[30rem] w-[100rem] h-[100rem] rounded-full bg-[radial-gradient(circle,rgba(220,50,150,0.1),transparent_50%)]"></div>
      <div className="absolute -bottom-[40rem] -right-[40rem] w-[120rem] h-[120rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.15),transparent_50%)]"></div>
    </div>
  )
}
