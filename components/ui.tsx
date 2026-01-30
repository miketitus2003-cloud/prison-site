import React from "react";
import Link from "next/link";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

export function Surface({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "rounded-3xl bg-white border border-[rgb(var(--line))] shadow-[0_10px_30px_-20px_rgba(var(--shadow),0.35)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Surface className={cx("p-6 sm:p-8", className)}>
      {children}
    </Surface>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
      {children}
    </div>
  );
}

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-[rgb(var(--fg))]">
      {children}
    </h1>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg sm:text-xl font-semibold text-[rgb(var(--fg))]">
      {children}
    </h2>
  );
}

export function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cx("text-[rgb(var(--muted))] leading-relaxed", className)}>
      {children}
    </p>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5 text-sm text-[rgb(var(--muted))]">
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))]" />
          <span className="leading-relaxed">{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function Divider() {
  return <div className="my-6 h-px bg-[rgb(var(--line))]" />;
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[rgb(var(--line))] bg-white px-3 py-1 text-xs text-[rgb(var(--muted))]">
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center px-4 py-2.5 rounded-2xl text-sm font-semibold transition active:scale-[0.99]";
  const styles =
    variant === "primary"
      ? "bg-[rgb(var(--fg))] text-white hover:opacity-90"
      : variant === "secondary"
      ? "bg-white text-[rgb(var(--fg))] border border-[rgb(var(--line))] hover:bg-neutral-50"
      : "bg-transparent text-[rgb(var(--fg))] hover:bg-neutral-50";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cx(base, styles)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cx(base, styles)}>
      {children}
    </Link>
  );
}
