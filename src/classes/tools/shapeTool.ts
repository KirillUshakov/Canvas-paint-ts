import Tool from '@/classes/tools/tool';
import { toolAvailableOption } from '@/types/toolTypes';

export default class ShapeTool extends Tool {
  availableOptions: toolAvailableOption[] = [
    {
      optionName: 'strokeStyle'
    },
    {
      optionName: 'fillStyle'
    },
    {
      optionName: 'lineWidth',
      title: 'Border width',
      options: {
        min: 0
      }
    },
    {
      optionName: 'borderRadius',
      title: 'Border radius'
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

  mousemove (mouseX: number, mouseY: number, event: MouseEvent): void {
    if (!this.isDrawing) {
      return;
    }

    this.isShiftKey = event.shiftKey;
    this.isCtrlKey = event.ctrlKey;
    this.setMouseValues(mouseX, mouseY);

    if (this.isShiftKey && this.availableKeys.includes('shift')) {
      this.shiftDraw();
      return;
    }

    if (this.isCtrlKey && this.availableKeys.includes('ctrl')) {
      this.ctrlDraw();
      return;
    }

    this.draw();
  }

  startDraw () {
    this.isDrawing = true;
  }

  draw () {}
}
