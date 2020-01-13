import Keyboard from './keyboardState.js';

export function setupKeyboard(mario) {

  const input = new Keyboard();

  input.addMapping('Space', keyState => {
    if(keyState) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });
  input.addMapping('KeyO', keyState => {
    mario.turbo(keyState);
    // mario.go.dragFactor = keyState ? 1/5000 : 1/1000;
  })
  input.addMapping('KeyD', keyState => {
    mario.go.dir += keyState ? 1 : -1;
  });

  input.addMapping('KeyA', keyState => {
    mario.go.dir += keyState ? -1 : 1;
  });

  return input
}