export const loadImage = (url: string, width: number) => {
  const image = new Image()
  image.src = url
  image.width = width
  return new Promise<{ height: number; image: HTMLImageElement }>((resolve, reject) => {
    if (image) {
      image.onload = () => {
        const aspectRatio = image.naturalHeight / image.naturalWidth // 计算宽高比
        const height = aspectRatio * width // 根据给定宽度计算高度
        resolve({ height, image })
      }
      image.onerror = err => {
        reject(err)
      }
    }
  })
}
