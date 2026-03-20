interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <header className="flex flex-col gap-3">
      <div className="signal-label">{eyebrow}</div>
      <h1 className="font-display text-3xl font-black tracking-[-0.07em] text-foreground sm:text-4xl lg:text-5xl">{title}</h1>
      <p className="max-w-4xl text-base leading-7 text-muted-foreground">{description}</p>
    </header>
  );
}
