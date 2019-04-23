var colors = ['red', 'blue', 'green', 'yellow', 'pink'];

addEventListener('load', function() {
    resizeCanvas();
});

addEventListener('resize', function() {
    resizeCanvas();
});

function resizeCanvas() {
    canv.width = innerWidth;
    canv.height = innerHeight;
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function randomizeIt() {
    x = randomRange(0, canv.width);
    y = randomRange(0, canv.height / 5 * 4);
    color = randomColor(colors);
}

function getDistance(circle1, circle2) {
    var xDistance = circle2.x - circle1.x;
    var yDistance = circle2.y - circle1.y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function isTouchEdge(particle) {
    return isTouchCeilOrGround(particle) || isTouchRightOrLeftSides(particle);
}

function isTouchCeilOrGround(particle) {
    return particle.y - particle.radius <= 0 || particle.y + particle.radius >= canv.height;
}

function isTouchRightOrLeftSides(particle) {
    return particle.x - particle.radius <= 0 || particle.x + particle.radius >= canv.width;
}

function isTwoParticlesHit(particle1, particle2) {
    if(particle1.x === particle2.x && particle1.y === particle2.y) {
        return false;
    }
    var distance = getDistance(particle1, particle2);
    var twoRadius = particle1.radius + particle2.radius;
    return distance < twoRadius;
}

function slowDx(particle) {
    particle.dx = particle.dx * hitFriction;
}

function slowDy(particle) {
    particle.dy = particle.dy * hitFriction;
}

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;
    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;
    // Prevent accedintal overlap of particles
    if(xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        // Grab angle between the two particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);
        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;
        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);
        // Velocity after 1d collision equation
        const v1 = {x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
        const v2 = {x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y};
        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);
        // Swap particle velocity for realistic effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;
        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
}