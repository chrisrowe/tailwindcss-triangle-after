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
    switch (triangle.direction) {
      case 'up':
        triangleStyles['borderBottomColor'] = triangle.color
        triangleStyles['borderWidth'] = [
          0,
          (parseInt(triangle.width) / 2) + 'px',
          (parseInt(triangle.width) * 0.866) + 'px',
          (parseInt(triangle.width) / 2 + 'px')
        ].join(' ')
        break;
      case 'down':
        triangleStyles['borderTopColor'] = triangle.color
        triangleStyles['borderWidth'] = [
          (parseInt(triangle.width) * 0.866) + 'px',
          (parseInt(triangle.width) / 2 + 'px'),
          0,
          (parseInt(triangle.width) / 2) + 'px'
        ].join(' ')
        break;
      case 'left':
        triangleStyles['borderRightColor'] = triangle.color
        triangleStyles['borderWidth'] = [
          (parseInt(triangle.width) / 2) + 'px',
          (parseInt(triangle.width) * 0.866) + 'px',
          (parseInt(triangle.width) / 2 + 'px'),
          0
        ].join(' ')
        break;
      case 'right':
        triangleStyles['borderLeftColor'] = triangle.color
        triangleStyles['borderWidth'] = [
          (parseInt(triangle.width) / 2) + 'px',
          0,
          (parseInt(triangle.width) / 2 + 'px'),
          (parseInt(triangle.width) * 0.866) + 'px'
        ].join(' ')
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
