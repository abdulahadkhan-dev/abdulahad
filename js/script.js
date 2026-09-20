/* =========================================================
   PREMIUM PORTFOLIO JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const body = document.body;

const header =
    document.getElementById("header");

const menuToggle =
    document.getElementById("menuToggle");

const mobileMenu =
    document.getElementById("mobileMenu");

const themeToggle =
    document.getElementById("themeToggle");

const scrollProgress =
    document.getElementById("scrollProgress");

const backToTop =
    document.getElementById("backToTop");

const pageLoader =
    document.getElementById("pageLoader");


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        pageLoader.classList.add("hide");

    }, 600);

});


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMobileMenu() {

    menuToggle.classList.toggle("active");

    mobileMenu.classList.toggle("open");

    body.classList.toggle(
        "no-scroll",
        mobileMenu.classList.contains("open")
    );

}


menuToggle.addEventListener(
    "click",
    toggleMobileMenu
);


document
    .querySelectorAll(".mobile-link")
    .forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");

            mobileMenu.classList.remove("open");

            body.classList.remove("no-scroll");

        });

    });


/* =========================================================
   THEME
========================================================= */

const savedTheme =
    localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {

    body.classList.add("light-theme");

}


function updateThemeIcon() {

    const icon =
        themeToggle.querySelector("i");

    if (
        body.classList.contains("light-theme")
    ) {

        icon.className =
            "fa-solid fa-sun";

    } else {

        icon.className =
            "fa-solid fa-moon";

    }

}


updateThemeIcon();


themeToggle.addEventListener(
    "click",
    () => {

        body.classList.toggle("light-theme");

        const theme =
            body.classList.contains("light-theme")
                ? "light"
                : "dark";

        localStorage.setItem(
            "portfolio-theme",
            theme
        );

        updateThemeIcon();

        showToast(
            theme === "light"
                ? "Light mode enabled"
                : "Dark mode enabled"
        );

    }
);


/* =========================================================
   HEADER SCROLL
========================================================= */

function handleScroll() {

    const scrollTop =
        window.scrollY;

    if (scrollTop > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }


    /* Back to top */

    if (scrollTop > 600) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }


    /* Scroll progress */

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    scrollProgress.style.width =
        `${progress}%`;

}


window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);

handleScroll();


/* =========================================================
   BACK TO TOP
========================================================= */

backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 180;

    let currentSection = "";

    sections.forEach(section => {

        const top =
            section.offsetTop;

        const height =
            section.offsetHeight;

        const id =
            section.getAttribute("id");

        if (
            scrollPosition >= top &&
            scrollPosition < top + height
        ) {

            currentSection = id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);


/* =========================================================
   HERO SLIDER
========================================================= */

const heroSlides =
    document.querySelectorAll(
        ".hero-slide"
    );

const heroDots =
    document.querySelectorAll(
        ".slider-dot"
    );

const heroPrev =
    document.getElementById("heroPrev");

const heroNext =
    document.getElementById("heroNext");

let heroIndex = 0;

let heroTimer;


function showHeroSlide(index) {

    if (!heroSlides.length) {
        return;
    }


    if (index < 0) {

        index =
            heroSlides.length - 1;

    }


    if (index >= heroSlides.length) {

        index = 0;

    }


    heroSlides.forEach(
        slide => slide.classList.remove("active")
    );


    heroDots.forEach(
        dot => dot.classList.remove("active")
    );


    heroSlides[index]
        .classList.add("active");


    if (heroDots[index]) {

        heroDots[index]
            .classList.add("active");

    }


    heroIndex = index;

}


function nextHeroSlide() {

    showHeroSlide(
        heroIndex + 1
    );

}


function previousHeroSlide() {

    showHeroSlide(
        heroIndex - 1
    );

}


heroNext.addEventListener(
    "click",
    () => {

        nextHeroSlide();

        restartHeroAutoPlay();

    }
);


heroPrev.addEventListener(
    "click",
    () => {

        previousHeroSlide();

        restartHeroAutoPlay();

    }
);


heroDots.forEach(
    dot => {

        dot.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        dot.dataset.slideTo
                    );

                showHeroSlide(index);

                restartHeroAutoPlay();

            }
        );

    }
);


function startHeroAutoPlay() {

    heroTimer =
        setInterval(
            nextHeroSlide,
            5000
        );

}


function restartHeroAutoPlay() {

    clearInterval(heroTimer);

    startHeroAutoPlay();

}


startHeroAutoPlay();


