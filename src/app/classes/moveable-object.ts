import {Boundaries} from './boundaries';
import {SpeedRatio} from './speed-ratio';
import {Position} from './position';

export abstract class MoveableObject {
  protected constructor(private height: number,
                        private width: number,
                        private maxSpeed: number,
                        private position: Position) {
  }

  move(speedRatio: SpeedRatio): void {
    this.position.x += this.maxSpeed * speedRatio.x;
    this.position.y += this.maxSpeed * speedRatio.y;
  }

  getPosition(): Position {
    return this.position;
  }

  getCollisionBoundaries(): Boundaries {
    return {
      top: this.position.y - this.height / 2,
      bottom: this.position.y + this.height / 2,
      right: this.position.x + this.width / 2,
      left: this.position.x - this.width / 2
    };
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
}
