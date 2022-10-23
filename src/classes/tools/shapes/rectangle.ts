import ShapeTool from '../shapeTool';

export default class Rectangle extends ShapeTool {
  draw () {
    this.refreshCanvas(() => {
      this.ctx.beginPath();
      this.ctx.rect(this.startPoint.x, this.startPoint.y, this.mouseX - this.startPoint.x, this.mouseY - this.startPoint.y);
      this.ctx.fill();
      this.ctx.stroke();
    })
  }
}
