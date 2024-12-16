// Snowflake settings
const snowCanvas = document.getElementById('snowCanvas'); // Reference to the canvas container for snowflakes
const totalSnowflakes = 50; // Total number of snowflakes to generate
const maxSize = 2; // Maximum size of snowflakes (in viewport width, vw)
const snowflakeImageURL = 'snowcorn.png'; // Path to the custom snowflake image (fallback to circles if unavailable)

/**
 * Checks if the custom snowflake image is available.
 * @param {string} url - URL or path to the image.
 * @returns {Promise<boolean>} - Resolves to true if the image is available, false otherwise.
 */
function isImageAvailable(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true); // Resolve true if the image loads successfully
    img.onerror = () => resolve(false); // Resolve false if there is an error loading the image
    img.src = url;
  });
}

/**
 * Dynamically generates snowflakes and appends them to the canvas.
 * Uses a custom image if available; otherwise, falls back to white circles.
 */
async function generateSnowflakes() {
  const useImage = await isImageAvailable(snowflakeImageURL); // Check if the custom snowflake image is available

  for (let i = 0; i < totalSnowflakes; i++) {
    const snowflake = document.createElement('div'); // Create a snowflake element
    snowflake.classList.add('snowflake');

    // Generate random properties for the snowflake
    const size = Math.random() * (maxSize - 1) + 1; // Random size between 1vw and maxSize
    const xInitial = Math.random() * 100 - 50; // Initial horizontal position (off-screen)
    const xFinal = Math.random() * 100 - 50; // Final horizontal position after falling
    const animationDuration = Math.random() * 10 + 5; // Random animation duration (5s to 15s)
    const delay = Math.random() * 5; // Random animation delay (0s to 5s)

    // Set snowflake styles
    snowflake.style.width = `${size}vw`; // Snowflake width
    snowflake.style.height = `${size}vw`; // Snowflake height
    snowflake.style.left = `${Math.random() * 100}vw`; // Initial horizontal position
    snowflake.style.animationDuration = `${animationDuration}s`; // Animation speed
    snowflake.style.animationDelay = `${delay}s`; // Delay before animation starts
    snowflake.style.setProperty('--x-initial', `${xInitial}vw`); // CSS variable for starting horizontal position
    snowflake.style.setProperty('--x-final', `${xFinal}vw`); // CSS variable for ending horizontal position

    // Apply styling based on whether the custom image is available
    if (useImage) {
      snowflake.style.backgroundImage = `url(${snowflakeImageURL})`; // Use the custom snowflake image
      snowflake.style.backgroundSize = 'contain'; // Ensure the image fits the element
      snowflake.style.backgroundRepeat = 'no-repeat'; // Prevent tiling
      snowflake.style.backgroundColor = 'transparent'; // No background color
    } else {
      snowflake.style.backgroundColor = 'white'; // Fallback to a white circle
      snowflake.style.borderRadius = '50%'; // Make the fallback a circle
    }

    // Append the snowflake to the canvas
    snowCanvas.appendChild(snowflake);
  }
}

// Slideshow functionality
const slides = document.querySelectorAll('.slideshow-image'); // Get all slideshow images
let currentSlide = 0; // Index of the currently displayed slide

/**
 * Shows the slide at the given index and hides others.
 * @param {number} index - Index of the slide to show.
 */
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index); // Activate the selected slide, deactivate others
  });
}

/**
 * Advances to the next slide in the slideshow.
 */
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length; // Move to the next slide, looping back to the start
  showSlide(currentSlide);
}

// Initialize snowflakes and slideshow
generateSnowflakes(); // Create and display the snowflakes
showSlide(currentSlide); // Show the initial slide
setInterval(nextSlide, 4000); // Change slide every 4 seconds
