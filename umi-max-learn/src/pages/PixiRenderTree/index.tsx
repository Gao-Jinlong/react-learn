import { Application, Assets, Container, Sprite } from 'pixi.js';
import { useEffect } from 'react';

const PixiRenderTree = () => {
  useEffect(() => {
    init();
  }, []);

  async function init() {
    const app = new Application();

    await app.init({
      background: '#000000',
      backgroundAlpha: 0,
      width: 800,
      height: 600,
    });

    const target = document.getElementById('pixi-render-tree-container');

    if (!target) {
      return;
    }

    target.appendChild(app.canvas);

    const container = new Container({
      x: app.screen.width / 2,
      y: app.screen.height / 2,
    });

    app.stage.addChild(container);

    const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');

    const sprites: any[] = [];
    let parent = container;
    for (let i = 0; i < 3; i++) {
      let wrapper = new Container();
      const sprite = new Sprite(texture);
      sprite.anchor.set(0.5);
      wrapper.addChild(sprite);
      parent.addChild(wrapper);
      sprites.push(wrapper);
      parent = wrapper;
    }

    let elapsed = 0.8;
    app.ticker.add((delta) => {
      elapsed += delta.deltaTime / 60;
      const amount = Math.sin(elapsed);
      const scale = 1.0 + 0.25 * amount;
      const alpha = 0.75 + 0.25 * amount;
      const angle = 40 * amount;
      const x = 75 * amount;

      for (let i = 0; i < sprites.length; i++) {
        const sprite = sprites[i];
        sprite.scale.set(scale);
        sprite.alpha = alpha;
        sprite.angle = angle;
        sprite.x = x;
      }
    });
  }

  return <div id="pixi-render-tree-container" className="h-screen" />;
};

export default PixiRenderTree;
