document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       MOBILE NAVIGATION
    ========================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("open");

            menuToggle.classList.toggle(
                "open",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        /* Close menu after selecting a page */

        const navLinks =
            navMenu.querySelectorAll(".nav-link");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");
                menuToggle.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });


        /* Close when clicking outside */

        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navMenu.classList.contains("open")
            ) {

                navMenu.classList.remove("open");
                menuToggle.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* ==========================================
       PAGE LOAD ANIMATION
    ========================================== */

    document.body.classList.add(
        "page-loaded"
    );


    /* ==========================================
       ACTIVE NAVIGATION
    ========================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    const navigationLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    navigationLinks.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage =
            href.split("/").pop();

        link.classList.toggle(
            "active",
            linkPage === currentPage
        );

    });


    /* ==========================================
       SMOOTH INTERNAL ANCHORS
    ========================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                const header =
                    document.querySelector(
                        ".site-header"
                    );

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const top =
                    target.getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    headerHeight
                    -
                    15;

                window.scrollTo({
                    top,
                    behavior: "smooth"
                });

            }
        );

    });


    /* ==========================================
       PROJECT CARD TILT
       Desktop only
    ========================================== */

    const interactiveCards =
        document.querySelectorAll(
            ".preview-card, .project-card"
        );

    interactiveCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth <= 950
                ) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const mouseX =
                    event.clientX -
                    rect.left;

                const mouseY =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((mouseY - centerY) /
                        centerY) *
                    -1.8;

                const rotateY =
                    ((mouseX - centerX) /
                        centerX) *
                    1.8;

                card.style.transform =
                    `
                        translateY(-6px)
                        perspective(900px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* ==========================================
       BUTTON PRESS FEEDBACK
    ========================================== */

    const buttons =
        document.querySelectorAll(
            ".button, .project-button, .nav-contact"
        );

    buttons.forEach((button) => {

        button.addEventListener(
            "mousedown",
            () => {

                button.style.transform =
                    "scale(0.97)";

            }
        );


        button.addEventListener(
            "mouseup",
            () => {

                button.style.transform = "";

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform = "";

            }
        );

    });


    /* ==========================================
       CURRENT YEAR
    ========================================== */

    const yearElement =
        document.querySelector(
            "[data-current-year]"
        );

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* ==========================================
       EXTERNAL LINK SAFETY
    ========================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );

    externalLinks.forEach((link) => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* ==========================================
       EMAIL COPY SUPPORT
       Used on the Contact page
    ========================================== */

    const copyEmailButtons =
        document.querySelectorAll(
            "[data-copy-email]"
        );

    copyEmailButtons.forEach((button) => {

        button.addEventListener(
            "click",
            async () => {

                const email =
                    button.getAttribute(
                        "data-copy-email"
                    );

                if (!email) {
                    return;
                }

                try {

                    await navigator.clipboard.writeText(
                        email
                    );

                    const originalText =
                        button.textContent;

                    button.textContent =
                        "Email copied ✓";

                    setTimeout(() => {

                        button.textContent =
                            originalText;

                    }, 1800);

                } catch (error) {

                    /*
                     * Clipboard access can be
                     * unavailable in some browsers.
                     * The normal mailto link still works.
                     */

                    window.location.href =
                        `mailto:${email}`;

                }

            }
        );

    });


    /* ==========================================
       HERO PARALLAX
       Desktop only
    ========================================== */

    const heroGlowOne =
        document.querySelector(
            ".hero-glow-one"
        );

    const heroGlowTwo =
        document.querySelector(
            ".hero-glow-two"
        );

    if (
        heroGlowOne &&
        heroGlowTwo &&
        window.innerWidth > 950
    ) {

        let ticking = false;

        window.addEventListener(
            "scroll",
            () => {

                if (ticking) {
                    return;
                }

                window.requestAnimationFrame(
                    () => {

                        const scroll =
                            window.scrollY;

                        heroGlowOne.style.transform =
                            `
                                translate3d(
                                    0,
                                    ${scroll * 0.07}px,
                                    0
                                )
                            `;

                        heroGlowTwo.style.transform =
                            `
                                translate3d(
                                    0,
                                    ${scroll * -0.04}px,
                                    0
                                )
                            `;

                        ticking = false;

                    }
                );

                ticking = true;

            },
            {
                passive: true
            }
        );

    }


    /* ==========================================
       KEYBOARD ACCESSIBILITY
    ========================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navMenu &&
                navMenu.classList.contains("open")
            ) {

                navMenu.classList.remove(
                    "open"
                );

                if (menuToggle) {

                    menuToggle.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );

});
