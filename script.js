/**
 * ==========================================================================
 * MAIN APPLICATION ENTRY POINT
 * ==========================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Register Plugins Immediately
    gsap.registerPlugin(ScrollTrigger);

    // 2. Start the Preloader Logic first
    // Note: Baaki site functions preloader khatam hone ke baad 'onComplete' mein chalenge.
    initPreloader(() => {
        initSmoothScroll();
        initCustomCursor();
        initDirectorAnimations();
        initTimelineScroll();
        initAudio();
        initHeroAnimations();
        // Refresh ScrollTrigger to ensure positions are correct after loader removal
        ScrollTrigger.refresh();
    });
});

/**
 * ==========================================================================
 * FUNCTION 1: CINEMATIC PRELOADER (Logic Encapsulated)
 * ==========================================================================
 */
function initPreloader(onComplete) {
    const loaderTl = gsap.timeline();
    let pageLoaded = false;
    let minTimePassed = false;

    // A. Initial Breathing Animation
    loaderTl
        .to(".loader-content", {
            opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 0.2
        })
        .to(".loader-divider", {
            width: "150px", duration: 1.5, ease: "power2.inOut"
        }, "-=0.8")
        .to(".loader-divider", {
            width: "180px", opacity: 0.7, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut"
        });

    // B. Check Logic (Wait for BOTH: Window Load & Min Time)
    const checkCompletion = () => {
        if (pageLoaded && minTimePassed) {
            finishLoader();
        }
    };

    window.addEventListener("load", () => {
        pageLoaded = true;
        checkCompletion();
    });

    setTimeout(() => {
        minTimePassed = true;
        checkCompletion();
    }, 3500); // 3.5 Seconds Minimum Wait

    // C. Exit Animation Function
    function finishLoader() {
        loaderTl.kill(); // Stop breathing animation

        const exitTl = gsap.timeline({
            onComplete: () => {
                const wrap = document.querySelector(".loader-wrap");
                if (wrap) wrap.remove();
                document.body.classList.add('is-loaded');
                
                // Run the callback function (Start main site logic)
                if (onComplete) onComplete();
            }
        });

        exitTl
            .to(".loader-divider", {
                width: "100vw", height: "2px", opacity: 1, duration: 0.8, ease: "expo.inOut"
            })
            .to(".loader-content", {
                opacity: 0, duration: 0.5, ease: "power2.out"
            }, "-=0.4")
            .to(".loader-panel-top", {
                yPercent: -100, duration: 1.5, ease: "power4.inOut"
            }, "-=0.2")
            .to(".loader-panel-bottom", {
                yPercent: 100, duration: 1.5, ease: "power4.inOut"
            }, "<");
    }
}

/**
 * ==========================================================================
 * FUNCTION 2: SMOOTH SCROLL (LENIS)
 * ==========================================================================
 */
function initSmoothScroll() {
    const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true
    });

    // GSAP ScrollTrigger integration with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

/**
 * ==========================================================================
 * FUNCTION 3: CUSTOM GLASS CURSOR
 * ==========================================================================
 */
function initCustomCursor() {
    const cursor = document.querySelector(".custom-cursor");
    const cursorText = document.querySelector(".cursor-text");

    if (cursor) {
        document.body.classList.add("use-custom-cursor");
    }

    if (!cursor || !cursorText) return;

    // Setup QuickTo for performance
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    window.addEventListener("mousemove", (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
    });

    // Helper: Update State
    const setCursorState = (text = "") => {
        if (text) {
            cursor.classList.add("active");
            cursorText.innerText = text;
        } else {
            cursor.classList.remove("active");
            cursorText.innerText = "";
        }
    };

    // Interaction Config
    const interactions = [
        { selector: ".big-text, .panel-image, .bio-img, .card-stack-wrapper", text: "VIEW" },
    ];

    interactions.forEach(({ selector, text }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.addEventListener("mouseenter", () => setCursorState(text));
            el.addEventListener("mouseleave", () => setCursorState());
        });
    });
}

/**
 * ==========================================================================
 * FUNCTION 4: DIRECTOR SECTION ANIMATIONS
 * ==========================================================================
 */
