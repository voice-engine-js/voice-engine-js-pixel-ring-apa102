const gpio = require('@voice-engine/core').gpio
const Apa102 = require('./Apa102')
const Promise = require('bluebird')
const PixelRing = require('@voice-engine/core').PixelRing

class ReSpeakerCoreV2PixelRing extends PixelRing {
  constructor () {
    super(new Apa102(12))

    this.pin = gpio(66)
  }

  init () {
    return this.pin.mode(gpio.OUT).then(() => {
      return this.pin.write(false)
    }).then(() => {
      return Promise.delay(1000)
    }).then(() => {
      return super.init()
    })
  }

  stop () {
    console.log('off09')
    return super.stop().then(() => {
      console.log('off')
      this.pin.write(true)
    })
  }

  static create () {
    return new ReSpeakerCoreV2PixelRing()
  }
}

module.exports = ReSpeakerCoreV2PixelRing
