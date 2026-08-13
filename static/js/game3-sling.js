/* ===================================
   GAME 3: SLING BOMB BLOCKS
   Physics-based destruction puzzle
   =================================== */

class Game3SlingBomb extends Phaser.Scene {
    constructor() {
        super({ key: 'Game3SlingBomb' });
        this.score = 0;
        this.shotsRemaining = 5;
        this.level = 1;
        this.combo = 0;
        this.maxCombo = 0;
        this.gameOver = false;
        this.isPaused = false;
        this.isDragging = false;
        this.blocks = [];
        this.enemies = [];
    }
    
    create() {
        this.createBackground();
        this.createSlingshot();
        this.createUI();
        this.createLevel();
        this.setupInput();
        this.setupPhysics();
        this.setupEventListeners();
        
        console.log('✨ Game3: Sling Bomb Blocks created');
    }
    
    createBackground() {
        this.add.rectangle(
            0,
            0,
            this.scale.width,
            this.scale.height,
            0x0a0e27
        ).setOrigin(0, 0);
    }
    
    createSlingshot() {
        const slingshotX = this.scale.width * 0.1;
        const slingshotY = this.scale.height * 0.8;
        
        // Slingshot body
        this.slingshotBase = this.add.circle(slingshotX, slingshotY, 20, 0x8B4513);
        this.physics.add.existing(this.slingshotBase, true);
        
        // Elastic bands
        this.elasticLeft = this.add.line(
            slingshotX - 15,
            slingshotY - 20,
            slingshotX - 15,
            slingshotY - 20,
            slingshotX + 10,
            slingshotY - 40,
            0xFF0000
        );
        this.elasticLeft.setLineWidth(4);
        
        this.elasticRight = this.add.line(
            slingshotX + 15,
            slingshotY - 20,
            slingshotX + 15,
            slingshotY - 20,
            slingshotX + 10,
            slingshotY - 40,
            0xFF0000
        );
        this.elasticRight.setLineWidth(4);
        
        // Projectile
        this.projectile = this.add.circle(slingshotX + 10, slingshotY - 40, 12, 0xFFB703);
        this.physics.add.existing(this.projectile);
        this.projectile.body.setCollideWorldBounds(true);
        this.projectile.body.setBounce(0.8);
        this.projectile.launched = false;
        
        this.slingshotPos = { x: slingshotX, y: slingshotY };
        this.projectileStartPos = { x: slingshotX + 10, y: slingshotY - 40 };
    }
    
    createUI() {
        this.scoreText = this.add.text(20, 20, `Score: 0`, {
            font: 'bold 24px Arial',
            fill: '#FFB703'
        });
        this.scoreText.setScrollFactor(0);
        
        this.levelText = this.add.text(20, 60, `Level: ${this.level}`, {
            font: 'bold 20px Arial',
            fill: '#00D9FF'
        });
        this.levelText.setScrollFactor(0);
        
        this.shotsText = this.add.text(
            this.scale.width - 20,
            20,
            `Shots: ${this.shotsRemaining}`,
            {
                font: 'bold 24px Arial',
                fill: '#EF476F',
                align: 'right'
            }
        );
        this.shotsText.setOrigin(1, 0);
        this.shotsText.setScrollFactor(0);
        
        this.comboText = this.add.text(
            this.scale.width * 0.5,
            this.scale.height - 50,
            `Combo: 0x`,
            {
                font: 'bold 28px Arial',
                fill: '#FFD60A',
                align: 'center'
            }
        );
        this.comboText.setOrigin(0.5);
        this.comboText.setScrollFactor(0);
    }
    
