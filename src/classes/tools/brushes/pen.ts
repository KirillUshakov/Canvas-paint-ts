import BrushTool from '../brushTool';

export default class Pen extends BrushTool {
  startDraw (): void {
    super.startDraw();

    this.drawPoint(this.mouseX, this.mouseY);
  }

  draw () {
    this.ctx.lineTo(this.mouseX, this.mouseY);
    this.ctx.stroke();
  }
}
