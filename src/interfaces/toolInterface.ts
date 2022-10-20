import board from '@/classes/board/board';

export default interface tool {
  name: string,
  icon: string,
  board: board,

  startDraw(): void,
  draw(): void,
  endDraw(): void,
}
