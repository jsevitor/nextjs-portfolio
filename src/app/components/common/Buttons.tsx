type ButtonProps = {
  url?: string;
  label?: string;
};

export function ButtonWhite({ url, label }: ButtonProps) {
  return (
    <button
      type="submit"
      className="px-4 py-1 bg-foreground text-background rounded hover:bg-gray-medium hover:text-foreground border border-foreground cursor-pointer"
    >
      <a href={url} target="_blank">
        {label}
      </a>
    </button>
  );
}

export function ButtonBlack({ url, label }: ButtonProps) {
  return (
    <button className="px-4 py-1 bg-background text-foreground rounded hover:bg-gray-medium hover:text-background border border-foreground cursor-pointer">
      <a href={url} target="_blank">
        {label}
      </a>
    </button>
  );
}
