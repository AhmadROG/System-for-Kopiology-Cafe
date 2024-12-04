// test js jadi or xjadi
document.addEventListener("DOMContentLoaded", () => {
    // Function to adjust font size based on screen width
    function adjustFontSize() {
        const baseFontSize = 16; // Default font size in px
        const screenWidth = window.innerWidth;
        document.body.style.fontSize = screenWidth < 768 ? `${baseFontSize * 0.9}px` : `${baseFontSize}px`;
    }

    // height utk phone
    function fixVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    // detect phone web
    function detectMobile() {
        const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
        if (isMobile) {
            console.log("Mobile device detected");
            document.body.style.padding = "1rem"; // Example adjustment for mobile
        }
    }

    // Smooth scrolling 
    function enableSmoothScroll() {
        document.querySelectorAll("a[href^='#']").forEach(anchor => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute("href")).scrollIntoView({
                    behavior: "smooth",
                });
            });
        });
    }

    // Prevent gesture scaling (pinch-to-zoom)
    function preventGestureScaling() {
        document.addEventListener("gesturestart", (e) => e.preventDefault());
        document.addEventListener("touchmove", (e) => {
            if (e.scale !== 1) e.preventDefault();
        });
    }

    // Check and add a viewport meta tag if missing
    function addViewportMetaTag() {
        if (!document.querySelector("meta[name='viewport']")) {
            const metaTag = document.createElement("meta");
            metaTag.name = "viewport";
            metaTag.content = "width=device-width, initial-scale=1.0";
            document.head.appendChild(metaTag);
        }
    }

    // Initialize all functionalities
    function initialize() {
        adjustFontSize();
        fixVH();
        detectMobile();
        enableSmoothScroll();
        preventGestureScaling();
        addViewportMetaTag();
    }

    // Attach resize event listeners and run initialization
    window.addEventListener("resize", () => {
        adjustFontSize();
        fixVH();
    });
    initialize();
});
