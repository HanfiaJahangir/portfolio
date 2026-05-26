export const theme = {
  colors: {
    background: {
      void: "#05070d",
      surface: "#0b111d",
      elevated: "#101827",
      overlay: "rgba(5, 7, 13, 0.78)"
    },
    text: {
      primary: "#e8eefb",
      secondary: "#aab6c8",
      muted: "#7e8da3",
      inverse: "#05070d"
    },
    accent: {
      signal: "#38f2c2",
      reactor: "#f7b955",
      danger: "#ff5b6e",
      info: "#7ab7ff"
    },
    border: {
      subtle: "rgba(255, 255, 255, 0.1)",
      strong: "rgba(255, 255, 255, 0.18)"
    }
  },
  typography: {
    families: {
      display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
      body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
    },
    scale: {
      eyebrow: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.18em" }],
      body: ["1rem", { lineHeight: "1.75rem" }],
      lead: ["1.125rem", { lineHeight: "2rem" }],
      h1: ["clamp(2.5rem, 6vw, 5.25rem)", { lineHeight: "0.98" }],
      h2: ["clamp(2rem, 4vw, 3.75rem)", { lineHeight: "1.05" }],
      h3: ["1.5rem", { lineHeight: "2rem" }]
    }
  },
  spacing: {
    pageX: "clamp(1rem, 4vw, 2rem)",
    sectionY: "clamp(4rem, 9vw, 8rem)",
    navHeight: "4rem"
  },
  radii: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem"
  },
  shadows: {
    command: "0 24px 80px rgba(0, 0, 0, 0.45)",
    glow: "0 0 32px rgba(56, 242, 194, 0.18)"
  },
  zIndex: {
    base: "0",
    content: "10",
    overlay: "30",
    nav: "50",
    modal: "80",
    toast: "100"
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  },
  motion: {
    duration: {
      fast: 0.18,
      base: 0.32,
      slow: 0.52,
      cinematic: 0.8
    },
    ease: {
      standard: [0.22, 1, 0.36, 1],
      entrance: [0.16, 1, 0.3, 1],
      exit: [0.7, 0, 0.84, 0]
    }
  }
} as const;

export type AppTheme = typeof theme;
