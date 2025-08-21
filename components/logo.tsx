// Drop-in Logo component for Next.js (App or Pages router)
// - Minimal, scalable SVG that adapts to light/dark via currentColor
// - Three variants: "full" (monogram + name + role), "compact" (monogram + name), "badge" (monogram only)
// - Works in .tsx or .jsx. If TypeScript nags today, add // @ts-nocheck at the top of your file.
//
// Usage examples:
//   import Logo from "@/components/Logo";
//   <Logo variant="full" tagline="Engineer" />
//   <Logo variant="compact" />
//   <Logo variant="badge" />
//
// Tailwind suggestions:
//   - Place in nav with className="text-foreground" if using shadcn/ui, or "text-gray-900 dark:text-gray-100" otherwise
//   - Size via text-* utilities (since SVG uses currentColor + em sizing)

import Link from "next/link";
import { memo } from "react";

export type LogoProps = {
  variant?: "full" | "compact" | "badge";
  href?: string; // where the logo should link to
  className?: string; // control outer wrapper styles
  tagline?: string; // e.g., "Engineer" or "Full‑Stack & Beyond"
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
      {/* Monogram badge */}
      <span
        aria-hidden
        className="relative inline-grid h-9 w-9 place-items-center rounded-2xl border border-current/20 bg-gradient-to-br from-current/10 to-transparent shadow-sm transition-transform group-hover:scale-105"
        style={{ lineHeight: 0 }}
      >
        <PKMark className="h-5 w-5" />
      </span>

      {/* Wordmark */}
      {variant !== "badge" && (
        <span className="flex flex-col leading-tight">
          <span className="font-semibold tracking-tight">
            Pradum <span className="opacity-80">Kumar</span>
          </span>
          {(variant === "full" || tagline) && (
            <span className="text-xs opacity-70">
              {tagline || "Engineer"}
            </span>
          )}
        </span>
      )}
    </Link>
  );
});

export default Logo;

// ==========================
// SVG Mark: <PK /> Dev vibe
// ==========================
function PKMark({ className = "" }: { className?: string }) {
  // Uses currentColor so it auto-themes with your text color
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      role="img"
      aria-label="PK monogram"
      className={className}
    >
      {/* Rounded square backdrop outline (subtle) */}
      <rect x="4" y="4" width="56" height="56" rx="14" ry="14" fill="none" stroke="currentColor" strokeOpacity="0.25" />

      {/* <PK /> tag */}
      <g transform="translate(8, 12)">
        <text x="0" y="20" fontFamily="'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" fontSize="18" fill="currentColor">
          {"<"}
        </text>
        <text x="10" y="20" fontFamily="'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" fontSize="18" fontWeight="700" fill="currentColor">
          PK
        </text>
        <text x="40" y="20" fontFamily="'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" fontSize="18" fill="currentColor">
          {"/>"}
        </text>
      </g>

      {/* Underline accent */}
      <path d="M12 44 H52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

/* ---------------------------
Quick integration (App Router):

1) Save this file as:  app/(components)/Logo.tsx  or  src/components/Logo.tsx

2) In app/layout.tsx add:

  import Logo from "@/components/Logo";

  <header className="border-b border-border/40 sticky top-0 z-50 bg-background/80 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <Logo variant="compact" className="text-gray-900 dark:text-gray-100" tagline="Full‑Stack & Beyond" />
      * your nav *
    </div>
  </header>

3) Favicon (optional):
   - Export the monogram as a standalone icon and save to /public/favicon.svg

   Example minimal favicon SVG (monochrome, auto-themes via currentColor):

   <?xml version="1.0" encoding="UTF-8"?>
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
     <rect x="4" y="4" width="56" height="56" rx="14" ry="14" fill="none" stroke="currentColor" stroke-opacity=".25"/>
     <g transform="translate(8, 12)" fill="currentColor">
       <text x="8" y="22" font-family="'JetBrains Mono', ui-monospace" font-size="20" font-weight="700">PK</text>
     </g>
   </svg>

4) Theming tips:
   - Wrap your app with next-themes and toggle the parent text color.
   - Because the SVG uses currentColor, switching body text from gray-900 to gray-100 auto-updates the logo.

5) If TS errors block you today:
   - Add `// @ts-nocheck` at the very top of this file to silence TypeScript temporarily.
---------------------------
*/
