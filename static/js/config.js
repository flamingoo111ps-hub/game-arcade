/* ===================================
   GAME ARCADE - CONFIGURATION
   Global constants and settings
   =================================== */

const GAME_CONFIG = {
    /* Display Settings */
    RESOLUTION: {
        WIDTH: window.innerWidth,
        HEIGHT: window.innerHeight,
        SCALE: 1
    },
    
    /* Phaser Config */
    PHASER: {
        type: Phaser.AUTO,
        backgroundColor: '#0a0e27',
        render: {
            pixelArt: false,
            antialias: true,
            fps: 60
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        input: {
            activePointers: 10
        }
    },
    
    /* Colors */
    COLORS: {
        PRIMARY: 0xFF006E,
        SECONDARY: 0x00D9FF,
        ACCENT: 0xFFB703,
        SUCCESS: 0x06D6A0,
        DANGER: 0xEF476F,
        WARNING: 0xFFD60A,
        DARK: 0x0a0e27,
        LIGHT: 0xf0f3ff,
        WHITE: 0xFFFFFF,
        BLACK: 0x000000,
        GRAY: 0x808080
    },
    
    /* Sprite Keys Reference */
    SPRITE_KEYS: {
        /* Game 1: Portal Legion Rush */
        PLAYER: 'player',
        UNIT_BASIC: 'unit_basic',
        UNIT_TANK: 'unit_tank',
        UNIT_ARCHER: 'unit_archer',
        UNIT_MAGE: 'unit_mage',
        UNIT_EXPLOSIVE: 'unit_explosive',
        PORTAL_MULTIPLIER: 'portal_multiplier',
        PORTAL_UNIT_ADD: 'portal_unit_add',
        PORTAL_GOLD: 'portal_gold',
        ENEMY_ZOMBIE: 'enemy_zombie',
        ENEMY_ROBOT: 'enemy_robot',
        ENEMY_HOOLIGAN: 'enemy_hooligan',
        ENEMY_BOSS: 'enemy_boss',
        COIN: 'coin',
        STAR: 'star',
        TRAP_SPIKE: 'trap_spike',
        TRAP_PIT: 'trap_pit',
        
        /* Game 2: Snack Factory Frenzy */
        INGREDIENT_WHEAT: 'ingredient_wheat',
        INGREDIENT_MEAT: 'ingredient_meat',
        INGREDIENT_CHEESE: 'ingredient_cheese',
        INGREDIENT_TOMATO: 'ingredient_tomato',
        INGREDIENT_CHOCOLATE: 'ingredient_chocolate',
        INGREDIENT_SPICE: 'ingredient_spice',
        PRODUCT_BURGER: 'product_burger',
        PRODUCT_PIZZA: 'product_pizza',
        PRODUCT_TACO: 'product_taco',
        PRODUCT_CAKE: 'product_cake',
        PRODUCT_SUSHI: 'product_sushi',
        CUSTOMER_HAPPY: 'customer_happy',
        CUSTOMER_ANGRY: 'customer_angry',
        CUSTOMER_VIP: 'customer_vip',
        COOKING_STATION: 'cooking_station',
        COUNTER: 'counter',
        
        /* Game 3: Sling Bomb Blocks */
        SLINGSHOT: 'slingshot',
        PROJECTILE_NORMAL: 'projectile_normal',
        PROJECTILE_BOMB: 'projectile_bomb',
        PROJECTILE_LASER: 'projectile_laser',
        PROJECTILE_STICKY: 'projectile_sticky',
        PROJECTILE_SHOTGUN: 'projectile_shotgun',
        BLOCK_RED: 'block_red',
        BLOCK_BLUE: 'block_blue',
        BLOCK_GREEN: 'block_green',
        BLOCK_YELLOW: 'block_yellow',
        BLOCK_PURPLE: 'block_purple',
        BLOCK_GOLD: 'block_gold',
        ENEMY_PIG: 'enemy_pig',
        ENEMY_BIRD: 'enemy_bird',
        ENEMY_TROLL: 'enemy_troll'
    },
    
    /* Audio Keys */
    SOUND_KEYS: {
        /* Common */
        CLICK: 'sound_click',
        SUCCESS: 'sound_success',
        FAIL: 'sound_fail',
        COMBO: 'sound_combo',
        LEVEL_UP: 'sound_levelup',
        
        /* Game 1 */
        PORTAL_SELECT: 'sound_portal',
        ARMY_ATTACK: 'sound_attack',
        ENEMY_HIT: 'sound_hit',
        COIN_COLLECT: 'sound_coin',
        
        /* Game 2 */
        COLLECT_INGREDIENT: 'sound_collect',
        COOKING_COMPLETE: 'sound_cook',
        MONEY_EARNED: 'sound_money',
        CUSTOMER_LEAVE: 'sound_leave',
        
        /* Game 3 */
        SLINGSHOT_FIRE: 'sound_fire',
        BLOCK_BREAK: 'sound_break',
        EXPLOSION: 'sound_explosion',
        CHAIN_REACTION: 'sound_chain'
    },
    
    /* Game States */
    GAME_STATES: {
        MENU: 'menu',
        LOADING: 'loading',
        PLAYING: 'playing',
        PAUSED: 'paused',
        GAME_OVER: 'game_over',
        RECORDS: 'records'
    },
    
    /* Animation Speeds */
    ANIMATION_SPEED: {
        FAST: 150,
        NORMAL: 300,
        SLOW: 600
    },
    
    /* Game Settings */
    GAMES: {
        GAME1: {
            ID: 'game1',
            NAME: 'Portal Legion Rush',
            DESCRIPTION: 'Lead an unstoppable army through portals',
            INITIAL_LIVES: 3,
            BASE_SPEED: 200,
            MAX_SPEED: 400
        },
        GAME2: {
            ID: 'game2',
            NAME: 'Snack Factory Frenzy',
            DESCRIPTION: 'Cook, stack, and sell for massive profits',
            DAY_DURATION: 60000, // 60 seconds per day
            INITIAL_MONEY: 100
        },
        GAME3: {
            ID: 'game3',
            NAME: 'Sling Bomb Blocks',
            DESCRIPTION: 'Physics destruction and tactical placement',
            INITIAL_SHOTS: 5,
            MAX_LEVELS: 50
        }
    },
    
    /* Particle Settings */
    PARTICLES: {
        COLOR_GOLD: 0xFFD60A,
        COLOR_PINK: 0xFF006E,
        COLOR_CYAN: 0x00D9FF,
        COLOR_GREEN: 0x06D6A0,
        LIFETIME: 1000,
        SPEED: 150
    },
    
    /* Touch/Input */
    INPUT: {
        DOUBLE_TAP_DELAY: 300,
        LONG_PRESS_DURATION: 500,
        SWIPE_THRESHOLD: 50
    }
};

/* Update resolution on window resize */
window.addEventListener('resize', () => {
    GAME_CONFIG.RESOLUTION.WIDTH = window.innerWidth;
    GAME_CONFIG.RESOLUTION.HEIGHT = window.innerHeight;
});
