(function() {
  var hasTouchSupport, initialize;
  hasTouchSupport = function() {
    var _a, _b, event;
    if ((function(){ for (var _a=0, _b=document.length; _a<_b; _a++) { if (document[_a] === "createTouch") return true; } return false; }).call(this)) {
      return true;
    }
    try {
      event = document.createEvent("TouchEvent");
      return !!event.initTouchEvent;
    } catch (error) {
      return false;
    }
  };
  initialize = function() {
    var beginFocus, endFocus, focus, focusX, focusY, i, img, moveFocus, particles, particlesContainer;
    particles = [];
    particlesContainer = document.getElementById('particles');
    for (i = 0; i < 20; i++) {
      img = new Image();
      img.src = "images/particle-" + i % 9 + ".png";
      img.style['position'] = 'absolute';
      img.style['top'] = '0px';
      img.style['left'] = '0px';
      particlesContainer.appendChild(img);
      particles.push({
        x: Math.random() * 1024,
        y: Math.random() * 768,
        scale: Math.random() * 0.95 + 0.05,
        dir: Math.random() * 2 * Math.PI,
        sprite: Juni(img)
      });
    }
    focus = false;
    focusX = 0;
    focusY = 0;
    window.setInterval(function() {
      var _a, _b, _c, _d, particle;
      _a = []; _c = particles;
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        particle = _c[_b];
        _a.push((function() {
          particle.sprite.moveTo(particle.x, particle.y).scaleTo(particle.scale);
          if (!(focus)) {
            particle.x += (Math.cos(particle.dir) * particle.scale) * 8;
            particle.y += (Math.sin(particle.dir) * particle.scale) * 8;
            particle.x < -250 ? (particle.x = 1024) : null;
            particle.x > 1024 + 250 ? (particle.x = -250) : null;
            particle.y < -250 ? (particle.y = 768) : null;
            return particle.y > 768 + 250 ? (particle.y = -250) : null;
          } else {
            particle.x = particle.x + (focusX - particle.x) / 10;
            return (particle.y = particle.y + (focusY - particle.y) / 10);
          }
        })());
      }
      return _a;
    }, 1000 / 70);
    beginFocus = function(event) {
      event.preventDefault();
      focus = true;
      if (event.targetTouches) {
        focusX = event.targetTouches[0].pageX - 250 / 2;
        focusY = event.targetTouches[0].pageY - 250 / 2;
      } else {
        focusX = event.clientX;
        focusY = event.clientY;
      }
      return true;
    };
    moveFocus = function(event) {
      event.preventDefault();
      if (event.targetTouches) {
        focusX = event.targetTouches[0].pageX - 250 / 2;
        focusY = event.targetTouches[0].pageY - 250 / 2;
      } else {
        focusX = event.clientX;
        focusY = event.clientY;
      }
      return false;
    };
    endFocus = function(event) {
      var _a, _b, _c, particle;
      focus = false;
      _b = particles;
      for (_a = 0, _c = _b.length; _a < _c; _a++) {
        particle = _b[_a];
        particle.dir = Math.random() * 2 * Math.PI;
      }
      return true;
    };
    if (hasTouchSupport()) {
      document.addEventListener('touchstart', beginFocus, false);
      document.addEventListener('touchmove', moveFocus, false);
      document.addEventListener('touchend', endFocus, false);
    } else {
      document.addEventListener('mousedown', beginFocus, false);
      document.addEventListener('mousemove', moveFocus, false);
      document.addEventListener('mouseup', endFocus, false);
    }
    return null;
  };
  window.addEventListener('DOMContentLoaded', initialize, false);
})();
