// src/game/PlayerEntity.ts
import { Sprite, Assets } from 'pixi.js';
import { PLAYER_SPEED } from './constants';

export class PlayerEntity {
  public sprite: Sprite | null = null;
  private keys: Record<string, boolean> = {};

  constructor() {
    // キーボードイベントの登録
    window.addEventListener('keydown', (e) => (this.keys[e.key.toLowerCase()] = true));
    window.addEventListener('keyup', (e) => (this.keys[e.key.toLowerCase()] = false));
  }

  async load() {

  }

  update(delta: number) {
    if (!this.sprite) return;

    if (this.keys['w'] || this.keys['arrowup']) this.sprite.y -= PLAYER_SPEED * delta;
    if (this.keys['s'] || this.keys['arrowdown']) this.sprite.y += PLAYER_SPEED * delta;
    if (this.keys['a'] || this.keys['arrowleft']) this.sprite.x -= PLAYER_SPEED * delta;
    if (this.keys['d'] || this.keys['arrowright']) this.sprite.x += PLAYER_SPEED * delta;
  }
}