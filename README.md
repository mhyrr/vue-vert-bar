<div align="center">
  <img src="https://raw.githubusercontent.com/mhyrr/vue-vert-bar/master/img/logo.png" width="500" alt="Vue Bars">
  <br>
  <h1>Vue Vertical Bars</h1>
  <p>🌈 Simple, vertical spark bars for Vue.js</p>
  <p><a href="https://github.com/DeviaVir/vue-bar">Modified from the original vue bars by DeviaVir</a></p>
  <br>
  <a href="https://www.npmjs.org/package/vuevertbars"><img src="https://img.shields.io/npm/v/vuebars.svg?style=flat-square" alt="npm"></a>
  <img src="https://img.shields.io/badge/vue-^2.2-4fc08d.svg?colorA=2c3e50&style=flat-square" alt="vue">
</div>

<br>

## Installation

```shell
npm i vuebars -S
```

## Usage

```js
import Vue from 'vue'
import Bars from 'vuevertbars'

Vue.use(Bars)
```

[Live Demo](https://mhyrr.github.io/vue-vert-bar/index.html)

*vue template*

```vue
<bars
  :data="[1, 2, 5, 9, 5, 10, 3, 5, 2, 5, 1, 8, 2, 9, 0]"
  :gradient="['#6fa8dc', '#42b983']">
</bars>
```

## Inspired by

- [vuebars](https://github.com/DeviaVir/vue-bar) - 🌈 Simple, elegant spark bars for Vue.js
- [vuetrend](https://www.npmjs.org/package/vuetrend) - 📈 Simple, elegant spark lines

## API

#### SVG Props

By default, all properties not recognized by Vue Bars will be delegated to the SVG. The line inherits these properties if none of its own override them.

Additionally you can use the following properties to customize your bar graph further:

```
- rounding // specify how round your bars should be
- barHeight // specify how tall your bars should be

```

#### `data`
| Type            | Required | Default     |
|-----------------|----------|-------------|
| [Number\|Object] | ✓        | `undefined` |

The data accepted by Vue Bars is incredibly simple: An array of y-axis values to graph.

Vue Bars takes care of normalization, so don't worry about ensuring the data is in a specific range.

This does mean that all data points will be evenly-spaced. If you have irregularly-spaced data, it will not be properly represented.

As of v1.2.0, you may supply an array of data objects with a `value` property.

###### Example
```vue
<bars :data="[120, 149, 193.4, 200, 92]" />
<bars :data="[{ value: 4 }, { value: 6 }, { value: 8 }]" />
```


#### `gradient`
| Type     | Required | Default     |
|----------|----------|-------------|
| [String] | ✕        | `undefined` |

Vue Barssupports vertical gradients. It accepts an array of 2 colour values, and will fade evenly between them from left to right.

Colour should be specified as a full HEX value.

###### Example
```vue
<bars :gradient="['#00FFFF', '#FF00FF']" />
```

#### `height`
| Type     | Required | Default     |
|----------|----------|-------------|
| Number   | ✕        | `undefined` |

Set an explicit height for your SVG. By default it ensures a 1:4 aspect ratio with the width, and the width expands to fill the container.

Note that in _most_ cases it is sufficient to leave this blank, and just control the size of the parent container.

###### Example
```vue
<bars :width="200" :height="200" />
```


#### `padding`
| Type     | Required | Default     |
|----------|----------|-------------|
| Number   | ✕        | `8`         |

If you set a very large `strokeWidth` on your line, you may notice that it gets "cropped" towards the edges. This is because SVGs don't support overflow.

By increasing this number, you expand the space around the line, so that very thick lines aren't cropped.

In most cases you don't need to touch this value.

###### Example
```vue
<bars padding="18" />
```

#### `width`
| Type     | Required | Default     |
|----------|----------|-------------|
| Number   | ✕        | `undefined` |

Set an explicit width for your SVG. By default it ensures a 1:4 aspect ratio with the height, expanding to fill the width of the container.

Note that in _most_ cases it is sufficient to leave this blank, and just control the width of the parent container.

###### Example
```vue
<bars :width="200" :height="200" />
```

## Labels

You can pass an array of objects as data value, and give your labels a `title`. On hover, the label will be displayed.

```vue
    <bars
      :data="[{value: 0, title: ''}, {value: 1, title: 'test1'}, {value: 5, title: 'test5'}, {value: 2, title: 'test2'}, {value: 1, title: 'test1'}]"
      :gradient="gradient"
      :barWidth="5"
      :growDuration="1">
    </bars>
```

## On-the-fly reloading

Make sure you use pass the same variable for your `data` as for the `key`, this will make sure Vue recognizes changes to your data array,
and consequently forces a reload of the instance.

## TODO
- Unit test


## License
MIT
