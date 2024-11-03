import {
  Application,
  Assets,
  Container,
  RenderTexture,
  SCALE_MODES,
  Sprite,
} from 'pixi.js';
import { useEffect } from 'react';

const PixiText = () => {
  useEffect(() => {
    const destroy = initPixi();

    return () => {
      destroy?.();
    };
  }, []);

  return <div id="pixi-text-container" className="h-screen" />;
};

function initPixi() {
  const app = new Application();

  async function init() {
    const target = document.getElementById('pixi-text-container');

    if (!target) {
      return;
    }
    // Initialize the application
    await app.init({ background: '#1099bb', resizeTo: window });

    target.appendChild(app.canvas);

    const container = new Container();

    app.stage.addChild(container);

    const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

    for (let i = 0; i < 25; i++) {
      const bunny = new Sprite(texture);

      bunny.x = (i % 5) * 30;
      bunny.y = Math.floor(i / 5) * 30;
      bunny.rotation = Math.random() * Math.PI * 2;
      container.addChild(bunny);
    }

    const rt = RenderTexture.create({
      width: 300,
      height: 300,
      scaleMode: SCALE_MODES.LINEAR,
      resolution: 1,
    });

    const sprite = new Sprite(rt);

    sprite.x = 650;
    sprite.y = 160;
    sprite.scale.set(1.5);
    sprite.rotation = Math.PI * 0.5;
    app.stage.addChild(sprite);

    container.x = 100;
    container.y = 60;

    app.ticker.add(() => {
      app.renderer.render(container, { renderTexture: rt });
    });
  }

  init();

  return () => {
    app.destroy?.();
  };
}

export default PixiText;
