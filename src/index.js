const Viewport = require('..')

const width  = document.querySelector('td[width]')
const height = document.querySelector('td[height]')
const left   = document.querySelector('td[left]')
const top    = document.querySelector('td[top]')
const right  = document.querySelector('td[right]')
const bottom = document.querySelector('td[bottom]')

const tl = document.querySelector('.tl')
const br = document.querySelector('.br')
const bl = document.querySelector('.bl')
const tr = document.querySelector('.tr')

var v1 = new Viewport()
v1.update.add(function() {
  width.textContent  = v1.width
  height.textContent = v1.height
  left.textContent   = v1.left
  top.textContent    = v1.top
  right.textContent  = v1.right
  right.textContent  = v1.right
  bottom.textContent = v1.bottom
  update()
})

var v2 = new Viewport(2500)
v2.update.add(position)

function position(data) {
  tl.style.left = data.left + 'px'
  tl.style.top  = data.top + 'px'

  tr.style.left = data.right - 25 + 'px'
  tr.style.top  = data.top + 'px'

  bl.style.left = data.left + 'px'
  bl.style.top  = data.bottom - 25 + 'px'

  br.style.left = data.right - 25 + 'px'
  br.style.top  = data.bottom - 25 + 'px'
}

document.addEventListener('click', function() {
  if (v2.update.has(position)) {
    v2.update.remove(position)
    console.log('position removed')
  }
  else {
    v2.update.add(position)
    console.log('position added')
  }
})


/////


var elaspsed = []

function update() {
  var list = document.querySelectorAll('.card li')
  var first = list.item(0)
  var last = list.item(7)
  var tmp = time()
  if (elaspsed.length == 2) {
    var ms = elaspsed[1] - elaspsed[0]
    if (ms > 999) ms = 999
    ms = String(ms)
    while (ms.length < 3) ms = '0' + ms
    last.innerHTML = `${tmp} <span>+${ms}</span>`
  } else {
    last.innerHTML = tmp
  }

  first.parentNode.insertBefore(last, first)
}

function time() {
  var d = new Date()
  elaspsed.push(d.getTime())
  if (elaspsed.length > 2) elaspsed.shift()

  var ms = d.getMilliseconds().toString()
  while (ms.length < 3) ms = '0' + ms
  return d.toString().substr(19, 5) + '.' + ms
}
