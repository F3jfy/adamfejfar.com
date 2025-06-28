document.addEventListener('DOMContentLoaded', () => {
    const bubble = document.querySelector('.bubble-follow');
    const hero = document.querySelector('.hero'); // Get the parent container

    // Ensure bubble and hero elements exist before trying to manipulate them
    if (!bubble || !hero) {
        console.warn('Bubble or hero element not found. Skipping animation.');
        return;
    }

    // Cache dimensions that don't change often
    // These will store the width and height of the hero container and the bubble itself.
    let heroWidth, heroHeight;
    let bubbleWidth, bubbleHeight;

    // Function to update dimensions. This will be called on initial load and when the window resizes.
    const updateDimensions = () => {
        const heroRect = hero.getBoundingClientRect();
        heroWidth = heroRect.width;
        heroHeight = heroRect.height;

        // Using offsetWidth/offsetHeight as they reflect the actual rendered size,
        // which is what's needed for calculating boundaries.
        bubbleWidth = bubble.offsetWidth;
        bubbleHeight = bubble.offsetHeight;
    };

    // Function to set a new random position for the bubble
    function setRandomPosition() {
        // Calculate the maximum X and Y coordinates the bubble can move to
        // while staying fully inside the hero container.
        // We subtract the bubble's dimensions from the hero's.
        const maxX = heroWidth - bubbleWidth;
        const maxY = heroHeight - bubbleHeight;

        // Basic check to prevent issues if the hero container becomes smaller than the bubble.
        // In such a case, setting random coordinates might push the bubble completely out.
        if (maxX < 0 || maxY < 0) {
            // If the container is too small, we can't properly calculate random positions.
            // A common fallback is to just center the bubble or keep it in place.
            // Here, we center it using fixed 50% values (which the CSS translate(-50%,-50%) handles).
            bubble.style.transform = `translate(50%, 50%) translate(-50%, -50%)`;
            // Still apply random opacity for some visual effect
            bubble.style.opacity = 0.2 + Math.random() * 0.3;
            // Log a warning for debugging purposes
            console.warn('Hero container is smaller than bubble. Bubble positioning might be constrained.');
            return; // Exit the function as valid random positions can't be calculated.
        }

        // Generate random X and Y coordinates within the calculated bounds.
        // We add half the bubble's width/height because the CSS `transform: translate(-50%, -50%)`
        // centers the bubble around the point we provide. So, if we want the top-left of the
        // bubble's *content box* to be at `randomX, randomY`, we need to effectively
        // set the transform origin to `randomX + halfWidth, randomY + halfHeight`.
        const randomX = Math.random() * maxX + (bubbleWidth / 2);
        const randomY = Math.random() * maxY + (bubbleHeight / 2);

        // Apply the new position using the `transform` CSS property.
        // This is highly optimized by browsers as it can often be handled by the GPU.
        bubble.style.transform = `translate(${randomX}px, ${randomY}px) translate(-50%, -50%)`;

        // Apply a random opacity. This is also an efficient CSS property to animate.
        bubble.style.opacity = 0.2 + Math.random() * 0.3; // Random opacity between 0.2 and 0.5
    }

    // --- Execution Flow ---

    // 1. Initial setup: Update dimensions immediately when the script runs.
    updateDimensions();

    // 2. Set the bubble's initial position for the first time.
    setRandomPosition();

    // 3. Re-update dimensions whenever the browser window is resized.
    // This keeps the bubble within the hero's bounds if the page layout changes.
    window.addEventListener('resize', updateDimensions);

    // 4. Set up the continuous movement.
    // `setInterval` will call `setRandomPosition` repeatedly.
    // The current interval of 4000ms (4 seconds) is very low frequency,
    // making it very light on the CPU.
    setInterval(setRandomPosition, 4000);
});