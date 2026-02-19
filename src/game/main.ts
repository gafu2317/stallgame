// src/game/main.ts
import { Application } from 'pixi.js';
import { GAME_WIDTH, GAME_HEIGHT, BG_COLOR } from './constants';
import { PlayerEntity } from './PlayerEntity';

export class GameInstance {
  private app: Application;
  private player: PlayerEntity;

  constructor() {
    this.app = new Application();
    this.player = new PlayerEntity();
  }

  async init(container: HTMLElement) {
    try {
      console.log("PixiJS initialization started...");
      
      await this.app.init({
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        backgroundColor: BG_COLOR,
        preference: 'webgl', // WebGPUではなく、より安定したWebGLを優先
      });

      console.log("Renderer type:", this.app.renderer.type);
      container.appendChild(this.app.canvas);

      console.log("Loading player assets...");
      await this.player.load();
      
      if (this.player.sprite) {
        this.app.stage.addChild(this.player.sprite);
        this.player.sprite.x = GAME_WIDTH / 2;
        this.player.sprite.y = GAME_HEIGHT / 2;
        console.log("Player added to stage.");
      }

      this.app.ticker.add((ticker) => {
        this.player.update(ticker.deltaTime);
      });

    } catch (error) {
      console.error("PixiJS Init Error:", error);
    }
  }

  destroy() {
    // 完全に初期化されていない場合は何もしない
    if (!this.app || !this.app.renderer) return;

    try {
      this.app.destroy({
        removeView: true,
      });
    } catch (e) {
      console.error("Destroy failed", e);
    }
  }
}