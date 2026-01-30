// components/ui.tsx
import React from "react";
import Link from "next/link";

function cx(...classes: Array<string | false | undefined | null>) {
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
        "rounded-3xl bg-white/5 ring-1 ring-white/10 p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

/* Typography */

export function Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("text-xs uppercase tracking-widest text-white/60", className)}>
      {children}
    </div>
  );
}

export function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cx(
        "mt-2 text-3xl md:text-5xl font-semibold tracking-tight text-white",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cx("text-lg md:text-xl font-semibold text-white", className)}>
      {children}
    </h2>
  );
}

export function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cx("text-base font-semibold text-white", className)}>
      {children}
    </h3>
  );
}

export function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cx("text-white/75 leading-relaxed", className)}>{children}</p>;
}

export function Subtle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cx("text-sm text-white/60 leading-relaxed", className)}>{children}</p>;
}

/* Lists, dividers, buttons */

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-white/75 leading-relaxed">
      {items.map((b, idx) => (
        <li key={`${idx}-${b.slice(0, 24)}`} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cx("my-6 h-px bg-white/10", className)} />;
}

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
    "inline-flex items-center justify-center px-4 py-2.5 rounded-2xl text-sm font-semibold transition";
  const styles =
    variant === "primary"
      ? "bg-white text-neutral-950 hover:opacity-90"
      : variant === "secondary"
      ? "bg-white/10 ring-1 ring-white/10 hover:bg-white/15 text-white"
      : "bg-white/5 ring-1 ring-white/10 hover:bg-white/10 text-white";

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

/* Backwards compatible exports (so older pages don’t break) */

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
