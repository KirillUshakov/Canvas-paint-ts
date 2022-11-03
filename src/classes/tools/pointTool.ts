import Tool from '@/classes/tools/tool';
import { OptionList } from '@/types/optionList';

export default class PointTool extends Tool {
  availableOptions: OptionList = [
    {
      name: 'fillStyle',
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
