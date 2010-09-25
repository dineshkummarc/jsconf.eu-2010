(function() {
  var Sprite, deg2rad;
  deg2rad = Math.PI / 180;
  Sprite = function(_a) {
    this.domObject = _a;
    this.rotateX = 0;
    this.rotateY = 0;
    this.rotateZ = 0;
    this.scale = 1.0;
    this.translateX = 0;
    this.translateY = 0;
    this.translateZ = 0;
    this.opacity = 1.0;
    this.transitionEnabled = false;
    this.displayStyle = 'block';
    return this;
  };
  Sprite.prototype.fadeTo = function(value, opts) {
    var transition;
    if (this.transitionEnabled) {
      opts = this.getDefaultTransitionOptions(opts);
      transition = ("all " + (opts['duration']) + " " + (opts['ease']) + " " + (opts['delay']));
      this.domObject.style['-webkit-transition'] = transition;
    }
    this.opacity = value;
    this.domObject.style['opacity'] = this.opacity;
    return this;
  };
  Sprite.prototype.fadeIn = function(opts) {
    return this.fadeTo(1.0, opts);
  };
  Sprite.prototype.fadeOut = function(opts) {
    return this.fadeTo(0.0, opts);
  };
  Sprite.prototype.moveTo = function(x, y, opts) {
    var transition;
    if (this.transitionEnabled) {
      opts = this.getDefaultTransitionOptions(opts);
      transition = ("all " + (opts['duration']) + " " + (opts['ease']) + " " + (opts['delay']));
      this.domObject.style['-webkit-transition'] = transition;
    }
    this.translateX = x;
    this.translateY = y;
    this.composeTransform();
    return this;
  };
  Sprite.prototype.scaleTo = function(s, opts) {
    var transition;
    if (this.transitionEnabled) {
      opts = this.getDefaultTransitionOptions(opts);
      transition = ("all " + (opts['duration']) + " " + (opts['ease']) + " " + (opts['delay']));
      this.domObject.style['-webkit-transition'] = transition;
    }
    this.scale = s + 0.0001;
    this.composeTransform();
    return this;
  };
  Sprite.prototype.rotateTo = function(angle, opts) {
    var transition;
    if (this.transitionEnabled) {
      opts = this.getDefaultTransitionOptions(opts);
      transition = ("-webkit-transform " + (opts['duration']) + " " + (opts['ease']) + " " + (opts['delay']));
      this.domObject.style['-webkit-transition'] = transition;
    }
    this.rotateX = angle;
    this.composeTransform();
    return this;
  };
  Sprite.prototype.stop = function(moveToDestination) {
    this.node.style['-webkit-transition'] = 'all 0s linear';
    return this;
  };
  Sprite.prototype.show = function() {
    return (this.domObject.style['display'] = 'block');
  };
  Sprite.prototype.hide = function() {
    return (this.domObject.style['display'] = 'none');
  };
  Sprite.prototype.composeTransform = function() {
    var cosa, cosb, cosc, s, sina, sinb, sinc, t, transform;
    cosa = Math.cos(deg2rad * this.rotateX);
    sina = Math.sin(deg2rad * this.rotateX);
    cosb = Math.cos(deg2rad * this.rotateY);
    sinb = Math.sin(deg2rad * this.rotateY);
    cosc = Math.cos(deg2rad * this.rotateZ);
    sinc = Math.sin(deg2rad * this.rotateZ);
    t = [[cosa * cosb * this.scale, sina * cosb * this.scale, -sinb * this.scale, 0], [cosa * sinb * sinc - sina * cosc * this.scale, sina * sinb * sinc + cosa * cosc * this.scale, cosb * sinc * this.scale, 0], [cosa * sinb * cosc + sina * sinc * this.scale, sina * sinb * cosc - cosa * sinc * this.scale, cosb * cosc, 0], [this.translateX, this.translateY, this.translateZ, 1]];
    s = "matrix3d(";
    s += t[0][0].toFixed(5) + ", " + t[0][1].toFixed(5) + ", " + t[0][2].toFixed(5) + ", " + t[0][3].toFixed(5) + ", ";
    s += t[1][0].toFixed(5) + ", " + t[1][1].toFixed(5) + ", " + t[1][2].toFixed(5) + ", " + t[1][3].toFixed(5) + ", ";
    s += t[2][0].toFixed(5) + ", " + t[2][1].toFixed(5) + ", " + t[2][2].toFixed(5) + ", " + t[2][3].toFixed(5) + ", ";
    s += t[3][0].toFixed(5) + ", " + t[3][1].toFixed(5) + ", " + t[3][2].toFixed(5) + ", " + t[3][3].toFixed(5);
    s += ")";
    this.domObject.style['-webkit-transform'] = s;
    transform = window.getComputedStyle(this.domObject).webkitTransform;
    return null;
  };
  Sprite.prototype.getDefaultTransitionOptions = function(opts) {
    opts = (typeof opts !== "undefined" && opts !== null) ? opts : {};
    opts['duration'] = (typeof opts['duration'] !== "undefined" && opts['duration'] !== null) ? opts['duration'] : '0s';
    opts['ease'] = (typeof opts['ease'] !== "undefined" && opts['ease'] !== null) ? opts['ease'] : 'linear';
    opts['delay'] = (typeof opts['delay'] !== "undefined" && opts['delay'] !== null) ? opts['delay'] : '0s';
    return opts;
  };
  window.Juni = function(selector) {
    return new Sprite(selector);
  };
  return null;
})();
