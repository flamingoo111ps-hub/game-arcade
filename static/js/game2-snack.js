/* ===================================
   GAME 2: SNACK FACTORY FRENZY
   Production chain with stacking
   =================================== */

class Game2SnackFactory extends Phaser.Scene {
    constructor() {
        super({ key: 'Game2SnackFactory' });
        this.money = 100;
        this.score = 0;
        this.combo = 0;
        this.dayNumber = 1;
        this.dayDuration = 60000; // 60 seconds
        this.dayStartTime = 0;
        this.gameOver = false;
        this.isPaused = false;
        this.ingredients = [];
        this.products = [];
        this.customers = [];
    }
    
    create() {
        this.dayStartTime = Date.now();
        this.createBackground();
        this.createZones();
        this.createUI();
        this.setupInput();
        this.setupPhysics();
        this.setupEventListeners();
        this.startDay();
        
        console.log('✨ Game2: Snack Factory Frenzy created');
    }
    
    createBackground() {
        this.add.rectangle(
            0,
            0,
            this.scale.width,
            this.scale.height,
            0x0a0e27
        ).setOrigin(0, 0);
        
        // Kitchen background
        const kitchenBg = this.add.rectangle(
            this.scale.width * 0.5,
            this.scale.height * 0.5,
            this.scale.width,
            this.scale.height,
            0x1a1f3a
        );
    }
    
    createZones() {
        // Collection zone (left)
        this.collectionZone = this.add.rectangle(
            this.scale.width * 0.2,
            this.scale.height * 0.5,
            this.scale.width * 0.25,
            this.scale.height * 0.8,
            0x00D9FF,
            0.1
        );
        this.collectionZone.setStrokeStyle(2, 0x00D9FF);
        this.add.text(
            this.scale.width * 0.2,
            this.scale.height * 0.1,
            'Collection',
            { font: 'bold 16px Arial', fill: '#00D9FF' }
        ).setOrigin(0.5);
        
        // Cooking zone (center)
        this.cookingZone = this.add.rectangle(
            this.scale.width * 0.5,
            this.scale.height * 0.5,
            this.scale.width * 0.25,
            this.scale.height * 0.8,
            0xFFB703,
            0.1
        );
        this.cookingZone.setStrokeStyle(2, 0xFFB703);
        this.add.text(
            this.scale.width * 0.5,
            this.scale.height * 0.1,
            'Cooking',
            { font: 'bold 16px Arial', fill: '#FFB703' }
        ).setOrigin(0.5);
        
        // Counter zone (right)
        this.counterZone = this.add.rectangle(
            this.scale.width * 0.8,
            this.scale.height * 0.5,
            this.scale.width * 0.25,
            this.scale.height * 0.8,
            0x06D6A0,
            0.1
        );
        this.counterZone.setStrokeStyle(2, 0x06D6A0);
        this.add.text(
            this.scale.width * 0.8,
            this.scale.height * 0.1,
            'Counter',
            { font: 'bold 16px Arial', fill: '#06D6A0' }
        ).setOrigin(0.5);
    }
    
    createUI() {
        this.moneyText = this.add.text(20, 20, `$${this.money}`, {
            font: 'bold 28px Arial',
            fill: '#06D6A0'
        });
        this.moneyText.setScrollFactor(0);
        
        this.dayText = this.add.text(20, 60, `Day ${this.dayNumber}`, {
            font: 'bold 20px Arial',
            fill: '#FFB703'
        });
        this.dayText.setScrollFactor(0);
        
        this.timerText = this.add.text(20, 100, `Time: 60s`, {
            font: 'bold 18px Arial',
            fill: '#00D9FF'
        });
        this.timerText.setScrollFactor(0);
        
        this.comboText = this.add.text(
            this.scale.width - 20,
            20,
            `Combo: 0x`,
            {
                font: 'bold 24px Arial',
                fill: '#FFB703',
                align: 'right'
            }
        );
        this.comboText.setOrigin(1, 0);
        this.comboText.setScrollFactor(0);
    }
    
    setupPhysics() {
        this.ingredientGroup = this.physics.add.group();
        this.productGroup = this.physics.add.group();
        this.customerGroup = this.physics.add.group();
    }
    
