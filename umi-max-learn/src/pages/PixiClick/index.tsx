import { Application, Assets, Sprite } from 'pixi.js';
import { useEffect } from 'react';

const PixiClick = () => {
  useEffect(() => {
    init();
  }, []);

  async function init() {
    const app = new Application();

    const target = document.getElementById('pixi-click-container');

    if (!target) {
      return;
    }

    await app.init({
      width: 800,
      height: 600,
    });

    target.appendChild(app.canvas);

    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    const sprite = Sprite.from(texture);

    sprite.anchor.set(0.5);
    sprite.x = app.screen.width / 2;
    sprite.y = app.screen.height / 2;

    app.stage.addChild(sprite);

    sprite.eventMode = 'static';

    sprite.cursor = 'pointer';

    sprite.on('pointerdown', onClick);

    app.stage.addChild(sprite);

    function onClick() {
      sprite.scale.x *= 1.25;
      sprite.scale.y *= 1.25;
    }
  }

  return <div id="pixi-click-container" className="h-screen" />;
};

export default PixiClick;
