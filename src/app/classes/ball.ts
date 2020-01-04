import {SpeedRatio} from './speed-ratio';
import {MoveableObject} from './moveable-object';
import {Position} from './position';

export class Ball extends MoveableObject {
  private readonly speedRatio: SpeedRatio;

  constructor(height: number, width: number, maxSpeed: number, position: Position, speedRatio: SpeedRatio) {
    super(height, width, maxSpeed, position);
    this.speedRatio = speedRatio;
  }

  /**
   * Reverses the ball in the x direction
   */
  reverseX(): void {
    this.speedRatio.x = -this.speedRatio.x;
  }

  /**
   * Reverses the ball in the y direction
   */
  reverseY(): void {
    this.speedRatio.y = -this.speedRatio.y;
  }

  /**
   * Sets new vertical speed ratio of max speed
   */
  setVerticalSpeedRatio(verticalSpeedRatio: number): void {
    this.speedRatio.y = verticalSpeedRatio;
    console.log('Vertical = ' + verticalSpeedRatio);
  }

  /**
   * Sets new vertical speed ratio of max speed
   */
  setHorizontalSpeedRatio(horizontalSpeedRatio: number): void {
    this.speedRatio.x = horizontalSpeedRatio;
    console.log('Hor = ' + horizontalSpeedRatio);
  }

  /**
   * Moves object using existing speed ratio
   */
  move() {
    super.move(this.speedRatio);
  }

}
