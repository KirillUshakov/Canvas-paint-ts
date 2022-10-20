import toolInterface from '@/interfaces/toolInterface';
import board from '@/classes/board/board';

export default class Tool implements toolInterface {
  name:string;
  icon:string;
  board: board;

  constructor (name:string, icon:string, board:board) {
    this.name = name;
    this.icon = icon;
    this.board = board;
  }

  startDraw(): void {
    console.log('start draw');
  }

  draw(): void {
    console.log('drawing');
  }

  endDraw(): void {
    console.log('end draw');
  }
}
