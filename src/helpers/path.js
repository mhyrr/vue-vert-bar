import { generateGradientStepsCss } from './gradient'

/**
 *  Calculate the coordinate
 * @param  {number[]|object[]}  arr
 * @param  {object}             boundary
 * @return {object[]}
 */
export function genPoints (inArr, { minX, minY, maxX, maxY }, { max, min }) {
  let arr = inArr.map(item => (typeof item === 'number' ? item : item.value))

  //WTF
  const minValue = 0//Math.min(...arr, min) - 0.001
  const gridY = (maxY - minY) / (arr.length - 1)
  const gridX = (maxX - minX) / (Math.max(...arr, max) + 0.001 - minValue)


  // const gridX = (maxX - minX) / (arr.length - 1)
  // const gridY = (maxY - minY) / (Math.max(...arr, max) + 0.001 - minValue)

  return arr.map((value, index) => {
    // console.log(value, gridX, maxX, minValue)
    const title = typeof inArr[index] === 'number' ? inArr[index] : inArr[index].title;
    return {
      y: index * gridY + minY,
      x:
        maxX -
        (value - minValue) * gridX +
        +(index === arr.length - 1) * 0.00001 -
        +(index === 0) * 0.00001,

      // x: index * gridX + minX,
      // y:
      //   maxY -
      //   (value - minValue) * gridY +
      //   +(index === arr.length - 1) * 0.00001 -
      //   +(index === 0) * 0.00001,
      v: title
    }
  })
}

export function genBars (_this, arr, h) {
  let { minX, minY, maxX, maxY } = _this.boundary
  const totalHeight = (maxY) / (arr.length-1)

  // console.log(maxY, minY, maxX, minX, totalHeight)

  // console.log(_this.barHeight)
  if (!_this.barHeight) {
    _this.barHeight = totalHeight - (_this.padding || 5)
  }
  if (!_this.rounding) {
    _this.rounding = 1
  }
  // console.log(_this.barHeight)

  // const totalWidth = (maxX) / (arr.length-1)
  // if (!_this.barWidth) {
  //   _this.barWidth = totalWidth - (_this.padding || 5)
  // }
  // if (!_this.rounding) {
  //   _this.rounding = 2
  // }

  let gradients = 0
  if (_this.gradient && _this.gradient.length > 1) {
    gradients = generateGradientStepsCss(_this.gradient[0], _this.gradient[1], (arr.length-1))
  }
  const offsetY = (totalHeight - _this.barHeight) / 2
  // const offsetX = (totalHeight - _this.barHeight) / 2

  return arr.map((item, index) => {
    return h('rect', {
      attrs: {
        id: `bar-id-${index}`,
        fill: (gradients ? gradients[index] : (_this.gradient[0] ? _this.gradient[0] : '#000')),
        // x: item.x - offsetX,
        // y: 0,
        y: item.y - offsetY,
        x: 0,

        // width: _this.barWidth,
        // height: (maxY - item.y),

        height: _this.barHeight,
        width: (maxX - item.x),

        rx: _this.rounding,
        ry: _this.rounding
      }
    }, [
      h('animate', {
        attrs: {
          attributeName: 'width',
          from: 0,
          to: (maxX - item.x),
          dur: `${_this.growDuration}s`,
          fill: 'freeze'
        }
      }),
      h('title', {}, [item.v])
    ])
  })
}
