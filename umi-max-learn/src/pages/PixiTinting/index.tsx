import { Application, Assets, Rectangle, Sprite } from 'pixi.js';
import { useEffect } from 'react';

const PixiTinting = () => {
  useEffect(() => {
    const destroy = initPixi();

    return () => {
      destroy?.();
    };
  }, []);

  return <div id="pixi-tinting-container" className="h-screen" />;
};

function initPixi() {
  const app = new Application();
  const target = document.getElementById('pixi-tinting-container');

  if (!target) {
    return;
  }

  setTimeout(async () => {
    await app.init({
      background: '#000000',
      resizeTo: target,
      backgroundAlpha: 0,
    });

    target.appendChild(app.canvas);

    const texture = await Assets.load('https://pixijs.com/assets/eggHead.png');

    const aliens: Sprite[] = [];

    const totalDudes = 20;

    for (let i = 0; i < totalDudes; i++) {
      const dude = new Sprite(texture);

      dude.anchor.set(0.5);
      dude.scale.set(Math.random());

      dude.x = Math.random() * app.screen.width;
      dude.y = Math.random() * app.screen.height;

      dude.tint = Math.random() * 0xffffff;

      dude.direction = Math.random() * Math.PI * 2;

      dude.turningSpeed = Math.random() - 0.8;

      dude.speed = 2 + Math.random() * 2;

      aliens.push(dude);

      app.stage.addChild(dude);
    }

    const dudeBoundsPadding = 100;
    const dudeBounds = new Rectangle(
      -dudeBoundsPadding,
      -dudeBoundsPadding,
      app.screen.width + dudeBoundsPadding * 2,
      app.screen.height + dudeBoundsPadding * 2,
    );

    app.ticker.add((time) => {
      for (let i = 0; i < aliens.length; i++) {
        const dude = aliens[i];

        dude.direction += dude.turningSpeed * 0.01;
        dude.x += Math.sin(dude.direction) * dude.speed;
        dude.y += Math.cos(dude.direction) * dude.speed;
        dude.rotation = -dude.direction - Math.PI / 2;

        // Constrain the dudes' position by testing their bounds...
        if (dude.x < dudeBounds.x) {
          dude.x += dudeBounds.width;
        } else if (dude.x > dudeBounds.x + dudeBounds.width) {
          dude.x -= dudeBounds.width;
        }

        if (dude.y < dudeBounds.y) {
          dude.y += dudeBounds.height;
        } else if (dude.y > dudeBounds.y + dudeBounds.height) {
          dude.y -= dudeBounds.height;
        }
      }
    });
  });

  return () => {
    app.destroy?.();
  };
}

export default PixiTinting;