/* =========================================================
   PROJECT SLIDER
========================================================= */

const projectsTrack =
    document.getElementById(
        "projectsTrack"
    );

const projectPrev =
    document.getElementById(
        "projectPrev"
    );

const projectNext =
    document.getElementById(
        "projectNext"
    );

let projectPosition = 0;


function getProjectStep() {

    const card =
        projectsTrack.querySelector(
            ".project-card"
        );

    if (!card) {
        return 0;
    }

    const styles =
        window.getComputedStyle(
            projectsTrack
        );

    const gap =
        parseFloat(
            styles.columnGap ||
            styles.gap ||
            18
        );

    return card.offsetWidth + gap;

}


function getVisibleProjectCount() {

    if (window.innerWidth <= 768) {
        return 1;
    }

    if (window.innerWidth <= 1200) {
        return 2;
    }

    return 3;

}


function getProjectMaxPosition() {

    const cards =
        projectsTrack.querySelectorAll(
            ".project-card"
        );

    const visible =
        getVisibleProjectCount();

    return Math.max(
        0,
        cards.length - visible
    );

}


function updateProjectSlider() {

    const step =
        getProjectStep();

    projectsTrack.style.transform =
        `translateX(-${projectPosition * step}px)`;

}


projectNext.addEventListener(
    "click",
    () => {

        const max =
            getProjectMaxPosition();

        if (projectPosition < max) {

            projectPosition++;

        } else {

            projectPosition = 0;

        }

        updateProjectSlider();

    }
);


projectPrev.addEventListener(
    "click",
    () => {

        const max =
            getProjectMaxPosition();

        if (projectPosition > 0) {

            projectPosition--;

        } else {

            projectPosition = max;

        }

        updateProjectSlider();

    }
);


window.addEventListener(
    "resize",
    () => {

        projectPosition = Math.min(
            projectPosition,
            getProjectMaxPosition()
        );

        updateProjectSlider();

    }
);


/* =========================================================
   PROJECT AUTO SLIDE
========================================================= */

let projectAutoTimer =
    setInterval(
        () => {

            projectNext.click();

        },
        6000
    );


[
    projectPrev,
    projectNext,
    projectsTrack
].forEach(element => {

    element.addEventListener(
        "mouseenter",
        () => {

            clearInterval(
                projectAutoTimer
            );

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            clearInterval(
                projectAutoTimer
            );

            projectAutoTimer =
                setInterval(
                    () => {

                        projectNext.click();

                    },
                    6000
                );

        }
    );

});


/* =========================================================
   PROJECT FILTER
========================================================= */

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                item =>
                    item.classList.remove("active")
            );

            button.classList.add("active");


            const filter =
                button.dataset.filter;


            projectCards.forEach(card => {

                const category =
                    card.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.style.display = "";

                } else {

                    card.style.display =
                        "none";

                }

            });


            projectPosition = 0;

            updateProjectSlider();

        }
    );

});


/* =========================================================
   PROJECT DETAILS MODAL
========================================================= */

