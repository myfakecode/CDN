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

    function getCaretCoordinates(element, position) {
        const div = document.createElement('div');
        document.body.appendChild(div);
        const style = div.style;
        const computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;
        style.whiteSpace = 'pre-wrap';
        if (element.nodeName !== 'INPUT') style.wordWrap = 'break-word';
        style.position = 'absolute';
        style.visibility = 'hidden';
        Object.assign(style, {
            left: '0px',
            top: '0px'
        });
        style.fontSize = computed.fontSize;
        style.fontFamily = computed.fontFamily;
        div.textContent = element.value.substring(0, position);
        const span = document.createElement('span');
        div.appendChild(span);
        span.textContent = element.value.substring(position) || '.';
        const coordinates = {
            top: span.offsetTop + parseInt(computed.borderTopWidth),
            left: span.offsetLeft + parseInt(computed.borderLeftWidth)
        };
        document.body.removeChild(div);
        return coordinates;
    }

    function getCaret() {
        const el = document.activeElement;
        let bcr;
        if (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && el.getAttribute('type') === 'text')) {
            const offset = getCaretCoordinates(el, el.selectionStart);
            bcr = el.getBoundingClientRect();
            return {
                x: offset.left + bcr.left,
                y: offset.top + bcr.top,
                color: getColor(el)
            };
        }
        const selection = window.getSelection();
        if (selection.rangeCount) {
            const range = selection.getRangeAt(0);
            let startNode = range.startContainer;
            if (startNode.nodeType === document.TEXT_NODE) {
                startNode = startNode.parentNode;
            }
            bcr = range.getBoundingClientRect();
            return {
                x: bcr.left,
                y: bcr.top,
                color: getColor(startNode)
            };
        }
        return { x: 0, y: 0, color: 'transparent' };
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
        if (POWERMODE.shake) {
            const intensity = 1 + 2 * Math.random();
            const x = intensity * (Math.random() > 0.5 ? -1 : 1);
            const y = intensity * (Math.random() > 0.5 ? -1 : 1);
            document.body.style.marginLeft = x + 'px';
            document.body.style.marginTop = y + 'px';
            setTimeout(() => {
                document.body.style.marginLeft = '';
                document.body.style.marginTop = '';
            }, 75);
        }
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

    POWERMODE.colorful = true; // make power mode colorful
    POWERMODE.shake = false; // turn off shake
    document.body.addEventListener('input', POWERMODE);

    return POWERMODE;
});