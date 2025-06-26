export default function Hero() {
  return (
    <div
      className="container mx-auto h-screen pt-[88px] flex items-center justify-center"
      id="home"
    >
      <div className="flex flex-col items-center justify-center gap-8 h-2/4 sm:h-1/2 lg:h-2/3  border border-foreground px-8 lg:w-full">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-semibold">
          VITOR OLIVEIRA
        </h1>
        <h2 className="text-3xl sm:text-6xl lg:text-7xl xl:text-8xl font-[100] tracking-widest">
          PORTFÓLIO
        </h2>
        <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-light">
          Desenvolvedor Frontend
        </p>
        <div>
          <a
            href="https://www.linkedin.com/in/josevitoroliveira/"
            target="_blank"
          >
            <button className="text-sm lg:text-xl xl:text-lg font-light border border-foreground px-4 py-1 rounded cursor-pointer mt-8 hover:bg-foreground hover:text-background">
              Fale comigo
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
