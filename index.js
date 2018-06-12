'use strict'
const EventEmitter = require('events').EventEmitter

class Tee extends EventEmitter {
  constructor () {
    super()
    // when node 4 stops being a thing, replace with ...streams
    this.n = arguments.length
    this.streams = new Array(this.n)
    for (let i = 0; i < this.n; i++) {
      const s = arguments[i]
      this.streams[i] = s
      s.on('finish', () => {
        if (--this.n === 0)
          this.emit('finish')
      })
      s.on('drain', () => this.emit('drain'))
    }
    this.writable = true
    this.readable = false
  }

  write (c, e) {
    let ret = true
    this.streams.forEach(s => {
      const r = s.write(c, e)
      ret = ret && r !== false
    })

    return ret
  }

  end (c, e) {
    let ret = true
    this.streams.forEach(s => {
      const r = s.end(c, e)
      ret = ret && r !== false
    })

    return ret
  }
}

module.exports = Tee