    createLevel() {
        // Create block structure
        const blockColors = [0xFF006E, 0x00D9FF, 0xFFB703, 0x06D6A0, 0xEF476F];
        const blockSize = 40;
        const startX = this.scale.width * 0.6;
        const startY = this.scale.height * 0.2;
        
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 5; col++) {
                const x = startX + col * (blockSize + 5);
                const y = startY + row * (blockSize + 5);
                
                const block = this.add.rectangle(
                    x,
                    y,
                    blockSize,
                    blockSize,
                    blockColors[GameUtils.randomInt(0, blockColors.length - 1)]
                );
                block.setStrokeStyle(2, 0xFFFFFF);
                this.physics.add.existing(block);
                block.body.setBounce(0.6);
                block.health = GameUtils.randomInt(1, 3);
                this.blocks.push(block);
            }
        }
        
        // Create enemy (target)
        const enemyX = this.scale.width * 0.85;
        const enemyY = this.scale.height * 0.15;
        
        const enemy = this.add.circle(enemyX, enemyY, 25, 0xEF476F);
        this.physics.add.existing(enemy);
        enemy.body.setBounce(0.5);
        enemy.health = 100;
        this.enemies.push(enemy);
    }
    
    setupPhysics() {
        this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);
    }
    
    setupInput() {
        this.input.keyboard.on('keydown-SPACE', () => {
            if (!this.gameOver && !this.isPaused) {
                this.togglePause();
            }
        });
        
        this.input.on('pointerdown', (pointer) => {
            if (this.gameOver || this.isPaused) return;
            
            const distance = GameUtils.distance(
                pointer.x,
                pointer.y,
                this.projectile.x,
                this.projectile.y
            );
            
            if (distance < 40) {
                this.isDragging = true;
            }
        });
        
        this.input.on('pointermove', (pointer) => {
            if (this.isDragging && !this.projectile.launched) {
                this.projectile.x = pointer.x;
                this.projectile.y = pointer.y;
            }
        });
        
        this.input.on('pointerup', () => {
            if (this.isDragging && !this.projectile.launched) {
                this.fireProjectile();
                this.isDragging = false;
            }
        });
    }
    
    setupEventListeners() {
        this.sys.events.on('pause', () => {
            this.isPaused = true;
        });
        
        this.sys.events.on('resume', () => {
            this.isPaused = false;
        });
    }
    
    fireProjectile() {
        if (this.shotsRemaining <= 0) return;
        
        const dx = this.slingshotPos.x - this.projectile.x;
        const dy = this.slingshotPos.y - this.projectile.y;
        
        this.projectile.body.setVelocity(dx * 10, dy * 10);
        this.projectile.launched = true;
        this.shotsRemaining--;
        this.combo = 0;
    }
    
    update() {
        if (this.gameOver) return;
        
        this.updateUI();
        this.checkCollisions();
        this.checkLevelComplete();
        
        // Reset projectile if it's off screen
        if (this.projectile.y > this.scale.height + 100 && this.projectile.launched) {
            this.resetProjectile();
        }
    }
    
    checkCollisions() {
        // Block collisions
        this.blocks.forEach(block => {
            if (this.physics.overlap(this.projectile, block) && this.projectile.launched) {
                block.health--;
                this.combo++;
                this.maxCombo = Math.max(this.maxCombo, this.combo);
                this.score += 100 + (this.combo * 50);
                
                GameUtils.particleBurst(this, block.x, block.y, block.fillColor);
                
                if (block.health <= 0) {
                    block.destroy();
                    this.blocks = this.blocks.filter(b => b !== block);
                }
            }
        });
        
        // Enemy collisions
        this.enemies.forEach(enemy => {
            if (this.physics.overlap(this.projectile, enemy) && this.projectile.launched) {
                enemy.health -= 25;
                this.score += 500;
                this.combo += 5;
                
                GameUtils.particleBurst(this, enemy.x, enemy.y, 0xEF476F, 20);
                
                if (enemy.health <= 0) {
                    enemy.destroy();
                    this.enemies = this.enemies.filter(e => e !== enemy);
                }
            }
        });
    }
    
    checkLevelComplete() {
        if (this.blocks.length === 0 && this.enemies.length === 0) {
            this.levelComplete();
        } else if (this.shotsRemaining === 0 && this.projectile.body.velocity.x === 0 && this.projectile.body.velocity.y === 0) {
            this.endGame();
        }
    }
    
    levelComplete() {
        this.level++;
        this.shotsRemaining = Math.max(3, 8 - Math.floor(this.level / 3));
        this.score += this.shotsRemaining * 100;
        
        this.blocks.forEach(block => block.destroy());
        this.enemies.forEach(enemy => enemy.destroy());
        this.blocks = [];
        this.enemies = [];
        
        this.resetProjectile();
        this.createLevel();
    }
    
    resetProjectile() {
        this.projectile.x = this.projectileStartPos.x;
        this.projectile.y = this.projectileStartPos.y;
        this.projectile.body.setVelocity(0, 0);
        this.projectile.launched = false;
    }
    
    updateUI() {
        this.scoreText.setText(`Score: ${GameUtils.formatNumber(this.score)}`);
        this.levelText.setText(`Level: ${this.level}`);
        this.shotsText.setText(`Shots: ${this.shotsRemaining}`);
        this.comboText.setText(`Combo: ${this.combo}x`);
        
        if (this.combo > 0) {
            this.comboText.setAlpha(1);
        } else {
            this.comboText.setAlpha(0.3);
        }
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.physics.pause();
            uiManager.showPauseMenu(this);
        } else {
            this.physics.resume();
        }
    }
    
    endGame() {
        this.gameOver = true;
        this.physics.pause();
        
        const stats = {
            score: this.score,
            best: StorageManager.getBestScore('game3'),
            level: this.level,
            combo: this.maxCombo,
            shotsUsed: 5 - this.shotsRemaining,
            multiplier: Math.floor(this.score / (this.level || 1))
        };
        
        setTimeout(() => {
            uiManager.showGameOver(this, stats);
        }, 500);
    }
}
