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
    var beginFocus, endFocus, focus, focusPoints, i, img, moveFocus, particles, particlesContainer;
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
    focusPoints = [];
    window.setInterval(function() {
      var _a, _b, _c, _d, particle;
      i = 0;
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
            particle.y > 768 + 250 ? (particle.y = -250) : null;
          } else {
            particle.x = particle.x + (focusPoints[i % focusPoints.length].x - particle.x) / 10;
            particle.y = particle.y + (focusPoints[i % focusPoints.length].y - particle.y) / 10;
          }
          return i++;
        })());
      }
      return _a;
    }, 1000 / 70);
    beginFocus = function(event) {
      var point;
      event.preventDefault();
      event.targetTouches ? (point = {
        x: event.targetTouches[0].pageX - 250 / 2,
        y: event.targetTouches[0].pageY - 250 / 2
      }) : (point = {
        x: event.clientX,
        y: event.clientY
      });
      focusPoints.push(point);
      focus = true;
      return true;
    };
    moveFocus = function(event) {
      var _a;
      event.preventDefault();
      if (focus) {
        if (event.targetTouches) {
          _a = event.targetTouches.length;
          for (i = 0; (0 <= _a ? i <= _a : i >= _a); (0 <= _a ? i += 1 : i -= 1)) {
            event.targetTouches[i] ? (focusPoints[i] = {
              x: event.targetTouches[i].pageX - 250 / 2,
              y: event.targetTouches[i].pageY - 250 / 2
            }) : null;
          }
        } else {
          focusPoints[0] = {
            x: event.clientX,
            y: event.clientY
          };
        }
      }
      return false;
    };
    endFocus = function(event) {
      var _a, _b, _c, _d, _e, _f, particle;
      if (event.targetTouches) {
        if (event.targetTouches.length === 0) {
          focus = false;
          focusPoints = [];
          _b = particles;
          for (_a = 0, _c = _b.length; _a < _c; _a++) {
            particle = _b[_a];
            particle.dir = Math.random() * 2 * Math.PI;
          }
        }
      } else {
        focus = false;
        focusPoints = [];
        _e = particles;
        for (_d = 0, _f = _e.length; _d < _f; _d++) {
          particle = _e[_d];
          particle.dir = Math.random() * 2 * Math.PI;
        }
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
