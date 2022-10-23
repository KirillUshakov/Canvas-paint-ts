import boardInterface from '@/interfaces/boardInterface';

export default class Board implements boardInterface {
  name: string;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  constructor (name:string, canvas:HTMLCanvasElement) {
    this.name = name;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  reset () {
    if (!this.ctx) {
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
