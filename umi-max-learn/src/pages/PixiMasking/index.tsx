import { Application, Container, Graphics, Text } from 'pixi.js';
import { useEffect } from 'react';

const PixiRenderTree = () => {
  useEffect(() => {
    return init();
  }, []);

  async function init() {
    const app = new Application();

    await app.init({
      width: 640,
      height: 360,
    });

    const target = document.getElementById('pixi-masking-container');

    if (!target) {
      return;
    }

    target.appendChild(app.canvas);

    let frame = new Graphics({
      x: 320 - 64,
      y: 180 - 104,
    })
      .rect(0, 0, 208, 208)
      .fill(0x666666)
      .stroke({
        color: 0xffffff,
        width: 4,
        alignment: 0,
      });

    app.stage.addChild(frame);

    let mask = new Graphics().rect(0, 0, 200, 200).fill(0xffffff);

    let maskContainer = new Container();
    maskContainer.mask = mask;
    maskContainer.addChild(mask);
    maskContainer.position.set(4, 4);
    frame.addChild(maskContainer);

    let text = new Text({
      text:
        'This text will scroll up and be masked, so you can see how masking works.  Lorem ipsum and all that.\n\n' +
        'You can put anything in the container and it will be masked!',
      style: {
        fontSize: 24,
        fill: 0x1010ff,
        wordWrap: true,
        wordWrapWidth: 180,
      },
      x: 10,
    });

    maskContainer.addChild(text);

    let elapsed = 0.0;
    app.ticker.add((ticker) => {
      elapsed += ticker.deltaTime;
      text.y = 10 + -100.0 + Math.cos(elapsed / 50.0) * 100;
    });

    return () => {
      app.destroy();
    };
  }

  return <div id="pixi-masking-container" className="h-screen" />;
};

export default PixiRenderTree;
