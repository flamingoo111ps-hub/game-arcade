/* ===================================
   GAME ARCADE - ADVANCED ENHANCEMENTS
   Audio, Particles, and Visual Effects
   =================================== */

/**
 * Advanced Sound Manager
 * Handles all sound effects and background music
 */
class SoundManager {
    constructor(scene) {
        this.scene = scene;
        this.soundEnabled = StorageManager.loadSettings().soundEnabled;
        this.volume = StorageManager.loadSettings().volume;
        this.sounds = {};
    }
    
    /**
     * Initialize sounds for the scene
     */
    init() {
        // Note: Add actual sound files to static/sounds/
        // For now, use Web Audio API procedural sounds
        this.createProceduralSounds();
    }
    
    /**
     * Create procedural sounds using Web Audio API
     */
    createProceduralSounds() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.audioContext = audioContext;
        } catch (e) {
            console.log('Web Audio API not available');
        }
    }
    
    /**
     * Play sound effect
     */
    play(soundKey, options = {}) {
        if (!this.soundEnabled) return;
        
        try {
            // Placeholder for actual sound playback
            console.log(`Playing sound: ${soundKey}`, options);
        } catch (e) {
            console.error('Sound playback error:', e);
        }
    }
    
    /**
     * Create beep sound with Web Audio
     */
    beep(frequency = 440, duration = 100, type = 'sine') {
        if (!this.audioContext || !this.soundEnabled) return;
        
        try {
            const now = this.audioContext.currentTime;
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            
            osc.frequency.value = frequency;
            osc.type = type;
            
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);
            
            osc.start(now);
            osc.stop(now + duration / 1000);
        } catch (e) {
            console.log('Beep failed:', e);
        }
    }
    
    /**
     * Play combo sound
     */
    playCombo() {
        this.beep(523, 100); // C5
        setTimeout(() => this.beep(659, 100), 100); // E5
        setTimeout(() => this.beep(784, 150), 200); // G5
    }
    
    /**
     * Toggle sound
     */
    toggle() {
        this.soundEnabled = !this.soundEnabled;
        StorageManager.saveSettings({
            soundEnabled: this.soundEnabled,
            volume: this.volume
        });
    }
}

/**
 * Advanced Particle System
 * Creates and manages visual particle effects
 */
class ParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.particles = [];
    }
    
    /**
     * Create explosion effect
     */
    explosion(x, y, color, intensity = 1) {
        const count = Math.floor(20 * intensity);
        const speed = 200 * intensity;
        
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const velocity = {
                x: Math.cos(angle) * speed * (0.5 + Math.random()),
                y: Math.sin(angle) * speed * (0.5 + Math.random())
            };
            
            const particle = this.scene.add.circle(x, y, 4, color);
            this.scene.physics.world.enable(particle);
            particle.body.setVelocity(velocity.x, velocity.y);
            particle.body.setDrag(0.95);
            
            this.scene.tweens.add({
                targets: particle,
                alpha: 0,
                scaleX: 0,
                scaleY: 0,
                duration: 600 + Math.random() * 200,
                ease: 'Cubic.easeOut',
                onComplete: () => {
                    particle.destroy();
                }
            });
            
            this.particles.push(particle);
        }
    }
    
    /**
     * Create magic sparkle effect
     */
    sparkles(x, y, color, count = 10) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100;
            
            const particle = this.scene.add.star(x, y, 5, 2, 5, color);
            particle.setOrigin(0.5);
            
            const targetX = x + Math.cos(angle) * distance;
            const targetY = y + Math.sin(angle) * distance;
            
            this.scene.tweens.add({
                targets: particle,
                x: targetX,
                y: targetY,
                alpha: 0,
                scaleX: 0.2,
                scaleY: 0.2,
                duration: 800 + Math.random() * 400,
                ease: 'Cubic.easeOut',
                onComplete: () => {
                    particle.destroy();
                }
            });
            
            this.particles.push(particle);
        }
    }
    
    /**
     * Create trail effect
     */
    trail(x, y, color, size = 8, lifetime = 300) {
        const particle = this.scene.add.circle(x, y, size, color);
        particle.alpha = 0.6;
        
        this.scene.tweens.add({
            targets: particle,
            alpha: 0,
            duration: lifetime,
            onComplete: () => {
                particle.destroy();
            }
        });
        
        this.particles.push(particle);
    }
    
    /**
     * Create combo text effect
     */
    comboText(x, y, text, color) {
        const displayText = this.scene.add.text(x, y, text, {
            font: 'bold 48px Arial',
            fill: color,
            stroke: '#000000',
            strokeThickness: 4
        });
        displayText.setOrigin(0.5);
        displayText.setScale(0);
        
        this.scene.tweens.add({
            targets: displayText,
            scale: 1,
            duration: 200,
            ease: 'Back.easeOut'
        });
        
        this.scene.tweens.add({
            targets: displayText,
            y: y - 100,
            alpha: 0,
            duration: 1000,
            delay: 300,
            ease: 'Cubic.easeIn',
            onComplete: () => {
                displayText.destroy();
            }
        });
    }
    
    /**
     * Cleanup all particles
     */
    clear() {
        this.particles.forEach(p => {
            if (p && p.active) p.destroy();
        });
        this.particles = [];
    }
}

