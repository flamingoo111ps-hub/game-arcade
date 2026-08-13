# Game Arcade 🎮

A stunning, high-quality web-based arcade gaming platform featuring three hyper-casual games built with Flask, Phaser 3, and modern web technologies.

## Features

✨ **Three Unique Games:**
1. **Portal Legion Rush** - Endless runner with army multiplication and portal selection
2. **Snack Factory Frenzy** - Production chain management with stacking mechanics
3. **Sling Bomb Blocks** - Physics-based destruction puzzle game

🎯 **Core Features:**
- Beautiful, modern UI with neon gradients and smooth animations
- Fully responsive design (mobile, tablet, desktop)
- Local storage for high scores and game progress
- Combo system with multipliers and visual feedback
- Particle effects, screen shake, and satisfying animations
- Pause functionality in all games
- Game Over screens with detailed statistics
- High score tracking and leaderboards

## Tech Stack

- **Backend:** Flask (Python)
- **Frontend:** HTML5, CSS3, JavaScript ES6+
- **Game Engine:** Phaser 3 (via CDN)
- **Physics:** Arcade physics engine
- **Storage:** LocalStorage API
- **Animations:** CSS animations + Phaser tweens

## Installation

### Prerequisites
- Python 3.7+
- pip (Python package manager)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Setup

1. **Clone or download the repository:**
```bash
git clone https://github.com/yourusername/game-arcade.git
cd game-arcade
```

2. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

3. **Run the Flask server:**
```bash
python app.py
```

4. **Open in browser:**
Navigate to `http://127.0.0.1:5000` in your web browser

## Project Structure

```
game-arcade/
├── app.py                          # Flask application
├── requirements.txt                # Python dependencies
├── templates/
│   └── index.html                 # Main HTML template
├── static/
│   ├── css/
│   │   ├── main.css              # Base styles and animations
│   │   ├── menu.css              # Menu and card styling
│   │   └── games.css             # Game UI styling
│   └── js/
│       ├── config.js             # Global configuration
│       ├── utils.js              # Utility functions
│       ├── storage.js            # LocalStorage management
│       ├── ui-manager.js         # UI state management
│       ├── menu-previews.js      # Menu preview animations
│       ├── app.js                # Application entry point
│       ├── game1-portal.js       # Portal Legion Rush game
│       ├── game2-snack.js        # Snack Factory Frenzy game
│       └── game3-sling.js        # Sling Bomb Blocks game
└── README.md                       # This file
```

## Game Descriptions

### Game 1: Portal Legion Rush 🏃

**Gameplay:**
- Auto-running endless runner
- Select between two portals to grow your army
- Multiply your army or add units
- Destroy enemy waves with your growing force
- Reach as far as possible!

**Controls:**
- Left/Right click or screen swipe to select portal
- SPACE to pause

**Features:**
- Combo system with army multipliers
- Progressive difficulty
- Collecting coins for points
- Boss battles
- 3 lives system

### Game 2: Snack Factory Frenzy 🍔

**Gameplay:**
- Collect falling ingredients
- Cook them at cooking stations
- Stack identical products for higher value
- Sell to customers at the counter
- Manage inventory and queues
- Survive daily sales targets

**Controls:**
- Click ingredients to collect
- Hold to speed up cooking
- Click counter to serve customers
- SPACE to pause

**Features:**
- Daily progression with increasing difficulty
- Product stacking system
- Customer satisfaction mechanics
- Money management
- Combo multipliers

### Game 3: Sling Bomb Blocks 💣

**Gameplay:**
- Physics-based slingshot mechanics
- Aim and fire projectiles at block structures
- Destroy blocks to clear levels
- Collect power-ups
- Complete level challenges
- Reach maximum distance

**Controls:**
- Click and drag projectile to aim
- Release to fire
- SPACE to pause

**Features:**
- Realistic physics simulation
- Multiple projectile types (unlocked)
- Chain reactions and combos
- Progressive level difficulty
- Destructible environments

## Game Controls

### All Games:
- **SPACE** - Pause/Resume
- **ESC** - Return to Menu (from pause)
- **Click** - Interact with UI elements
- **Touch** - Full touch support for mobile

### Game-Specific:
- **Game 1:** Left/Right click to select portal
- **Game 2:** Click ingredients and cooking areas
- **Game 3:** Drag projectile to aim

## Features

### Visual Effects
- Smooth camera following
- Screen shake on impacts
- Particle bursts on collection/destruction
- Floating damage/score numbers
- Color-coded UI elements
- Neon glow effects
- Smooth transitions between screens

### Audio
- Procedural sound effects (framework ready)
- Web Audio API integration
- Mutable sound settings

### Accessibility
- High contrast colors
- Clear visual feedback
- Responsive touch controls
- Keyboard support
- Mobile optimized

## High Score System

All high scores are automatically saved to browser localStorage:
- Top 50 scores per game
- Timestamp tracking
- Detailed statistics per game
- Quick access via High Scores button

## Settings

Settings are managed through localStorage and include:
- Sound toggle
- Volume control
- Difficulty selection
- Language preference

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized for 60 FPS gameplay
- Efficient particle systems
- Physics simulation optimization
- Asset loading and caching
- Mobile-optimized rendering

## Development

### Adding a New Game

1. Create a new Phaser scene class in `static/js/game4-name.js`
2. Extend `Phaser.Scene`
3. Implement `create()` and `update()` methods
4. Register in `ui-manager.js` in the `initializeGame()` method
5. Add game card to menu in `templates/index.html`
6. Add configuration to `config.js`

### Customizing Games

Each game can be customized by modifying:
- Game constants and configuration
- Visual styling and colors
- Difficulty progression
- Scoring multipliers
- UI layout and positioning

## API Endpoints

### GET /api/records
Retrieve all high scores

### POST /api/records
Save a new record
```json
{
  "game_id": "game1",
  "score": 5000,
  "stats": { "distance": 1000 }
}
```

### GET /api/health
Health check endpoint

## Known Issues & Limitations

- Sprite placeholders are geometric shapes (ready for image replacement)
- Audio system is framework-ready (add MP3/OGG files)
- Single-player only
- No backend persistence (uses localStorage)
- No multiplayer features

## Future Enhancements

- [ ] Sound effects and background music
- [ ] Real sprite graphics
- [ ] Additional games
- [ ] Leaderboards with backend storage
- [ ] User accounts and cloud saves
- [ ] Achievements and badges
- [ ] Daily challenges
- [ ] Monetization options
- [ ] Social sharing
- [ ] Offline support (PWA)

## Troubleshooting

### Game won't load
- Check browser console for errors (F12)
- Ensure Flask server is running
- Clear browser cache and reload
- Try a different browser

### No sound
- Sound is framework-ready, add audio files to `static/sounds/`
- Check browser sound settings
- Verify Web Audio API support

### Performance issues
- Disable background effects in settings
- Close other browser tabs
- Update GPU drivers
- Try a different browser

### High scores not saving
- Check localStorage availability (private browsing)
- Browser storage limit (usually 5-10MB)
- Clear corrupted data: open DevTools > Application > Clear Storage

## Credits

- Built with [Phaser 3](https://phaser.io/)
- Powered by [Flask](https://flask.palletsprojects.com/)
- Icons and graphics: Custom geometric design

## License

MIT License - feel free to use for personal or commercial projects

## Support

For issues, suggestions, or feature requests, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for arcade gaming enthusiasts**

Happy playing! 🎮✨
