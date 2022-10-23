import toolInterface from '@/interfaces/toolInterface';
import board from '@/classes/board/board';

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

  mouseOverBoard = false;
  isDrawing = false;

  constructor (name:string, iconClass:string, board:board) {
    this.name = name;
    this.iconClass = iconClass;
    this.board = board;
    this.ctx = this.board.canvas.getContext('2d');
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

  saveCurrentView () {
    this.startedView = this.board.canvas.toDataURL();
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

  mouseout (mouseX : number, mouseY : number): void {
    this.mouseOverBoard = false;
  }

  endDraw (): void {
    this.ctx.closePath();
  }

  mousedown (mouseX : number, mouseY : number): void {}
  mousemove (mouseX : number, mouseY : number): void {}
  mouseup (mouseX : number, mouseY : number): void {}
  dbclick (mouseX : number, mouseY : number): void {}
  startDraw (): void {}
  draw (): void {}
}
