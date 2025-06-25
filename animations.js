// Particle animation
document.addEventListener('DOMContentLoaded', () => {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach(particle => {
        // Animate each particle with random movement
        animateParticle(particle);
    });
});

function animateParticle(particle) {
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);
    const duration = parseFloat(particle.style.animationDuration);
    
    // Create keyframes for animation
    const keyframes = [
        { transform: `translate(0, 0)`, opacity: particle.style.opacity },
        { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`, opacity: 0 }
    ];
    
    const options = {
        duration: duration * 1000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
    };
    
    particle.animate(keyframes, options);
}

// Floating animation for category cards
function animateCards() {
    const cards = document.querySelectorAll('.category-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) rotate(1deg)';
            card.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotate(0)';
            card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateCards();
    
    // Add scroll animation to elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.category-card, .section-title');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// Background wave animation
function createWaveAnimation() {
    const wave = document.createElement('div');
    wave.className = 'wave';
    document.body.appendChild(wave);
    
    // Animate the wave
    const keyframes = [
        { transform: 'scale(0)', opacity: 1 },
        { transform: 'scale(10)', opacity: 0 }
    ];
    
    const options = {
        duration: 1000,
        fill: 'forwards'
    };
    
    wave.animate(keyframes, options).onfinish = () => {
        wave.remove();
    };
}

// Add click effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button, .nav-icons a');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            // Position the ripple
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
