declare module 'colorthief' {
  export default class ColorThief {
    getColor(sourceImage: HTMLImageElement, quality?: number): [number, number, number] | null
    getPalette(
      sourceImage: HTMLImageElement,
      colorCount?: number,
      quality?: number
    ): Array<[number, number, number]>
  }
}
