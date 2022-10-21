import toolInterface from '@/interfaces/toolInterface';
import board from '@/classes/board/board';

export default class Tool implements toolInterface {
  name:string;
  iconClass:string;
  board: board;
  ctx: any;
  mouseX: number;
  mouseY: number;

  canDraw = false;

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

  startDrawFromPoint (mouseX: number, mouseY: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(mouseX, mouseY);
  }

  endDraw (): void {
    this.ctx.closePath();
  }

  mousedown (mouseX : number, mouseY : number): void {}
  mousemove (mouseX : number, mouseY : number): void {}
  mouseup (mouseX : number, mouseY : number): void {}
  startDraw (): void {}
  draw (): void {}
}
