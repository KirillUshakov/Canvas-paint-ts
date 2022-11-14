import toolInterface from '@/interfaces/toolInterface';
import board from '@/classes/board/board';
import { setupToolOption, toolAvailableOption } from '@/types/toolTypes';
import { availableKeys } from '@/types/paintTypes';

export default class Tool implements toolInterface {
  name:string;
  iconClass:string;
  board: board;
  ctx: any;
  mouseX: number;
  mouseY: number;
  startedView: string;
  maxSavedSteps: 30;
  startPoint = {
    x: 0,
    y: 0
  }

  curCustomOptions: setupToolOption[];
  availableOptions: toolAvailableOption[];

  availableKeys: availableKeys = [];

  mouseOverBoard = false;
  isDrawing = false;
  isShiftKey = false;
  isCtrlKey = false;

  constructor (name:string, iconClass:string, board:board) {
    this.name = name;
    this.iconClass = iconClass;
    this.board = board;
    this.ctx = this.board.canvas.getContext('2d');
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  setMouseValues (x: number, y: number): void {
    this.mouseX = x;
    this.mouseY = y;
  }

  setStartPoint (x: number, y: number): void {
    this.startPoint.x = x;
    this.startPoint.y = y;
  }

  startDrawFromPoint (mouseX: number, mouseY: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(mouseX, mouseY);
  }

  drawPoint (mouseX: number, mouseY: number) {
    this.ctx.lineTo(mouseX + 0.00001, mouseY + 0.00001);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.beginPath();
  }

  saveCurrentView () {
    this.startedView = this.board.canvas.toDataURL();
  }

  setToolSettings (options: setupToolOption[]): void {
    for (let o = 0; o < options.length; o++) {
      const option = options[o];

      if (option.custom) {
        this.curCustomOptions.push(option);
        continue;
      }

      if (this.ctx[option.name]) {
        this.ctx[option.name] = option.value;
      }
    }
  }

  // Clear / Refresh canvas
  refreshCanvas (func: Function) {
    const img = new Image();
    img.src = this.startedView;
    img.onload = () => {
      this.clearCanvas();
      this.ctx.drawImage(img, 0, 0, this.board.canvas?.width, this.board.canvas?.height);

      func.apply(this, arguments);
    };
  }

  clearCanvas () {
    this.ctx.clearRect(0, 0, this.board.canvas?.width, this.board.canvas?.height);
  }

  // Mouse events
  mouseover (mouseX : number, mouseY : number): void {
    this.mouseOverBoard = true;
  }

  mouseleave (mouseX : number, mouseY : number): void {
    this.mouseOverBoard = false;
  }

  endDraw (): void {
    this.ctx.closePath();
  }

  mousedown (mouseX : number, mouseY : number): void {}
  mousemove (mouseX : number, mouseY : number, event: MouseEvent): void {}
  mouseup (mouseX : number, mouseY : number): void {}
  dbclick (mouseX : number, mouseY : number): void {}
  startDraw (): void {}
  draw (): void {}
  shiftDraw (): void {}
  ctrlDraw (): void {}
}
