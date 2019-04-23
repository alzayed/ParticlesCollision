var canv = document.getElementById("canvas");
var c = canv.getContext("2d");
var particle;
var particles = [];
var gravity = 1;
var x;
var y;
var color;
let dx = randomRange(-7,7);
let dy = randomRange(-7,7);
var frame;
var radius = 10;
var numberOfBalls = 100;
var thereIsOverLapp = false;
var friction = 0.995;
var hitFriction = 0.90;

var mouse = {
    x: canv.width/2,
    y: canv.height/2
}

function animate() {
    frame = requestAnimationFrame(animate);
    c.clearRect(0, 0, canv.width, canv.height);
    particles.forEach(function(particle) {
        particle.update();
    });
}

function getUniqueDistance(particles) {
    randomizeIt();
    var goodDistance = true;
    var tempParticle = new Particle(x, y, radius, dx, dy, color);
    while(isTouchEdge(tempParticle)) {
        randomizeIt();
        tempParticle = new Particle(x, y,radius, dy, dx, color);
    }
    for (let i = 0; i < particles.length; i++) {
        if(isTwoParticlesHit(tempParticle, particles[i])) {
            return getUniqueDistance(particles);
        }
    }
    return tempParticle;
}

function init() {
    resizeCanvas();
    cancelAnimationFrame(frame);
    for (let i = 0; i < numberOfBalls; i++) {
        randomizeIt();
        var tempParticle = getUniqueDistance(particles);
        particles.push(tempParticle);
    }

    animate();
}

init();