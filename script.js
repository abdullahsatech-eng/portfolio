document.addEventListener("DOMContentLoaded", () => {

    /*
     * ==========================================
     * Portfolio interaction layer
     * ==========================================
     */

    // ------------------------------------------
    // Scroll reveal
    // ------------------------------------------

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });

    } else {

        // Fallback for older browsers
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    // ------------------------------------------
    // Smooth navigation
    // ------------------------------------------

    const navigationLinks =
        document.querySelectorAll('a[href^="#"]');

    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navigation =
                document.querySelector(".nav");

            const navigationHeight =
                navigation
                    ? navigation.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navigationHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    // ------------------------------------------
    // Navigation state
    // ------------------------------------------

    const sections =
        document.querySelectorAll("main section[id]");

    const navSectionLinks =
        document.querySelectorAll(".nav-links a");

    if (
        "IntersectionObserver" in window &&
        sections.length > 0 &&
        navSectionLinks.length > 0
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        navSectionLinks.forEach((link) => {
                            link.removeAttribute("aria-current");
                        });

                        const activeLink =
                            document.querySelector(
                                `.nav-links a[href="#${entry.target.id}"]`
                            );

                        if (activeLink) {
                            activeLink.setAttribute(
                                "aria-current",
                                "page"
                            );
                        }

                    });

                },
                {
                    threshold: 0,
                    rootMargin: "-35% 0px -55% 0px"
                }
            );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });

    }


    // ------------------------------------------
    // Current year
    // ------------------------------------------

    const currentYear =
        document.querySelector("[data-current-year]");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    // ------------------------------------------
    // External links
    // ------------------------------------------

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


    // ------------------------------------------
    // Project card pointer effect
    // ------------------------------------------

    const projectCards =
        document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            if (window.innerWidth <= 950) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -1.2;

            const rotateY =
                ((x - centerX) / centerX) * 1.2;

            card.style.transform = `
                translateY(-6px)
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    // ------------------------------------------
    // Email protection / copy interaction
    // ------------------------------------------

    const emailElements =
        document.querySelectorAll(
            "[data-email]"
        );

    emailElements.forEach((element) => {

        const email =
            element.getAttribute("data-email");

        if (!email) {
            return;
        }

        element.addEventListener("click", async () => {

            try {

                await navigator.clipboard.writeText(email);

                const originalText =
                    element.textContent;

                element.textContent =
                    "Email copied ✓";

                setTimeout(() => {

                    element.textContent =
                        originalText;

                }, 1800);

            } catch (error) {

                // Clipboard may be unavailable.
                // The mailto link remains functional.

            }

        });

    });


});
