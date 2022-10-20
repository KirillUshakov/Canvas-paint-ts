import boardInterface from '@/interfaces/boardInterface';

export default class Board implements boardInterface {
  name: string;
  canvas: HTMLCanvasElement;

  constructor (name:string, canvas:HTMLCanvasElement) {
    this.name = name;
    this.canvas = canvas;
  }
}
