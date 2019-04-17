# Triangle After Tailwind Plugin

## Installation

Add this plugin to your project:

```bash
# Install via npm
npm install --save-dev tailwindcss-triangle-after
```

## Usage

This plugin generates styles for CSS based triangles via `::after` pseudo-elements.

The plugin accepts multiple objects where each key defines a class suffix for a triangle name. Triangle options are...

- `color`: _e.g. `colors['blue']`_
- `direction`: _e.g. `up`, `down`, `left` or `right`_
- `right`: (optional / default `1rem`) How far from the right of the parent should the pseudo-element be? _e.g. `2rem`._
- `top`: (optional / default `50%`) How far from the top of the parent should the pseudo-element be?
- `size`: (in pixels) _e.g. an array `[width, height]` or `9` for an equilateral triangle._

Here is the example for adding it to your project plugins

```js
module.exports = {
  // ...
  plugins: [
    // ...
    require('./plugins/triangle-after')({
      triangles: {
        select: {
          color: colors['blue'],
          direction: 'down',
          size: [10, 6],
        },
        next: {
          color: colors['blue-darker'],
          direction: 'right',
          right: '2rem',
          top: '3rem',
          size: 12
        }
      },
    }),
  ],
}
```

This configuration would create the following classes ideal for using for customizing `<select>` elements and adding arrows to pagination links:

```css
.triangle-after-select {
  position: relative;
}

.triangle-after-select::after {
  border-color: transparent;
  border-style: solid;
  content: "";
  height: 0;
  position: absolute;
  pointer-events: none;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  right: 1rem;
  border-top-color: #3490dc;
  border-width: 6px 5px 0 5px;
}

.triangle-after-next {
  position: relative;
}

.triangle-after-next::after {
  border-color: transparent;
  border-style: solid;
  content: "";
  height: 0;
  position: absolute;
  pointer-events: none;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  right: 2rem;
  border-left-color: #1c3d5a;
  border-width: 12px 0 12px 12px;
}
```

As per the [tailwind plugin docs](https://tailwindcss.com/docs/plugins/) you can pass variants (responsive, hover, etc.) as a parameter.