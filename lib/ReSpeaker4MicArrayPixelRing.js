const gpio = require('@voice-engine/core').gpio
const Apa102 = require('./Apa102')
const Promise = require('bluebird')
const PixelRing = require('@voice-engine/core').PixelRing

class ReSpeaker4MicArrayPixelRing extends PixelRing {
  constructor () {
    super(new Apa102(12))

    this.pin = gpio(5)
  }

  init () {
    return this.pin.mode(gpio.OUT).then(() => {
      return this.pin.write(true)
    }).then(() => {
      return Promise.delay(1000)
    }).then(() => {
      return super.init()
    })
  }

  stop () {
    return super.stop().then(() => {
      this.pin.write(false)
    })
  }

  static create () {
    return new ReSpeaker4MicArrayPixelRing()
  }
}

module.exports = ReSpeaker4MicArrayPixelRing