const projectModal =
    document.getElementById(
        "projectModal"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalDescription =
    document.getElementById(
        "modalDescription"
    );

const modalCategory =
    document.getElementById(
        "modalCategory"
    );

const modalTech =
    document.getElementById(
        "modalTech"
    );

const modalFeatures =
    document.getElementById(
        "modalFeatures"
    );


const projectData = {

    ecommerce: {

        title:
            "Premium E-Commerce Platform",

        category:
            "FULL STACK",

        description:
            "A complete e-commerce experience designed with a modern frontend, powerful backend architecture, product management, cart, wishlist and account features.",

        tech:
            [
                "HTML5",
                "CSS3",
                "JavaScript",
                "Node.js",
                "Express.js",
                "MySQL"
            ],

        features:
            [
                "Product search and filtering",
                "Shopping cart system",
                "Wishlist functionality",
                "User authentication",
                "Admin product management",
                "Responsive mobile-first interface"
            ]

    },


    dashboard: {

        title:
            "Analytics Dashboard",

        category:
            "WEB APPLICATION",

        description:
            "A responsive analytics dashboard for displaying business statistics, charts, users, activity and administrative information.",

        tech:
            [
                "HTML5",
                "CSS3",
                "JavaScript",
                "REST API"
            ],

        features:
            [
                "Interactive statistics",
                "Responsive dashboard layout",
                "Charts and visual analytics",
                "User management",
                "Modern admin interface"
            ]

    },


    finance: {

        title:
            "Finance Mobile Experience",

        category:
            "UI / UX",

        description:
            "A modern mobile finance interface focused on usability, visual clarity and easy access to financial information.",

        tech:
            [
                "UI/UX",
                "Figma",
                "CSS3",
                "JavaScript"
            ],

        features:
            [
                "Mobile-first design",
                "Clean financial dashboard",
                "Accessible navigation",
                "Responsive components",
                "Modern visual hierarchy"
            ]

    },


    api: {

        title:
            "Portfolio Management API",

        category:
            "FULL STACK",

        description:
            "A REST API architecture for dynamically managing portfolio content such as projects, skills, profile data and contact messages.",

        tech:
            [
                "Node.js",
                "Express.js",
                "MySQL",
                "REST API"
            ],

        features:
            [
                "CRUD operations",
                "Project management",
                "Skill management",
                "Contact message API",
                "Database integration",
                "Admin authentication"
            ]

    },


    agency: {

        title:
            "Creative Agency Website",

        category:
            "WEB DEVELOPMENT",

        description:
            "A visually rich agency landing page built to communicate services, projects and company value with a strong visual hierarchy.",

        tech:
            [
                "HTML",
                "CSS",
                "JavaScript",
                "Animation"
            ],

        features:
            [
                "Animated hero section",
                "Service sections",
                "Project showcase",
                "Responsive layout",
                "Smooth scrolling",
                "Contact section"
            ]

    },


    portfolio: {

        title:
            "Developer Portfolio",

        category:
            "UI / UX",

        description:
            "A premium developer portfolio featuring modern typography, animated sections, responsive layouts, project filtering and interactive elements.",

        tech:
            [
                "HTML5",
                "CSS3",
                "JavaScript",
                "Responsive UI"
            ],

        features:
            [
                "Responsive design",
                "Dark/light theme",
                "Hero slider",
                "Project carousel",
                "Animated counters",
                "Contact form"
            ]

    }

};


function openProjectModal(projectKey) {

    const project =
        projectData[projectKey];

    if (!project) {
        return;
    }


    modalTitle.textContent =
        project.title;

    modalCategory.textContent =
        project.category;

    modalDescription.textContent =
        project.description;


    modalTech.innerHTML =
        project.tech
            .map(
                tech =>
                    `<span>${tech}</span>`
            )
            .join("");


    modalFeatures.innerHTML =
        project.features
            .map(
                feature =>
                    `<li>${feature}</li>`
            )
            .join("");


    projectModal.classList.add(
        "show"
    );

    body.classList.add(
        "no-scroll"
    );

}


function closeProjectModal() {

    projectModal.classList.remove(
        "show"
    );

    body.classList.remove(
        "no-scroll"
    );

}


document
    .querySelectorAll(
        ".project-details-btn"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openProjectModal(
                    button.dataset.project
                );

            }
        );

    });


modalClose.addEventListener(
    "click",
    closeProjectModal
);


projectModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            projectModal
        ) {

            closeProjectModal();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeProjectModal();

        }

    }
);


/* =========================================================
   TESTIMONIAL SLIDER
========================================================= */

const testimonialTrack =
    document.getElementById(
        "testimonialTrack"
    );

const testimonialPrev =
    document.getElementById(
        "testimonialPrev"
    );

const testimonialNext =
    document.getElementById(
        "testimonialNext"
    );

const testimonialDots =
    document.querySelectorAll(
        "#testimonialDots button"
    );

let testimonialIndex = 0;


function showTestimonial(index) {

    const total =
        testimonialDots.length;

    if (index < 0) {
        index = total - 1;
    }

    if (index >= total) {
        index = 0;
    }


    testimonialTrack.style.transform =
        `translateX(-${index * 100}%)`;


    testimonialDots.forEach(
        dot =>
            dot.classList.remove("active")
    );


    if (testimonialDots[index]) {

        testimonialDots[index]
            .classList.add("active");

    }


    testimonialIndex = index;

}


testimonialPrev.addEventListener(
    "click",
    () => {

        showTestimonial(
            testimonialIndex - 1
        );

    }
);


testimonialNext.addEventListener(
    "click",
    () => {

        showTestimonial(
            testimonialIndex + 1
        );

    }
);


testimonialDots.forEach(
    dot => {

        dot.addEventListener(
            "click",
            () => {

                showTestimonial(
                    Number(
                        dot.dataset.testimonial
                    )
                );

            }
        );

    }
);


/* AUTO TESTIMONIAL */

setInterval(
    () => {

        showTestimonial(
            testimonialIndex + 1
        );

    },
    7000
);


