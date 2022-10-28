import Board from '@/classes/board/board';

export type BoardData = {
  board: Board,
  resMultiplier: number,
  size: {
    width: number,
    height: number
  },
  style: any
}
