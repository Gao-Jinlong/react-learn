let offscreen: OffscreenCanvas | null = null;
let context: OffscreenCanvasRenderingContext2D | null = null;

self.addEventListener("message", ({ data }) => {
  if (data.type === "offscreen") {
    console.log("offscreen", data.offscreen);
    offscreen = data.offscreen;
    if (offscreen) {
      context = offscreen.getContext("2d");

      createAnimate();
    }
  }
});

function createAnimate() {
  if (!context) return null;

  function render(time: DOMHighResTimeStamp) {
    if (!context) return;

    context.clearRect(0, 0, 100, 100);
    context.fillStyle = "#ff0";
    context.fillRect(0, 0, 100, 100);
    const rotate = Math.sin(time / 1000) * Math.PI;
    context.translate(50, 50);
    context.rotate(rotate);

    context.translate(-50, -50);

    context.fillText("Hello", 50, 50);

    postBitmap();

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function postBitmap() {
  if (!context || !offscreen) return;
  const bitmap = offscreen.transferToImageBitmap();
  console.log("🚀 ~ postBitmap ~ bitmap:", bitmap);
  self.postMessage({
    type: "bitmap",
    bitmap,
  });
}
