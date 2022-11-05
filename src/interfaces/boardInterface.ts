import { boardOption } from "@/types/boardOption";

export default interface board {
  name: string,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null,
  viewsHistory: Array<ImageData | undefined>,

  reset ():void,
  getView (): ImageData | undefined,
  saveView (): void,
  setLastView (): void,
  setupContextSettings (optionList: boardOption[]): void
}
