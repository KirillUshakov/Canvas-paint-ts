import { toolOption } from '@/types/toolOption';
import ShapeTool from '../shapeTool';

export default class Line extends ShapeTool {
  availableOptions: toolOption[] = [
    {
      optionName: 'strokeStyle',
      title: 'Color'
    },
    {
      optionName: 'lineWidth',
      title: 'Line width'
    }
  ];

  draw () {
    this.refreshCanvas(() => {
      this.ctx.beginPath();
      this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
      this.ctx.lineTo(this.mouseX, this.mouseY);
      this.ctx.stroke();
    })
  }
}
