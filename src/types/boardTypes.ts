import { contextOptionType, customContextOptionType } from './optionTypes';
import Board from '@/classes/board/board';

export type boardOption = {
  name: contextOptionType | customContextOptionType,
  value: any
}

export type boardCustomOption = {
  key: customContextOptionType,
  value: any
}

export type customBoardOptions = {
  [key in customContextOptionType]?: any
}

export type BoardData = {
  board: Board,
  resMultiplier: number,
  size: {
    width: number,
    height: number
  },
  style: any
}
