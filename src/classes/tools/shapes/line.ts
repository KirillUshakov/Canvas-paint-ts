import { availableKeys } from '@/types/paintTypes';
import { toolAvailableOption } from '@/types/toolTypes';
import ShapeTool from '../shapeTool';

export default class Line extends ShapeTool {
  availableKeys: availableKeys = ['shift'];
  availableOptions: toolAvailableOption[] = [
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

  shiftDraw () {
    const angle = this.getAngle(this.startPoint.x, this.startPoint.y, this.mouseX, this.mouseY);
    const direction = this.getStraightDirectionAngle(angle);
    const distantFromStartPoint = Math.max(Math.abs(this.startPoint.x - this.mouseX), Math.abs(this.startPoint.y - this.mouseY));

    this.refreshCanvas(() => {
      this.ctx.beginPath();
      this.ctx.moveTo(this.startPoint.x, this.startPoint.y);

      switch (direction) {
        case 180:
        case -180:
        case 0:
          this.ctx.lineTo(this.startPoint.x, this.mouseY);
          break;

        case 90:
        case -90:
          this.ctx.lineTo(this.mouseX, this.startPoint.y);
          break;

        case 135:
          this.ctx.lineTo(this.startPoint.x + distantFromStartPoint, this.startPoint.y - distantFromStartPoint);
          break;

        case -135:
          this.ctx.lineTo(this.startPoint.x - distantFromStartPoint, this.startPoint.y - distantFromStartPoint);
          break;

        case 45:
          this.ctx.lineTo(this.startPoint.x + distantFromStartPoint, this.startPoint.y + distantFromStartPoint);
          break;

        case -45:
          this.ctx.lineTo(this.startPoint.x - distantFromStartPoint, this.startPoint.y + distantFromStartPoint);
          break;

        default: this.ctx.lineTo(this.mouseX, this.mouseY); break;
      }

      this.ctx.stroke();
    })
  }

  getStraightDirectionAngle (angle: number): number {
    const halfSector = 22.5;

    for (let i = -4; i < 5; i++) {
      const curSector: number = 45 * i;

      if (curSector - halfSector <= angle && angle <= curSector + halfSector) {
        return curSector;
      }
    }

    return 90;
  }

  getAngle (x1:number, y1:number, x2:number, y2:number) {
    return Math.atan2(x2 - x1, y2 - y1) * 57.2958;
  }
}
