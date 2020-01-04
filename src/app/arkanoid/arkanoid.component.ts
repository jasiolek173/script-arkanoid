import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Boundaries} from '../classes/boundaries';
import {Game} from '../classes/game';
import {ControlState} from '../classes/control-state';
import {Controls} from '../enums/controls';

@Component({
  selector: 'app-arkanoid',
  templateUrl: './arkanoid.component.html',
  styleUrls: ['./arkanoid.component.scss']
})
export class ArkanoidComponent implements OnInit {
  @ViewChild('PongCanvas', {static: false}) canvasElement: ElementRef;

  public width = 1200;
  public height = 1000;
  public score = 0;

  private context: CanvasRenderingContext2D;
  private game: Game;
  private ticksPerSecond = 60;

  private readonly controlState: ControlState;

  constructor() {
    this.game = new Game(this.height, this.width);
    this.controlState = {rightPressed: false, leftPressed: false};
  }

  ngOnInit() {
    setTimeout(() => {
      this.context = this.canvasElement.nativeElement.getContext('2d');
      this.renderFrame();
      this.context.fillStyle = 'rgb(0,0,0)';
      this.context.fillRect(0, 0, this.width, this.height);
    }, 300);

    setInterval(() => {
      this.game.tick(this.controlState);
      this.score = this.game.score;
    }, 1 / this.ticksPerSecond);
  }


  renderFrame(): void {
    if (this.game.gameOver()) {
      this.context.font = '30px Arial';
      this.context.fillText('Game Over!', this.game.width / 2, this.game.height / 2);
      setTimeout(() => location.reload(), 5000);
      return;
    }

    if (this.game.win()) {
      this.context.font = '30px Arial';
      this.context.fillText('You win!', this.game.width / 2, this.game.height / 2);
      setTimeout(() => location.reload(), 5000);
      return;
    }

    this.context.fillStyle = 'rgb(0,0,0)';
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.fillStyle = 'rgb(255,255,255)';

    let bounds: Boundaries;

    const paddleObj = this.game.playerPaddle;
    bounds = paddleObj.getCollisionBoundaries();
    this.context.fillRect(bounds.left, bounds.top, paddleObj.getWidth(), paddleObj.getHeight());

    const ballObj = this.game.ball;
    bounds = ballObj.getCollisionBoundaries();
    this.context.fillRect(bounds.left, bounds.top, ballObj.getWidth(), ballObj.getHeight());

    let i = 0;
    for (i = 0; i < this.game.blocks.length; i++) {
      const block = this.game.blocks[i];
      bounds = block.getCollisionBoundaries();
      this.context.fillRect(bounds.left, bounds.top, block.getWidth(), block.getHeight());
    }
    window.requestAnimationFrame(() => this.renderFrame());

  }

  @HostListener('window:keydown', ['$event'])
  keyUp(event: KeyboardEvent) {
    if (event.keyCode === Controls.Left) {
      this.controlState.leftPressed = true;
    }
    if (event.keyCode === Controls.Right) {
      this.controlState.rightPressed = true;
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyDown(event: KeyboardEvent) {
    if (event.keyCode === Controls.Left) {
      this.controlState.leftPressed = false;
    }
    if (event.keyCode === Controls.Right) {
      this.controlState.rightPressed = false;
    }
  }
}
