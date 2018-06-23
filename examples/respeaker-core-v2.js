const pixelRing = require('..').reSpeakerCoreV2PixelRing

const ring = pixelRing(pixelRing())

ring.init().then(() => {
  const floatMod = (n, m) => {
    return n - Math.floor(n / m) * m
  }

  ring.animate(ring.length, 4000, (f) => {
    const p0 = floatMod(ring.length * 10 - f * 4, ring.length)
    const p1 = floatMod(f, ring.length)

    for (let index = 0; index < ring.length; index++) {
      const value0 = floatMod(p0 - index + ring.length, ring.length) / (ring.length - 1)
      const value1 = floatMod(p1 - index + ring.length, ring.length) / (ring.length - 1)

      ring.color(index, value0 * 255 - 128, 0, value1 * 255 - 128, 255)
    }
  })
}).catch(err => {
  console.error(err)
})

process.on('SIGINT', () => {
  ring.stop().then(() => process.exit())
})

console.log('Shows a red and a blue colored rotating pattern on the LED ring.')
console.log('Exit the program with Ctrl-C.')
