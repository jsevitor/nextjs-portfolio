export default function Footer() {
  return (
    <div className="container mx-auto px-4 my-4 md:px-0">
      <div className="flex flex-col justify-center items-center text-gray-medium text-xs">
        <p className="text-center">© 2025 PORTFÓLIO.</p>
        <p className="text-center">Todos os direitos reservados.</p>
        <p className="text-center">
          Desenvolvido por{" "}
          <a
            href="https://github.com/jsevitor"
            target="_blank"
            className="underline text-foreground"
          >
            Vitor Oliveira
          </a>
          .
        </p>
      </div>
    </div>
  );
}
