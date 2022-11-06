import { availableKeys } from '@/types/availableKeys';
import ShapeTool from '../shapeTool';

export default class Circle extends ShapeTool {
  availableKeys: availableKeys = ['shift', 'ctrl'];

  draw () {
    this.refreshCanvas(() => {
      const radiusX = Math.abs(this.startPoint.x - this.mouseX) / 2;
      const radiusY = Math.abs(this.startPoint.y - this.mouseY) / 2;
      const ellipseStartPoint = {
        x: this.startPoint.x - (this.startPoint.x - this.mouseX) / 2,
        y: this.startPoint.y - (this.startPoint.y - this.mouseY) / 2
      }

      this.ctx.beginPath();
      this.ctx.ellipse(ellipseStartPoint.x, ellipseStartPoint.y, radiusX, radiusY, 0, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    })
  }

  shiftDraw () {
    this.refreshCanvas(() => {
      const diametr = Math.max(Math.abs(this.startPoint.x - this.mouseX), Math.abs(this.startPoint.y - this.mouseY));
      const startPosition = {
        x: this.startPoint.x - ((this.startPoint.x - this.mouseX) / 2),
        y: this.startPoint.y - ((this.startPoint.y - this.mouseY) / 2)
      }

      this.ctx.beginPath();
      this.ctx.arc(startPosition.x, startPosition.y, diametr / 2, 0, Math.PI * 2, true);
      this.ctx.fill();
      this.ctx.stroke();
    })
  }

  ctrlDraw () {
    this.refreshCanvas(() => {
      const radius = Math.hypot(Math.abs(this.startPoint.x - this.mouseX), Math.abs(this.startPoint.y - this.mouseY));

      this.ctx.beginPath();
      this.ctx.arc(this.startPoint.x, this.startPoint.y, radius, 0, Math.PI * 2, true);
      this.ctx.fill();
      this.ctx.stroke();
    })
  }
}
