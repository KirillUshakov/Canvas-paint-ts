import Tool from '@/classes/tools/tool';

export default class Pen extends Tool {
  mousedown (mouseX: number, mouseY: number): void {
    this.canDraw = true;

    this.setMouseValues(mouseX, mouseY);
    this.startDrawFromPoint(mouseX, mouseY);

    this.startDraw();
  }

  mouseup (mouseX: number, mouseY: number): void {
    this.canDraw = false;

    this.setMouseValues(mouseX, mouseY);
    this.endDraw();
  }

  mousemove (mouseX: number, mouseY: number): void {
    if (this.canDraw) {
      this.setMouseValues(mouseX, mouseY);
      this.draw();
    }
  }

  startDraw () {
    console.log('start pen draw');

    this.ctx.fillStyle = '#000';
    this.ctx.strokeStyle = '#000';
  }

  draw () {
    console.log(this.mouseX, this.mouseY);

    this.ctx.lineTo(this.mouseX, this.mouseY);
    this.ctx.stroke();
  }

  endDraw () {
    super.endDraw();
    console.log('end pen draw');
  }
}
