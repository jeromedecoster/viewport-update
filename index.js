const setNumber = require('set-funcs/set-number')
const Signal = require('signalus-simplex')
const SR = require('scroll-resize')

module.exports = ViewportUpdate

function ViewportUpdate(delay) {
  if (typeof ViewportUpdate.instance === 'object') {
    return ViewportUpdate.instance
  }

  delay = setNumber(delay, 100)
  this.prev = 0
  this.update = new Signal()
  this.cb = this.cb.bind(this)
  this.sr = new SR(this.cb, { delay:delay })
  this.sr.start()

  ViewportUpdate.instance = this
}

ViewportUpdate.prototype.cb = function(data) {
  this.width  = data.width
  this.height = data.height
  this.left   = data.left
  this.top    = data.top
  this.right  = data.right
  this.bottom = data.bottom
  this.update.dispatch(data)
}

ViewportUpdate.prototype.immediate = function() {
  if (Date.now() - this.prev > 10) {
    this.sr.immediate()
    this.prev = Date.now()
  }
}
