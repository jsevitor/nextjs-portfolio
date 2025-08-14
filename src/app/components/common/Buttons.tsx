type ButtonProps = {
  url?: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
};

export function ButtonTalkToMe({ className }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`px-8 py-2 rounded-full bg-accent-green border border-dark transition-all duration-300 hover:scale-105 ${className}`}
    >
      <a
        href={"https://www.linkedin.com/in/josevitoroliveira/"}
        target="_blank"
      >
        Fale comigo
      </a>
    </button>
  );
}

export function ButtonGreen({ url, children, className }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`px-8 py-2 bg-accent-green text-dark rounded-full border border-dark transition-all duration-300 hover:scale-105 ${className}`}
    >
      <a href={url} target="_blank">
        {children}
      </a>
    </button>
  );
}

export function ButtonWhite({ url, label, className }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`px-4 py-1 bg-foreground text-background rounded hover:bg-gray-medium hover:text-foreground border border-foreground cursor-pointer ${className}`}
    >
      <a href={url} target="_blank">
        {label}
      </a>
    </button>
  );
}

export function ButtonBlack({ url, label, className }: ButtonProps) {
  return (
    <button
      className={`px-4 py-1 bg-background text-foreground rounded hover:bg-gray-medium hover:text-background border border-foreground cursor-pointer ${className}`}
    >
      <a href={url} target="_blank">
        {label}
      </a>
    </button>
  );
}