function initDirectorAnimations() {
    const sectionTrigger = {
        trigger: ".director-section",
        start: "top center",
        end: "bottom center",
        scrub: 1
    };

    // Card Animations
    gsap.to(".card-1", {
        rotation: -25, x: -60, scrollTrigger: sectionTrigger
    });
    
    gsap.to(".card-2", {
        rotation: 15, x: 60, scrollTrigger: sectionTrigger
    });

    // Text Reveal
    gsap.from(".huge-name", {
        y: 200, opacity: 0, duration: 1,
        scrollTrigger: {
            trigger: ".director-section",
            start: "top 70%",
        }
    });

    // Stats Pop-in
    gsap.from(".stat-circle", {
        scale: 0, opacity: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".stats-container",
            start: "top 80%",
        }
    });
}

/**
 * ==========================================================================
 * FUNCTION 5: TIMELINE SCROLL (Responsive)
 * ==========================================================================
 */
function initTimelineScroll() {
    const mm = gsap.matchMedia();
    const container = document.querySelector(".timeline-section");
    const sections = gsap.utils.toArray(".time-panel");
    const progressBar = document.querySelector(".progress-bar");

    if (!container || sections.length === 0) return;

    // Desktop: Horizontal Scroll
    mm.add("(min-width: 769px)", () => {
        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: container,
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
                end: () => "+=" + container.offsetWidth,
                onUpdate: (self) => {
                    if (progressBar) {
                        gsap.to(progressBar, {
                            width: self.progress * 100 + "%",
                            duration: 0.1,
                            overwrite: true
                        });
                    }
                }
            }
        });
    });

    // Mobile: Vertical Fade Up
    mm.add("(max-width: 768px)", () => {
        sections.forEach((panel) => {
            const img = panel.querySelector(".panel-image");
            if (img) {
                gsap.from(img, {
                    scale: 0.9, opacity: 0.5,
                    scrollTrigger: {
                        trigger: panel,
                        start: "top 80%",
                        end: "bottom 60%",
                        scrub: true
                    }
                });
            }
        });
    });
}

/**
 * ==========================================================================
 * FUNCTION 6: AUDIO SYSTEM
 * ==========================================================================
 */
function initAudio() {
    const bgMusic = document.getElementById("bg-music");
    const hoverSfx = document.getElementById("hover-sound");
    const clickSfx = document.getElementById("click-sound");
    const toggleBtn = document.querySelector(".sound-toggle-btn");
    
    // Agar elements nahi mile to error na aaye
    if (!toggleBtn || !bgMusic) return;

    const icon = toggleBtn.querySelector("i");
    let isPlaying = false;

    // Volume Settings (Music halka, sound effect tez)
    bgMusic.volume = 0.2; 
    if(hoverSfx) hoverSfx.volume = 0.4;
    if(clickSfx) clickSfx.volume = 0.5;

    // 1. Toggle Button Logic
    toggleBtn.addEventListener("click", () => {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                toggleBtn.classList.add("playing");
                icon.classList.remove("ri-volume-mute-line");
                icon.classList.add("ri-volume-up-line");
            }).catch(e => console.log("Audio permission needed"));
        } else {
            bgMusic.pause();
            isPlaying = false;
            toggleBtn.classList.remove("playing");
            icon.classList.remove("ri-volume-up-line");
            icon.classList.add("ri-volume-mute-line");
        }
    });

    // 2. Hover & Click Sounds
    const interactiveElements = document.querySelectorAll("a, button, .card, .panel-image");
    
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            if (isPlaying && hoverSfx) {
                hoverSfx.currentTime = 0;
                hoverSfx.play().catch(() => {});
            }
        });
        
        el.addEventListener("click", () => {
            if (isPlaying && clickSfx) {
                clickSfx.currentTime = 0;
                clickSfx.play().catch(() => {});
            }
        });
    });
}
/**
 * ==========================================================================
 * FUNCTION 7: HERO TEXT ANIMATION (Letter Stagger)
 * ==========================================================================
 */
function initHeroAnimations() {
    const bigText = document.querySelector(".big-text");
    if (!bigText) return;

    const textContent = bigText.textContent;
    const splitText = textContent.split("");
    bigText.innerHTML = "";
    
    splitText.forEach(char => {
        const content = char === " " ? "&nbsp;" : char;
        bigText.innerHTML += `<span>${content}</span>`;
    });

    gsap.from(".big-text span", {
        yPercent: 120,
        rotationX: -90,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "back.out(1.7)"
    });
}