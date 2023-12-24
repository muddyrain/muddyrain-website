/**
 * 获取元素的 transform scale 值
 * @param element
 * @returns
 */
export const getTransformScale = (element: Element) => {
  const computedStyle = window.getComputedStyle(element)
  const transformValue = computedStyle.getPropertyValue('transform')
  let scaleValue = 1
  if (transformValue && transformValue !== 'none') {
    const matrix = new DOMMatrix(transformValue)
    scaleValue = Math.sqrt(matrix.a ** 2 + matrix.b ** 2)
  }
  return scaleValue
}
