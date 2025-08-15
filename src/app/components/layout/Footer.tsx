export default function Footer() {
  return (
    <footer className="bg-dark rounded-t-4xl h-28 flex items-center">
      <div className="container mx-auto px-4 my-4 md:px-0 flex flex-col justify-center text-gray text-xs">
        <p className="text-center text-accent-green">© 2025 PORTFÓLIO.</p>
        <p className="text-center">Todos os direitos reservados.</p>
        <p className="text-center">
          Desenvolvido por{" "}
          <a
            href="https://github.com/jsevitor"
            target="_blank"
            className="underline text-accent-green"
          >
            Vitor Oliveira
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
