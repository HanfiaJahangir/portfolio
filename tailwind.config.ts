import type { Config } from "tailwindcss";
import { theme } from "./src/config/theme";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/config/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/systems/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        void: theme.colors.background.void,
        panel: theme.colors.background.surface,
        panelSoft: theme.colors.background.elevated,
        signal: theme.colors.accent.signal,
        reactor: theme.colors.accent.reactor,
        danger: theme.colors.accent.danger,
        info: theme.colors.accent.info,
        ink: theme.colors.text.primary,
        muted: theme.colors.text.muted
      },
      fontFamily: {
        display: [...theme.typography.families.display],
        body: [...theme.typography.families.body],
        mono: [...theme.typography.families.mono]
      },
      fontSize: {
        eyebrow: [theme.typography.scale.eyebrow[0], { ...theme.typography.scale.eyebrow[1] }],
        body: [theme.typography.scale.body[0], { ...theme.typography.scale.body[1] }],
        lead: [theme.typography.scale.lead[0], { ...theme.typography.scale.lead[1] }],
        h1: [theme.typography.scale.h1[0], { ...theme.typography.scale.h1[1] }],
        h2: [theme.typography.scale.h2[0], { ...theme.typography.scale.h2[1] }],
        h3: [theme.typography.scale.h3[0], { ...theme.typography.scale.h3[1] }]
      },
      spacing: {
        page: theme.spacing.pageX,
        section: theme.spacing.sectionY,
        nav: theme.spacing.navHeight
      },
      borderRadius: {
        sm: theme.radii.sm,
        md: theme.radii.md,
        lg: theme.radii.lg
      },
      boxShadow: {
        command: theme.shadows.command,
        glow: theme.shadows.glow
      },
      zIndex: {
        base: theme.zIndex.base,
        content: theme.zIndex.content,
        overlay: theme.zIndex.overlay,
        nav: theme.zIndex.nav,
        modal: theme.zIndex.modal,
        toast: theme.zIndex.toast
      },
      backgroundImage: {
        "scan-grid":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
