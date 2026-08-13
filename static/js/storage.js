/* ===================================
   GAME ARCADE - LOCAL STORAGE MANAGER
   Handles game saves, records, and settings
   =================================== */

const StorageManager = {
    PREFIX: 'game_arcade_',
    
    /**
     * Save data to localStorage
     */
    save: (key, value) => {
        try {
            const fullKey = StorageManager.PREFIX + key;
            const serialized = JSON.stringify(value);
            localStorage.setItem(fullKey, serialized);
            return true;
        } catch (e) {
            console.error('Storage save error:', e);
            return false;
        }
    },
    
    /**
     * Load data from localStorage
     */
    load: (key, defaultValue = null) => {
        try {
            const fullKey = StorageManager.PREFIX + key;
            const item = localStorage.getItem(fullKey);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Storage load error:', e);
            return defaultValue;
        }
    },
    
    /**
     * Remove data from localStorage
     */
    remove: (key) => {
        try {
            const fullKey = StorageManager.PREFIX + key;
            localStorage.removeItem(fullKey);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    },
    
    /**
     * Clear all storage
     */
    clear: () => {
        try {
            const keys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith(StorageManager.PREFIX)) {
                    keys.push(key);
                }
            }
            keys.forEach(key => localStorage.removeItem(key));
            return true;
        } catch (e) {
            console.error('Storage clear error:', e);
            return false;
        }
    },
    
    /**
     * Save game record
     */
    saveRecord: (gameId, score, stats = {}) => {
        const records = StorageManager.load('records', {});
        if (!records[gameId]) {
            records[gameId] = [];
        }
        
        records[gameId].push({
            score,
            stats,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString()
        });
        
        // Keep only top 50 records
        records[gameId].sort((a, b) => b.score - a.score);
        records[gameId] = records[gameId].slice(0, 50);
        
        StorageManager.save('records', records);
        return true;
    },
    
    /**
     * Get all records for a game
     */
    getRecords: (gameId) => {
        const records = StorageManager.load('records', {});
        return records[gameId] || [];
    },
    
    /**
     * Get best score for a game
     */
    getBestScore: (gameId) => {
        const records = StorageManager.getRecords(gameId);
        return records.length > 0 ? records[0].score : 0;
    },
    
    /**
     * Get all records across all games
     */
    getAllRecords: () => {
        return StorageManager.load('records', {});
    },
    
    /**
     * Save game progress
     */
    saveProgress: (gameId, progressData) => {
        StorageManager.save(`progress_${gameId}`, progressData);
    },
    
    /**
     * Load game progress
     */
    loadProgress: (gameId) => {
        return StorageManager.load(`progress_${gameId}`, null);
    },
    
    /**
     * Save settings
     */
    saveSettings: (settings) => {
        StorageManager.save('settings', settings);
    },
    
    /**
     * Load settings
     */
    loadSettings: () => {
        return StorageManager.load('settings', {
            soundEnabled: true,
            musicEnabled: true,
            volume: 0.8,
            difficulty: 'normal',
            language: 'en'
        });
    },
    
    /**
     * Save unlocks
     */
    saveUnlocks: (gameId, unlocks) => {
        StorageManager.save(`unlocks_${gameId}`, unlocks);
    },
    
    /**
     * Load unlocks
     */
    loadUnlocks: (gameId) => {
        return StorageManager.load(`unlocks_${gameId}`, []);
    },
    
    /**
     * Update game statistics
     */
    updateStats: (gameId, statKey, increment = 1) => {
        const stats = StorageManager.load(`stats_${gameId}`, {});
        stats[statKey] = (stats[statKey] || 0) + increment;
        StorageManager.save(`stats_${gameId}`, stats);
        return stats;
    },
    
    /**
     * Get game statistics
     */
    getStats: (gameId) => {
        return StorageManager.load(`stats_${gameId}`, {});
    }
};
