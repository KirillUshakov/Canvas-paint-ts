import Tool from '@/classes/tools/tool';
import { toolOption } from '@/types/toolOption';

export default class PointTool extends Tool {
  availableOptions: toolOption[] = [
    {
      optionName: 'fillStyle',
      title: 'Fill color'
    }
  ];

  mousedown (mouseX: number, mouseY: number): void {
    this.setMouseValues(mouseX, mouseY);
    this.startDraw();
  }

  startDraw (): void {
    this.draw();
  }

  draw () {}
}
