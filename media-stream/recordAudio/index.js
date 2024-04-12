const record = document.querySelector(".record");
const stop = document.querySelector(".stop");
const soundClips = document.querySelector(".sound-clips");

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log("getUserMedia supported.");

  const constraints = { audio: true };
  // const constraints = { video: true };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(useMediaRecorder)
    .catch(function (error) {
      console.log("The following getUserMedia error occurred:" + error);
    });
} else {
  console.log("getUserMedia not supported on your browser!");
}

function useMediaRecorder(stream) {
  // 创建一个MediaRecorder实例
  const mediaRecorder = new MediaRecorder(stream);

  // 用于存储录音数据的数组
  let chunks = [];

  record.onclick = function () {
    mediaRecorder.start();
    console.log(mediaRecorder.state); // "recording"
    console.log("recorder started");
    record.style.background = "red";
    record.style.color = "black";
  };
  stop.onclick = function () {
    mediaRecorder.stop();
    console.log(mediaRecorder.state); // "inactive"
    console.log("recorder stopped");
    record.style.background = "";
    record.style.color = "";
  };

  // 收集录音数据
  // 浏览器会在需要的时候调用这个函数
  // 也可以在 MediaRecorder.start() 中传递一个参数，表示多少毫秒调用一次
  // 或者使用 MediaRecorder.requestData() 方法手动调用
  mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data);
  };

  mediaRecorder.onstop = function (e) {
    console.log("recorder stopped");

    const clipName = prompt("Enter a name for your sound clip");

    const clipContainer = document.createElement("article");
    const clipLabel = document.createElement("p");
    const audio = document.createElement("video");
    const deleteButton = document.createElement("button");

    clipContainer.classList.add("clip");
    audio.setAttribute("controls", "");
    deleteButton.innerHTML = "Delete";
    clipLabel.innerHTML = clipName;

    clipContainer.appendChild(audio);
    clipContainer.appendChild(clipLabel);
    clipContainer.appendChild(deleteButton);
    soundClips.appendChild(clipContainer);

    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    // const blob = new Blob(chunks, { type: "video/webm" });
    chunks = [];
    const audioURL = URL.createObjectURL(blob);
    audio.src = audioURL;

    deleteButton.onclick = function (e) {
      const evtTgt = e.target;
      evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
    };
  };
}
