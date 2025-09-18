document.addEventListener('DOMContentLoaded', () => {
    // --- Existing Bubble Movement Script ---
    const bubble = document.querySelector('.bubble-follow');
    const hero = document.querySelector('.hero');
    let heroWidth, heroHeight;
    let bubbleWidth, bubbleHeight;

    if (bubble && hero) {
        const updateDimensions = () => {
            const heroRect = hero.getBoundingClientRect();
            heroWidth = heroRect.width;
            heroHeight = heroRect.height;
            bubbleWidth = bubble.offsetWidth;
            bubbleHeight = bubble.offsetHeight;
        };

        function setRandomPosition() {
            if (heroWidth === 0 || heroHeight === 0) {
                updateDimensions();
                if (heroWidth === 0 || heroHeight === 0) return;
            }

            const maxX = heroWidth - bubbleWidth;
            const maxY = heroHeight - bubbleHeight;

            if (maxX < 0 || maxY < 0) {
                bubble.style.transform = `translate(50%, 50%) translate(-50%, -50%)`;
                bubble.style.opacity = 0.2 + Math.random() * 0.3;
                return;
            }

            const randomX = Math.random() * maxX + (bubbleWidth / 2);
            const randomY = Math.random() * maxY + (bubbleHeight / 2);

            bubble.style.transform = `translate(${randomX}px, ${randomY}px) translate(-50%, -50%)`;
            bubble.style.opacity = 0.2 + Math.random() * 0.3;
        }

        updateDimensions();
        setRandomPosition();
        window.addEventListener('resize', updateDimensions);
        setInterval(setRandomPosition, 4000);
    }
    // --- End Existing Bubble Movement Script ---


    // --- Only Content Fade-in / Slide-up Effect (Scroll Reveal) ---
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const checkVisibility = () => {
        scrollRevealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            // Trigger when element's top is within 85% of viewport height AND element is not completely below viewport
            if (rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0) {
                element.classList.add('is-visible');
            }
            // Optional: Remove class if it scrolls out of view for re-triggering if needed
            // else if (rect.top > window.innerHeight || rect.bottom < 0) {
            //     element.classList.remove('is-visible');
            // }
        });
    };

    // Initial check on page load
    checkVisibility();

    // Attach to scroll and resize events for continuous checking
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const menu       = document.getElementById('menu');
  const topBar     = document.querySelector('.top-bar');
  const menuLinks  = document.querySelectorAll('.overlay-menu a');

  if (!menuToggle || !menu || !topBar) return; // safety

  let lastScroll = window.pageYOffset;

  const showNav = () => {
    topBar.classList.add('show');  topBar.classList.remove('hide');
    menuToggle.classList.add('show'); menuToggle.classList.remove('hide');
  };
  const hideNav = () => {
    topBar.classList.add('hide');  topBar.classList.remove('show');
    menuToggle.classList.add('hide'); menuToggle.classList.remove('show');
  };

  // start visible
  showNav();

  // toggle menu open/close
  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));

    // keep visible while open
    if (isOpen) showNav();
  });

  // close on in-page link click
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) {
        menu.classList.remove('open');
        menuToggle.classList.remove('open');
      }
    });
  });

  // hide on scroll down, show on scroll up (unless menu open)
  window.addEventListener('scroll', () => {
    const current = window.pageYOffset;

    if (menu.classList.contains('open')) {
      // menu open => keep visible
      showNav();
      lastScroll = current;
      return;
    }

    if (current <= 0) {
      showNav();
    } else if (current > lastScroll) {
      hideNav();
    } else {
      showNav();
    }

    lastScroll = current;
  });
});


