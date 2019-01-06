function transitionColor(from, to, count) {
  count = count + 1;
  var int = parseInt(from, 16); // 100
  var intTo = parseInt(to, 16); // 50
  var list = []; // 5
  var diff = int - intTo; // 50
  var isNegative = diff < 0; // false
  var one = diff / count; // 10
 
  list.push(from);
  for (var i = 1; i <= count; i++) {
    list.push(Math.floor(int - (one * i)).toString(16));
  }
 
  return list
}
 
function transition(from, to, count) {
  count = count || 3;
  var r = from.slice(0, 2), g = from.slice(2, 4), b = from.slice(4, 6);
  var rt = to.slice(0, 2), gt = to.slice(2, 4), bt = to.slice(4, 6);
  var allR = transitionColor(r, rt, count);
  var allG = transitionColor(g, gt, count);
  var allB = transitionColor(b, bt, count);
  var list = [];
 
  allR.forEach(function(_, i) {
    list.push('' + allR[i] + allG[i] + allB[i]);
  });
 
  return list
}
 
function generateGradientStepsCss(from, to, count) {
  from = from.replace('#', '');
  to = to.replace('#', '');
  var values = transition(from, to, count);
  var total = 100 / (count + 1);
  var obj = [];
  for (var i = 0; i <= count + 1; i++) {
    obj.push({percentage: Math.floor(total * i), value: values[i]});
  }
  return obj.map(function(value) {
    return '#' + value.value
  })
}

/**
 *  Calculate the coordinate
 * @param  {number[]|object[]}  arr
 * @param  {object}             boundary
 * @return {object[]}
 */
function genPoints (inArr, ref, ref$1, flip) {
  var minX = ref.minX;
  var minY = ref.minY;
  var maxX = ref.maxX;
  var maxY = ref.maxY;
  var max = ref$1.max;
  var min = ref$1.min;

  var arr = inArr.map(function (item) { return (typeof item === 'number' ? item : item.value); });

  //WTF
  var minValue = 0;//Math.min(...arr, min) - 0.001
  var gridY = (maxY - minY) / (arr.length - 1);
  var gridX = (maxX - minX) / (Math.max.apply(Math, arr.concat( [max] )) + 0.001 - minValue);


  // const gridX = (maxX - minX) / (arr.length - 1)
  // const gridY = (maxY - minY) / (Math.max(...arr, max) + 0.001 - minValue)

  return arr.map(function (value, index) {
    // console.log(value, gridX, maxX, minValue)
    var title = typeof inArr[index] === 'number' ? inArr[index] : inArr[index].title;
    return {
      y: index * gridY + minY,
      x:
        flip ?
          maxX - (value - minValue) * gridX +
          +(index === arr.length - 1) * 0.00001 -
          +(index === 0) * 0.00001
          : maxX -
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

function genBars (_this, arr, h, flip) {
  var ref = _this.boundary;
  var minX = ref.minX;
  var minY = ref.minY;
  var maxX = ref.maxX;
  var maxY = ref.maxY;
  var totalHeight = (maxY) / (arr.length-1);

  // console.log(maxY, minY, maxX, minX, totalHeight)

  // console.log(_this.barHeight)
  if (!_this.barHeight) {
    _this.barHeight = totalHeight - (_this.padding || 5);
  }
  if (!_this.rounding) {
    _this.rounding = 1;
  }
  // console.log(_this.barHeight)

  // const totalWidth = (maxX) / (arr.length-1)
  // if (!_this.barWidth) {
  //   _this.barWidth = totalWidth - (_this.padding || 5)
  // }
  // if (!_this.rounding) {
  //   _this.rounding = 2
  // }

  var gradients = 0;
  if (_this.gradient && _this.gradient.length > 1) {
    gradients = generateGradientStepsCss(_this.gradient[0], _this.gradient[1], (arr.length-1));
  }
  var offsetY = (totalHeight - _this.barHeight) / 2;
  // const offsetX = (totalHeight - _this.barHeight) / 2


  return arr.map(function (item, index) {
    console.log(maxX, item.x);
    return h('rect', {
      attrs: {
        id: ("bar-id-" + index),
        fill: (gradients ? gradients[index] : (_this.gradient[0] ? _this.gradient[0] : '#000')),
        // x: item.x - offsetX,
        // y: 0,
        y: item.y - offsetY,
        x: flip ? item.x : 0,

        // width: _this.barWidth,
        // height: (maxY - item.y),

        height: _this.barHeight,
        width: maxX - item.x,

        rx: _this.rounding,
        ry: _this.rounding
      }
    }, [
      h('animate', {
        attrs: {
          attributeName: 'width',
          from: flip ? item.x : 0,
          to: maxX - item.x,
          dur: ((_this.growDuration) + "s"),
          fill: 'freeze'
        }
      }),
      h('title', {}, [item.v])
    ])
  })
}

var Path = {
  props: ['data', 'boundary', 'barHeight', 'id', 'gradient', 'growDuration', 'max', 'min', 'flip'],

  render: function render (h) {
    var ref = this;
    var data = ref.data;
    var boundary = ref.boundary;
    var max = ref.max;
    var min = ref.min;
    var flip = ref.flip;
    var points = genPoints(data, boundary, { max: max, min: min }, flip );

    console.log (points);
    var bars = genBars(this, points, h, flip);

    return h('g', {
      attrs: {
        transform: ("scale(1,-1) translate(0,-" + (this.boundary.maxY) + ")")
      }
    }, bars)
  }
};

var Bars$1 = {
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
      default: function () { return ['#000']; }
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

  render: function render (h) {
    if (!this.data || this.data.length < 2) { return }
    var ref = this;
    var width = ref.width;
    var height = ref.height;
    var padding = ref.padding;
    var viewWidth = width || 300;
    var viewHeight = height || 600;

    var boundary = {
      minX: padding,
      minY: padding,
      maxX: viewWidth - padding,
      maxY: viewHeight - padding
    };
    var props = this.$props;

    props.boundary = boundary;
    props.id = 'vue-bars-' + this._uid;

    return h('svg', {
      attrs: {
        width: width || '100%',
        height: height || '100%',
        viewBox: ("0 0 " + viewWidth + " " + viewHeight),
        overflow: 'scroll'
      }
    }, [
      h(Path, {
        props: props,
        ref: 'path'
      })
    ])
  }
};

Bars$1.install = function (Vue) {
  Vue.component(Bars$1.name, Bars$1);
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Bars$1);
}

export default Bars$1;
