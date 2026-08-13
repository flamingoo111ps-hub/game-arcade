/* ===================================
   GAME 1: PORTAL LEGION RUSH
   Endless runner with army multiplication
   =================================== */

class Game1PortalLegionRush extends Phaser.Scene {
    constructor() {
        super({ key: 'Game1PortalLegionRush' });
        this.score = 0;
        this.distance = 0;
        this.lives = 3;
        this.combo = 0;
        this.maxCombo = 0;
        this.armySize = 5;
        this.armyPower = 100;
        this.gameOver = false;
        this.isPaused = false;
        this.startTime = 0;
        this.elapsedTime = 0;
    }
    
    create() {
        this.startTime = Date.now();
        this.createBackground();
        this.createPlayer();
        this.createUI();
        this.createPhysicsGroups();
        this.setupInput();
        this.setupCamera();
        this.setupEventListeners();
        
        console.log('✨ Game1: Portal Legion Rush created');
    }
    
    createBackground() {
        // Gradient background
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0x0a0e27, 1);
        graphics.fillRect(0, 0, this.scale.width, this.scale.height);
        graphics.generateTexture('bg', this.scale.width, this.scale.height);
        graphics.destroy();
        
        this.add.image(0, 0, 'bg').setOrigin(0, 0);
        
        // Ground
        this.ground = this.physics.add.staticGroup();
        for (let i = 0; i < 10; i++) {
            const ground = this.add.rectangle(
                i * this.scale.width,
                this.scale.height - 50,
                this.scale.width,
                100,
                0x1a1f3a
            );
            this.physics.add.existing(ground, true);
            this.ground.add(ground);
        }
    }
    
    createPlayer() {
        const startX = this.scale.width * 0.2;
        const startY = this.scale.height - 150;
        
        this.player = this.add.rectangle(startX, startY, 25, 35, 0xFF006E);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setBounce(0.2);
        this.player.body.setDrag(0.99);
        
        this.army = this.physics.add.group();
        this.createArmy();
    }
    
    createArmy() {
        this.army.clear(true, true);
        
        for (let i = 0; i < this.armySize; i++) {
            const offsetX = -50 - (i * 20);
            const offsetY = 0;
            
            const unit = this.add.rectangle(
                this.player.x + offsetX,
                this.player.y + offsetY,
                15,
                20,
                0x00D9FF
            );
            this.physics.add.existing(unit);
            unit.body.setDrag(0.95);
            this.army.add(unit);
        }
    }
    
    createUI() {
        this.scoreText = this.add.text(20, 20, `Score: 0`, {
            font: 'bold 24px Arial',
            fill: '#FFB703'
        });
        this.scoreText.setScrollFactor(0);
        
        this.livesText = this.add.text(20, 60, `Lives: ${this.lives}`, {
            font: 'bold 20px Arial',
            fill: '#EF476F'
        });
        this.livesText.setScrollFactor(0);
        
        this.armyText = this.add.text(20, 100, `Army: ${this.armySize}`, {
            font: 'bold 20px Arial',
            fill: '#06D6A0'
        });
        this.armyText.setScrollFactor(0);
        
        this.comboText = this.add.text(
            this.scale.width / 2,
            this.scale.height - 50,
            `Combo: 0x`,
            {
                font: 'bold 32px Arial',
                fill: '#FFB703',
                align: 'center'
            }
        );
        this.comboText.setOrigin(0.5);
        this.comboText.setScrollFactor(0);
    }
    
    createPhysicsGroups() {
        this.portals = this.physics.add.staticGroup();
        this.enemies = this.physics.add.group();
        this.coins = this.physics.add.group();
        this.projectiles = this.physics.add.group();
    }
    
    setupInput() {
        this.input.keyboard.on('keydown-SPACE', () => {
            if (!this.gameOver && !this.isPaused) {
                this.togglePause();
            }
        });
        
        this.input.on('pointerdown', (pointer) => {
            if (this.gameOver) return;
            
            const clickX = pointer.x + this.cameras.main.scrollX;
            const clickY = pointer.y + this.cameras.main.scrollY;
            
            if (clickX < this.scale.width / 2) {
                this.selectPortal('left');
            } else {
                this.selectPortal('right');
            }
        });
    }
    
    setupCamera() {
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 10000, this.scale.height);
    }
    
    setupEventListeners() {
        this.sys.events.on('pause', () => {
            this.isPaused = true;
        });
        
        this.sys.events.on('resume', () => {
            this.isPaused = false;
        });
    }
    
    update() {
        if (this.gameOver) return;
        
        this.distance = Math.floor(this.player.x / 10);
        this.elapsedTime = Date.now() - this.startTime;
        
        this.updatePlayer();
        this.updateArmy();
        this.updateUI();
        this.updateSpawning();
        
        // Check collisions
        this.physics.collide(this.player, this.ground);
        this.physics.collide(this.army, this.ground);
        
        // Update camera
        this.cameras.main.scrollX = Math.max(this.cameras.main.scrollX, this.player.x - 300);
    }
    
    updatePlayer() {
        // Auto-run forward
        this.player.body.setVelocityX(200);
        
        // Gravity
        if (this.player.y < this.scale.height - 100) {
            this.player.body.setAccelerationY(600);
        }
    }
    
    updateArmy() {
        this.army.children.entries.forEach((unit, index) => {
            unit.body.setVelocityX(this.player.body.velocity.x);
            unit.body.setAccelerationY(600);
            
            // Formation following
            const targetX = this.player.x - 50 - (index * 20);
            const dx = targetX - unit.x;
            if (Math.abs(dx) > 5) {
                unit.body.setVelocityX(this.player.body.velocity.x + (dx * 0.1));
            }
        });
    }
    
    updateUI() {
        this.scoreText.setText(`Score: ${GameUtils.formatNumber(this.score)}`);
        this.livesText.setText(`Lives: ${this.lives}`);
        this.armyText.setText(`Army: ${this.armySize}`);
        this.comboText.setText(`Combo: ${this.combo}x`);
        
        if (this.combo > 0) {
            this.comboText.setAlpha(1);
        } else {
            this.comboText.setAlpha(0.3);
        }
    }
    
    updateSpawning() {
        // Spawn portals periodically
        if (this.distance % 50 === 0 && this.lastPortalDistance !== this.distance) {
            this.spawnPortalPair();
            this.lastPortalDistance = this.distance;
        }
        
        // Spawn enemies
        if (this.distance % 30 === 0 && this.lastEnemyDistance !== this.distance) {
            this.spawnEnemyWave();
            this.lastEnemyDistance = this.distance;
        }
        
        // Spawn coins
        if (this.distance % 20 === 0 && this.lastCoinDistance !== this.distance) {
            this.spawnCoins();
            this.lastCoinDistance = this.distance;
        }
    }
    
    spawnPortalPair() {
        const y = this.scale.height - 150;
        
        // Left portal
        const leftPortal = this.add.circle(
            this.player.x + this.scale.width,
            y,
            30,
            0x00D9FF
        );
        leftPortal.setStrokeStyle(3, 0x00D9FF);
        this.physics.add.existing(leftPortal, true);
        leftPortal.portalType = 'left';
        leftPortal.data = Math.random() < 0.5 ? { type: 'multiply', value: GameUtils.randomInt(2, 5) } : { type: 'add', value: GameUtils.randomInt(3, 12) };
        this.portals.add(leftPortal);
        
        // Right portal
        const rightPortal = this.add.circle(
            this.player.x + this.scale.width + 150,
            y,
            30,
            0xFFB703
        );
        rightPortal.setStrokeStyle(3, 0xFFB703);
        this.physics.add.existing(rightPortal, true);
        rightPortal.portalType = 'right';
        rightPortal.data = Math.random() < 0.5 ? { type: 'multiply', value: GameUtils.randomInt(2, 5) } : { type: 'add', value: GameUtils.randomInt(3, 12) };
        this.portals.add(rightPortal);
    }
    
    selectPortal(direction) {
        const portalsToRemove = [];
        
        this.portals.children.entries.forEach(portal => {
            if ((direction === 'left' && portal.portalType === 'left') ||
                (direction === 'right' && portal.portalType === 'right')) {
                // Apply portal effect
                if (portal.data.type === 'multiply') {
                    this.armySize = Math.min(this.armySize * portal.data.value, 100);
                    this.score += portal.data.value * 100;
                } else {
                    this.armySize += portal.data.value;
                    this.score += portal.data.value * 50;
                }
                
                this.combo++;
                this.maxCombo = Math.max(this.maxCombo, this.combo);
                this.createArmy();
                GameUtils.particleBurst(this, portal.x, portal.y, 0x00D9FF);
                
                portalsToRemove.push(portal);
            } else {
                portalsToRemove.push(portal);
            }
        });
        
        portalsToRemove.forEach(p => {
            p.destroy();
        });
        this.portals.clear(false, false);
    }
    
    spawnEnemyWave() {
        for (let i = 0; i < 3; i++) {
            const enemy = this.add.rectangle(
                this.player.x + this.scale.width + (i * 80),
                this.scale.height - 150,
                20,
                25,
                0xEF476F
            );
            this.physics.add.existing(enemy);
            enemy.body.setVelocityX(-150);
            enemy.health = 30;
            this.enemies.add(enemy);
        }
    }
    
    spawnCoins() {
        for (let i = 0; i < 5; i++) {
            const coin = this.add.circle(
                this.player.x + this.scale.width + (i * 40),
                this.scale.height * 0.3,
                8,
                0xFFD60A
            );
            this.physics.add.existing(coin);
            coin.body.setVelocityY(100);
            this.coins.add(coin);
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
            best: StorageManager.getBestScore('game1'),
            distance: this.distance,
            time: this.elapsedTime,
            combo: this.maxCombo,
            multiplier: Math.floor(this.score / (this.distance || 1))
        };
        
        setTimeout(() => {
            uiManager.showGameOver(this, stats);
        }, 500);
    }
}
