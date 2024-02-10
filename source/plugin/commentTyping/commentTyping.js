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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:999999';
    document.body.appendChild(canvas);
    const context = canvas.getContext('2d');
    let particles = [];
    let particlePointer = 0;
    const frames = 120;
    let framesRemain = frames;
    let rendering = false;
    let animationFrameId = null;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getColor(el) {
        if (POWERMODE.colorful) {
            const u = getRandom(0, 360);
            return `hsla(${getRandom(u - 10, u + 10)}, 100%, ${getRandom(50, 80)}%, 1)`;
        } else {
            return window.getComputedStyle(el).color;
        }
    }

    function getCaret() {
        // 省略getCaret函数的具体实现，保持不变
    }

    function createParticle(x, y, color) {
        return {
            x: x,
            y: y,
            alpha: 1,
            color: color,
            velocity: {
                x: -1 + Math.random() * 2,
                y: -3.5 + Math.random() * 2
            }
        };
    }

    function POWERMODE() {
        const caret = getCaret();
        for (let i = 0; i < 5 + Math.round(Math.random() * 10); i++) {
            particles[particlePointer] = createParticle(caret.x, caret.y, caret.color);
            particlePointer = (particlePointer + 1) % 500;
        }
        framesRemain = frames;
        if (!rendering) {
            loop();
        }
        // 省略摇晃效果的具体实现，保持不变
    }

    function loop() {
        animationFrameId = requestAnimationFrame(loop);
        if (framesRemain > 0) {
            framesRemain--;
            rendering = true;
        } else {
            rendering = false;
            cancelAnimationFrame(animationFrameId);
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            if (particle.alpha <= 0.1) return;
            particle.velocity.y += 0.075;
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            particle.alpha *= 0.96;
            context.globalAlpha = particle.alpha;
            context.fillStyle = particle.color;
            context.fillRect(Math.round(particle.x - 1.5), Math.round(particle.y - 1.5), 3, 3);
        });
    }

    POWERMODE.colorful = true;
    POWERMODE.shake = false;
    document.body.addEventListener('input', POWERMODE);

    return POWERMODE;
});