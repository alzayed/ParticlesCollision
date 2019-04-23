var canv = document.getElementById("canvas");
var c = canv.getContext("2d");
var particle;
var particles = [];
var gravity = 1;
var x;
var y;
var color;
var frame;
var radius = 5;
var numberOfBalls = 300;
var thereIsOverLapp = false;
var friction = 1;
var hitFriction = 0.90;
var v = 30;
var mass = 10;

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
    var tempParticle = new Particle(x, y, radius, color);
    while(isTouchEdge(tempParticle)) {
        randomizeIt();
        tempParticle = new Particle(x, y,radius, color);
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
    randomizeIt();
    
    particles.push(new Particle(canv.width/2, canv.height/2, 10, 'red'));

    for (let i = 0; i < numberOfBalls; i++) {
        randomizeIt();
        var tempParticle = getUniqueDistance(particles);
        particles.push(tempParticle);
    }

    animate();
}

init();