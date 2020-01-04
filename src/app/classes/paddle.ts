import {MoveableObject} from './moveable-object';
import {SpeedRatio} from './speed-ratio';
import {Position} from './position';

export class Paddle extends MoveableObject {
  private readonly speedRatio: SpeedRatio;

  constructor(height: number, width: number, maxSpeed: number, position: Position) {
    super(height, width, maxSpeed, position);
    this.speedRatio = { x: 0, y: 0 };
  }

  accelerateRight(ratioChange: number) {
    if (ratioChange < 0 || ratioChange > 1) { return; }
    this.speedRatio.x = Math.min(1, this.speedRatio.x + ratioChange);
    this.move();
  }

  accelerateLeft(ratioChange: number) {
    if (ratioChange < 0 || ratioChange > 1) { return; }
    this.speedRatio.x = Math.max(-1, this.speedRatio.x - ratioChange);
    this.move();
  }

  decelerate(ratioChange: number) {
    if (this.speedRatio.x < 0) {
      this.speedRatio.x = Math.min(this.speedRatio.x + ratioChange, 0);
    } else if (this.speedRatio.x > 0) {
      this.speedRatio.x = Math.max(this.speedRatio.x - ratioChange, 0);
    }
    this.move();
  }

  move(): void {
    super.move(this.speedRatio);
  }
}
