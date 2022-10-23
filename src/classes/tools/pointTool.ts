import Tool from '@/classes/tools/tool';

export default class PointTool extends Tool {
  mousedown (mouseX: number, mouseY: number): void {
    this.setMouseValues(mouseX, mouseY);
    this.startDraw();
  }

  startDraw (): void {
    this.draw();
  }

  draw () {}
}
