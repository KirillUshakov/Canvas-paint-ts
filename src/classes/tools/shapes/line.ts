import ShapeTool from '../shapeTool';

export default class Line extends ShapeTool {
  draw () {
    this.refreshCanvas(() => {
      this.ctx.beginPath();
      this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
      this.ctx.lineTo(this.mouseX, this.mouseY);
      this.ctx.stroke();
    })
  }
}
