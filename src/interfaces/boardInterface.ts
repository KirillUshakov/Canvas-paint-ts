export default interface board {
  name: string,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null,

  reset ():void
}
