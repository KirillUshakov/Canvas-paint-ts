import Tool from '@/classes/tools/tool';
import { OptionList } from '@/types/optionList';

export default class ShapeTool extends Tool {
  availableOptions: OptionList = [
    {
      name: 'strokeStyle',
      title: '',
    },
    {
      name: 'fillStyle',
      title: '',
    },
    {
      name: 'lineWidth',
      title: 'Border width',
    },
    {
      name: 'borderRadius',
      title: 'Border radius',
    }
  ];

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

  draw () {}
}
