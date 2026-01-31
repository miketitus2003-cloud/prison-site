// components/ui.tsx
import React from "react";
import Link from "next/link";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* Layout wrappers */

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
        "rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-6 shadow-[0_18px_55px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}

/* Typography */

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs uppercase tracking-widest text-black/50">
      {children}
    </div>
  );
}

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight text-black/90">
      {children}
    </h1>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg md:text-xl font-semibold text-black/85">
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
  return <p className={cx("text-black/65 leading-relaxed", className)}>{children}</p>;
}

/* Lists, dividers, buttons */

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-black/65 leading-relaxed">
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/40" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function Divider() {
  return <div className="my-6 h-px bg-black/10" />;
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
      ? "text-white shadow-[0_16px_40px_rgba(0,0,0,0.14)] hover:opacity-95"
      : variant === "secondary"
      ? "bg-white/60 border border-black/10 text-black/80 hover:bg-white/85"
      : "bg-black/5 border border-black/10 text-black/75 hover:bg-black/10";

  const primaryStyle =
    "bg-gradient-to-br from-black via-black to-black";

  const className = cx(
    base,
    styles,
    variant === "primary" ? primaryStyle : undefined
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/* Backwards compatible exports */

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
