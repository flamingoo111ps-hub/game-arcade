/* ===================================
   GAME ARCADE - MENU PREVIEW ANIMATIONS
   Animated previews for game cards
   =================================== */

class MenuPreviews {
    /**
     * Initialize all preview animations
     */
    static init() {
        MenuPreviews.animateGame1Preview();
        MenuPreviews.animateGame2Preview();
        MenuPreviews.animateGame3Preview();
    }
    
    /**
     * Game 1 Preview: Portal Legion Rush
     */
    static animateGame1Preview() {
        const canvas = document.getElementById('preview-game1');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        let animationId;
        let time = 0;
        
        const animate = () => {
            time += 0.016; // ~60fps
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(10, 14, 39, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw ground
            ctx.fillStyle = '#1a1f3a';
            ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
            
            // Draw portal (left)
            ctx.save();
            ctx.translate(canvas.width * 0.25, canvas.height * 0.4);
            ctx.strokeStyle = '#00D9FF';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, 0, 25 + Math.sin(time * 3) * 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = 'rgba(0, 217, 255, 0.2)';
            ctx.fill();
            ctx.restore();
            
            // Draw portal (right)
            ctx.save();
            ctx.translate(canvas.width * 0.75, canvas.height * 0.4);
            ctx.strokeStyle = '#FFB703';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, 0, 25 + Math.cos(time * 3) * 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = 'rgba(255, 183, 3, 0.2)';
            ctx.fill();
            ctx.restore();
            
            // Draw army units
            const unitCount = 5;
            for (let i = 0; i < unitCount; i++) {
                const x = canvas.width * 0.5 - 40 + i * 15 + Math.sin(time + i) * 5;
                const y = canvas.height - 50;
                ctx.fillStyle = '#FF006E';
                ctx.fillRect(x - 5, y - 10, 10, 15);
            }
            
            animationId = requestAnimationFrame(animate);
        };
        
        animate();
        
        // Cleanup on destroy
        canvas._cleanup = () => {
            cancelAnimationFrame(animationId);
        };
    }
    
    /**
     * Game 2 Preview: Snack Factory Frenzy
     */
    static animateGame2Preview() {
        const canvas = document.getElementById('preview-game2');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        let animationId;
        let time = 0;
        
        const animate = () => {
            time += 0.016;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(10, 14, 39, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw counter
            ctx.fillStyle = '#1a1f3a';
            ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
            
            // Draw ingredients falling
            for (let i = 0; i < 3; i++) {
                const x = canvas.width * 0.25 + i * (canvas.width * 0.25);
                const y = (time * 60 + i * 50) % canvas.height;
                
                // Different colors for different ingredients
                const colors = ['#FFB703', '#FF006E', '#00D9FF'];
                ctx.fillStyle = colors[i];
                ctx.fillRect(x - 8, y - 8, 16, 16);
            }
            
            // Draw cooking progress
            ctx.strokeStyle = '#06D6A0';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(canvas.width * 0.5, canvas.height * 0.5, 30, 0, Math.PI * 2 * Math.sin(time));
            ctx.stroke();
            
            // Draw product stack
            for (let i = 0; i < 4; i++) {
                ctx.fillStyle = '#FFB703';
                ctx.fillRect(canvas.width * 0.75 - 12, canvas.height * 0.3 + i * 10, 24, 10);
            }
            
            animationId = requestAnimationFrame(animate);
        };
        
        animate();
        
        canvas._cleanup = () => {
            cancelAnimationFrame(animationId);
        };
    }
    
    /**
     * Game 3 Preview: Sling Bomb Blocks
     */
    static animateGame3Preview() {
        const canvas = document.getElementById('preview-game3');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        let animationId;
        let time = 0;
        
        const animate = () => {
            time += 0.016;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(10, 14, 39, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw slingshot
            ctx.strokeStyle = '#8B4513';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(canvas.width * 0.1, canvas.height * 0.8, 15, 0, Math.PI * 2);
            ctx.stroke();
            
            // Draw elastic bands
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.1 - 10, canvas.height * 0.8 - 10);
            ctx.lineTo(canvas.width * 0.1 + Math.sin(time * 2) * 20, canvas.height * 0.5);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.1 + 10, canvas.height * 0.8 - 10);
            ctx.lineTo(canvas.width * 0.1 + Math.sin(time * 2) * 20, canvas.height * 0.5);
            ctx.stroke();
            
            // Draw blocks
            const blockSize = 20;
            const colors = ['#FF006E', '#00D9FF', '#FFB703', '#06D6A0'];
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    const x = canvas.width * 0.5 + col * blockSize;
                    const y = canvas.height * 0.2 + row * blockSize;
                    ctx.fillStyle = colors[(row + col) % colors.length];
                    ctx.fillRect(x, y, blockSize - 2, blockSize - 2);
                }
            }
            
            // Draw trajectory line
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.1, canvas.height * 0.8);
            ctx.lineTo(canvas.width * 0.8, canvas.height * 0.3);
            ctx.stroke();
            ctx.setLineDash([]);
            
            animationId = requestAnimationFrame(animate);
        };
        
        animate();
        
        canvas._cleanup = () => {
            cancelAnimationFrame(animationId);
        };
    }
}
