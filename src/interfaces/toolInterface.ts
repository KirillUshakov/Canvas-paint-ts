import board from '@/classes/board/board';

export default interface tool {
  name: string,
  iconClass: string,
  board: board,
  ctx: CanvasRenderingContext2D;
  canDraw: boolean;
  mouseX: number;
  mouseY: number;

  mousedown (mouseX: number, mouseY: number): void,
  mouseup (mouseX: number, mouseY: number): void,
  mousemove (mouseX: number, mouseY: number): void,

  startDraw (): void,
  draw (): void,
  endDraw (): void,

  setMouseValues(x: number, y: number): void
  startDrawFromPoint (mouseX: number, mouseY: number): void
}
