import { genPoints, genBars } from '../helpers/path'

export default {
  props: ['data', 'boundary', 'barHeight', 'id', 'gradient', 'growDuration', 'max', 'min'],

  render (h) {
    const { data, boundary, max, min } = this
    const points = genPoints(data, boundary, { max, min } )

    console.log (points)
    const bars = genBars(this, points, h)

    return h('g', {
      attrs: {
        transform: `scale(1,-1) translate(0,-${this.boundary.maxY})`
      }
    }, bars)
  }
}
