import { boardOption } from "@/types/boardOption";

export default interface board {
  name: string,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null,
  undoHistory: Array<ImageData | undefined>,
  redoHistory: Array<ImageData | undefined>,
  maxHistoryLength: number,

  reset ():void,
  getView (): ImageData | undefined,
  saveView (): void,
  undoAction (): void,
  redoAction (): void,
  setupContextSettings (optionList: boardOption[]): void
}
