(function () {
  const THEME_STORAGE_KEY = "quant-board-theme";
  const VIEW_STYLE_STORAGE_KEY = "quant-board-view-style";

  const THEMES = {
    warm_sand: {
      label: "暖杏沙丘",
      vars: {
        "--bg": "#f4efe7",
        "--paper": "rgba(255, 251, 245, 0.84)",
        "--paper-strong": "rgba(255, 248, 240, 0.92)",
        "--panel": "rgba(255, 250, 244, 0.92)",
        "--panel-soft": "#f3ecdf",
        "--ink": "#223044",
        "--muted": "#607080",
        "--line": "rgba(34, 48, 68, 0.09)",
        "--accent": "#bf5a36",
        "--accent-2": "#1e6f68",
        "--accent-3": "#d29a2d",
        "--accent-dark": "#ae5f31",
        "--accent-soft": "rgba(209, 122, 70, 0.14)",
        "--good": "#d23b31",
        "--bad": "#1e7f64",
        "--green": "#1e7f64",
        "--gold": "#d89a1d",
        "--blue": "#64748b",
        "--danger": "#bf5a36",
        "--card": "rgba(255, 255, 255, 0.82)",
        "--shadow": "0 24px 70px rgba(66, 43, 23, 0.12)",
        "--bg-orb-a": "rgba(191, 90, 54, 0.14)",
        "--bg-orb-b": "rgba(30, 111, 104, 0.12)",
        "--bg-start": "#f7f2ea",
        "--bg-end": "#efe7db",
      },
    },
    coast_teal: {
      label: "海岸青瓷",
      vars: {
        "--bg": "#eaf2ef",
        "--paper": "rgba(248, 253, 251, 0.84)",
        "--paper-strong": "rgba(244, 251, 248, 0.92)",
        "--panel": "rgba(246, 252, 250, 0.92)",
        "--panel-soft": "#deebe6",
        "--ink": "#17303a",
        "--muted": "#5a7380",
        "--line": "rgba(23, 48, 58, 0.10)",
        "--accent": "#1d7f78",
        "--accent-2": "#c46a38",
        "--accent-3": "#3d9f8a",
        "--accent-dark": "#156861",
        "--accent-soft": "rgba(29, 127, 120, 0.16)",
        "--good": "#d23b31",
        "--bad": "#167c58",
        "--green": "#167c58",
        "--gold": "#cb8e3b",
        "--blue": "#5e7b8c",
        "--danger": "#bf5a36",
        "--card": "rgba(255, 255, 255, 0.84)",
        "--shadow": "0 24px 70px rgba(26, 72, 73, 0.12)",
        "--bg-orb-a": "rgba(29, 127, 120, 0.16)",
        "--bg-orb-b": "rgba(196, 106, 56, 0.10)",
        "--bg-start": "#f3faf8",
        "--bg-end": "#e6f0ec",
      },
    },
    twilight_blue: {
      label: "暮色蓝图",
      vars: {
        "--bg": "#e9eef6",
        "--paper": "rgba(249, 251, 255, 0.86)",
        "--paper-strong": "rgba(244, 247, 253, 0.94)",
        "--panel": "rgba(245, 248, 255, 0.92)",
        "--panel-soft": "#dde4f0",
        "--ink": "#1d2942",
        "--muted": "#66748b",
        "--line": "rgba(29, 41, 66, 0.10)",
        "--accent": "#456ac9",
        "--accent-2": "#cc7b3a",
        "--accent-3": "#6f88d6",
        "--accent-dark": "#3758ae",
        "--accent-soft": "rgba(69, 106, 201, 0.14)",
        "--good": "#d94a3a",
        "--bad": "#15735f",
        "--green": "#15735f",
        "--gold": "#d19a34",
        "--blue": "#5d7398",
        "--danger": "#b85a47",
        "--card": "rgba(255, 255, 255, 0.84)",
        "--shadow": "0 24px 70px rgba(47, 69, 108, 0.12)",
        "--bg-orb-a": "rgba(69, 106, 201, 0.14)",
        "--bg-orb-b": "rgba(204, 123, 58, 0.10)",
        "--bg-start": "#f2f6fc",
        "--bg-end": "#e3e9f3",
      },
    },
    forest_gold: {
      label: "林地金雾",
      vars: {
        "--bg": "#eef1e6",
        "--paper": "rgba(252, 253, 248, 0.84)",
        "--paper-strong": "rgba(247, 250, 241, 0.92)",
        "--panel": "rgba(248, 251, 243, 0.92)",
        "--panel-soft": "#e4e8d8",
        "--ink": "#243126",
        "--muted": "#657263",
        "--line": "rgba(36, 49, 38, 0.10)",
        "--accent": "#7a8f39",
        "--accent-2": "#b7772f",
        "--accent-3": "#b9a041",
        "--accent-dark": "#64772d",
        "--accent-soft": "rgba(122, 143, 57, 0.14)",
        "--good": "#c84232",
        "--bad": "#27704d",
        "--green": "#27704d",
        "--gold": "#b9a041",
        "--blue": "#6b7882",
        "--danger": "#b45f3d",
        "--card": "rgba(255, 255, 255, 0.82)",
        "--shadow": "0 24px 70px rgba(77, 84, 39, 0.12)",
        "--bg-orb-a": "rgba(122, 143, 57, 0.16)",
        "--bg-orb-b": "rgba(183, 119, 47, 0.10)",
        "--bg-start": "#f7f9f1",
        "--bg-end": "#e8ecde",
      },
    },
    ink_terminal: {
      label: "墨夜终端",
      vars: {
        "--bg": "#101721",
        "--paper": "rgba(21, 31, 45, 0.88)",
        "--paper-strong": "rgba(18, 27, 39, 0.94)",
        "--panel": "rgba(22, 34, 48, 0.92)",
        "--panel-soft": "#1b2a3b",
        "--ink": "#edf5ff",
        "--muted": "#9fb2c8",
        "--line": "rgba(230, 241, 255, 0.13)",
        "--accent": "#32d2b3",
        "--accent-2": "#f0a75f",
        "--accent-3": "#64a7ff",
        "--accent-dark": "#1db79b",
        "--accent-soft": "rgba(50, 210, 179, 0.16)",
        "--good": "#ff6b5c",
        "--bad": "#42d392",
        "--green": "#42d392",
        "--gold": "#f0bf63",
        "--blue": "#78a9ff",
        "--danger": "#ff7b6e",
        "--card": "rgba(17, 27, 40, 0.86)",
        "--shadow": "0 24px 70px rgba(0, 0, 0, 0.30)",
        "--bg-orb-a": "rgba(50, 210, 179, 0.16)",
        "--bg-orb-b": "rgba(100, 167, 255, 0.14)",
        "--bg-start": "#121a25",
        "--bg-end": "#0b111a",
      },
    },
    graphite_gold: {
      label: "石墨金线",
      vars: {
        "--bg": "#ece8df",
        "--paper": "rgba(255, 252, 246, 0.86)",
        "--paper-strong": "rgba(252, 248, 240, 0.94)",
        "--panel": "rgba(250, 247, 241, 0.92)",
        "--panel-soft": "#e3ded3",
        "--ink": "#22252b",
        "--muted": "#6c6d70",
        "--line": "rgba(34, 37, 43, 0.10)",
        "--accent": "#a77527",
        "--accent-2": "#303846",
        "--accent-3": "#c99b42",
        "--accent-dark": "#8a5e1d",
        "--accent-soft": "rgba(167, 117, 39, 0.16)",
        "--good": "#bd3f31",
        "--bad": "#2b7552",
        "--green": "#2b7552",
        "--gold": "#c99b42",
        "--blue": "#56677d",
        "--danger": "#b75644",
        "--card": "rgba(255, 255, 255, 0.84)",
        "--shadow": "0 24px 70px rgba(46, 40, 30, 0.13)",
        "--bg-orb-a": "rgba(167, 117, 39, 0.15)",
        "--bg-orb-b": "rgba(48, 56, 70, 0.10)",
        "--bg-start": "#f4f0e8",
        "--bg-end": "#e6e1d8",
      },
    },
    rose_clay: {
      label: "玫瑰陶土",
      vars: {
        "--bg": "#f3e9e3",
        "--paper": "rgba(255, 249, 246, 0.86)",
        "--paper-strong": "rgba(255, 246, 242, 0.94)",
        "--panel": "rgba(255, 248, 244, 0.92)",
        "--panel-soft": "#eddcd4",
        "--ink": "#352c32",
        "--muted": "#7b666e",
        "--line": "rgba(53, 44, 50, 0.10)",
        "--accent": "#bd6a68",
        "--accent-2": "#7a7f4a",
        "--accent-3": "#d08d6a",
        "--accent-dark": "#a65351",
        "--accent-soft": "rgba(189, 106, 104, 0.15)",
        "--good": "#c24a43",
        "--bad": "#527a55",
        "--green": "#527a55",
        "--gold": "#c28c42",
        "--blue": "#6a7187",
        "--danger": "#b85d4f",
        "--card": "rgba(255, 255, 255, 0.84)",
        "--shadow": "0 24px 70px rgba(90, 55, 50, 0.12)",
        "--bg-orb-a": "rgba(189, 106, 104, 0.15)",
        "--bg-orb-b": "rgba(122, 127, 74, 0.10)",
        "--bg-start": "#fbf2ee",
        "--bg-end": "#eadbd4",
      },
    },
    snow_mint: {
      label: "雪松薄荷",
      vars: {
        "--bg": "#eef6f3",
        "--paper": "rgba(251, 255, 253, 0.88)",
        "--paper-strong": "rgba(247, 254, 251, 0.94)",
        "--panel": "rgba(247, 254, 251, 0.92)",
        "--panel-soft": "#e1efea",
        "--ink": "#1f3135",
        "--muted": "#62767b",
        "--line": "rgba(31, 49, 53, 0.10)",
        "--accent": "#3f9f8b",
        "--accent-2": "#4f6f9f",
        "--accent-3": "#8fbf7e",
        "--accent-dark": "#2e806f",
        "--accent-soft": "rgba(63, 159, 139, 0.15)",
        "--good": "#c84436",
        "--bad": "#26775f",
        "--green": "#26775f",
        "--gold": "#c39a3d",
        "--blue": "#5f7ea7",
        "--danger": "#b85d4d",
        "--card": "rgba(255, 255, 255, 0.86)",
        "--shadow": "0 24px 70px rgba(37, 83, 78, 0.11)",
        "--bg-orb-a": "rgba(63, 159, 139, 0.15)",
        "--bg-orb-b": "rgba(79, 111, 159, 0.10)",
        "--bg-start": "#f5fbf9",
        "--bg-end": "#e5f1ed",
      },
    },
  };

  const VIEW_STYLES = {
    balanced: {
      label: "均衡默认",
      description: "日常使用，兼顾美观和信息密度。",
    },
    presentation: {
      label: "演示大屏",
      description: "适合给朋友或领导看，首屏更大，动作信号更醒目。",
    },
    professional: {
      label: "专业密集",
      description: "适合投研复盘，表格和卡片更紧凑，信息密度更高。",
    },
    focus: {
      label: "信号优先",
      description: "突出当前动作、风险和结论，弱化次要模块。",
    },
    compact: {
      label: "紧凑速览",
      description: "适合小屏或快速巡检，整体间距收窄。",
    },
  };

  function getThemeKey() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return THEMES[saved] ? saved : "warm_sand";
  }

  function getViewStyleKey() {
    const saved = localStorage.getItem(VIEW_STYLE_STORAGE_KEY);
    return VIEW_STYLES[saved] ? saved : "balanced";
  }

  function setBodyBackground(theme) {
    const style = `radial-gradient(circle at top left, ${theme.vars["--bg-orb-a"]}, transparent 24%), radial-gradient(circle at top right, ${theme.vars["--bg-orb-b"]}, transparent 24%), linear-gradient(180deg, ${theme.vars["--bg-start"]} 0%, ${theme.vars["--bg-end"]} 100%)`;
    document.body.style.background = style;
  }

  function applyTheme(themeKey) {
    const theme = THEMES[themeKey] || THEMES.warm_sand;
    Object.entries(theme.vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    setBodyBackground(theme);
    localStorage.setItem(THEME_STORAGE_KEY, themeKey);
    document.documentElement.setAttribute("data-theme", themeKey);
  }

  function applyViewStyle(styleKey) {
    const key = VIEW_STYLES[styleKey] ? styleKey : "balanced";
    localStorage.setItem(VIEW_STYLE_STORAGE_KEY, key);
    document.documentElement.setAttribute("data-view-style", key);
  }

  function injectStyle() {
    if (document.getElementById("quant-theme-style")) return;
    const style = document.createElement("style");
    style.id = "quant-theme-style";
    style.textContent = `
      .theme-switcher {
        margin-left: auto;
        display: inline-flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        padding: 8px 10px;
        border-radius: 999px;
        border: 1px solid var(--line, rgba(34,48,68,0.1));
        background: rgba(255,255,255,0.76);
        background: color-mix(in srgb, var(--card, #fff) 86%, transparent);
        color: var(--muted, #607080);
        font-size: 12px;
        box-shadow: 0 8px 20px rgba(34,48,68,0.06);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
      }
      .theme-switcher .theme-control {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
      }
      .theme-switcher label {
        white-space: nowrap;
        font-weight: 700;
        letter-spacing: 0.05em;
      }
      .theme-switcher select {
        border: 1px solid var(--line, rgba(34,48,68,0.1));
        background: rgba(255,255,255,0.92);
        background: color-mix(in srgb, var(--paper-strong, #fff) 92%, transparent);
        color: var(--ink, #223044);
        border-radius: 999px;
        padding: 7px 10px;
        font: inherit;
        outline: none;
        cursor: pointer;
      }
      .theme-switcher select:focus-visible {
        box-shadow: 0 0 0 3px var(--accent-soft, rgba(209,122,70,0.14));
      }

      html[data-view-style="presentation"] body {
        font-size: 17px;
      }
      html[data-view-style="presentation"] .page,
      html[data-view-style="presentation"] .shell,
      html[data-view-style="presentation"] .wrap,
      html[data-view-style="presentation"] .container {
        width: min(1600px, calc(100% - 36px)) !important;
      }
      html[data-view-style="presentation"] .hero,
      html[data-view-style="presentation"] .main-hero,
      html[data-view-style="presentation"] .cover,
      html[data-view-style="presentation"] .summary-panel {
        padding: clamp(44px, 7vw, 104px) !important;
        min-height: 48vh !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
      }
      html[data-view-style="presentation"] h1 {
        font-size: clamp(72px, 9vw, 156px) !important;
        line-height: 0.88 !important;
        max-width: 980px !important;
      }
      html[data-view-style="presentation"] h2,
      html[data-view-style="presentation"] .section-title {
        font-size: clamp(34px, 4.4vw, 64px) !important;
      }
      html[data-view-style="presentation"] .action-card,
      html[data-view-style="presentation"] .report-card,
      html[data-view-style="presentation"] .signal-card,
      html[data-view-style="presentation"] .metric,
      html[data-view-style="presentation"] .metric-card,
      html[data-view-style="presentation"] .ticker-card {
        transform: translateZ(0);
        padding: 26px !important;
        border-radius: 30px !important;
        box-shadow: 0 34px 96px rgba(34, 48, 68, 0.18) !important;
      }
      html[data-view-style="presentation"] .metric b,
      html[data-view-style="presentation"] .metric-card b,
      html[data-view-style="presentation"] .stat-value,
      html[data-view-style="presentation"] .value {
        font-size: clamp(32px, 4vw, 58px) !important;
      }
      html[data-view-style="presentation"] .section {
        padding: clamp(30px, 4vw, 58px) !important;
        margin-top: 40px !important;
      }
      html[data-view-style="presentation"] .rule-list,
      html[data-view-style="presentation"] .hero-grid,
      html[data-view-style="presentation"] .cards {
        gap: 22px !important;
      }
      html[data-view-style="presentation"] table {
        border-spacing: 0 18px !important;
        font-size: 16px !important;
      }
      html[data-view-style="presentation"] table td {
        padding: 22px 18px !important;
      }

      html[data-view-style="professional"] body {
        font-size: 13px;
        font-family: "PingFang SC", "Microsoft YaHei", sans-serif !important;
      }
      html[data-view-style="professional"] .hero,
      html[data-view-style="professional"] .main-hero,
      html[data-view-style="professional"] .cover {
        min-height: auto !important;
        padding: 22px !important;
      }
      html[data-view-style="professional"] h1 {
        font-size: clamp(30px, 4vw, 56px) !important;
        letter-spacing: -0.03em !important;
      }
      html[data-view-style="professional"] h2,
      html[data-view-style="professional"] .section-title {
        font-size: clamp(22px, 2.4vw, 34px) !important;
      }
      html[data-view-style="professional"] .hero p,
      html[data-view-style="professional"] .section-note {
        max-width: none !important;
        font-size: 13px !important;
        line-height: 1.55 !important;
      }
      html[data-view-style="professional"] .section,
      html[data-view-style="professional"] .panel,
      html[data-view-style="professional"] .card,
      html[data-view-style="professional"] .report-card,
      html[data-view-style="professional"] .strategy-card,
      html[data-view-style="professional"] .ticker-card,
      html[data-view-style="professional"] .monitor-card,
      html[data-view-style="professional"] .info-card {
        padding: 12px !important;
        border-radius: 10px !important;
        box-shadow: none !important;
      }
      html[data-view-style="professional"] .grid,
      html[data-view-style="professional"] .metric-grid,
      html[data-view-style="professional"] .strategy-grid,
      html[data-view-style="professional"] .dashboard-grid {
        gap: 8px !important;
      }
      html[data-view-style="professional"] table {
        border-collapse: collapse !important;
        border-spacing: 0 !important;
        font-family: "SF Mono", "Menlo", "Consolas", monospace !important;
      }
      html[data-view-style="professional"] table th,
      html[data-view-style="professional"] table td {
        padding: 6px 8px !important;
        font-size: 11px !important;
        border-radius: 0 !important;
        border-left: 0 !important;
        border-right: 0 !important;
      }
      html[data-view-style="professional"] .muted,
      html[data-view-style="professional"] .small,
      html[data-view-style="professional"] .note {
        font-size: 12px !important;
      }

      html[data-view-style="focus"] body {
        background:
          radial-gradient(circle at 14% 8%, color-mix(in srgb, var(--accent, #bf5a36) 28%, transparent), transparent 30%),
          linear-gradient(180deg, var(--bg-start, #f7f2ea), var(--bg-end, #efe7db)) !important;
      }
      html[data-view-style="focus"] .hero,
      html[data-view-style="focus"] .main-hero,
      html[data-view-style="focus"] .summary-panel,
      html[data-view-style="focus"] .action-card,
      html[data-view-style="focus"] .report-card,
      html[data-view-style="focus"] .signal-card {
        outline: 3px solid color-mix(in srgb, var(--accent, #bf5a36) 34%, transparent);
        box-shadow: 0 30px 90px color-mix(in srgb, var(--accent, #bf5a36) 16%, transparent) !important;
      }
      html[data-view-style="focus"] h1 {
        font-size: clamp(54px, 8vw, 124px) !important;
      }
      html[data-view-style="focus"] .metric,
      html[data-view-style="focus"] .metric-card,
      html[data-view-style="focus"] .action-card {
        border: 2px solid color-mix(in srgb, var(--accent, #bf5a36) 24%, transparent) !important;
      }
      html[data-view-style="focus"] .metric:first-child,
      html[data-view-style="focus"] .metric-card:first-child,
      html[data-view-style="focus"] .hero-grid > *:first-child {
        background: linear-gradient(135deg, var(--accent, #bf5a36), var(--accent-2, #1e6f68)) !important;
        color: #fff !important;
      }
      html[data-view-style="focus"] .metric:first-child *,
      html[data-view-style="focus"] .metric-card:first-child *,
      html[data-view-style="focus"] .hero-grid > *:first-child * {
        color: #fff !important;
      }
      html[data-view-style="focus"] .section,
      html[data-view-style="focus"] .panel,
      html[data-view-style="focus"] .card {
        transition: opacity 0.18s ease, filter 0.18s ease;
      }
      html[data-view-style="focus"] .section:not(:first-of-type),
      html[data-view-style="focus"] .panel:not(:first-of-type) {
        opacity: 0.76;
        filter: saturate(0.82);
      }
      html[data-view-style="focus"] .section:hover,
      html[data-view-style="focus"] .panel:hover {
        opacity: 1;
        filter: none;
      }
      html[data-view-style="focus"] .badge,
      html[data-view-style="focus"] .pill,
      html[data-view-style="focus"] .status-pill,
      html[data-view-style="focus"] .signal,
      html[data-view-style="focus"] .action {
        font-weight: 900 !important;
        letter-spacing: 0.05em;
        transform: scale(1.04);
      }
      html[data-view-style="focus"] .pill,
      html[data-view-style="focus"] .badge,
      html[data-view-style="focus"] .status-pill {
        padding: 9px 14px !important;
        box-shadow: 0 10px 24px rgba(34, 48, 68, 0.11) !important;
      }

      html[data-view-style="compact"] body {
        font-size: 12px;
      }
      html[data-view-style="compact"] .page,
      html[data-view-style="compact"] .shell,
      html[data-view-style="compact"] .wrap,
      html[data-view-style="compact"] .container {
        width: min(1760px, calc(100% - 16px)) !important;
        padding-left: 8px !important;
        padding-right: 8px !important;
      }
      html[data-view-style="compact"] .board-nav {
        gap: 8px !important;
        padding-top: 6px !important;
        padding-bottom: 8px !important;
      }
      html[data-view-style="compact"] .board-nav-link,
      html[data-view-style="compact"] .theme-switcher select {
        padding: 7px 10px !important;
        font-size: 12px !important;
      }
      html[data-view-style="compact"] .hero,
      html[data-view-style="compact"] .main-hero,
      html[data-view-style="compact"] .section,
      html[data-view-style="compact"] .panel,
      html[data-view-style="compact"] .card,
      html[data-view-style="compact"] .report-card,
      html[data-view-style="compact"] .strategy-card,
      html[data-view-style="compact"] .ticker-card,
      html[data-view-style="compact"] .monitor-card,
      html[data-view-style="compact"] .info-card {
        padding: 10px !important;
        border-radius: 12px !important;
        box-shadow: none !important;
      }
      html[data-view-style="compact"] h1 {
        font-size: clamp(28px, 4vw, 52px) !important;
        margin: 8px 0 !important;
      }
      html[data-view-style="compact"] h2,
      html[data-view-style="compact"] .section-title {
        font-size: clamp(20px, 2.4vw, 30px) !important;
      }
      html[data-view-style="compact"] .hero p,
      html[data-view-style="compact"] .section-note,
      html[data-view-style="compact"] .rule,
      html[data-view-style="compact"] .info-card p,
      html[data-view-style="compact"] .info-card li {
        font-size: 11px !important;
        line-height: 1.45 !important;
      }
      html[data-view-style="compact"] .grid,
      html[data-view-style="compact"] .metric-grid,
      html[data-view-style="compact"] .strategy-grid,
      html[data-view-style="compact"] .dashboard-grid {
        gap: 10px !important;
      }
      html[data-view-style="compact"] table th,
      html[data-view-style="compact"] table td {
        padding: 5px 6px !important;
        font-size: 10.5px !important;
      }

      @media (max-width: 900px) {
        .theme-switcher {
          border-radius: 22px;
        }
      }
      @media (max-width: 720px) {
        .theme-switcher {
          width: 100%;
          margin-left: 0;
          justify-content: space-between;
        }
        .theme-switcher .theme-control {
          width: 100%;
          justify-content: space-between;
        }
        .theme-switcher select {
          min-width: 150px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function findNavHost() {
    return (
      document.querySelector(".board-nav") ||
      document.querySelector(".nav") ||
      document.querySelector(".page > .nav") ||
      document.querySelector(".shell nav")
    );
  }

  function buildSelectControl(labelText, options, selectedValue, onChange) {
    const control = document.createElement("div");
    control.className = "theme-control";

    const label = document.createElement("label");
    label.textContent = labelText;

    const select = document.createElement("select");
    Object.entries(options).forEach(([key, item]) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = item.label;
      if (item.description) option.title = item.description;
      select.appendChild(option);
    });
    select.value = selectedValue;
    select.addEventListener("change", (event) => {
      onChange(event.target.value);
    });

    control.appendChild(label);
    control.appendChild(select);
    return control;
  }

  function injectSwitcher() {
    const host = findNavHost();
    if (!host || host.querySelector(".theme-switcher")) return;

    const wrap = document.createElement("div");
    wrap.className = "theme-switcher";
    wrap.appendChild(buildSelectControl("全局配色", THEMES, getThemeKey(), applyTheme));
    wrap.appendChild(buildSelectControl("显示风格", VIEW_STYLES, getViewStyleKey(), applyViewStyle));
    host.appendChild(wrap);
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectStyle();
    applyTheme(getThemeKey());
    applyViewStyle(getViewStyleKey());
    injectSwitcher();
  });
})();
