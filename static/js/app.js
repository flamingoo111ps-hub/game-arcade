/* ===================================
   GAME ARCADE - MAIN APPLICATION
   Entry point and initialization
   =================================== */

class GameArcade {
    constructor() {
        this.initialized = false;
    }
    
    /**
     * Initialize the application
     */
    init() {
        if (this.initialized) return;
        
        console.log('🎮 Game Arcade initializing...');
        
        // Initialize managers
        uiManager.init();
        MenuPreviews.init();
        
        // Setup background animation
        this.setupBackgroundAnimation();
        
        // Load settings
        const settings = StorageManager.loadSettings();
        console.log('⚙️ Settings loaded:', settings);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('App hidden');
            } else {
                console.log('App visible');
            }
        });
        
        // Prevent default touch behaviors for better mobile experience
        document.addEventListener('touchmove', (e) => {
            if (e.target.closest('.game-container')) {
                e.preventDefault();
            }
        }, { passive: false });
        
        this.initialized = true;
        console.log('✨ Game Arcade ready!');
    }
    
    /**
     * Setup animated background
     */
    setupBackgroundAnimation() {
        const canvas = document.getElementById('background-animation');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        let animationId;
        let particles = [];
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        const animate = () => {
            ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle
                ctx.fillStyle = `rgba(0, 217, 255, ${particle.opacity})`;
                ctx.fillRect(
                    particle.x,
                    particle.y,
                    particle.size,
                    particle.size
                );
            });
            
            animationId = requestAnimationFrame(animate);
        };
        
        animate();
        
        // Handle canvas resize
        window.addEventListener('resize', () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        });
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        console.log(`Resized to ${width}x${height}`);
        
        // Update global config
        GAME_CONFIG.RESOLUTION.WIDTH = width;
        GAME_CONFIG.RESOLUTION.HEIGHT = height;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const gameArcade = new GameArcade();
        gameArcade.init();
    });
} else {
    const gameArcade = new GameArcade();
    gameArcade.init();
}
