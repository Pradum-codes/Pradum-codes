import type { ReactNode } from "react";

export function AchievementStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-2 sm:p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold sm:text-base">{value}</p>
    </div>
  );
}

export function AchievementDetailLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <header className="mb-8">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Achievements</p>
          <h1 className="text-3xl sm:text-4xl font-semibold mt-2">{title}</h1>
          <p className="text-muted-foreground mt-3">{subtitle}</p>
        </header>
        {children}
      </div>
    </main>
  );
}
