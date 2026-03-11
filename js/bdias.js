// ===============================
// BDIAS Custom JS (CHARUSAT style)
// ===============================
(function () {
    "use strict";

    // HERO SLIDER (simple auto-rotate)
    function initHeroSlider() {
        var slides = document.querySelectorAll('.hero-slide');
        if (!slides.length) return;

        var current = 0;
        var total = slides.length;

        function showSlide(index) {
            slides[current].classList.remove('active');
            current = index;
            slides[current].classList.add('active');
        }

        setInterval(function () {
            var next = (current + 1) % total;
            showSlide(next);
        }, 6000);
    }

    // COUNTER ANIMATION (Eye Screening scalars)
    function initCounters() {
        var counters = document.querySelectorAll('.counter');
        if (!counters.length) return;

        function animateCounter(el) {
            var target = parseInt(el.textContent.replace(/[^0-9]/g, ''), 10);
            if (isNaN(target)) return;

            var duration = 1500;
            var start = 0;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = timestamp - startTime;
                var ratio = Math.min(progress / duration, 1);
                var value = Math.floor(ratio * target);
                el.textContent = value;
                if (ratio < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    el.textContent = target;
                }
            }

            window.requestAnimationFrame(step);
        }

        // Use IntersectionObserver to trigger once visible
        if ("IntersectionObserver" in window) {
            var observer = new IntersectionObserver(function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            }, {threshold: 0.4});

            counters.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            // Fallback: animate immediately
            counters.forEach(animateCounter);
        }
    }

    // ANNOUNCEMENT MODAL
    function initAnnouncementModal($) {
        var $modal = $('#modal-ann');
        if (!$modal.length) return;

        // Show on page load
        $modal.fadeIn(300);

        // Hide when clicking outside image
        $(document).on('click', function (e) {
            if (!$(e.target).closest('.modal-content-ann img').length) {
                $modal.fadeOut(200);
            }
        });
    }

    // SMOOTH SCROLL FOR NAV ANCHORS
    function initSmoothScroll($) {
        $('a[data-scroll][href^="#"]').on('click', function (e) {
            var targetId = $(this).attr('href');
            if (!targetId || targetId === '#') return;

            var $target = $(targetId);
            if ($target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: $target.offset().top - 80
                }, 600);
            }
        });
    }

    // VIDEO POPUP (simple: open in new window/tab)
    function initVideoLinks($) {
        $('.video-iframe').on('click', function (e) {
            e.preventDefault();
            var url = $(this).attr('href');
            window.open(url, '_blank');
        });
    }

    // DOC READY
    $(function () {
        initHeroSlider();
        initCounters();
        initAnnouncementModal($);
        initSmoothScroll($);
        initVideoLinks($);
    });

})();