    setupInput() {
        this.input.keyboard.on('keydown-SPACE', () => {
            if (!this.gameOver && !this.isPaused) {
                this.togglePause();
            }
        });
        
        this.input.on('pointerdown', (pointer) => {
            if (this.gameOver || this.isPaused) return;
            
            this.handleClick(pointer.x, pointer.y);
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
    
    startDay() {
        this.spawnIngredients();
        this.spawnCustomers();
    }
    
    spawnIngredients() {
        const ingredientTypes = [
            { color: 0xFF9800, name: 'wheat' },
            { color: 0x8B4513, name: 'meat' },
            { color: 0xFFD700, name: 'cheese' },
            { color: 0xFF0000, name: 'tomato' },
            { color: 0x8B4513, name: 'chocolate' }
        ];
        
        const spawn = () => {
            if (this.gameOver) return;
            
            const ingredient = ingredientTypes[GameUtils.randomInt(0, ingredientTypes.length - 1)];
            const x = this.scale.width * 0.2 + GameUtils.randomInt(-50, 50);
            const y = this.scale.height * 0.2;
            
            const ingredientObj = this.add.circle(x, y, 12, ingredient.color);
            this.physics.add.existing(ingredientObj);
            ingredientObj.body.setVelocityY(100);
            ingredientObj.ingredientType = ingredient.name;
            this.ingredientGroup.add(ingredientObj);
            
            // Click to collect
            ingredientObj.setInteractive();
            ingredientObj.on('pointerdown', () => {
                this.collectIngredient(ingredientObj);
            });
        };
        
        // Spawn ingredients periodically
        this.time.addEvent({
            delay: 1500,
            callback: spawn,
            loop: true
        });
    }
    
    spawnCustomers() {
        const spawn = () => {
            if (this.gameOver) return;
            
            const customer = this.add.circle(
                this.scale.width * 0.8,
                this.scale.height * 0.7,
                20,
                0xFF006E
            );
            this.physics.add.existing(customer);
            customer.health = 100;
            customer.waitTime = 0;
            this.customerGroup.add(customer);
        };
        
        this.time.addEvent({
            delay: 2000,
            callback: spawn,
            loop: true
        });
    }
    
    collectIngredient(ingredient) {
        this.score += 10;
        GameUtils.particleBurst(this, ingredient.x, ingredient.y, ingredient.fillColor);
        ingredient.destroy();
    }
    
    handleClick(x, y) {
        // Handle cooking interaction
        if (GameUtils.isPointInRect(x, y, this.scale.width * 0.375, this.scale.height * 0.1, this.scale.width * 0.25, this.scale.height * 0.8)) {
            this.cooking();
        }
    }
    
    cooking() {
        // Simple cooking animation
        const x = this.scale.width * 0.5;
        const y = this.scale.height * 0.5;
        
        this.tweens.add({
            targets: { r: 0 },
            r: 30,
            duration: 500,
            ease: 'Cubic.easeOut',
            onUpdate: (tween) => {
                // Add visual feedback
            },
            onComplete: () => {
                this.createProduct(x, y);
            }
        });
    }
    
    createProduct(x, y) {
        const product = this.add.circle(x, y, 15, 0x06D6A0);
        this.physics.add.existing(product);
        product.stackLevel = 1;
        product.value = 100;
        this.productGroup.add(product);
        
        this.score += 50;
        this.combo++;
    }
    
    update() {
        if (this.gameOver) return;
        
        const timeRemaining = Math.max(0, this.dayDuration - (Date.now() - this.dayStartTime));
        const secondsRemaining = Math.floor(timeRemaining / 1000);
        
        this.updateUI();
        this.timerText.setText(`Time: ${secondsRemaining}s`);
        
        if (timeRemaining <= 0) {
            this.endDay();
        }
        
        // Update customers
        this.customerGroup.children.entries.forEach(customer => {
            customer.waitTime++;
            if (customer.waitTime > 180) {
                this.combo = 0;
                customer.destroy();
            }
        });
    }
    
    updateUI() {
        this.moneyText.setText(`$${GameUtils.formatNumber(this.money)}`);
        this.comboText.setText(`Combo: ${this.combo}x`);
    }
    
    endDay() {
        this.dayNumber++;
        this.dayStartTime = Date.now();
        this.ingredientGroup.clear(true, true);
        this.productGroup.clear(true, true);
        this.customerGroup.clear(true, true);
        this.score += this.money * this.combo;
        this.money = Math.floor(this.money * 1.1);
        this.combo = 0;
        
        if (this.dayNumber > 5) {
            this.endGame();
        } else {
            this.startDay();
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
            best: StorageManager.getBestScore('game2'),
            daysCompleted: this.dayNumber - 1,
            totalMoney: this.money,
            multiplier: this.combo,
            time: Date.now() - this.dayStartTime
        };
        
        setTimeout(() => {
            uiManager.showGameOver(this, stats);
        }, 500);
    }
}
