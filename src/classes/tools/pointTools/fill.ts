import PointTool from '../pointTool'

export default class Fill extends PointTool {
  // Static variables
  imageData: ImageData;
  imagePixelArea: Uint8ClampedArray;
  targetColor:Uint8ClampedArray | Array <number> = [];
  canvasWidth = 0;
  canvasHeight = 0;
  fillColor = 155;

  // Dynamic variables
  pixelStack: Array <Array <number>> = [];

  startDraw (): void {
    this.canvasWidth = this.board.canvas.width || 0;
    this.canvasHeight = this.board.canvas.height || 0;

    this.imageData = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    this.imagePixelArea = this.imageData.data;

    this.targetColor = this.ctx.getImageData(this.mouseX, this.mouseY, 1, 1).data;
    this.pixelStack.push([this.mouseX, this.mouseY]);

    this.draw();
  }

  draw (): void {
    while (this.pixelStack.length) {
      const pixel = this.pixelStack.pop();

      if (!pixel) {
        continue;
      }

      const doFill = this.isEqualColor(this.getPixelColor(pixel), this.targetColor);
    }
  }

  // Pixel data functions
  pixelStartIndex (x: number, y: number): number {
    return y * this.canvasWidth * 4 + x * 4;
  }

  getPixelColor (pixel: Array <number>): Array <number> {
    const pixelStart = this.pixelStartIndex(pixel[0], pixel[1]);

    if (this.imagePixelArea[pixelStart] === undefined || this.imagePixelArea[pixelStart + 3] === undefined) {
      return [0, 0, 0, 0];
    }

    return [
      this.imagePixelArea[pixelStart],
      this.imagePixelArea[pixelStart + 1],
      this.imagePixelArea[pixelStart + 2],
      this.imagePixelArea[pixelStart + 3]
    ]
  }

  isEqualColor (pixelA: Uint8ClampedArray | Array <number>, pixelB: Uint8ClampedArray | Array <number>): boolean {
    return pixelA.join(',') === pixelB.join(',');
  }
}
