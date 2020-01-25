import { Sides, Trait } from '../entity.js';

export default class Killable extends Trait {
  constructor() {
    super('killable');
    this.dead = false;
    this.deadTime = 0;
    this.removeAfter = 2;
  }

  revive() {
    this.dead = false;
    this.deadTime = 0;
  }

  kill() {
    this.queue(() => this.dead = true);
  }

  update(entity, deltaTime, level) {
    if(this.dead) {
      this.deadTime += deltaTime;
      if(this.deadTime > this.removeAfter) {
        this.queue(() => {
          level.entities.delete(entity);
        });
      }
    }
  }
}