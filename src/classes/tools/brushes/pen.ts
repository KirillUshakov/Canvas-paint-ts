import BrushTool from '../brushTool';

export default class Pen extends BrushTool {
  draw () {
    this.ctx.lineTo(this.mouseX, this.mouseY);
    this.ctx.stroke();
  }
}
