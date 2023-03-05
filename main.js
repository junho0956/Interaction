(() => {

  let yOffset = 0; // window.pageYOffset
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 위에 있는 섹션들의 합
  let currentScene = 0; // 현재 보고 있는 섹션

  const sceneInfo = [
    {
      type: 'sticky', // sticky 애니메이션이 들어가는 타입
      heightNum: 5, // 브라우저 높이를 scrollHeight 의 5배로 고정
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        canvas: document.querySelector('#scroll-section-0 #video-canvas-0'),
        canvasCtx: document.querySelector('#scroll-section-0 #video-canvas-0').getContext('2d'),
        videoImgs: [],
      },
      values: {
        videoImageCount: 300,
        videoImageSequence: [0, 299],
        videoFadeOut: [1, 0, {start:0.9, end:1}],

        messageA_opacity_in: [0, 1, {start:0.1, end:0.2}],
        messageB_opacity_in: [0, 1, {start:0.3, end:0.4}],
        messageC_opacity_in: [0, 1, {start:0.5, end:0.6}],
        messageD_opacity_in: [0, 1, {start:0.7, end:0.8}],
        messageA_translateY_in: [25, 0, {start:0.1, end:0.2}],
        messageB_translateY_in: [25, 0, {start:0.3, end:0.4}],
        messageC_translateY_in: [25, 0, {start:0.5, end:0.6}],
        messageD_translateY_in: [25, 0, {start:0.7, end:0.8}],

        messageA_opacity_out: [1, 0, {start:0.25, end:0.3}],
        messageB_opacity_out: [1, 0, {start:0.45, end:0.5}],
        messageC_opacity_out: [1, 0, {start:0.65, end:0.7}],
        messageD_opacity_out: [1, 0, {start:0.85, end:0.9}],
        messageA_translateY_out: [0, -25, {start:0.25, end:0.3}],
        messageB_translateY_out: [0, -25, {start:0.45, end:0.5}],
        messageC_translateY_out: [0, -25, {start:0.65, end:0.7}],
        messageD_translateY_out: [0, -25, {start:0.85, end:0.9}],
      }
    },
    {
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
        messageA: document.querySelector('#scroll-section-2 .main-message.a'),
        messageB: document.querySelector('#scroll-section-2 .desc-message.b'),
        messageC: document.querySelector('#scroll-section-2 .desc-message.c'),
        pinA: document.querySelector('#scroll-section-2 .pin.a'),
        pinB: document.querySelector('#scroll-section-2 .pin.b'),
        canvas: document.querySelector('#scroll-section-2 #video-canvas-1'),
        canvasCtx: document.querySelector('#scroll-section-2 #video-canvas-1').getContext('2d'),
        videoImgs: [],
      },
      values: {
        videoImageCount: 960,
        videoImageSequence: [0, 959],
        videoFadeIn: [0, 1, {start:0, end:0.1}],
        videoFadeOut: [1, 0, {start:0.9, end:1}],

        messageA_opacity_in: [0, 1, {start:0.15, end:0.2}],
        messageB_opacity_in: [0, 1, {start:0.5, end:0.55}],
        messageC_opacity_in: [0, 1, {start:0.72, end:0.77}],
        messageA_translateY_in: [25, 0, {start:0.15, end:0.2}],
        messageB_translateY_in: [30, 0, {start:0.5, end:0.55}],
        messageC_translateY_in: [30, 0, {start:0.72, end:0.77}],
        pinA_opacity_in: [0, 1, {start:0.5, end:0.55}],
        pinB_opacity_in: [0, 1, {start:0.72, end:0.77}],
        pinA_scaleY: [0.5, 1, {start:0.5, end:0.55}],
        pinB_scaleY: [0.5, 1, {start:0.72, end:0.77}],
        
        messageA_opacity_out: [1, 0, {start:0.3, end:0.35}],
        messageB_opacity_out: [1, 0, {start:0.58, end:0.63}],
        messageC_opacity_out: [1, 0, {start:0.85, end:0.9}],
        messageA_translateY_out: [0, -25, {start:0.3, end:0.35}],
        messageB_translateY_out: [0, -30, {start:0.58, end:0.63}],
        messageC_translateY_out: [0, -30, {start:0.85, end:0.9}],
        pinA_opacity_out: [1, 0, {start:0.58, end:0.63}],
        pinB_opacity_out: [1, 0, {start:0.85, end:0.9}],
      }
    },
    {
      type: 'sticky',
      heightNum: 5, 
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    },
  ]

  function setCanvasImage() {
    let imgEl;
    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      imgEl = new Image();
      imgEl.src = `./video/001/IMG_${6726 + i}.JPG`;
      sceneInfo[0].objs.videoImgs.push(imgEl);
    }
    let imgEl2;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      imgEl2 = new Image();
      imgEl2.src = `./video/002/IMG_${7027 + i}.JPG`;
      sceneInfo[2].objs.videoImgs.push(imgEl2);
    }
  }

  function setLayout() {
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === 'normal') {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }

      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;

    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }

    document.body.setAttribute('id', `show-scene-${currentScene}`);

    // #scroll-section-0 의 canvas 를 반응형으로 맞추는 작업
    // 항상 같은 UX 를 제공하기 위해서 canvas, img 를 반응형으로 주되, 화면 전체를 먹인다면
    // 화면의 높이만큼을 가진 후에 중앙 정렬
    const heightRatio = window.innerHeight / 1080; // #scroll-section-0 에서 사용하는 이미지의 높이 해상도가 1080 픽셀이여서
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  // 현재 currentScene 에서 currentYOffset 기준으로 전달받은 values 범위 내의 값을 구하기
  function calcValues(values, currentYOffset) {
    let rv;

    if (values[2]) {
      const partScrollStart = values[2].start * sceneInfo[currentScene].scrollHeight;
      const partScrollEnd = values[2].end * sceneInfo[currentScene].scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = ((currentYOffset - partScrollStart) / partScrollHeight) * (values[1] - values[0]) + values[0];
      }
      else if (currentYOffset < partScrollStart) {
        rv = values[0];
      }
      else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } 
    else { // 특정 범위내가 아닌 sceneHeight 에 대한 범위 구하기
      const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }
    
    return rv;
  }

  function playAnimation() {

    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

    switch(currentScene) {
      case 0:

        const videoImageSequence = Math.round(calcValues(values.videoImageSequence, currentYOffset));
        objs.canvasCtx.drawImage(objs.videoImgs[videoImageSequence], 0, 0);
        const canvasFadeOut = calcValues(values.videoFadeOut, currentYOffset);
        objs.canvas.style.opacity = canvasFadeOut;

        if (scrollRatio <= 0.22) {
          let messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
          let messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
          objs.messageA.style.opacity = messageA_opacity_in;
          objs.messageA.style.transform = `translate3d(0, ${messageA_translateY_in}%, 0)`;
        }
        else {
          let messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
          let messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);
          objs.messageA.style.opacity = messageA_opacity_out;
          objs.messageA.style.transform = `translate3d(0, ${messageA_translateY_out}%, 0)`;
        }

        if (scrollRatio <= 0.42) {
          let messageB_opacity_in = calcValues(values.messageB_opacity_in, currentYOffset);
          let messageB_translateY_in = calcValues(values.messageB_translateY_in, currentYOffset);
          objs.messageB.style.opacity = messageB_opacity_in;
          objs.messageB.style.transform = `translate3d(0, ${messageB_translateY_in}%, 0)`;
        }
        else {
          let messageB_opacity_out = calcValues(values.messageB_opacity_out, currentYOffset);
          let messageB_translateY_out = calcValues(values.messageB_translateY_out, currentYOffset);
          objs.messageB.style.opacity = messageB_opacity_out
          objs.messageB.style.transform = `translate3d(0, ${messageB_translateY_out}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          let messageC_opacity_in = calcValues(values.messageC_opacity_in, currentYOffset);
          let messageC_translateY_in = calcValues(values.messageC_translateY_in, currentYOffset);
          objs.messageC.style.opacity = messageC_opacity_in;
          objs.messageC.style.transform = `translate3d(0, ${messageC_translateY_in}%, 0)`;
        }
        else {
          let messageC_opacity_out = calcValues(values.messageC_opacity_out, currentYOffset);
          let messageC_translateY_out = calcValues(values.messageC_translateY_out, currentYOffset);
          objs.messageC.style.opacity = messageC_opacity_out;
          objs.messageC.style.transform = `translate3d(0, ${messageC_translateY_out}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          let messageD_opacity_in = calcValues(values.messageD_opacity_in, currentYOffset);
          let messageD_translateY_in = calcValues(values.messageD_translateY_in, currentYOffset);
          objs.messageD.style.opacity = messageD_opacity_in;
          objs.messageD.style.transform = `translate3d(0, ${messageD_translateY_in}%, 0)`;
        }
        else {
          let messageD_opacity_out = calcValues(values.messageD_opacity_out, currentYOffset);
          let messageD_translateY_out = calcValues(values.messageD_translateY_out, currentYOffset);
          objs.messageD.style.opacity = messageD_opacity_out;
          objs.messageD.style.transform = `translate3d(0, ${messageD_translateY_out}%, 0)`;
        }

        break;
      case 1:
        break;
      case 2:

        const videoImageSequence2 = Math.round(calcValues(values.videoImageSequence, currentYOffset));
        objs.canvasCtx.drawImage(objs.videoImgs[videoImageSequence2], 0, 0);

        if (scrollRatio < 0.5) {
          const canvasFadeIn = calcValues(values.videoFadeIn, currentYOffset);
          objs.canvas.style.opacity = canvasFadeIn;
        } else {
          const canvasFadeOut = calcValues(values.videoFadeOut, currentYOffset);
          objs.canvas.style.opacity = canvasFadeOut
        }

        if (scrollRatio < 0.25) {
          const messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
          const messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
          objs.messageA.style.opacity = messageA_opacity_in;
          objs.messageA.style.transform = `translate3d(0, ${messageA_translateY_in}%, 0)`;
        }
        else {
          const messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
          const messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);
          objs.messageA.style.opacity = messageA_opacity_out;
          objs.messageA.style.transform = `translate3d(0, ${messageA_translateY_out}%, 0)`;
        }

        if (scrollRatio < 0.565) {
          const messageB_opacity_in = calcValues(values.messageB_opacity_in, currentYOffset);
          const messageB_translateY_in = calcValues(values.messageB_translateY_in, currentYOffset);
          const pinA_opacity_in = calcValues(values.pinA_opacity_in, currentYOffset);
          const pinA_scaleY = calcValues(values.pinA_scaleY, currentYOffset);
          objs.messageB.style.opacity = messageB_opacity_in;
          objs.messageB.style.transform = `translate3d(0, ${messageB_translateY_in}%, 0)`;
          objs.pinA.style.transform = `scale(${pinA_scaleY})`;
          objs.pinA.style.opacity = pinA_opacity_in;
        }
        else {
          const messageB_opacity_out = calcValues(values.messageB_opacity_out, currentYOffset);
          const messageB_translateY_out = calcValues(values.messageB_translateY_out, currentYOffset);
          const pinA_opacity_out = calcValues(values.pinA_opacity_out, currentYOffset);
          objs.messageB.style.opacity = messageB_opacity_out;
          objs.messageB.style.transform = `translate3d(0, ${messageB_translateY_out}%, 0)`;
          objs.pinA.style.opacity = pinA_opacity_out;
        }

        if (scrollRatio < 0.8) {
          const messageC_opacity_in = calcValues(values.messageC_opacity_in, currentYOffset);
          const messageC_translateY_in = calcValues(values.messageC_translateY_in, currentYOffset);
          const pinB_opacity_in = calcValues(values.pinB_opacity_in, currentYOffset);
          const pinB_scaleY = calcValues(values.pinB_scaleY, currentYOffset);
          objs.messageC.style.opacity = messageC_opacity_in;
          objs.messageC.style.transform = `translate3d(0, ${messageC_translateY_in}%, 0)`;
          objs.pinB.style.opacity = pinB_opacity_in;
          objs.pinB.style.transform = `scale(${pinB_scaleY})`;
        }
        else {
          const messageC_opacity_out = calcValues(values.messageC_opacity_out, currentYOffset);
          const messageC_translateY_out = calcValues(values.messageC_translateY_out, currentYOffset);
          const pinB_opacity_out = calcValues(values.pinB_opacity_out, currentYOffset);
          objs.messageC.style.opacity = messageC_opacity_out;
          objs.messageC.style.transform = `translate3d(0, ${messageC_translateY_out}%, 0)`;
          objs.pinB.style.opacity = pinB_opacity_out;
        }

        break;
      case 3:
        break;
    }
  }

  function scrollLoop() {
    let currentSceneChange = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}` );
      currentSceneChange = true;
    }
    else if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}` );
      currentSceneChange = true;
    }

    if (currentSceneChange) return; // 순간적으로 음수가 되는 값들을 막아주기 위해

    playAnimation()
  }

  setCanvasImage();

  window.addEventListener('load', () => {
    setLayout();
    sceneInfo[0].objs.canvasCtx.drawImage(sceneInfo[0].objs.videoImgs[0], 0, 0);
  });
  window.addEventListener('resize', setLayout);
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  })

  setLayout(); 

})()