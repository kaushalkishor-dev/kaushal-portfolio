// ============================================
// MAIN SCRIPT.JS - Portfolio Core Functionality
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Portfolio Initializing...");

  initThemeToggle();        // includes light‑mode cursor logic
  initTypewriterEffect();
  initNavbar();
  initSmoothScrolling();
  initSkillAnimations();
  initScrollAnimations();
  initResumeDownload();

  console.log("✅ Portfolio initialized successfully!");
});

// ===== THEME TOGGLE + LIGHT‑MODE CURSOR ONLY =====
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const navbar = document.getElementById("mainNavbar");

  if (!themeToggle) {
    console.warn("Theme toggle button not found");
    return;
  }

  // Apply cursor based on theme:
  // Dark mode → default system cursor
  // Light mode → day.png
  function applyCursorBasedOnTheme() {
    const isDarkMode = body.classList.contains("dark-mode");

    if (isDarkMode) {
      // Dark mode: remove any custom cursor, use system default
      document.body.style.cursor = "";
      const allElements = document.querySelectorAll("*");
      allElements.forEach(el => {
        el.style.cursor = "";
      });
      console.log("🖱️ Dark mode: using default system cursor");
    } else {
      // Light mode: apply day.png cursor
      const cursorUrl = "url('day.png') 16 16, auto";
      const pointerCursorUrl = "url('day.png') 16 16, pointer";

      document.body.style.cursor = cursorUrl;
      const allElements = document.querySelectorAll("*");
      allElements.forEach(el => {
        el.style.cursor = cursorUrl;
      });

      // Interactive elements get pointer fallback (keeps click behaviour)
      const interactive = document.querySelectorAll('a, button, input, select, textarea, .btn, .nav-link, .social-icon, [role="button"], .project-card, .skill-category');
      interactive.forEach(el => {
        el.style.cursor = pointerCursorUrl;
      });
      console.log("🖱️ Light mode: using day.png cursor");
    }
  }

  // Load saved theme preference (default DARK)
  const savedTheme = localStorage.getItem("portfolioTheme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    body.classList.add("dark-mode");
    if (navbar) navbar.classList.add("dark-mode");
    if (!savedTheme) localStorage.setItem("portfolioTheme", "dark");
  } else if (savedTheme === "light") {
    body.classList.remove("dark-mode");
    if (navbar) navbar.classList.remove("dark-mode");
  }

  // Apply cursor based on initial theme
  applyCursorBasedOnTheme();

  // Observe dynamic DOM changes (for future added elements)
  const cursorObserver = new MutationObserver(() => {
    applyCursorBasedOnTheme();
  });
  cursorObserver.observe(document.body, { childList: true, subtree: true });

  // Theme toggle click event
  themeToggle.addEventListener("click", function () {
    const isDark = body.classList.contains("dark-mode");

    // Toggle classes
    body.classList.toggle("dark-mode");
    if (navbar) navbar.classList.toggle("dark-mode");

    // Save preference
    localStorage.setItem("portfolioTheme", isDark ? "light" : "dark");

    // Update cursor immediately
    applyCursorBasedOnTheme();

    console.log(`🌓 Theme switched to: ${isDark ? "light" : "dark"}`);
  });

  console.log("✅ Theme toggle + light‑mode cursor only initialized");
}

// ===== TYPEWRITER EFFECT =====
function initTypewriterEffect() {
  const typewriter = document.getElementById("typewriter");
  if (!typewriter) {
    console.warn("Typewriter element not found");
    return;
  }

  const texts = [
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "MCA Student",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typewriter.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriter.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000);
  console.log("✅ Typewriter effect initialized");
}

// ===== NAVBAR FUNCTIONALITY =====
function initNavbar() {
  const navbar = document.getElementById("mainNavbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  if (!navbar || !navToggle || !navMenu) {
    console.warn("Navbar elements not found");
    return;
  }

  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "auto";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveNavLink();
  }

  function updateActiveNavLink() {
    let currentSection = "";
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${currentSection}` || (currentSection === "" && href === "#")) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  console.log("✅ Navbar initialized");
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "#!") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navbarHeight = document.getElementById("mainNavbar")?.offsetHeight || 70;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
        history.pushState(null, null, targetId);
      }
    });
  });

  console.log("✅ Smooth scrolling initialized");
}

// ===== SKILL BAR ANIMATIONS =====
function initSkillAnimations() {
  const skillBars = document.querySelectorAll(".skill-level");
  if (skillBars.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.width = "0";
          setTimeout(() => {
            entry.target.style.width = width;
          }, 300);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5, rootMargin: "0px 0px -100px 0px" }
  );

  skillBars.forEach((bar) => observer.observe(bar));
  console.log("✅ Skill animations initialized");
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".project-card, .skill-category, .stat-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
  );

  animatedElements.forEach((element) => observer.observe(element));

  const style = document.createElement("style");
  style.textContent = `
    .project-card, .skill-category, .stat-item {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .project-card.animate-in,
    .skill-category.animate-in,
    .stat-item.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  console.log("✅ Scroll animations initialized");
}

// ===== RESUME DOWNLOAD TRACKING =====
function initResumeDownload() {
  const resumeButtons = document.querySelectorAll(".resume-download-btn, .btn-resume");

  resumeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let count = parseInt(localStorage.getItem("resumeDownloads")) || 0;
      count++;
      localStorage.setItem("resumeDownloads", count);
      console.log(`📥 Resume download #${count}`);

      if (typeof gtag !== "undefined") {
        gtag("event", "download", {
          event_category: "Resume",
          event_label: "Resume Download",
        });
      }
    });
  });
}

// ===== UTILITY FUNCTIONS =====
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function getCurrentYear() {
  return new Date().getFullYear();
}

// Update copyright year
document.addEventListener("DOMContentLoaded", function () {
  const copyrightElements = document.querySelectorAll(".copyright");
  const currentYear = getCurrentYear();
  copyrightElements.forEach((element) => {
    if (element.textContent.includes("2025")) {
      element.textContent = element.textContent.replace("2025", currentYear);
    }
  });
});

// ===== ERROR HANDLING =====
window.addEventListener("error", function (e) {
  console.error("JavaScript Error:", e.error);
  console.error("File:", e.filename);
  console.error("Line:", e.lineno);
});

console.log("✅ Main script loaded");