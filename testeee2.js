const video = document.getElementById("video-input");
const canvas = document.getElementById("canvas-output");

(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
  let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
  let cap = new cv.VideoCapture(video);


  if (!stream) {
    src.delete();
    dst.delete();
    return;
  }

  video.srcObject = stream;
  video.play();

  const FPS = 30;
  function processVideo() {
    let begin = Date.now();
    cap.read(src);
    
    cv.cvtColor(src, dst, cv.COLOR_BGR2BGRA);

    let a = new cv.Mat()
    cv.threshold(dst, dst, (10, 1, 0, 100), (25, 5, 50, 25), cv.THRESH_BINARY);

    cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY);
    
    let hierarchy = new cv.Mat();
    let contours = new cv.MatVector();

    cv.findContours(
      dst,
      contours,
      hierarchy,
      cv.RETR_CCOMP,
      cv.CHAIN_APPROX_SIMPLE
    );

    for (let i = 0; i < contours.size(); ++i) {
      let color = new cv.Scalar(255, 0, 0);
      cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
    }
    
    cv.imshow("canvas-output", dst);
  
    let delay = 1000 / FPS - (Date.now() - begin);
    setTimeout(processVideo, delay);
}


  setTimeout(processVideo, 0);
})();
