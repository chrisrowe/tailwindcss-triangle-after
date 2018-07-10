const _ = require('lodash')

module.exports = function ({
  triangles,
  variants
}) {

  let baseTriangle = {
    borderColor: 'transparent',
    borderStyle: 'solid',
    content: '""',
    height: 0,
    position: 'absolute',
    pointerEvents: 'none',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 0
  }

  function getTriangle(triangle) {
    let triangleStyles = _.clone(baseTriangle)
    triangleStyles['right'] = triangle.right ? triangle.right : '1rem'
    if (triangle.size.length === 2) {
      var tY = triangle.direction == "up" || triangle.direction == "down" ?
        triangle.size[1] + "px" :
        triangle.size[1] / 2 + "px"
      var tX = triangle.direction == "up" || triangle.direction == "down" ?
        triangle.size[0] / 2 + "px" :
        triangle.size[0] + "px"
    } else {
      var tY = triangle.size + "px"
      var tX = triangle.size + "px"
    }
    switch (triangle.direction) {
      case 'up':
        triangleStyles['borderBottomColor'] = triangle.color
        triangleStyles['borderWidth'] = [0, tX, tY, tX].join(' ')
        break;
      case 'down':
        triangleStyles['borderTopColor'] = triangle.color
        triangleStyles['borderWidth'] = [tY, tX, 0, tX].join(' ')
        break;
      case 'left':
        triangleStyles['borderRightColor'] = triangle.color
        triangleStyles['borderWidth'] = [tY, tX, tY, 0].join(' ')
        break;
      case 'right':
        triangleStyles['borderLeftColor'] = triangle.color
        triangleStyles['borderWidth'] = [tY, 0, tY, tX].join(' ')
        break;
    }

    return triangleStyles
  }

  return function ({ e, addUtilities }) {
    const utilities = _.map(triangles, (triangle, name) => ({
      [`.triangle-after-${e(name)}`]: { position: 'relative' },
      [`.triangle-after-${e(name)}::after`]: getTriangle(triangle)
    }))
    addUtilities(utilities, variants)
  }
}
