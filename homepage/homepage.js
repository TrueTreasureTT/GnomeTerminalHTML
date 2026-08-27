document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.getElementById('stars');
    const starCount = 150;

    // Generate dynamic twinkling stars
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const opacity = Math.random() * 0.7 + 0.3;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.setProperty('--opacity', opacity);

        starsContainer.appendChild(star);
    }
});
