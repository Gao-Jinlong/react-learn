import { Application, Assets, BitmapText } from 'pixi.js';
import { useEffect } from 'react';

const PixiBitmapText = () => {
  useEffect(() => {
    const destroy = initPixi();

    function initPixi() {
      const target = document.getElementById('pixi-bitmap-text-container');
      const app = new Application();

      setTimeout(async () => {
        if (!target) {
          return;
        }

        await app.init({ background: '#1099bb', resizeTo: target });

        target.appendChild(app.canvas);

        await Assets.load('https://pixijs.com/assets/bitmap-font/desyrel.xml');

        const bitmapFontText = new BitmapText({
          text: 'bitmap fonts are supported!\nWoo yay!',
          style: {
            fontFamily: 'Desyrel',
            fontSize: 55,
            align: 'left',
          },
        });

        bitmapFontText.x = 50;
        bitmapFontText.y = 200;

        app.stage.addChild(bitmapFontText);
      });

      return () => {
        app.destroy();
      };
    }

    return () => {
      destroy?.();
    };
  }, []);

  return <div id="pixi-bitmap-text-container" className="h-screen" />;
};
export default PixiBitmapText;
