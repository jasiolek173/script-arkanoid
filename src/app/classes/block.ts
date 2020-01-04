import {Boundaries} from './boundaries';
import {Position} from './position';
import {MoveableObject} from './moveable-object';
import {Ball} from './ball';

export class Block {
  public boundaries: Boundaries;

  constructor(private height: number,
              private width: number,
              private position: Position) {
    this.boundaries = this.getCollisionBoundaries();
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
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

  destroy() {
    this.position.x = -150;
    this.position.y = -150;
  }

  getHorizontalVsrWithBall(ball: Ball): number {
    const vsr = -(ball.getPosition().x - this.position.x)
      / (this.boundaries.left - this.position.x);

    return Math.min(vsr, 0.9);
  }

  getVerticalVsrWithBall(ball: Ball): number {
    const vsr = -(ball.getPosition().y - this.position.y)
      / (this.boundaries.top - this.position.y);

    return Math.min(vsr, 1);
  }

  isCollisionWithBall(ball: MoveableObject): boolean {
    return this.isObjectBetweenLeftAndRight(ball) && this.isObjectBetweenTopAndBottom(ball);
  }

  private isObjectBetweenTopAndBottom(object: MoveableObject): boolean {
    return this.boundaries.top <= object.getCollisionBoundaries().bottom &&
      this.boundaries.bottom >= object.getCollisionBoundaries().top;
  }

  private isObjectBetweenLeftAndRight(object: MoveableObject): boolean {
    return this.boundaries.left <= object.getCollisionBoundaries().right &&
      this.boundaries.right >= object.getCollisionBoundaries().left;
  }

}
