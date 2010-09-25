deg2rad = Math.PI / 180

class Sprite
  constructor: (@domObject) ->
    @rotateX           = 0
    @rotateY           = 0
    @rotateZ           = 0
    @scale             = 1.0
    @translateX        = 0
    @translateY        = 0
    @translateZ        = 0
    @opacity           = 1.0
    @transitionEnabled = false
    
    @displayStyle = 'block'
  
  fadeTo : (value, opts) ->
    if @transitionEnabled
      opts = @getDefaultTransitionOptions(opts)
      transition = "all #{opts['duration']} #{opts['ease']} #{opts['delay']}"
      @domObject.style['-webkit-transition'] = transition
    
    @opacity = value
    
    @domObject.style['opacity'] = @opacity
    return @
    
  fadeIn : (opts) ->
    return @fadeTo(1.0, opts)
    
  fadeOut : (opts) ->
    return @fadeTo(0.0, opts)
    
  moveTo : (x, y, opts) ->
    if @transitionEnabled
      opts = @getDefaultTransitionOptions(opts)
      transition = "all #{opts['duration']} #{opts['ease']} #{opts['delay']}"
      @domObject.style['-webkit-transition'] = transition
    
    @translateX = x
    @translateY = y
    
    @composeTransform()
    return @
  
  scaleTo : (s, opts) ->
    if @transitionEnabled
      opts = @getDefaultTransitionOptions(opts)
      transition = "all #{opts['duration']} #{opts['ease']} #{opts['delay']}"
      @domObject.style['-webkit-transition'] = transition
    
    # funny bug, when you scale to real 0
    @scale = s + 0.0001
    
    @composeTransform()
    return @
  
  rotateTo : (angle, opts) ->
    if @transitionEnabled
      opts = @getDefaultTransitionOptions(opts)
      transition = "-webkit-transform #{opts['duration']} #{opts['ease']} #{opts['delay']}"
      @domObject.style['-webkit-transition'] = transition
    
    @rotateX = angle
    
    @composeTransform()
    return @
    
  stop : (moveToDestination) ->
    @node.style['-webkit-transition'] = 'all 0s linear'
    return @
  
  show : () ->
    @domObject.style['display'] = 'block'
  
  hide : () ->
    @domObject.style['display'] = 'none'
  
  composeTransform : () ->
    cosa = Math.cos(deg2rad * @rotateX)
    sina = Math.sin(deg2rad * @rotateX)
    cosb = Math.cos(deg2rad * @rotateY)
    sinb = Math.sin(deg2rad * @rotateY)
    cosc = Math.cos(deg2rad * @rotateZ)
    sinc = Math.sin(deg2rad * @rotateZ)
    
    t = [
      [cosa * cosb * @scale                     , sina * cosb * @scale                     , -sinb  * @scale     , 0],
      [cosa * sinb * sinc - sina * cosc * @scale, sina * sinb * sinc + cosa * cosc * @scale, cosb * sinc * @scale, 0],
      [cosa * sinb * cosc + sina * sinc * @scale, sina * sinb * cosc - cosa * sinc * @scale, cosb * cosc, 0],
      [@translateX                              , @translateY                              , @translateZ         ,  1]
    ]
    
    s  = "matrix3d("
    s += t[0][0].toFixed(5) + ", " + t[0][1].toFixed(5) + ", " + t[0][2].toFixed(5) + ", " + t[0][3].toFixed(5) + ", "
    s += t[1][0].toFixed(5) + ", " + t[1][1].toFixed(5) + ", " + t[1][2].toFixed(5) + ", " + t[1][3].toFixed(5) + ", "
    s += t[2][0].toFixed(5) + ", " + t[2][1].toFixed(5) + ", " + t[2][2].toFixed(5) + ", " + t[2][3].toFixed(5) + ", "
    s += t[3][0].toFixed(5) + ", " + t[3][1].toFixed(5) + ", " + t[3][2].toFixed(5) + ", " + t[3][3].toFixed(5)
    s += ")"
    
    @domObject.style['-webkit-transform'] = s
    
    transform = window.getComputedStyle(@domObject).webkitTransform
    
    return
  
  getDefaultTransitionOptions : (opts) ->
    opts ?= {}
    opts['duration'] ?= '0s'
    opts['ease'] ?= 'linear'
    opts['delay'] ?= '0s'
    # opts['duration'] ?= '0.5s'
    # opts['ease'] ?= 'ease-in-out'
    # opts['delay'] ?= '0s'
    return opts

window.Juni = (selector) ->
  return new Sprite(selector)
return null