/* =========================================================
   COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(
        ".counter"
    );

let countersStarted = false;


function animateCounter(
    element
) {

    const target =
        Number(
            element.dataset.target
        );

    const duration = 1800;

    const startTime =
        performance.now();


    function updateCounter(
        currentTime
    ) {

        const elapsed =
            currentTime -
            startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                4
            );


        const value =
            Math.floor(
                eased * target
            );


        element.textContent =
            value;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            element.textContent =
                target;

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/* =========================================================
   SKILL BARS
========================================================= */

const skillBars =
    document.querySelectorAll(
        ".skill-progress span"
    );


function animateSkillBars() {

    skillBars.forEach(bar => {

        const width =
            bar.dataset.width;

        bar.style.width =
            width;

    });

}


/* =========================================================
   INTERSECTION OBSERVER
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");


                        /* Skills */

                        if (
                            entry.target.classList
                                .contains(
                                    "skills-cards"
                                )
                        ) {

                            animateSkillBars();

                        }


                        /* Counters */

                        const hasCounter =
                            entry.target.querySelector(
                                ".counter"
                            );

                        if (
                            hasCounter &&
                            !hasCounter.dataset.started
                        ) {

                            counters.forEach(
                                counter => {

                                    if (
                                        !counter.dataset.started
                                    ) {

                                        counter.dataset.started =
                                            "true";

                                        animateCounter(
                                            counter
                                        );

                                    }

                                }
                            );

                        }

                    }

                }
            );

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(
    element =>
        observer.observe(element)
);


/* Separate observer for stats */

const statsSection =
    document.querySelector(
        ".stats-section"
    );


if (statsSection) {

    const statsObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting &&
                            !countersStarted
                        ) {

                            countersStarted =
                                true;

                            counters.forEach(
                                counter => {

                                    animateCounter(
                                        counter
                                    );

                                }
                            );

                        }

                    }
                );

            },
            {
                threshold: .3
            }
        );

    statsObserver.observe(
        statsSection
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );

const formSuccess =
    document.getElementById(
        "formSuccess"
    );


function setError(
    input,
    message
) {

    const group =
        input.closest(
            ".form-group"
        );

    const error =
        group.querySelector(
            ".error-message"
        );

    group.classList.add(
        "error"
    );

    error.textContent =
        message;

}


function clearError(input) {

    const group =
        input.closest(
            ".form-group"
        );

    const error =
        group.querySelector(
            ".error-message"
        );

    group.classList.remove(
        "error"
    );

    error.textContent = "";

}


function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            );

        const email =
            document.getElementById(
                "email"
            );

        const subject =
            document.getElementById(
                "subject"
            );

        const message =
            document.getElementById(
                "message"
            );


        let valid = true;


        /* Name */

        if (
            name.value.trim().length < 2
        ) {

            setError(
                name,
                "Please enter your name."
            );

            valid = false;

        } else {

            clearError(name);

        }


        /* Email */

        if (
            !validateEmail(
                email.value.trim()
            )
        ) {

            setError(
                email,
                "Please enter a valid email."
            );

            valid = false;

        } else {

            clearError(email);

        }


        /* Subject */

        if (
            subject.value.trim().length < 3
        ) {

            setError(
                subject,
                "Please enter a subject."
            );

            valid = false;

        } else {

            clearError(subject);

        }


        /* Message */

        if (
            message.value.trim().length < 10
        ) {

            setError(
                message,
                "Message should contain at least 10 characters."
            );

            valid = false;

        } else {

            clearError(message);

        }


        if (!valid) {

            showToast(
                "Please fix the highlighted fields."
            );

            return;

        }


        /* =================================================
           SAVE TO LOCAL STORAGE
        ================================================= */

        const storedMessages =
            JSON.parse(
                localStorage.getItem(
                    "portfolio-messages"
                ) || "[]"
            );


        const newMessage = {

            id:
                Date.now(),

            name:
                name.value.trim(),

            email:
                email.value.trim(),

            subject:
                subject.value.trim(),

            message:
                message.value.trim(),

            createdAt:
                new Date().toISOString(),

            status:
                "unread"

        };


        storedMessages.push(
            newMessage
        );


        localStorage.setItem(
            "portfolio-messages",
            JSON.stringify(
                storedMessages
            )
        );


        contactForm.reset();


        formSuccess.classList.add(
            "show"
        );


        showToast(
            "Message sent successfully!"
        );


        setTimeout(
            () => {

                formSuccess.classList.remove(
                    "show"
                );

            },
            5000
        );

    }
);


