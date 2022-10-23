import ShapeTool from '../shapeTool';

export default class Circle extends ShapeTool {
  draw () {
    this.refreshCanvas(() => {
      const radius = Math.hypot(Math.abs(this.startPoint.x - this.mouseX), Math.abs(this.startPoint.y - this.mouseY));

      this.ctx.beginPath();
      this.ctx.arc(this.startPoint.x, this.startPoint.y, radius, 0, Math.PI * 2, true);
      this.ctx.fill();
      this.ctx.stroke();
    })
  }
}
