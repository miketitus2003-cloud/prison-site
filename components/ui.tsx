// components/ui.tsx
import React from "react";
import Link from "next/link";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto px-4">{children}</div>;
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
        "rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-[0_16px_60px_rgba(0,0,0,0.35)] p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs uppercase tracking-widest text-white/55">
      {children}
    </div>
  );
}

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight text-white">
      {children}
    </h1>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg md:text-xl font-semibold text-white">{children}</h2>;
}

export function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cx("text-white/70 leading-relaxed", className)}>{children}</p>;
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-white/70 leading-relaxed">
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/45" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function Divider() {
  return <div className="my-6 h-px bg-white/10" />;
}

/**
 * Dark-theme-safe ButtonLink
 * Always readable on black background.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center px-4 py-2.5 rounded-2xl text-sm font-semibold transition select-none";

  const styles =
    variant === "primary"
      ? "bg-white text-black hover:opacity-90"
      : variant === "secondary"
      ? "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/14"
      : "bg-transparent text-white ring-1 ring-white/15 hover:bg-white/10";

  const cls = cx(base, styles, className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export const Card = Surface;

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <Kicker>{eyebrow}</Kicker> : null}
      <H1>{title}</H1>
      {subtitle ? <P className="mt-4">{subtitle}</P> : null}
    </div>
  );
}

export const BulletList = Bullets;
