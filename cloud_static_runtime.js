(function () {
  const LOCAL_HOSTS = new Set(["127.0.0.1", "localhost"]);
  const AUTH_STORAGE_KEY = "quant-cloud-auth-ok";
  const DATE_STORAGE_KEY = "quant-cloud-snapshot-date";
  const ROUTE_MAP = {
    "/fund-board": "../fund-board/",
    "/fund-dual-momentum-board": "../fund-dual-momentum-board/",
    "/fund-yield-board": "../fund-yield-board/",
    "/fund-universe": "../fund-universe/",
    "/stock-board": "../stock-board/",
    "/stock-yield-board": "../stock-yield-board/",
    "/sector-board": "../sector-board/",
    "/us-stock-board": "../us-stock-board/",
    "/delivery-log": "../delivery-log/",
    "/PROJECT_DELIVERY_LOG.md": "../PROJECT_DELIVERY_LOG.md",
  };
  const API_MAP = {
    "/api/fund-board-data": "fund_board_snapshot.json",
    "/api/fund-dual-momentum-data": "fund_dual_momentum_snapshot.json",
    "/api/fund-yield-board-data": "fund_yield_hunter_snapshot.json",
    "/api/fund-universe-data": "fund_universe_snapshot.json",
    "/api/stock-board-data": "stock_dashboard_snapshot.json",
    "/api/stock-yield-board-data": "stock_yield_hunter_snapshot.json",
    "/api/sector-board-data": "sector_rotation_dashboard_snapshot.json",
    "/api/us-stock-board-data": "us_stock_dashboard_snapshot.json",
  };
  const STATUS_API_SET = new Set([
    "/api/fund-board-status",
    "/api/fund-dual-momentum-status",
    "/api/stock-board-status",
    "/api/sector-board-status",
    "/api/us-stock-board-status",
  ]);

  function isCloudStaticMode() {
    const localStaticPreview = LOCAL_HOSTS.has(window.location.hostname) && window.location.pathname.startsWith("/site/");
    return window.location.protocol.startsWith("http") && (!LOCAL_HOSTS.has(window.location.hostname) || localStaticPreview);
  }

  if (!isCloudStaticMode()) {
    return;
  }

  function resolveStaticPath(relativePath) {
    return new URL(relativePath, window.location.href).toString();
  }

  async function loadJson(relativePath, fallback) {
    try {
      const response = await nativeFetch(resolveStaticPath(relativePath), { cache: "no-store" });
      if (!response.ok) return fallback;
      return await response.json();
    } catch (error) {
      return fallback;
    }
  }

  function selectedSnapshotDate() {
    return sessionStorage.getItem(DATE_STORAGE_KEY) || "latest";
  }

  function apiSnapshotPath(fileName) {
    const selected = selectedSnapshotDate();
    if (selected && selected !== "latest") {
      return `../snapshots/${selected}/output/${fileName}`;
    }
    return `../output/${fileName}`;
  }

  async function sha256Hex(value) {
    const encoder = new TextEncoder();
    const buffer = await crypto.subtle.digest("SHA-256", encoder.encode(value));
    return Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  function injectAuthStyles() {
    if (document.getElementById("cloudAuthStyles")) return;
    const style = document.createElement("style");
    style.id = "cloudAuthStyles";
    style.textContent = `
      .cloud-auth-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: grid;
        place-items: center;
        background: rgba(17, 23, 34, 0.42);
        backdrop-filter: blur(16px);
        padding: 20px;
      }
      .cloud-auth-card {
        width: min(460px, 100%);
        border-radius: 28px;
        padding: 28px;
        background: rgba(255, 250, 245, 0.94);
        border: 1px solid rgba(24, 36, 51, 0.1);
        box-shadow: 0 26px 90px rgba(24, 36, 51, 0.24);
        color: #182433;
        font-family: "Avenir Next", "PingFang SC", sans-serif;
      }
      .cloud-auth-card h2 {
        margin: 0 0 10px;
        font-size: 28px;
      }
      .cloud-auth-card p {
        margin: 0 0 14px;
        color: #556171;
        line-height: 1.7;
      }
      .cloud-auth-card input {
        width: 100%;
        border-radius: 16px;
        border: 1px solid rgba(24, 36, 51, 0.14);
        padding: 14px 16px;
        font-size: 15px;
        margin-top: 10px;
        box-sizing: border-box;
      }
      .cloud-auth-actions {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 14px;
      }
      .cloud-auth-actions button,
      .cloud-auth-logout {
        border: none;
        border-radius: 999px;
        background: #bf5a36;
        color: #fff;
        padding: 10px 18px;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 10px 24px rgba(191, 90, 54, 0.24);
      }
      .cloud-auth-error {
        min-height: 20px;
        margin-top: 10px;
        color: #b42318;
        font-size: 13px;
      }
	      .cloud-auth-logout {
	        position: fixed;
	        right: 18px;
        bottom: 18px;
        z-index: 9998;
        background: rgba(24, 36, 51, 0.9);
	        box-shadow: 0 16px 40px rgba(24, 36, 51, 0.18);
	      }
	      @media (max-width: 720px) {
	        .cloud-auth-card {
	          padding: 22px;
	          border-radius: 24px;
	        }
	        .cloud-auth-card h2 {
	          font-size: 24px;
	        }
	        .cloud-auth-logout {
	          right: 10px;
	          bottom: 62px;
	          padding: 9px 14px;
	          font-size: 12px;
	        }
	      }
	    `;
    document.head.appendChild(style);
  }

  function injectLogoutButton() {
    if (document.getElementById("cloudAuthLogout")) return;
    const button = document.createElement("button");
    button.id = "cloudAuthLogout";
    button.className = "cloud-auth-logout";
    button.textContent = "退出云端登录";
    button.addEventListener("click", () => {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      window.location.reload();
    });
    document.body.appendChild(button);
  }

  function showAuthGate(config) {
    injectAuthStyles();
    const overlay = document.createElement("div");
    overlay.className = "cloud-auth-overlay";
    overlay.innerHTML = `
      <div class="cloud-auth-card">
        <h2>${config.title || "量化看板云端访问"}</h2>
        <p>${config.hint || "请输入访问口令"}</p>
        <p>当前是 GitHub 静态版本。输入口令后可浏览最新自动更新快照。</p>
        <input id="cloudAuthInput" type="password" placeholder="访问口令" autocomplete="current-password" />
        <div class="cloud-auth-actions">
          <button id="cloudAuthSubmit" type="button">进入看板</button>
        </div>
        <div id="cloudAuthError" class="cloud-auth-error"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    const input = overlay.querySelector("#cloudAuthInput");
    const submit = overlay.querySelector("#cloudAuthSubmit");
    const error = overlay.querySelector("#cloudAuthError");

    async function handleSubmit() {
      const value = input.value.trim();
      if (!value) {
        error.textContent = "请输入访问口令。";
        return;
      }
      const hashed = await sha256Hex(value);
      if (hashed !== config.password_hash) {
        error.textContent = "口令不正确，请重试。";
        return;
      }
      sessionStorage.setItem(AUTH_STORAGE_KEY, config.password_hash);
      overlay.remove();
      injectLogoutButton();
    }

    submit.addEventListener("click", handleSubmit);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    });
    setTimeout(() => input.focus(), 50);
  }

  async function ensureCloudAuth() {
    const response = await nativeFetch(resolveStaticPath("../auth-config.json"), { cache: "no-store" });
    const config = await response.json();
    if (!config.enabled || !config.password_hash) {
      return;
    }
    if (sessionStorage.getItem(AUTH_STORAGE_KEY) === config.password_hash) {
      injectLogoutButton();
      return;
    }
    if (document.readyState === "loading") {
      document.addEventListener(
        "DOMContentLoaded",
        () => {
          showAuthGate(config);
        },
        { once: true },
      );
    } else {
      showAuthGate(config);
    }
  }

  async function rewriteBoardLinks() {
    const publicConfig = await loadJson("../public-config.json", null);
    const enabledRoutes = new Set(publicConfig?.enabled_routes || Object.keys(ROUTE_MAP).map((route) => route.slice(1)));
    document.querySelectorAll('a[href^="/"]').forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href === "/public-share-control") {
        anchor.setAttribute("href", "#");
        anchor.setAttribute("title", "对外展示设置只在本地可用，云端静态站不可修改发布配置。");
        anchor.style.display = "none";
        return;
      }
      if (href in ROUTE_MAP) {
        const routeName = href.slice(1);
        if (!enabledRoutes.has(routeName)) {
          anchor.setAttribute("href", "#");
          anchor.setAttribute("title", "该看板未被设置为对外展示。");
          anchor.style.display = "none";
          return;
        }
        anchor.setAttribute("href", ROUTE_MAP[href]);
        return;
      }
      if (href.startsWith("/output/")) {
        anchor.setAttribute("href", `..${href}`);
        return;
      }
      if (href.startsWith("/var/folders/")) {
        anchor.setAttribute("href", "#");
        anchor.setAttribute("title", "该链接指向本地临时文件，云端版本不可访问。");
      }
    });
  }

  function injectSnapshotSwitcherStyles() {
    if (document.getElementById("cloudSnapshotSwitcherStyles")) return;
    const style = document.createElement("style");
    style.id = "cloudSnapshotSwitcherStyles";
    style.textContent = `
      .cloud-snapshot-switcher {
        position: fixed;
        left: 18px;
        bottom: 18px;
        z-index: 9997;
        display: flex;
        align-items: center;
        gap: 8px;
        border: 1px solid rgba(24,36,51,.12);
        border-radius: 999px;
        padding: 9px 11px;
        background: rgba(255,250,245,.92);
        box-shadow: 0 16px 40px rgba(24,36,51,.14);
        backdrop-filter: blur(12px);
        color: #182433;
        font: 800 12px/1.2 "Avenir Next", "PingFang SC", sans-serif;
      }
      .cloud-snapshot-switcher select {
        border: 1px solid rgba(24,36,51,.14);
        border-radius: 999px;
        padding: 6px 9px;
        background: #fff;
        font: inherit;
        color: #182433;
      }
      @media (max-width: 720px) {
        .cloud-snapshot-switcher {
          left: 10px;
          right: 10px;
          bottom: 10px;
          justify-content: center;
          border-radius: 18px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  async function injectSnapshotSwitcher() {
    const index = await loadJson("../snapshots/index.json", { dates: [] });
    const dates = Array.isArray(index.dates) ? index.dates : [];
    if (!dates.length || document.getElementById("cloudSnapshotSwitcher")) return;
    injectSnapshotSwitcherStyles();
    const wrapper = document.createElement("div");
    wrapper.id = "cloudSnapshotSwitcher";
    wrapper.className = "cloud-snapshot-switcher";
    const selected = selectedSnapshotDate();
    const options = [
      `<option value="latest"${selected === "latest" ? " selected" : ""}>最新</option>`,
      ...dates.map((item) => {
        const date = item.date;
        return `<option value="${date}"${selected === date ? " selected" : ""}>${date}</option>`;
      }),
    ].join("");
    wrapper.innerHTML = `
      <span>快照日期</span>
      <select aria-label="选择快照日期">${options}</select>
    `;
    const select = wrapper.querySelector("select");
    select.addEventListener("change", () => {
      sessionStorage.setItem(DATE_STORAGE_KEY, select.value);
      window.location.reload();
    });
    document.body.appendChild(wrapper);
  }

  const nativeFetch = window.fetch.bind(window);

  async function patchedFetch(input, init) {
    const requestUrl =
      typeof input === "string"
        ? input
        : input instanceof Request
          ? input.url
          : String(input);
    let pathname = requestUrl;
    try {
      pathname = new URL(requestUrl, window.location.href).pathname;
    } catch (error) {
      pathname = requestUrl;
    }

    if (pathname.endsWith("/api/delivery-log-markdown")) {
      const method =
        (init && init.method) ||
        (input instanceof Request ? input.method : "GET") ||
        "GET";
      if (method.toUpperCase() !== "GET") {
        return new Response(
          JSON.stringify({
            message: "云端部署为只读模式，请在仓库中修改 PROJECT_DELIVERY_LOG.md 后重新部署。",
            error: "cloud_read_only",
          }),
          {
            status: 405,
            headers: { "Content-Type": "application/json; charset=utf-8" },
          },
        );
      }
      const markdownResponse = await nativeFetch(resolveStaticPath("../PROJECT_DELIVERY_LOG.md"), {
        cache: "no-store",
      });
      const content = await markdownResponse.text();
      return new Response(
        JSON.stringify({
          content,
          path: resolveStaticPath("../PROJECT_DELIVERY_LOG.md"),
          updated_at: null,
          cloud_mode: true,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json; charset=utf-8" },
        },
      );
    }

    const statusPath = Array.from(STATUS_API_SET).find((key) => pathname.endsWith(key));
    if (statusPath) {
      return new Response(
        JSON.stringify({
          ok: true,
          cloud_mode: true,
          mode: "static_snapshot",
          selected_date: selectedSnapshotDate(),
          message: "静态展示站不执行实时刷新，仅展示已发布快照。",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json; charset=utf-8" },
        },
      );
    }

    const apiPath = Object.keys(API_MAP).find((key) => pathname.endsWith(key));
    if (!apiPath) {
      return nativeFetch(input, init);
    }

    return nativeFetch(`${resolveStaticPath(apiSnapshotPath(API_MAP[apiPath]))}?ts=${Date.now()}`, {
      cache: "no-store",
    });
  }

  window.fetch = patchedFetch;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      rewriteBoardLinks();
      injectSnapshotSwitcher();
    }, { once: true });
  } else {
    rewriteBoardLinks();
    injectSnapshotSwitcher();
  }

  ensureCloudAuth().catch((error) => {
    console.warn("cloud auth gate disabled because auth-config.json could not be loaded", error);
  });
})();
