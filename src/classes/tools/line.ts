import Tool from '@/classes/tools/tool';

export default class Line extends Tool {
  mousedown (mouseX: number, mouseY: number): void {
    this.saveCurrentView();
    this.setStartPoint(mouseX, mouseY);
    this.startDraw();
  }

  mouseup (mouseX: number, mouseY: number): void {
    this.isDrawing = false;

    this.setMouseValues(mouseX, mouseY);
    this.endDraw();
  }

  mousemove (mouseX: number, mouseY: number): void {
    if (!this.isDrawing) {
      return;
    }

    this.setMouseValues(mouseX, mouseY);
    this.draw();
  }

  startDraw () {
    this.isDrawing = true;
  }

  draw () {
    this.refreshCanvas(() => {
      this.ctx.beginPath();
      this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
      this.ctx.lineTo(this.mouseX, this.mouseY);
      this.ctx.stroke();
    })
  }
}
