import Compositor from './Compositor.js';
import { loadLevel } from './loaders.js';
import { createMario } from './entities.js';
import { loadBackgroundSprites } from './sprites.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  createMario(),
  loadBackgroundSprites(),
  loadLevel('1-1'),
])
  .then(([mario, backGroundSprites, level]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backGroundSprites);
    // comp.layers.push(backgroundLayer);

    const gravity = 30;
    mario.pos.set(64, 180);
    mario.vel.set(200, -600);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    const deltaTime = 1/60;
    let accumulatedTime = 0;
    let lastTime = 0;

    function update(time) {
      accumulatedTime += (time - lastTime) / 1000;

      while(accumulatedTime > deltaTime) {
        comp.draw(context);
        mario.update(deltaTime);
        mario.vel.y += gravity;
        accumulatedTime -= deltaTime;
      }
      // requestAnimationFrame(update);
      setTimeout(update, 1000/60, performance.now());

      lastTime = time;
    }
    update(0);
  })