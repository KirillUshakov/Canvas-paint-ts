import BrushTool from '../brushTool';

export default class Eraser extends BrushTool {
  draw () {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.lineTo(this.mouseX, this.mouseY);
    this.ctx.stroke();
    this.ctx.globalCompositeOperation = 'source-over';
  }
}
