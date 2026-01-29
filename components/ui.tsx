import React from "react";

export function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto px-4">{children}</div>;
}

export function Surface({ children }: { children: React.ReactNode }) {
  return <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">{children}</div>;
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="text-xs uppercase tracking-widest text-white/60">{children}</div>;
}

export function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="mt-2 text-3xl md:text-5xl font-semibold leading-tight">{children}</h1>;
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl md:text-2xl font-semibold">{children}</h2>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-white/75 leading-relaxed">{children}</p>;
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-white/75 leading-relaxed">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function Divider() {
  return <div className="h-px bg-white/10" />;
}

export function SoftLink({
  href,
  children,
  newTab,
}: {
  href: string;
  children: React.ReactNode;
  newTab?: boolean;
}) {
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white transition"
    >
      {children}
    </a>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "solid",
  newTab,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  newTab?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold transition";
  const solid = "bg-white text-neutral-950 hover:opacity-90";
  const ghost = "bg-white/10 ring-1 ring-white/10 hover:bg-white/15 text-white";
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
      className={cx(base, variant === "solid" ? solid : ghost)}
    >
      {children}
    </a>
  );
}
