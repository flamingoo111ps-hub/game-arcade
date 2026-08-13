/* ===================================
   GAME ARCADE - UTILITIES
   Helper functions and utilities
   =================================== */

/**
 * Utility Functions Library
 */
const GameUtils = {
    /**
     * Generate random integer between min and max
     */
    randomInt: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    /**
     * Generate random float between min and max
     */
    randomFloat: (min, max) => {
        return Math.random() * (max - min) + min;
    },
    
    /**
     * Get random element from array
     */
    randomArrayElement: (array) => {
        return array[Math.floor(Math.random() * array.length)];
    },
    
    /**
     * Shuffle array using Fisher-Yates algorithm
     */
    shuffleArray: (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    /**
     * Format number with K, M suffixes
     */
    formatNumber: (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    },
    
    /**
     * Clamp value between min and max
     */
    clamp: (value, min, max) => {
        return Math.max(min, Math.min(max, value));
    },
    
    /**
     * Lerp between two values
     */
    lerp: (start, end, factor) => {
        return start + (end - start) * factor;
    },
    
    /**
     * Get distance between two points
     */
    distance: (x1, y1, x2, y2) => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    },
    
    /**
     * Check if point is inside circle
     */
    isPointInCircle: (px, py, cx, cy, radius) => {
        const dx = px - cx;
        const dy = py - cy;
        return dx * dx + dy * dy <= radius * radius;
    },
    
    /**
     * Check if point is inside rectangle
     */
    isPointInRect: (px, py, x, y, width, height) => {
        return px >= x && px <= x + width && py >= y && py <= y + height;
    },
    
    /**
     * Get angle between two points in radians
     */
    getAngle: (x1, y1, x2, y2) => {
        return Math.atan2(y2 - y1, x2 - x1);
    },
    
    /**
     * Convert degrees to radians
     */
    degToRad: (degrees) => {
        return degrees * (Math.PI / 180);
    },
    
    /**
     * Convert radians to degrees
     */
    radToDeg: (radians) => {
        return radians * (180 / Math.PI);
    },
    
    /**
     * Delay execution with promise
     */
    delay: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    /**
     * Create color from RGB
     */
    rgbToHex: (r, g, b) => {
        return '0x' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('').toUpperCase();
    },
    
    /**
     * Lerp color between two hex colors
     */
    lerpColor: (color1, color2, factor) => {
        const c1 = Phaser.Display.Color.IntegerToColor(color1);
        const c2 = Phaser.Display.Color.IntegerToColor(color2);
        return Phaser.Display.Color.RGBToString(
            Math.round(c1.r + (c2.r - c1.r) * factor),
            Math.round(c1.g + (c2.g - c1.g) * factor),
            Math.round(c1.b + (c2.b - c1.b) * factor)
        );
    },
    
    /**
     * Easing functions
     */
    easing: {
        easeInQuad: (t) => t * t,
        easeOutQuad: (t) => t * (2 - t),
        easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        easeInCubic: (t) => t * t * t,
        easeOutCubic: (t) => (--t) * t * t + 1,
        easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * (t - 2)) * (2 * (t - 2)) + 1,
        easeInQuart: (t) => t * t * t * t,
        easeOutQuart: (t) => 1 - (--t) * t * t * t,
        easeInQuint: (t) => t * t * t * t * t,
        easeOutQuint: (t) => 1 + (--t) * t * t * t * t
    },
    
    /**
     * Create screen shake effect
     */
    screenShake: (scene, intensity = 5, duration = 100) => {
        const camera = scene.cameras.main;
        scene.time.delayedCall(duration, () => {
            camera.shake(duration, 0.01 * intensity);
        });
    },
    
    /**
     * Play floating text animation
     */
    floatingText: (scene, x, y, text, color, duration = 1000) => {
        const floatingText = scene.add.text(x, y, text, {
            fontSize: '24px',
            fill: color,
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold'
        });
        floatingText.setOrigin(0.5);
        
        scene.tweens.add({
            targets: floatingText,
            y: y - 80,
            alpha: 0,
            duration: duration,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                floatingText.destroy();
            }
        });
    },
    
    /**
     * Create particle burst effect
     */
    particleBurst: (scene, x, y, color, count = 10) => {
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const velocity = {
                x: Math.cos(angle) * GameUtils.randomInt(200, 300),
                y: Math.sin(angle) * GameUtils.randomInt(200, 300)
            };
            
            const particle = scene.add.circle(x, y, 5, color);
            scene.physics.world.enable(particle);
            particle.body.setVelocity(velocity.x, velocity.y);
            
            scene.tweens.add({
                targets: particle,
                alpha: 0,
                duration: 600,
                ease: 'Cubic.easeOut',
                onComplete: () => {
                    particle.destroy();
                }
            });
        }
    },
    
    /**
     * Play sound with fallback for Web Audio API
     */
    playSound: (scene, soundKey, volume = 1, rate = 1) => {
        try {
            if (scene.sound.get(soundKey)) {
                scene.sound.play(soundKey, { volume, rate });
            }
        } catch (e) {
            console.log('Sound unavailable:', soundKey);
        }
    },
    
    /**
     * Format time MM:SS
     */
    formatTime: (milliseconds) => {
        const seconds = Math.floor((milliseconds / 1000) % 60);
        const minutes = Math.floor((milliseconds / 60000) % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    
    /**
     * Check if mobile device
     */
    isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    /**
     * Get device orientation
     */
    getOrientation: () => {
        return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    },
    
    /**
     * Request fullscreen
     */
    requestFullscreen: (element) => {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
    },
    
    /**
     * Exit fullscreen
     */
    exitFullscreen: () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    }
};
