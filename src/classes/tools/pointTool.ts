import Tool from '@/classes/tools/tool';
import { toolAvailableOption } from '@/types/toolTypes';

export default class PointTool extends Tool {
  availableOptions: toolAvailableOption[] = [
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
