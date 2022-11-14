import PointTool from '../pointTool';
import { Pixel } from '@/types/paintTypes';

export default class Fill extends PointTool {
  // Static variables
  imageData: any;
  pixelData: {
    width: number,
    height: number,
    data: Uint32Array,
  } = {
    width: 0,
    height: 0,
    data: new Uint32Array()
  };

  pixelStack: Pixel[] = [];
  checkedPixels: Pixel[] = [];

  fillColor = Number('0xFF000000');
  targetColor:number;

  startDraw (): void {
    this.pixelStack = [];
    this.checkedPixels = [];

    this.pixelData.width = this.board.canvas.width || 0;
    this.pixelData.height = this.board.canvas.height || 0;

    this.imageData = this.ctx.getImageData(0, 0, this.pixelData.width, this.pixelData.height);
    this.pixelData.data = new Uint32Array(this.imageData.data.buffer);
    this.targetColor = this.getPixelColor({ x: this.mouseX, y: this.mouseY });
    this.fillColor = this.getHexNumber(this.ctx.fillStyle);

    if (this.targetColor === this.fillColor) {
      return
    }

    this.pixelStack.push({
      x: this.mouseX,
      y: this.mouseY
    });

    this.drawByColumns();
  }

  draw (): void {
    let iterationCount = 0;

    while (this.pixelStack.length > 0) {
      const pixel: Pixel = this.pixelStack.pop() || { x: -1, y: -1 };
      const pixelColor = this.getPixelColor(pixel);

      iterationCount++;

      if (this.checkedPixels.find(el => el === pixel)) {
        continue;
      }

      if (!this.isValidPixel(pixel) || pixelColor !== this.targetColor) {
        this.checkedPixels.push(pixel);
        continue;
      }

      this.checkedPixels.push(pixel);
      this.fillPixel(pixel);
      this.addClosestPixelsToStash(pixel);
    }

    // Put new data to board
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  drawByColumns (): void {
    while (this.pixelStack.length > 0) {
      const startPixel: Pixel = this.pixelStack.pop() || { x: -1, y: -1 };
      let curY = startPixel.y;
      let isSetleftStartPoint = false;
      let isSetRightStartPoint = false;
      let tempPixel;

      // Go up
      while (curY > 0 && (this.hasPixelTargetColor({ x: startPixel.x, y: curY }) || this.hasPixelAlpha({ x: startPixel.x, y: curY }))) {
        curY--;
      }

      // Go down
      curY++;
      while (curY < this.pixelData.height) {
        tempPixel = {
          x: startPixel.x,
          y: curY
        }

        const hasLeftPixelTargetColor = this.hasPixelTargetColor({ x: startPixel.x - 1, y: curY });
        const hasRightPixelTargetColor = this.hasPixelTargetColor({ x: startPixel.x + 1, y: curY });

        if (isSetleftStartPoint) {
          isSetleftStartPoint = hasLeftPixelTargetColor;
        }

        if (isSetRightStartPoint) {
          isSetRightStartPoint = hasRightPixelTargetColor;
        }

        if (!isSetleftStartPoint && hasLeftPixelTargetColor) {
          this.pixelStack.push({ x: startPixel.x - 1, y: curY });
          isSetleftStartPoint = true;
        }

        if (!isSetRightStartPoint && hasRightPixelTargetColor) {
          this.pixelStack.push({ x: startPixel.x + 1, y: curY });
          isSetRightStartPoint = true;
        }

        if (!this.hasPixelTargetColor(tempPixel) && !this.hasPixelAlpha(tempPixel)) {
          break;
        }

        this.fillPixel(tempPixel);
        curY++;
      }
    }

    this.ctx.putImageData(this.imageData, 0, 0);
  }

  addClosestPixelsToStash ({ x, y }: Pixel) {
    this.pixelStack.push({
      x: x - 1,
      y: y
    });
    this.pixelStack.push({
      x: x + 1,
      y: y
    });
    this.pixelStack.push({
      x: x,
      y: y - 1
    });
    this.pixelStack.push({
      x: x,
      y: y + 1
    });
  }

  fillPixel ({ x, y }: Pixel) {
    this.pixelData.data[y * this.pixelData.width + x] = Number(this.fillColor);
  }

  getPixelColor ({ x, y }: Pixel):number {
    const color = this.pixelData.data[y * this.pixelData.width + x];
    return color !== undefined ? color : -1;
  }

  getHexNumber (hex: string): number {
    if (hex.length !== 7) return Number('0xFF000000');

    const newHex = hex.substring(1).match(/..?/g)?.reverse().join('');
    return Number('0xFF' + newHex);
  }

  hasPixelTargetColor (pixel: Pixel) {
    return this.getPixelColor(pixel) === this.targetColor;
  }

  hasPixelAlpha (pixel: Pixel) {
    let color: number | string = this.getPixelColor(pixel);
    color = color.toString(16);

    return color.substring(0, 1).length === 2 && color.substring(0, 1) !== 'ff';
  }

  isValidPixel ({ x, y }: Pixel) {
    const width = this.pixelData.width;
    const height = this.pixelData.height;

    if (x > width || x < 0) {
      return false;
    }

    if (y > height || y < 0) {
      return false;
    }

    return true;
  }
}
