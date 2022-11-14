import BrushTool from '../brushTool';
import { Pixel } from '@/types/paintTypes';
import Board from '@/classes/board/board';
import Tool from '../tool';

export default class EyeDropper extends BrushTool {
  completeFunction: Function;
  eyeDropperIndicator = document.createElement('div');
  imageData: any;
  latestTool: Tool;
  pixelData: {
    width: number,
    height: number,
    data: Uint32Array,
  } = {
    width: 0,
    height: 0,
    data: new Uint32Array()
  };

  pickedColor: string;

  constructor (name:string, iconClass:string, board:Board, completeFunction? : (selectedColor: string, previousTool: Tool) => void) {
    super(name, iconClass, board);

    if (completeFunction) {
      this.completeFunction = completeFunction;
    }
  }

  startDraw (): void {
    super.startDraw();

    this.pixelData.width = this.board.canvas.width || 0;
    this.pixelData.height = this.board.canvas.height || 0;

    this.imageData = this.ctx.getImageData(0, 0, this.board.canvas.width, this.board.canvas.height);
    this.pixelData.data = new Uint32Array(this.imageData.data.buffer);
    this.pickedColor = this.getPixelColor({ x: this.mouseX, y: this.mouseY });

    this.eyeDropperIndicator.classList.add('eyedropper-indicator');
    document.querySelector('body')?.appendChild(this.eyeDropperIndicator);
    this.draw();
  }

  draw (): void {
    this.pickedColor = this.getPixelColor({ x: this.mouseX, y: this.mouseY });
    this.setIndicatorStyles(this.mouseX, this.mouseY);
  }

  endDraw (): void {
    this.eyeDropperIndicator.remove();
    this.completeFunction(this.getHexColorFrom16Bits(this.pickedColor), this.latestTool);
  }

  getPixelColor ({ x, y }: Pixel):string {
    const color = this.pixelData.data[y * this.pixelData.width + x];
    return color !== undefined ? color.toString(16) : '#ffffff';
  }

  setIndicatorStyles (x:number, y:number) {
    this.eyeDropperIndicator.style.top = y + 'px';
    this.eyeDropperIndicator.style.left = x + 'px';
    this.eyeDropperIndicator.style.backgroundColor = this.getHexColorFrom16Bits(this.pickedColor);
  }

  getHexColorFrom16Bits (color: string): string {
    if (color.length !== 8) return '#ffffff';

    const parsedString = color.slice(2, color.length).split('').reverse();

    return '#' + parsedString.reduce((arr: string[], cur: string, index: number) => {
      const result = arr;
      let temp = '';

      if ((index + 1) % 2 === 0) {
        temp = result[index - 1];
        result[index - 1] = cur;
        result.push(temp);
      } else {
        result.push(cur);
      }
      return result;
    }, []).join('');
  }

  setLatestActiveTool (latestTool: Tool) {
    this.latestTool = latestTool;
  }
}