/**
 * Screen Effects Manager
 * Handles screen shake, flash, and other effects
 */
class ScreenEffects {
    constructor(scene) {
        this.scene = scene;
        this.camera = scene.cameras.main;
    }
    
    /**
     * Screen shake effect
     */
    shake(intensity = 5, duration = 100) {
        this.camera.shake(duration, 0.01 * intensity);
    }
    
    /**
     * Screen flash effect
     */
    flash(color = 0xFFFFFF, duration = 200) {
        this.camera.flash(duration, ...Phaser.Display.Color.IntegerToRGB(color));
    }
    
    /**
     * Screen fade out
     */
    fadeOut(duration = 500) {
        return new Promise(resolve => {
            this.camera.fadeOut(duration, 0, 0, 0);
            this.scene.time.delayedCall(duration, resolve);
        });
    }
    
    /**
     * Screen fade in
     */
    fadeIn(duration = 500) {
        this.camera.fadeIn(duration, 0, 0, 0);
    }
    
    /**
     * Zoom effect
     */
    zoom(factor = 1.2, duration = 300) {
        this.scene.tweens.add({
            targets: this.camera,
            zoom: factor,
            duration: duration,
            ease: 'Cubic.easeOut',
            yoyo: true,
            hold: 100
        });
    }
    
    /**
     * Panic effect (rapid shake)
     */
    panic(duration = 500) {
        const camera = this.camera;
        const originalX = camera.x;
        const originalY = camera.y;
        
        for (let i = 0; i < 10; i++) {
            this.scene.time.delayedCall(i * 50, () => {
                camera.x = originalX + GameUtils.randomInt(-10, 10);
                camera.y = originalY + GameUtils.randomInt(-10, 10);
            });
        }
        
        this.scene.time.delayedCall(duration, () => {
            camera.x = originalX;
            camera.y = originalY;
        });
    }
}

/**
 * Animation Helper
 * Predefined animation sequences
 */
class AnimationHelper {
    /**
     * Pulse animation
     */
    static pulse(scene, target, duration = 300) {
        scene.tweens.add({
            targets: target,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: duration / 2,
            ease: 'Cubic.easeOut',
            yoyo: true
        });
    }
    
    /**
     * Bounce animation
     */
    static bounce(scene, target, height = 50, duration = 400) {
        const startY = target.y;
        scene.tweens.add({
            targets: target,
            y: startY - height,
            duration: duration / 2,
            ease: 'Cubic.easeOut',
            yoyo: true,
            hold: 0
        });
    }
    
    /**
     * Spin animation
     */
    static spin(scene, target, rotations = 1, duration = 500) {
        scene.tweens.add({
            targets: target,
            rotation: Math.PI * 2 * rotations,
            duration: duration,
            ease: 'Cubic.easeInOut'
        });
    }
    
    /**
     * Pop animation
     */
    static pop(scene, target, duration = 300) {
        target.setScale(0);
        target.setAlpha(0);
        
        scene.tweens.add({
            targets: target,
            scale: 1,
            alpha: 1,
            duration: duration,
            ease: 'Back.easeOut'
        });
    }
    
    /**
     * Float animation
     */
    static float(scene, target, distance = 20, duration = 2000) {
        const startY = target.y;
        scene.tweens.add({
            targets: target,
            y: startY - distance,
            duration: duration,
            ease: 'Sine.easeInOut',
            yoyo: true,
            loop: -1
        });
    }
    
    /**
     * Wiggle animation
     */
    static wiggle(scene, target, amount = 5, duration = 300) {
        const startX = target.x;
        
        scene.tweens.add({
            targets: target,
            x: startX + amount,
            duration: duration / 4,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: 3
        });
    }
}

/**
 * Victory Manager
 * Handles victory animations and screen
 */
