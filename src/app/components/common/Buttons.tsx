type ButtonProps = {
  url?: string;
  label?: string;
  className?: string;
};

export function Button({ url, label, className }: ButtonProps) {
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
