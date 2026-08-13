/* ===================================
   GAME ARCADE - UI MANAGER
   Manages all UI elements and overlays
   =================================== */

class UIManager {
    constructor() {
        this.currentGame = null;
        this.gameInstance = null;
        this.isPaused = false;
        this.isGameOver = false;
    }
    
    /**
     * Initialize UI elements
     */
    init() {
        this.setupMenuListeners();
        this.setupGameListeners();
        this.setupRecordsModal();
        this.loadRecords();
    }
    
    /**
     * Setup menu event listeners
     */
    setupMenuListeners() {
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const gameId = card.dataset.game;
                this.startGame(gameId);
            });
            
            // Hover effect
            card.addEventListener('mouseenter', () => {
                card.classList.add('active');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('active');
            });
        });
        
        // Records button
        const recordsBtn = document.getElementById('records-btn');
        if (recordsBtn) {
            recordsBtn.addEventListener('click', () => {
                this.showRecordsModal();
            });
        }
    }
    
    /**
     * Setup game screen listeners
     */
    setupGameListeners() {
        const menuBtn = document.getElementById('menu-btn');
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                this.returnToMenu();
            });
        }
    }
    
    /**
     * Start a game
     */
    startGame(gameId) {
        this.showScreen('loading-screen');
        this.currentGame = gameId;
        
        // Update game title
        const gameConfig = GAME_CONFIG.GAMES[gameId.toUpperCase()];
        if (gameConfig) {
            const titleDisplay = document.getElementById('game-title-display');
            if (titleDisplay) {
                titleDisplay.textContent = gameConfig.NAME;
            }
        }
        
        // Give browser time to render loading screen
        setTimeout(() => {
            this.initializeGame(gameId);
        }, 100);
    }
    
    /**
     * Initialize the appropriate game
     */
    initializeGame(gameId) {
        const container = document.getElementById('game-container');
        container.innerHTML = ''; // Clear previous game
        
        let gameConfig;
        
        switch (gameId) {
            case 'game1':
                gameConfig = {
                    ...GAME_CONFIG.PHASER,
                    scene: [Game1PortalLegionRush],
                    parent: 'game-container'
                };
                break;
            case 'game2':
                gameConfig = {
                    ...GAME_CONFIG.PHASER,
                    scene: [Game2SnackFactory],
                    parent: 'game-container'
                };
                break;
            case 'game3':
                gameConfig = {
                    ...GAME_CONFIG.PHASER,
                    scene: [Game3SlingBomb],
                    parent: 'game-container'
                };
                break;
            default:
                console.error('Unknown game:', gameId);
                this.returnToMenu();
                return;
        }
        
        gameConfig.scale = {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        try {
            this.gameInstance = new Phaser.Game(gameConfig);
            setTimeout(() => {
                this.showScreen('game-screen');
            }, 500);
        } catch (e) {
            console.error('Game initialization error:', e);
            this.showScreen('menu-screen');
        }
    }
    
    /**
     * Show pause menu
     */
    showPauseMenu(scene) {
        if (this.isPaused) return;
        
        this.isPaused = true;
        scene.physics.pause();
        scene.sys.events.emit('pause');
        
        const overlay = document.createElement('div');
        overlay.className = 'pause-overlay';
        overlay.id = 'pause-overlay';
        
        overlay.innerHTML = `
            <div class="pause-menu">
                <h2>PAUSED</h2>
                <div class="pause-buttons">
                    <button class="btn-pause btn-pause-resume">RESUME</button>
                    <button class="btn-pause btn-pause-menu">BACK TO MENU</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        overlay.querySelector('.btn-pause-resume').addEventListener('click', () => {
            this.resumeGame(scene);
        });
        
        overlay.querySelector('.btn-pause-menu').addEventListener('click', () => {
            this.returnToMenu();
        });
    }
    
    /**
     * Resume paused game
     */
    resumeGame(scene) {
        const overlay = document.getElementById('pause-overlay');
        if (overlay) {
            overlay.remove();
        }
        
        this.isPaused = false;
        scene.physics.resume();
        scene.sys.events.emit('resume');
    }
    
    /**
     * Show game over screen
     */
    showGameOver(scene, stats) {
        this.isGameOver = true;
        scene.physics.pause();
        
        const overlay = document.createElement('div');
        overlay.className = 'gameover-overlay';
        overlay.id = 'gameover-overlay';
        
        const scoreText = GameUtils.formatNumber(stats.score || 0);
        const timeText = GameUtils.formatTime(stats.time || 0);
        
        overlay.innerHTML = `
            <div class="gameover-panel">
                <div class="gameover-title">GAME OVER</div>
                <div class="gameover-stats">
                    <div class="stat-item">
                        <div class="stat-label">Score</div>
                        <div class="stat-value">${scoreText}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Time</div>
                        <div class="stat-value">${timeText}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Best</div>
                        <div class="stat-value">${GameUtils.formatNumber(stats.best || 0)}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Multiplier</div>
                        <div class="stat-value">x${stats.multiplier || 1}</div>
                    </div>
                </div>
                <div class="gameover-buttons">
                    <button class="btn-gameover btn-retry">PLAY AGAIN</button>
                    <button class="btn-gameover btn-menu-gameover">MENU</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Save record
        if (this.currentGame) {
            StorageManager.saveRecord(this.currentGame, stats.score || 0, stats);
        }
        
        overlay.querySelector('.btn-retry').addEventListener('click', () => {
            overlay.remove();
            this.isGameOver = false;
            scene.scene.restart();
        });
        
        overlay.querySelector('.btn-menu-gameover').addEventListener('click', () => {
            overlay.remove();
            this.returnToMenu();
        });
    }
    
    /**
     * Update game info display
     */
    updateGameInfo(info) {
        const infoDisplay = document.getElementById('game-info-display');
        if (infoDisplay) {
            infoDisplay.innerHTML = info;
        }
    }
    
    /**
     * Show records modal
     */
    setupRecordsModal() {
        const modal = document.getElementById('records-modal');
        const closeBtn = modal.querySelector('.modal-close');
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    /**
     * Load and display records
     */
    loadRecords() {
        const recordsBody = document.getElementById('records-body');
        if (!recordsBody) return;
        
        const allRecords = StorageManager.getAllRecords();
        
        if (!allRecords || Object.keys(allRecords).length === 0) {
            recordsBody.innerHTML = '<div class="no-records">No records yet. Start playing to earn your first record!</div>';
            return;
        }
        
        let html = '<div class="records-container">';
        
        for (const [gameId, records] of Object.entries(allRecords)) {
            const gameConfig = GAME_CONFIG.GAMES[gameId.toUpperCase()];
            const gameName = gameConfig ? gameConfig.NAME : gameId;
            
            html += `<div class="game-records">`;
            html += `<h3>${gameName}</h3>`;
            
            if (records && records.length > 0) {
                records.slice(0, 5).forEach((record, index) => {
                    html += `
                        <div class="record-item">
                            <span class="record-rank">#${index + 1}</span>
                            <span class="record-score">${GameUtils.formatNumber(record.score)}</span>
                        </div>
                    `;
                });
            } else {
                html += '<div class="no-records">No records yet</div>';
            }
            
            html += '</div>';
        }
        
        html += '</div>';
        recordsBody.innerHTML = html;
    }
    
    /**
     * Show records modal
     */
    showRecordsModal() {
        this.loadRecords();
        const modal = document.getElementById('records-modal');
        modal.classList.add('active');
    }
    
    /**
     * Show/hide screen
     */
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
    
    /**
     * Return to menu
     */
    returnToMenu() {
        if (this.gameInstance) {
            this.gameInstance.destroy(true);
            this.gameInstance = null;
        }
        this.isPaused = false;
        this.isGameOver = false;
        this.currentGame = null;
        
        const overlay = document.getElementById('pause-overlay');
        if (overlay) overlay.remove();
        
        const gameoverOverlay = document.getElementById('gameover-overlay');
        if (gameoverOverlay) gameoverOverlay.remove();
        
        this.showScreen('menu-screen');
    }
    
    /**
     * Show toast notification
     */
    showToast(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, duration);
    }
}

// Global UI Manager instance
const uiManager = new UIManager();
