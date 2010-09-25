initialize = ->
  sprite = Juni(Sizzle('#play-sprite')[0])
  sprite.rotateTo(90).scaleTo(5).fadeTo(0.5).moveTo(500, 500)
  
  return

window.addEventListener 'DOMContentLoaded', initialize, false