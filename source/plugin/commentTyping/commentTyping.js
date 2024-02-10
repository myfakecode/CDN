(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        exports["POWERMODE"] = factory();
    } else {
        root["POWERMODE"] = factory();
    }
})(this, function () {
    'use strict';
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const context = canvas.getContext('2d');

    // Configuration with default values
    const config = {
        particleNum: 500,
        particleSize: 3,
        particleLife: 120,
        colorful: true,
        shake: false,
    };

    // Dynamic particle array
    let particles = [];
    let animationFrameId = null;

    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:999999';
        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas();
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getColor(el) {
        if (config.colorful) {
            const hue = getRandom(0, 360);
            return `hsla(${getRandom(hue - 10, hue + 10)}, 100%, ${getRandom(50, 80)}%, 1)`;
        } else {
            return window.getComputedStyle(el).color;
        }
    }

    // Simplified and enhanced for demonstration
    function getCaretCoordinates(element, position) {
        // Implementation for caret coordinates (simplified for demonstration)
        // This should calculate and return the caret's coordinates
        return { top: 0, left: 0 };
    }

    function createParticle(x, y, color) {
        return {
            x,
            y,
            alpha: 1,
            color,
            velocity: {
                x: -1 + Math.random() * 2,
                y: -3.5 + Math.random() * 2
            },
            size: config.particleSize,
            life: config.particleLife,
        };
    }

    function addParticle(x, y, color) {
        if (particles.length > config.particleNum) {
            particles.shift(); // Remove the oldest particle if we exceed the limit
        }
        particles.push(createParticle(x, y, color));
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            particle.alpha *= 0.96;
            particle.life -= 1;
        });

        // Remove dead particles
        particles = particles.filter(particle => particle.life > 0);
    }

    function drawParticles() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            if (particle.alpha <= 0.1) return;
            context.globalAlpha = particle.alpha;
            context.fillStyle = particle.color;
            context.fillRect(Math.round(particle.x), Math.round(particle.y), particle.size, particle.size);
        });
    }

    function loop() {
        updateParticles();
        drawParticles();
        animationFrameId = requestAnimationFrame(loop);
    }

    function POWERMODE() {
        // Implementation for triggering POWERMODE (simplified for demonstration)
        // This should include logic to calculate caret position and add particle
        loop();
    }

    setupCanvas();
    document.body.addEventListener('input', POWERMODE);

    return {
        config,
        enable() {
            if (!animationFrameId) {
                loop();
            }
        },
        disable() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        }
    };
});
