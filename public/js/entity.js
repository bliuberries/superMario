import { Vec2 } from './math.js';
import { createMario } from './entities.js';

export class Trait {
  constructor(name) {
    this.NAME = name;
  }

  update() {
    console.warn('Unhandled update call in Trait');
  }
}


export default class Entity {
  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);

    this.traits = [];

  }
  // Add composition
  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;

  }

  update(deltaTime) {
    this.traits.forEach(trait => {
      trait.update(this, deltaTime);
    })
  }
}
