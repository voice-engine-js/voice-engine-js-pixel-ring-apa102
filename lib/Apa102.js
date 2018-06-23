const clamp = require('lodash/clamp')
const spi = require('spi-device')

class Apa102 {
  constructor (length) {
    const startFrame = Buffer.alloc(4, '00000000', 'hex')
    const colors = Buffer.alloc(length * 4, 'e0000000', 'hex')
    const endFrame = Buffer.alloc(4, 'ffffffff', 'hex')

    this.length = length
    this.buffer = Buffer.concat([startFrame, colors, endFrame])
    this.colors = this.buffer.slice(4, length * 4 + 4)
  }

  init () {
    return new Promise((resolve, reject) => {
      this.device = spi.open(0, 1, {
        speedHz: 8000000
      }, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  push () {
    return new Promise((resolve, reject) => {
      this.device.transfer([{
        sendBuffer: this.buffer,
        byteLength: this.buffer.length
      }], (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  color (index, red, green, blue, brightness) {
    brightness = brightness || 0
    brightness = brightness < 1 ? 0 : Math.min(255, Math.ceil(brightness * 31 / 255))

    index = index * 4

    this.colors[index] = brightness | 0b11100000
    this.colors[index + 1] = clamp(Math.floor(blue), 0, 255)
    this.colors[index + 2] = clamp(Math.floor(green), 0, 255)
    this.colors[index + 3] = clamp(Math.floor(red), 0, 255)
  }
}

module.exports = Apa102
