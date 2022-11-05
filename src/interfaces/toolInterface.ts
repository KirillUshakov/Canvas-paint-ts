import board from '@/classes/board/board';
import { setupToolOption } from '@/types/setupToolOption';
import { toolOption } from '@/types/toolOption';

export default interface tool {
  name: string,
  iconClass: string,
  board: board,
  ctx: CanvasRenderingContext2D;
  isDrawing: boolean;
  mouseX: number;
  mouseY: number;
  availableOptions: toolOption[];
  curCustomOptions: setupToolOption[];

  mousedown (mouseX: number, mouseY: number): void,
  mouseup (mouseX: number, mouseY: number): void,
  mousemove (mouseX: number, mouseY: number): void,
  mouseover (mouseX: number, mouseY: number): void,
  mouseleave (mouseX: number, mouseY: number): void,
  dbclick (mouseX: number, mouseY: number): void,

  startDraw (): void,
  draw (): void,
  endDraw (): void,

  setToolSettings (options: setupToolOption[]): void,
  setMouseValues(x: number, y: number): void,
  startDrawFromPoint (mouseX: number, mouseY: number): void
}
