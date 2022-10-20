import Tool from '@/classes/tools/tool';

export default class Pen extends Tool {
  startDraw() {
    console.log('start pen draw');
  }

  draw() {
    console.log('drawing pen');
  }

  endDraw() {
    console.log('end pen draw');
  }
}