class VictoryManager {
    static showVictory(scene, duration = 1500) {
        const centerX = scene.scale.width / 2;
        const centerY = scene.scale.height / 2;
        
        // Overlay
        const overlay = scene.add.rectangle(
            centerX,
            centerY,
            scene.scale.width,
            scene.scale.height,
            0x000000,
            0.7
        );
        
        // Victory text
        const victoryText = scene.add.text(
            centerX,
            centerY - 100,
            'VICTORY!',
            {
                font: 'bold 80px Arial',
                fill: '#FFD60A',
                stroke: '#FF006E',
                strokeThickness: 4
            }
        );
        victoryText.setOrigin(0.5);
        victoryText.setScale(0);
        
        // Animate in
        scene.tweens.add({
            targets: victoryText,
            scale: 1,
            duration: 500,
            ease: 'Back.easeOut'
        });
        
        // Confetti effect
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const x = centerX + GameUtils.randomInt(-300, 300);
                const y = centerY + GameUtils.randomInt(-300, 300);
                const confetti = scene.add.rectangle(
                    centerX,
                    centerY - 300,
                    GameUtils.randomInt(5, 15),
                    GameUtils.randomInt(5, 15),
                    [0xFF006E, 0x00D9FF, 0xFFB703, 0x06D6A0][GameUtils.randomInt(0, 3)]
                );
                
                scene.tweens.add({
                    targets: confetti,
                    x: x,
                    y: y,
                    alpha: 0,
                    rotation: Math.PI * 2,
                    duration: 1500,
                    ease: 'Cubic.easeIn',
                    onComplete: () => {
                        confetti.destroy();
                    }
                });
            }, i * 30);
        }
        
        return new Promise(resolve => {
            scene.time.delayedCall(duration, () => {
                overlay.destroy();
                victoryText.destroy();
                resolve();
            });
        });
    }
}

/**
 * Difficulty Manager
 * Handles difficulty progression and adjustments
 */
class DifficultyManager {
    constructor(initialDifficulty = 'normal') {
        this.difficulty = initialDifficulty;
        this.modifiers = this.getModifiers();
    }
    
    /**
     * Get difficulty modifiers
     */
    getModifiers() {
        const modifiers = {
            easy: {
                enemyHealth: 0.7,
                enemyDamage: 0.6,
                playerDamage: 1.3,
                scoreMultiplier: 0.8,
                spawnRate: 0.7
            },
            normal: {
                enemyHealth: 1.0,
                enemyDamage: 1.0,
                playerDamage: 1.0,
                scoreMultiplier: 1.0,
                spawnRate: 1.0
            },
            hard: {
                enemyHealth: 1.5,
                enemyDamage: 1.5,
                playerDamage: 0.8,
                scoreMultiplier: 1.5,
                spawnRate: 1.3
            },
            insane: {
                enemyHealth: 2.0,
                enemyDamage: 2.0,
                playerDamage: 0.6,
                scoreMultiplier: 2.0,
                spawnRate: 1.6
            }
        };
        
        return modifiers[this.difficulty] || modifiers.normal;
    }
    
    /**
     * Set difficulty
     */
    setDifficulty(difficulty) {
        if (this.getModifiers[difficulty]) {
            this.difficulty = difficulty;
            this.modifiers = this.getModifiers();
            StorageManager.saveSettings({ difficulty });
        }
    }
    
    /**
     * Get modifier value
     */
    get(key) {
        return this.modifiers[key] || 1.0;
    }
}

/**
 * Achievement System
 * Tracks and manages player achievements
 */
class AchievementSystem {
    constructor() {
        this.achievements = {
            'first_blood': { name: 'First Blood', description: 'Win your first game', unlocked: false },
            'combo_master': { name: 'Combo Master', description: 'Reach 10x combo', unlocked: false },
            'speed_runner': { name: 'Speed Runner', description: 'Complete level in under 30s', unlocked: false },
            'high_roller': { name: 'High Roller', description: 'Earn 10,000 points', unlocked: false },
            'perfect_game': { name: 'Perfect Game', description: 'Complete level without taking damage', unlocked: false },
            'collector': { name: 'Collector', description: 'Collect 100 coins', unlocked: false },
            'unstoppable': { name: 'Unstoppable', description: 'Reach 50x combo', unlocked: false },
            'legend': { name: 'Legend', description: 'Score 100,000 points', unlocked: false }
        };
        
        this.load();
    }
    
    /**
     * Check and unlock achievement
     */
    unlock(achievementId) {
        if (this.achievements[achievementId] && !this.achievements[achievementId].unlocked) {
            this.achievements[achievementId].unlocked = true;
            this.save();
            this.showNotification(this.achievements[achievementId]);
            return true;
        }
        return false;
    }
    
    /**
     * Show achievement notification
     */
    showNotification(achievement) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #FF006E, #00D9FF);
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 0 30px rgba(255, 0, 110, 0.5);
        `;
        notification.innerHTML = `
            <div style="font-size: 12px; opacity: 0.8;">ACHIEVEMENT UNLOCKED</div>
            <div style="font-size: 18px;">${achievement.name}</div>
            <div style="font-size: 12px; opacity: 0.8; margin-top: 5px;">${achievement.description}</div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    /**
     * Save achievements
     */
    save() {
        StorageManager.save('achievements', this.achievements);
    }
    
    /**
     * Load achievements
     */
    load() {
        const saved = StorageManager.load('achievements', {});
        Object.assign(this.achievements, saved);
    }
    
    /**
     * Get progress
     */
    getProgress() {
        const total = Object.keys(this.achievements).length;
        const unlocked = Object.values(this.achievements).filter(a => a.unlocked).length;
        return { unlocked, total, percentage: Math.round((unlocked / total) * 100) };
    }
}
