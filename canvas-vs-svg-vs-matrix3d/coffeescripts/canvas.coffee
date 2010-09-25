hasTouchSupport = () ->
  if "createTouch" in document
      return true
  try
    event = document.createEvent("TouchEvent")
    return !!event.initTouchEvent
  catch error
    return false

initialize = ->
  particles = []
  canvas = document.getElementById 'canvas'
  context = canvas.getContext '2d'
  
  for i in [0...20]
    particles.push({
      x      : Math.random() * 1024
      y      : Math.random() * 768
      scale  : Math.random() * 0.95 + 0.05
      dir    : Math.random() * 2 * Math.PI
      r      : Math.floor(Math.random()*255),
      g      : Math.floor(Math.random()*255),
      b      : Math.floor(Math.random()*255),
      a      : Math.random()
    })

  focus = false
  focusPoints = []

  window.setInterval(->
    context.clearRect(0,0, 768, 1024)
    i = 0
    for particle in particles
      
      context.fillStyle = "rgba(#{particle.r}, #{particle.g}, #{particle.b}, #{particle.a})"
      
      context.beginPath()
      # this is the function to create a circle
      context.arc(particle.x, particle.y + 125, particle.scale * 125, 0, Math.PI * 2, true)
      context.closePath()
      
      context.fill()
      
      unless focus
        particle.x += (Math.cos(particle.dir) * particle.scale) * 8
        particle.y += (Math.sin(particle.dir) * particle.scale) * 8
      
        if particle.x < -250
          particle.x = 1024
        if particle.x > 1024 + 250
          particle.x = -250
        if particle.y < -250
          particle.y = 768
        if particle.y > 768 + 250
          particle.y = -250
      else
        particle.x = particle.x + (focusPoints[i % focusPoints.length].x - particle.x) / 10
        particle.y = particle.y + (focusPoints[i % focusPoints.length].y - particle.y) / 10
      
      i++
      
  , 1000 / 70)
  
  beginFocus = (event) ->
    event.preventDefault()
    
    if event.targetTouches
      point = {
        x : event.targetTouches[0].pageX - 250 / 2,
        y : event.targetTouches[0].pageY - 250 / 2
      }
    else
      point = {
        x : event.clientX,
        y : event.clientY
      }
    
    focusPoints.push(point)
    # focusPoints[0] = point
    focus = true
    
    return true
  
  moveFocus = (event) ->
    event.preventDefault()

    if focus
      if event.targetTouches
        for i in [0..event.targetTouches.length]
          if event.targetTouches[i]
            focusPoints[i] = {
              x : event.targetTouches[i].pageX - 250 / 2,
              y : event.targetTouches[i].pageY - 250 / 2
            } 
      else
        focusPoints[0] = {
          x : event.clientX,
          y : event.clientY
        }
    
    return false
  
  endFocus = (event) ->
    if event.targetTouches
      if event.targetTouches.length == 0
        focus = false
        focusPoints = []

        for particle in particles
          particle.dir   = Math.random() * 2 * Math.PI
    else
      focus = false
      focusPoints = []

      for particle in particles
        particle.dir   = Math.random() * 2 * Math.PI

    return true
  
  if hasTouchSupport()
    document.addEventListener('touchstart',  beginFocus, false)
    document.addEventListener('touchmove', moveFocus, false)
    document.addEventListener('touchend', endFocus, false)
  else
    document.addEventListener('mousedown',  beginFocus, false)
    document.addEventListener('mousemove', moveFocus, false)
    document.addEventListener('mouseup', endFocus, false)

  return

window.addEventListener 'DOMContentLoaded', initialize, false