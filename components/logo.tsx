// @ts-nocheck
import Link from "next/link";
import Image from "next/image";
import { memo } from "react";

export type LogoProps = {
  variant?: "full" | "compact" | "badge";
  href?: string;
  className?: string;
  tagline?: string;
};

const Logo = memo(function Logo({
  variant = "full",
  href = "/",
  className = "",
  tagline = "Engineer",
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Go to home"
      className={`group inline-flex items-center gap-3 no-underline ${className}`}
    >
      {/* Replace PKMark with your image */}
      <span
        aria-hidden
        className="relative inline-grid h-9 w-9 place-items-center rounded-2xl border border-current/20 bg-gradient-to-br from-current/10 to-transparent shadow-sm overflow-hidden"
      >
        <Image
          src="/me.jpg" // place me.jpg inside /public
          alt="Pradum Kumar Logo"
          width={36}
          height={36}
          className="rounded-2xl object-cover"
        />
      </span>

      {/* Wordmark */}
      {variant !== "badge" && (
        <span className="flex flex-col leading-tight">
          <span className="font-semibold tracking-tight">
            Pradum <span className="opacity-80">Kumar</span>
          </span>
          {(variant === "full" || tagline) && (
            <span className="text-xs opacity-70">{tagline || "Engineer"}</span>
          )}
        </span>
      )}
    </Link>
  );
});

export default Logo;
