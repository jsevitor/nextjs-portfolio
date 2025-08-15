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

export function ButtonPrimary({ url, children, className }: ButtonProps) {
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
export function ButtonSecondary({ url, children, className }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`px-8 py-2 bg-dark text-background rounded-full border border-dark hover:bg-gray hover:text-foreground transition-all duration-300 hover:scale-105 ${className}`}
    >
      <a href={url} target="_blank">
        {children}
      </a>
    </button>
  );
}
