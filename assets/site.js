(function () {
  "use strict";

  const pages = [
    { file: "index.html", index: "00", label: "표지", title: "기획서 홈" },
    { file: "01_overview.html", index: "01", label: "핵심", title: "게임 정체성과 설계 원칙" },
    { file: "02_content_loop.html", index: "02", label: "순환", title: "콘텐츠 순환 구조" },
    { file: "03_auto_explore.html", index: "03", label: "자동탐색", title: "자동 탐색 알고리즘" },
    { file: "04_dungeon.html", index: "04", label: "던전", title: "던전 생성과 진행" },
    { file: "05_world.html", index: "05", label: "필드", title: "필드와 지역 정복" },
    { file: "06_progression.html", index: "06", label: "성장", title: "성장과 경제" },
    { file: "07_architecture.html", index: "07", label: "구조", title: "게임 구조와 상태" },
    { file: "08_mvp.html", index: "08", label: "MVP", title: "제작 범위와 검증" },
    { file: "09_reference.html", index: "09", label: "근거", title: "분석 근거와 구분" },
    { file: "10_development_notes.html", index: "10", label: "개발노트", title: "기획 결정과 개발 기록" },
    { file: "11_roadmap.html", index: "11", label: "계획", title: "개발 로드맵과 버전 운영" },
    { file: "12_pathfinding_ai.html", index: "12", label: "길찾기 AI", title: "재사용 경로·탐험·던전 생성 코어" },
    { file: "13_design_baseline.html", index: "13", label: "현재 기준", title: "v0.3.0 통합 기획 기준선" }
  ];

  const fileName = window.location.pathname.split("/").pop() || "index.html";
  const currentIndex = Math.max(0, pages.findIndex((page) => page.file === fileName));

  function createHeader() {
    let header = document.querySelector(".site-header");
    if (header) return header;

    header = document.createElement("header");
    header.className = "site-header";
    header.setAttribute("data-open", "false");
    header.innerHTML = `
      <div class="header-inner">
        <a class="site-brand" href="index.html" aria-label="방치형 RPG 기획서 홈">
          <span class="brand-mark" aria-hidden="true"></span>
          <span class="brand-copy">방치형 RPG 기획서<small>EXPEDITION DESIGN DOCUMENT</small></span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">목차</button>
        <nav class="top-nav" id="primary-navigation" aria-label="주요 문서">
          ${pages.map((page) => `<a href="${page.file}"><span class="nav-index">${page.index}</span>${page.label}</a>`).join("")}
        </nav>
      </div>`;

    const marker = document.querySelector("[data-site-header]");
    if (marker) marker.replaceWith(header);
    else document.body.prepend(header);
    return header;
  }

  function setupHeader() {
    const header = createHeader();
    const nav = header.querySelector(".top-nav, .site-nav");
    const toggle = header.querySelector(".nav-toggle");
    const currentLink = nav && nav.querySelector(`a[href="${fileName}"]`);

    if (currentLink) {
      currentLink.setAttribute("aria-current", "page");
      requestAnimationFrame(() => currentLink.scrollIntoView({ block: "nearest", inline: "center" }));
    }

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const nextOpen = header.dataset.open !== "true";
        header.dataset.open = String(nextOpen);
        toggle.setAttribute("aria-expanded", String(nextOpen));
      });

      nav.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
          header.dataset.open = "false";
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  function wrapTables() {
    document.querySelectorAll("table").forEach((table) => {
      if (table.parentElement && table.parentElement.classList.contains("table-scroll")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "table-scroll";
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("aria-label", table.caption ? table.caption.textContent.trim() : "데이터 표");
      wrapper.tabIndex = 0;
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  function buildSectionNavigation() {
    const article = document.querySelector(".article, .prose");
    if (!article) return;

    const headings = Array.from(article.querySelectorAll("h2[id], h3[id]"));
    if (headings.length < 2) return;

    let aside = document.querySelector("[data-section-nav], .section-nav");
    if (!aside) {
      const layout = article.closest(".article-layout, .content-layout");
      if (!layout) return;
      aside = document.createElement("aside");
      aside.className = "section-nav";
      aside.setAttribute("data-section-nav", "");
      aside.setAttribute("aria-label", "이 페이지의 목차");
      layout.appendChild(aside);
    }

    aside.innerHTML = `
      <p class="section-nav-title">On this page</p>
      ${headings.map((heading) => `<a href="#${heading.id}" data-level="${heading.tagName.slice(1)}">${heading.textContent.trim()}</a>`).join("")}`;

    const links = Array.from(aside.querySelectorAll("a"));
    if (!("IntersectionObserver" in window)) return;

    const activeIds = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeIds.add(entry.target.id);
        else activeIds.delete(entry.target.id);
      });

      const activeHeading = headings.find((heading) => activeIds.has(heading.id)) ||
        [...headings].reverse().find((heading) => heading.getBoundingClientRect().top < 150);
      links.forEach((link) => link.classList.toggle("is-active", Boolean(activeHeading && link.hash === `#${activeHeading.id}`)));
    }, { rootMargin: "-110px 0px -68% 0px", threshold: [0, 1] });

    headings.forEach((heading) => observer.observe(heading));
  }

  function buildPagination() {
    let container = document.querySelector("[data-page-pagination]");
    if (!container) return;

    container.classList.add("page-pagination");
    const previous = pages[currentIndex - 1];
    const next = pages[currentIndex + 1];

    const link = (page, direction) => page
      ? `<a href="${page.file}" rel="${direction === "이전" ? "prev" : "next"}">
          <span class="pagination-label">${direction} 문서 · ${page.index}</span>
          <span class="pagination-title">${direction === "이전" ? "← " : ""}${page.title}${direction === "다음" ? " →" : ""}</span>
        </a>`
      : `<span class="is-empty" aria-hidden="true"></span>`;

    container.innerHTML = link(previous, "이전") + link(next, "다음");
  }

  function setupBackToTop() {
    const button = document.createElement("button");
    button.className = "back-to-top";
    button.type = "button";
    button.setAttribute("aria-label", "페이지 맨 위로");
    button.textContent = "↑";
    document.body.appendChild(button);

    const sync = () => button.classList.toggle("is-visible", window.scrollY > 640);
    window.addEventListener("scroll", sync, { passive: true });
    sync();
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function addFooter() {
    if (document.querySelector(".site-footer")) return;
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="footer-inner">
        <span>방치형 파티 RPG · 게임 기획 및 구조 설계</span>
        <span><span class="status-chip design">신규 제안</span>은 클린룸 설계이며, <span class="status-chip complete">확인</span>은 레퍼런스 분석 근거입니다.</span>
      </div>`;
    document.body.appendChild(footer);
  }

  function setupSkipLink() {
    const main = document.querySelector("main");
    if (!main) return;
    if (!main.id) main.id = "main-content";
    if (document.querySelector(".skip-link")) return;
    const skip = document.createElement("a");
    skip.className = "skip-link";
    skip.href = `#${main.id}`;
    skip.textContent = "본문으로 건너뛰기";
    document.body.prepend(skip);
  }

  function setupSameWindowNavigation() {
    const isSameWindowLink = (anchor) => {
      if (!anchor || anchor.hasAttribute("download")) return false;
      const rawHref = anchor.getAttribute("href") || "";
      if (!rawHref || rawHref.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(rawHref)) return false;
      const url = new URL(anchor.href, window.location.href);
      return url.origin === window.location.origin;
    };

    document.querySelectorAll("a[href]").forEach((anchor) => {
      if (isSameWindowLink(anchor)) anchor.setAttribute("target", "_self");
    });

    document.addEventListener("click", (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a[href]");
      if (!isSameWindowLink(anchor)) return;

      const url = new URL(anchor.href, window.location.href);
      const isSamePageAnchor = url.pathname === window.location.pathname &&
        url.search === window.location.search && Boolean(url.hash);
      if (isSamePageAnchor) return;

      event.preventDefault();
      window.location.assign(url.href);
    }, true);
  }

  function setupMediaLightbox() {
    const triggers = Array.from(document.querySelectorAll(".media-zoom"));
    if (!triggers.length || typeof HTMLDialogElement === "undefined") return;

    const dialog = document.createElement("dialog");
    dialog.className = "media-lightbox";
    dialog.setAttribute("aria-label", "이미지 확대 보기");
    dialog.innerHTML = `
      <div class="media-lightbox-inner">
        <img alt="">
        <div class="media-lightbox-bar">
          <span class="media-lightbox-description"></span>
          <button class="media-lightbox-close" type="button">닫기 · Esc</button>
        </div>
      </div>`;
    document.body.appendChild(dialog);

    const image = dialog.querySelector("img");
    const description = dialog.querySelector(".media-lightbox-description");
    const closeButton = dialog.querySelector(".media-lightbox-close");

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const sourceImage = trigger.querySelector("img");
        if (!sourceImage) return;
        image.src = trigger.dataset.lightbox || sourceImage.currentSrc || sourceImage.src;
        image.alt = sourceImage.alt;
        description.textContent = sourceImage.alt;
        dialog.showModal();
      });
    });

    closeButton.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      image.removeAttribute("src");
    });
  }

  function init() {
    setupSkipLink();
    setupHeader();
    setupSameWindowNavigation();
    wrapTables();
    buildSectionNavigation();
    buildPagination();
    setupMediaLightbox();
    setupBackToTop();
    addFooter();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
