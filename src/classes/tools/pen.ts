import Tool from '@/classes/tools/tool';

export default class Pen extends Tool {
  mousedown (mouseX: number, mouseY: number): void {
    this.setMouseValues(mouseX, mouseY);
    this.startDrawFromPoint(mouseX, mouseY);

    this.startDraw();
  }

  mouseup (mouseX: number, mouseY: number): void {
    this.isDrawing = false;

    this.setMouseValues(mouseX, mouseY);
    this.endDraw();
  }

  mousemove (mouseX: number, mouseY: number): void {
    if (!this.isDrawing || !this.mouseOverBoard) {
      return
    }

    this.setMouseValues(mouseX, mouseY);
    this.isDrawing = true;
    this.draw();
  }

  mouseout (mouseX: number, mouseY: number): void {
    super.mouseout(mouseX, mouseY);

    if (this.isDrawing) {
      this.endDraw();
    }
  }

  mouseover (mouseX: number, mouseY: number): void {
    super.mouseover(mouseX, mouseY);

    if (!this.isDrawing) {
      return;
    }

    this.setMouseValues(mouseX, mouseY);
    this.startDrawFromPoint(mouseX, mouseY);
  }

  startDraw () {
    this.isDrawing = true;
  }

  draw () {
    this.ctx.lineTo(this.mouseX, this.mouseY);
    this.ctx.stroke();
  }
}
