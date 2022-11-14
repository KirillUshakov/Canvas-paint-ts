import { boardOption, customBoardOptions } from "@/types/boardTypes";

export default interface board {
  name: string,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null,
  undoHistory: Array<ImageData | undefined>,
  redoHistory: Array<ImageData | undefined>,
  maxHistoryLength: number,
  customOptions: customBoardOptions,

  reset ():void,
  getView (): ImageData | undefined,
  saveView (): void,
  undoAction (): void,
  redoAction (): void,
  setPaintSettings (optionList: boardOption[]): void
}
