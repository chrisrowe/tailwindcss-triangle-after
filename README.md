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

- `direction`: [`up`, `down`, `left`, `right`]
- `color`: eg. `colors['blue']`
- `width`: eg. `12` (always parsed as integers and generated as px)
- `right`: (optional / default `1rem`): eg. `2rem`. How far from the right of the parent should the pseudo-element be?

Here is the example for adding it to your project plugins

```js
module.exports = {
  // ...
  plugins: [
    // ...
    require('./plugins/triangle-after')({
      triangles: {
        select: {
          direction: 'up',
          color: colors['blue'],
          width: '12'
        },
        next: {
          direction: 'right',
          color: colors['blue-darker'],
          width: '20',
          right: '2rem'
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
  border-bottom-color: #3490dc;
  border-width: 0 6px 10.392px 6px;
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
  border-width: 10px 0 10px 17.32px;
}
```

As per the [tailwind plugin docs](https://tailwindcss.com/docs/plugins/) you can pass variants (responsive, hover, etc.) as a parameter.