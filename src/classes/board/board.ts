import boardInterface from '@/interfaces/boardInterface';

export default class Board implements boardInterface {
  name: string;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  viewsHistory: Array<ImageData | undefined> = [];

  constructor (name:string, canvas:HTMLCanvasElement) {
    this.name = name;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    if (!this.ctx) {
      return;
    }

    this.ctx.lineWidth = 5;
    this.ctx.fillStyle = '#000';
    this.ctx.strokeStyle = '#000';
    this.ctx.imageSmoothingEnabled = false;
  }

  getView (): ImageData | undefined {
    if (!this.ctx) { return }

    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  saveView () {
    console.log('save');
    console.log(this.getView());

    this.viewsHistory.push(this.getView());
  }

  setView () {
    const data = this.viewsHistory.pop();

    if (!data || !this.ctx) { return }

    this.ctx.putImageData(data, 0, 0);
  }

  reset () {
    if (!this.ctx) {
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
