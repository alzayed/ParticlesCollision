function Particle(x, y, radius, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass = 1;
    this.color = color;
    this.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5
    };

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        c.globalAlpha = 0.2;
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    }

    this.update = function() {
        if(isTouchCeilOrGround(this)) {
            this.velocity.y = -this.velocity.y;
        }
        if(isTouchRightOrLeftSides(this)) {
            this.velocity.x = -this.velocity.x;
        }
        
        for(let i = 0; i < particles.length; i++) {
            if(this === particles[i]) continue;
            if(isTwoParticlesHit(this, particles[i])) {
                resolveCollision(this, particles[i]);
            }
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    }
}