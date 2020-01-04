import {Paddle} from './paddle';
import {Ball} from './ball';
import {ControlState} from './control-state';
import {Block} from './block';

export class Game {
  public ball: Ball;
  public playerPaddle: Paddle;
  public blocks: Block[] = [];
  public score = 0;
  private readonly blockCount = 65;
  public readonly height: number;
  public readonly width: number;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
    this.ball = new Ball(15, 15, 2, {x: height / 2, y: width / 2}, {x: 0, y: -1});
    this.playerPaddle = new Paddle(20, 100, 2.0, {x: width / 2, y: height - 50});

    let i = 0;
    let xStart = 54;
    let yStart = 12;
    const blockHeight = 20;
    const blockWidth = 50;
    for (i = 0; i <= this.blockCount; i++) {
      this.blocks.push(new Block(20, 50, {x: xStart, y: yStart}));
      xStart += blockWidth + 1;
      if (xStart + blockWidth / 2 > width - 50) {
        xStart = 54;
        yStart += blockHeight + 1;
      }
    }
  }

  tick(controlState: ControlState) {
    this.ball.move();

    const paddleBounds = this.playerPaddle.getCollisionBoundaries();
    if (controlState.rightPressed && paddleBounds.right <= this.width) {
      this.playerPaddle.accelerateRight(.03);
    } else if (controlState.leftPressed && paddleBounds.left > 0) {
      this.playerPaddle.accelerateLeft(.03);
    } else {
      this.playerPaddle.decelerate(.05);
    }
    this.checkCollisions();
  }

  private checkCollisions() {

    const ballBounds = this.ball.getCollisionBoundaries();
    if (ballBounds.top <= 0) {
      this.ball.reverseY();
    }

    if (ballBounds.left < 0 || ballBounds.right >= this.width) {
      this.ball.reverseX();
    }

    const paddleBounds = this.playerPaddle.getCollisionBoundaries();

    if (paddleBounds.left <= 0 || paddleBounds.right >= this.width) {
      this.playerPaddle.decelerate(1);
    }

    let i = 0;
    for (i = this.blocks.length - 1; i >= 0; i--) {
      const block = this.blocks[i];
      if (block.isCollisionWithBall(this.ball)) {
        this.ball.setHorizontalSpeedRatio(block.getHorizontalVsrWithBall(this.ball));
        this.ball.setVerticalSpeedRatio(block.getVerticalVsrWithBall(this.ball));
        block.destroy();
        this.blocks.splice(i, 1);
        this.score++;
      }
    }

    if (ballBounds.bottom >= paddleBounds.top &&
      ballBounds.right - paddleBounds.right <= 0.5 &&
      ballBounds.left - paddleBounds.left >= 0.5) {
      this.ball.reverseY();

      let vsr = -(this.ball.getPosition().x - this.playerPaddle.getPosition().x)
        / (paddleBounds.left - this.playerPaddle.getPosition().x);


      vsr = Math.min(vsr, 1);
      this.ball.setHorizontalSpeedRatio(vsr);
    }
  }

  gameOver(): boolean {
    return this.ball.getCollisionBoundaries().bottom > this.height;
  }

  win(): boolean {
    return this.blocks.length === 0;
  }
}
