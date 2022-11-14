import { isContextOption, isCustomOption } from '@/common/general';
import boardInterface from '@/interfaces/boardInterface';
import { boardOption, customBoardOptions } from '@/types/boardTypes';
import { customContextOptionType, contextOptionType } from '@/types/optionTypes';

export default class Board implements boardInterface {
  name: string;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  undoHistory: Array<ImageData | undefined> = [];
  redoHistory: Array<ImageData | undefined> = [];
  maxHistoryLength: 30;
  customOptions: customBoardOptions = {};

  constructor (name:string, canvas:HTMLCanvasElement) {
    this.name = name;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    if (!this.ctx) {
      return;
    }

    this.ctx.lineWidth = 15;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.fillStyle = '#000';
    this.ctx.strokeStyle = '#000';
  }

  getView (): ImageData | undefined {
    if (!this.ctx) { return }

    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  saveView () {
    const view = this.getView();

    if (!view) return;

    this.redoHistory = [];
    this.undoHistory.push(view);
    this.undoHistory = this.getFilteredHistory(this.undoHistory, this.maxHistoryLength);
  }

  undoAction () {
    const data = this.undoHistory.pop();
    if (!data || !this.ctx) { return }

    this.redoHistory.push(this.getView());
    this.redoHistory = this.getFilteredHistory(this.redoHistory, this.maxHistoryLength);
    this.ctx.putImageData(data, 0, 0);
  }

  redoAction () {
    const data = this.redoHistory.pop();

    if (!data || !this.ctx) { return }

    this.undoHistory.push(this.getView());
    this.undoHistory = this.getFilteredHistory(this.undoHistory, this.maxHistoryLength);
    this.ctx.putImageData(data, 0, 0);
  }

  getFilteredHistory (arr: Array<ImageData | undefined>, maxLength: number): Array<ImageData | undefined> {
    if (arr.length <= maxLength || !arr) return arr;

    return arr.splice(arr.length - maxLength);
  }

  setPaintSettings (optionList: boardOption[]) {
    if (!this.ctx || !optionList.length) return;

    for (const { name, value } of optionList) {
      if (isCustomOption(name)) {
        this.customOptions[name as customContextOptionType] = value;
        continue;
      }

      if (isContextOption(name)) {
        this.ctx[name as contextOptionType] = value;
        continue;
      }
    }
  }

  reset () {
    if (!this.ctx) {
      return;
    }

    this.redoHistory = this.undoHistory = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
