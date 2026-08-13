# 🎮 Quick Start Guide - Game Arcade

## ⚡ 5-Minute Setup

### Step 1: Install Python (if needed)
Download from https://www.python.org (version 3.7+)

### Step 2: Run Setup

**Windows:**
```bash
run.bat
```

**Mac/Linux:**
```bash
chmod +x run.sh
./run.sh
```

### Step 3: Start the Game
```bash
python app.py
```

### Step 4: Open Browser
Go to: **http://127.0.0.1:5000**

---

## 🎯 Game Guide

### Game 1: Portal Legion Rush 🏃
**Objective:** Run as far as possible and build the strongest army

**How to Play:**
1. Auto-runner goes forward automatically
2. Click LEFT or RIGHT side to choose portal
3. Gain units or multiply your army
4. Destroy enemy waves with your force
5. Reach new distances for high score

**Tips:**
- Combo multipliers give huge bonuses
- Aim for army multipliers early
- Watch out for obstacles
- Each round gets faster!

---

### Game 2: Snack Factory Frenzy 🍔
**Objective:** Cook and sell food, earn money, complete daily targets

**How to Play:**
1. Click ingredients as they fall (LEFT zone)
2. Move to cooking station (MIDDLE zone)
3. Click rapidly to cook faster
4. Products appear ready to sell
5. Sell to customers (RIGHT zone)
6. Complete each 60-second day

**Tips:**
- Stack identical products for more money
- Keep customer queue short (they leave!)
- Use money to buy upgrades
- Each day gets busier but more profitable

---

### Game 3: Sling Bomb Blocks 💣
**Objective:** Destroy all blocks to clear levels

**How to Play:**
1. Drag projectile to aim slingshot
2. Release to fire
3. Destroy blocks and enemies
4. Chain reactions = big bonuses
5. Limited shots per level
6. Complete all levels

**Tips:**
- Plan your shots carefully
- Use physics for bounce effects
- Combos build multipliers
- Chain reactions clear entire rows

---

## 💾 High Scores

All scores are saved automatically in your browser.

**View scores:**
- Click "HIGH SCORES" button on main menu
- Top 50 scores per game
- Tracks your progress over time

---

## ⌨️ Controls

### Universal:
- **SPACE** - Pause game
- **ESC** - Return to menu
- **CLICK/TAP** - Interact with buttons and game elements
- **TOUCH** - Full mobile support

### Game-Specific:
- **Game 1:** Left/Right click to choose
- **Game 2:** Click ingredients and stations
- **Game 3:** Drag to aim, release to fire

---

## 🐛 Troubleshooting

### Game won't load
```
✓ Ensure Flask server is running
✓ Open http://127.0.0.1:5000 (not 5001, 5002, etc.)
✓ Try different browser
✓ Clear browser cache (Ctrl+Shift+Del)
```

### High scores not saving
```
✓ Check if using private/incognito mode
✓ Allow localStorage in browser settings
✓ Storage limit usually 5-10MB (very generous)
```

### Performance issues
```
✓ Close other browser tabs
✓ Update your browser
✓ Check GPU drivers
✓ Try Chrome if using Firefox (usually faster for WebGL)
```

### Port 5000 already in use
```bash
# Edit app.py and change:
app.run(port=5001)  # Use 5001 instead of 5000

# Then open: http://127.0.0.1:5001
```

---

## 📱 Mobile Play

**Works on:**
- iPhone/iPad (Safari)
- Android phones (Chrome)
- Tablets (landscape recommended)

**For mobile development:**
1. Find your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Edit `app.py`:
   ```python
   app.run(host='0.0.0.0', port=5000)
   ```
3. On mobile, go to: `http://YOUR_IP:5000`

---

## 🎨 Customization

### Change Colors
Edit `static/css/main.css`:
```css
--color-primary: #FF006E;      /* Your color */
--color-secondary: #00D9FF;    /* Your color */
```

### Adjust Game Difficulty
Edit `static/js/config.js` and modify game constants

### Add Your Graphics
1. Place images in `static/images/`
2. Update sprite keys in games
3. Replace geometric shapes with your images

---

## 🚀 Advanced

### Deploy to Web

**Using Heroku:**
1. Create `Procfile`: `web: python app.py`
2. Push to Heroku: `git push heroku main`

**Using PythonAnywhere:**
1. Upload files
2. Create new Flask app
3. Configure WSGI file
4. Visit your domain

### Add Sound Effects
1. Create `static/sounds/` folder
2. Add MP3 files
3. Uncomment sound code in games

### Backend Integration
Add database support:
1. Install SQLAlchemy: `pip install flask-sqlalchemy`
2. Create models in `app.py`
3. Add `/api/leaderboard` endpoint
4. Update UI to fetch from server

---

## 📊 Performance Tips

- Games run at **60 FPS** on modern hardware
- Mobile: 30-60 FPS depending on device
- Optimized for **all screen sizes**
- **Responsive scaling** (no black bars)
- **Efficient particle system**

---

## 🎯 Next Steps

1. **Play the games!** 🎮
2. **Beat the high scores** 🏆
3. **Share with friends** 👥
4. **Add your own games** 🎨
5. **Deploy online** 🚀

---

## 📝 Notes

- No account needed
- No data collection
- Completely offline-capable
- Open source (modify as you like)
- Works on all modern browsers

---

## 💬 Support

Have questions? Issues?
- Check the README.md
- Look at browser console (F12 > Console)
- Verify all files are in place
- Check Flask server output for errors

---

**Happy gaming! 🎮✨**
