import Path from './path'

export default {
  name: 'Bars',

  props: {
    data: {
      type: Array,
      required: true
    },
    autoDraw: Boolean,
    barHeight: {
      type: Number,
      default: 8
    },
    growDuration: {
      type: Number,
      default: 0.5
    },
    gradient: {
      type: Array,
      default: () => ['#000']
    },
    max: {
      type: Number,
      default: -Infinity
    },
    min: {
      type: Number,
      default: Infinity
    },
    height: Number,
    width: Number,
    flip: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Number,
      default: 4
    }
  },

  render (h) {
    if (!this.data || this.data.length < 2) return
    const { width, height, padding } = this
    const viewWidth = width || 300
    const viewHeight = height || 600

    const boundary = {
      minX: padding,
      minY: padding,
      maxX: viewWidth - padding,
      maxY: viewHeight - padding
    }
    const props = this.$props

    props.boundary = boundary
    props.id = 'vue-bars-' + this._uid

    return h('svg', {
      attrs: {
        width: width || '100%',
        height: height || '100%',
        viewBox: `0 0 ${viewWidth} ${viewHeight}`,
        overflow: 'scroll'
      }
    }, [
      h(Path, {
        props,
        ref: 'path'
      })
    ])
  }
}
