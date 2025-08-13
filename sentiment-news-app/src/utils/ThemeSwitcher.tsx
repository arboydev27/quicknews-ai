"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25M12 18.75V21M4.219 4.219l1.591 1.591M18.19 18.19l1.59 1.59M3 12h2.25M18.75 12H21M4.219 19.781l1.591-1.591M18.19 5.81l1.59-1.59M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  );
}
function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );
}
function LaptopIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9H3V5zm-1 11h20a1 1 0 0 1 0 2H2a1 1 0 1 1 0-2z" />
    </svg>
  );
}

export default function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isSystem = theme === "system";
  const current = resolvedTheme ?? "light";
  const next = current === "dark" ? "light" : "dark";

  return (
    <div
      className="inline-flex items-stretch overflow-hidden rounded-lg border border-border bg-card shadow-sm"
      role="group"
      aria-label="Theme mode"
    >
      <button
        type="button"
        onClick={() => setTheme("system")}
        aria-pressed={isSystem}
        title="Follow system theme"
        className={`px-3 py-2 text-sm flex items-center gap-2 transition-colors ${
          isSystem ? "bg-bg font-medium" : "hover:bg-bg/50 opacity-90"
        }`}
      >
        <LaptopIcon className="h-5 w-5" />
        <span className="hidden sm:inline">System</span>
      </button>

      <div className="w-px bg-border" aria-hidden />

      <button
        type="button"
        onClick={() => setTheme(next)}
        aria-pressed={!isSystem}
        title={
          isSystem
            ? "Manual — click to override system"
            : current === "dark"
            ? "Dark — click for Light"
            : "Light — click for Dark"
        }
        className={`px-3 py-2 text-sm flex items-center gap-2 transition-colors ${
          !isSystem ? "bg-bg font-medium" : "hover:bg-bg/50 opacity-90"
        }`}
      >
        {current === "dark" ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
        <span className="hidden sm:inline">
          {!isSystem ? (current === "dark" ? "Dark" : "Light") : "Manual"}
        </span>
      </button>
    </div>
  );
}