/* =========================================================
   LIVE FORM CLEAR ERRORS
========================================================= */

contactForm
    .querySelectorAll(
        "input, textarea"
    )
    .forEach(input => {

        input.addEventListener(
            "input",
            () => {

                clearError(input);

            }
        );

    });


/* =========================================================
   NEWSLETTER
========================================================= */

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );

const newsletterEmail =
    document.getElementById(
        "newsletterEmail"
    );

const newsletterMessage =
    document.getElementById(
        "newsletterMessage"
    );


newsletterForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const email =
            newsletterEmail.value.trim();


        if (
            !validateEmail(email)
        ) {

            newsletterMessage.textContent =
                "Please enter a valid email.";

            newsletterMessage.style.color =
                "var(--danger)";

            return;

        }


        const subscribers =
            JSON.parse(
                localStorage.getItem(
                    "portfolio-subscribers"
                ) || "[]"
            );


        if (
            !subscribers.includes(email)
        ) {

            subscribers.push(email);

        }


        localStorage.setItem(
            "portfolio-subscribers",
            JSON.stringify(
                subscribers
            )
        );


        newsletterMessage.textContent =
            "You're subscribed successfully!";

        newsletterMessage.style.color =
            "var(--success)";


        newsletterForm.reset();


        showToast(
            "Subscribed successfully!"
        );

    }
);


/* =========================================================
   TOAST SYSTEM
========================================================= */

const toast =
    document.getElementById(
        "toast"
    );

const toastMessage =
    document.getElementById(
        "toastMessage"
    );

let toastTimer;


function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow =
    document.querySelector(
        ".cursor-glow"
    );


if (
    cursorGlow &&
    window.matchMedia(
        "(hover: hover)"
    ).matches
) {

    window.addEventListener(
        "mousemove",
        event => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   HERO TOUCH SWIPE
========================================================= */

let touchStartX = 0;

let touchEndX = 0;


const heroSlider =
    document.querySelector(
        ".hero-slider"
    );


if (heroSlider) {

    heroSlider.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    heroSlider.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;

            const difference =
                touchStartX -
                touchEndX;


            if (
                Math.abs(difference) < 50
            ) {

                return;

            }


            if (difference > 0) {

                nextHeroSlide();

            } else {

                previousHeroSlide();

            }


            restartHeroAutoPlay();

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   TESTIMONIAL TOUCH SWIPE
========================================================= */

let testimonialStartX = 0;

let testimonialEndX = 0;


const testimonialWindow =
    document.querySelector(
        ".testimonial-window"
    );


if (testimonialWindow) {

    testimonialWindow.addEventListener(
        "touchstart",
        event => {

            testimonialStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    testimonialWindow.addEventListener(
        "touchend",
        event => {

            testimonialEndX =
                event.changedTouches[0].screenX;


            const difference =
                testimonialStartX -
                testimonialEndX;


            if (
                Math.abs(difference) < 50
            ) {

                return;

            }


            if (difference > 0) {

                showTestimonial(
                    testimonialIndex + 1
                );

            } else {

                showTestimonial(
                    testimonialIndex - 1
                );

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   KEYBOARD HERO SLIDER
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "ArrowRight"
        ) {

            nextHeroSlide();

            restartHeroAutoPlay();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousHeroSlide();

            restartHeroAutoPlay();

        }

    }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById(
        "currentYear"
    );

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    href === "#" ||
                    href === ""
                ) {

                    event.preventDefault();

                    return;

                }


                const target =
                    document.querySelector(
                        href
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   PROJECT CARD DRAG / SWIPE
========================================================= */

let projectTouchStartX = 0;

let projectTouchEndX = 0;


const projectsWindow =
    document.getElementById(
        "projectsWindow"
    );


if (projectsWindow) {

    projectsWindow.addEventListener(
        "touchstart",
        event => {

            projectTouchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    projectsWindow.addEventListener(
        "touchend",
        event => {

            projectTouchEndX =
                event.changedTouches[0].screenX;


            const difference =
                projectTouchStartX -
                projectTouchEndX;


            if (
                Math.abs(difference) < 50
            ) {

                return;

            }


            if (difference > 0) {

                projectNext.click();

            } else {

                projectPrev.click();

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            clearInterval(
                heroTimer
            );

        } else {

            restartHeroAutoPlay();

        }

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateProjectSlider();

        showHeroSlide(0);

        showTestimonial(0);

    }
);