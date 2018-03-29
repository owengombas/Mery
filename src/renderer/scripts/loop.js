import electron from './imports/electron'

let marginTop = 50
let clickable = true
let actualWindowState = false
const WINDOW = electron.window
const SCREEN = electron.screen

export function setMT (val) {
  marginTop = val
}

export function setClick (val) {
  setWindow(!val)
  clickable = val
}

export default function loop (obj) {
  setInterval(function () {
    getStatut(obj)
  }, 0)
}

function getStatut (obj) {
  if (!clickable) {
    if (obj.radius <= 0) {
      obj.radius = 0.2
    }
    let bounds = WINDOW.getBounds()
    let mousePos = SCREEN.getCursorScreenPoint()

    let newX = mousePos.x - bounds.x
    let newY = mousePos.y - bounds.y - marginTop

    if (WINDOW.isResizable) {
      setWindow(newY > 0)
    }

    obj.posX = newX
    obj.posY = newY
  } else {
    obj.radius = 0
  }
}

function setWindow (val, ignoreMouseOnly = true) {
  if (actualWindowState !== val) {
    if (!ignoreMouseOnly) {
      WINDOW.setAlwaysOnTop(val)
    }
    WINDOW.setIgnoreMouseEvents(val)
    actualWindowState = val
  }
}