import BrushTool from '../brushTool';

export default class Eraser extends BrushTool {
  startDraw (): void {
    super.startDraw();

    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.lineTo(this.mouseX + 0.0001, this.mouseY + 0.0001);
    this.ctx.stroke();
    this.ctx.globalCompositeOperation = 'source-over';
  }

  draw () {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.lineTo(this.mouseX, this.mouseY);
    this.ctx.stroke();
    this.ctx.globalCompositeOperation = 'source-over';
  }
}
