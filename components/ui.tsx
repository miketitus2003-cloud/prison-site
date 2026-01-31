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

// Light-theme surface by default (works on white backgrounds)
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
        "rounded-3xl bg-white ring-1 ring-black/10 shadow-[0_16px_60px_rgba(0,0,0,0.06)] p-6",
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
    <h1 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight text-black">
      {children}
    </h1>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg md:text-xl font-semibold text-black">{children}</h2>
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
    <p className={cx("text-black/70 leading-relaxed", className)}>{children}</p>
  );
}

/* Lists, dividers */

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-black/70 leading-relaxed">
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/45 shrink-0" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function Divider() {
  return <div className="my-6 h-px bg-black/10" />;
}

/* Buttons */

/**
 * ButtonLink (hardened)
 * Fixes the “black pill with invisible text” issue by:
 * - forcing text color per variant
 * - adding focus styles
 * - preventing accidental class collisions from removing text color
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
    "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold transition select-none whitespace-nowrap";

  const focus =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  const styles =
    variant === "primary"
      ? // Primary: always readable on light site
        "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-900"
      : variant === "secondary"
      ? // Secondary: white surface button
        "bg-white text-neutral-900 ring-1 ring-black/10 hover:bg-neutral-50 active:bg-neutral-100"
      : // Ghost: subtle outline
        "bg-transparent text-neutral-900 ring-1 ring-black/10 hover:bg-neutral-50 active:bg-neutral-100";

  const cls = cx(base, focus, styles, className);

  // If someone accidentally passes empty children, show nothing but still stable
  // (not throwing — just rendering as-is)
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
