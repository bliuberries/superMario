!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=0)}([function(e,n,t){e.exports=t(1)},function(e,n,t){t(2)(t(3))},function(e,n){e.exports=function(e){function n(e){"undefined"!=typeof console&&(console.error||console.log)("[Script Loader]",e)}try{"undefined"!=typeof execScript&&"undefined"!=typeof attachEvent&&"undefined"==typeof addEventListener?execScript(e):"undefined"!=typeof eval?eval.call(null,e):n("EvalError: No eval function available")}catch(e){n(e)}}},function(e,n){e.exports="import Camera from './Camera.js';\nimport Entity from './entity.js';\nimport PlayerController from './traits/PlayerController.js';\nimport Timer from './timer.js';\nimport { createLevelLoader } from './loaders/level.js';\nimport { loadFont } from './loaders/font.js';\nimport { loadEntities } from './entities.js'\nimport { setupKeyboard } from './Input.js';\n// import { createCollisionLayer } from './layers/collision.js';\nimport { createDashboardLayer } from './layers/dashboard.js';\n\nfunction createPlayerEnv(playerEntity) {\n  const playerEnv = new Entity();\n  const playerControl = new PlayerController();\n  playerControl.checkpoint.set(64, 64);\n  playerControl.setPlayer(playerEntity);\n  playerEnv.addTrait(playerControl);\n  return playerEnv;\n}\n\nasync function main(canvas) {\n  const context = canvas.getContext('2d');\n\n  const [entityFactory, font] = await Promise.all([\n    loadEntities(),\n    loadFont()\n  ])\n\n  const loadLevel = await createLevelLoader(entityFactory);\n\n  const level = await loadLevel('1-1');\n\n  const camera = new Camera();\n\n  const mario = entityFactory.mario();\n\n  const playerEnv = createPlayerEnv(mario);\n  level.entities.add(playerEnv);\n\n  // level.comp.layers.push(createCollisionLayer(level));\n  level.comp.layers.push(createDashboardLayer(font, playerEnv));\n\n  const input = setupKeyboard(mario);\n  input.listenTo(window);\n\n  const timer = new Timer(1 / 60);\n  timer.update = function (deltaTime) {\n    level.update(deltaTime);\n\n    if (mario.pos.x > 100) {\n      camera.pos.x = Math.max(0 , mario.pos.x - 100);\n    }\n\n    level.comp.draw(context, camera);\n  }\n\n  timer.start();\n}\n\nconst canvas = document.getElementById('screen');\nmain(canvas);\n"}]);