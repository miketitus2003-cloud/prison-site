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
        "rounded-3xl bg-white ring-1 ring-black/10 shadow-soft p-6",
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
  return <p className={cx("text-black/70 leading-relaxed", className)}>{children}</p>;
}

/* Utilities */

export function Divider() {
  return <div className="my-6 h-px bg-black/10" />;
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-black/70 leading-relaxed">
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/45" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
}

/* New: badge + callout */

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "good" | "warn" | "accent";
}) {
  const styles =
    tone === "good"
      ? "bg-emerald-50 text-emerald-900 ring-emerald-200"
      : tone === "warn"
      ? "bg-amber-50 text-amber-900 ring-amber-200"
      : tone === "accent"
      ? "bg-indigo-50 text-indigo-900 ring-indigo-200"
      : "bg-neutral-50 text-black/80 ring-black/10";
  return (
    <span className={cx("inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ring-1", styles)}>
      {children}
    </span>
  );
}

export function Callout({
  title,
  children,
  tone = "neutral",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "neutral" | "good" | "warn" | "accent";
}) {
  const styles =
    tone === "good"
      ? "bg-emerald-50 ring-emerald-200"
      : tone === "warn"
      ? "bg-amber-50 ring-amber-200"
      : tone === "accent"
      ? "bg-indigo-50 ring-indigo-200"
      : "bg-neutral-50 ring-black/10";

  return (
    <div className={cx("rounded-3xl ring-1 p-5", styles)}>
      <div className="text-sm font-semibold text-black">{title}</div>
      <div className="mt-2 text-sm text-black/70 leading-relaxed">{children}</div>
    </div>
  );
}

/**
 * ButtonLink
 * Fixes the “blank black pill” problem:
 * - If children is empty, it falls back to a safe label.
 * - Primary is a tasteful accent gradient that still reads clean on white pages.
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
    "inline-flex items-center justify-center px-4 py-2.5 rounded-2xl text-sm font-semibold transition select-none focus:outline-none focus:ring-2 focus:ring-black/15";

  const styles =
    variant === "primary"
      ? "bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-500 text-white hover:opacity-95 shadow-soft"
      : variant === "secondary"
      ? "bg-white text-neutral-900 ring-1 ring-black/10 hover:bg-neutral-50"
      : "bg-transparent text-neutral-900 ring-1 ring-black/10 hover:bg-neutral-50";

  const safeLabel =
    typeof children === "string" && children.trim().length === 0 ? "Open" : children;

  const cls = cx(base, styles, className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {safeLabel}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {safeLabel}
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
