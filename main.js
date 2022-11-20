(() => {
  const sceneInfo = [
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        canvas: document.getElementById('video-canvas-0'),
        context: document.getElementById('video-canvas-0').getContext('2d'),
        videoImages: []
      },
      values: {
        messageA_opacity_in: [0, 1, {start:0.1, end:0.2}],
        messageB_opacity_in: [0, 1, {start:0.3, end:0.4}],
        messageC_opacity_in: [0, 1, {start:0.5, end:0.6}],
        messageD_opacity_in: [0, 1, {start:0.7, end:0.8}],
        messageA_translate_in: [20, 0, {start:0.1, end:0.2}],
        messageB_translate_in: [20, 0, {start:0.3, end:0.4}],
        messageC_translate_in: [20, 0, {start:0.5, end:0.6}],
        messageD_translate_in: [20, 0, {start:0.7, end:0.8}],

        messageA_opacity_out: [1, 0, {start:0.25, end:0.3}],
        messageB_opacity_out: [1, 0, {start:0.45, end:0.5}],
        messageC_opacity_out: [1, 0, {start:0.65, end:0.7}],
        messageD_opacity_out: [1, 0, {start:0.85, end:0.9}],
        messageA_translate_out: [0, -20, {start:0.25, end:0.3}],
        messageB_translate_out: [0, -20, {start:0.45, end:0.5}],
        messageC_translate_out: [0, -20, {start:0.65, end:0.7}],
        messageD_translate_out: [0, -20, {start:0.85, end:0.9}],

        videoImageCount: 300,
        imageSequence: [0, 299],
        canvasOpacity: [1, 0, {start:0.9, end:1}]
      }
    },
    {
      type: "normal",
      // heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
        messageA: document.querySelector("#scroll-section-2 .a"),
        messageB: document.querySelector("#scroll-section-2 .b"),
        messageC: document.querySelector("#scroll-section-2 .c"),
        pinB: document.querySelector('#scroll-section-2 .b .pin'),
        pinC: document.querySelector("#scroll-section-2 .c .pin"),

        canvas: document.getElementById('video-canvas-1'),
        context: document.getElementById('video-canvas-1').getContext('2d'),
        videoImages: []
      },
      values: {
        messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
        messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
        messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],

        messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
        messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
        messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
        messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
        messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],

        pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
        pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],

        videoImageCount: 960,
        imageSequence: [0, 959],
        canvasOpacityOn: [0, 1, {start:0, end:0.1}],
        canvasOpacityOff: [1, 0, {start:0.9, end:1}]
      }
    },
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
        canvasCaption: document.querySelector('.canvas-caption'),
        canvas: document.querySelector('.image-blend-canvas'),
        context: document.querySelector('.image-blend-canvas').getContext('2d'),
        imagesPath: [
          './images/blend-image-1.jpg',
          './images/blend-image-2.jpg',
        ],
        images: []
      },
      values: {

      }
    },
  ];

  let yOffset = 0; // window.pageYOffset
  let prevScrollHeight = 0; // 현재 스크롤 위치 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이 합
  let currentScene = 0; // 현재 보고있는 씬
  let enterNewScene = false;

  const setCanvasImage = () => {
    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      const image = new Image();
      image.src = `./video/001/IMG_${6726 + i}.jpg`;
      sceneInfo[0].objs.videoImages.push(image);
    }
    for (let i = 0; i<sceneInfo[2].values.videoImageCount; i++) {
      const image = new Image();
      image.src = `./video/002/IMG_${7027 + i}.jpg`;
      sceneInfo[2].objs.videoImages.push(image);
    }
    for (let i = 0; i<sceneInfo[3].objs.imagesPath.length; i++) {
      const image = new Image();
      image.src = sceneInfo[3].objs.imagesPath[i];
      sceneInfo[3].objs.images.push(image);
    }
  }

  setCanvasImage();

  // 각 스크롤 세션의 높이 셋팅
  const setLayout = () => {
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type == 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      }
      else if (sceneInfo[i].type == 'normal') {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    // 초기 body id 구해주기
    let totalScrollHeight = 0;

    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight > window.pageYOffset) {
        currentScene = i;
        break;
      }
    }

    document.body.setAttribute("id", `show-scene-${currentScene}`);

    // 캔버스 창 사이즈 조절하기
    const heightRatio = window.innerHeight / 1080; // 1080 은 영상(이미지)의 원본 화질이며 html 로 지정해놓은 height 값이기도함
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  };

  const scrollLoop = () => {
    prevScrollHeight = 0;
    enterNewScene = false;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      enterNewScene = true;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene == 0) return;
      currentScene--;
      enterNewScene = true;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (enterNewScene) return; // scene 이 변경되는 순간에 스크롤 이벤트의 오차를 막기 위해 임시로 사용
    playAnimation();
  };

  const calcValues = (values, currentYOffset) => {
    let rv;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      // start ~ end 사이에서 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
      }
      else if (currentYOffset < partScrollStart) {
        rv = values[0];
      }
      else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  const playAnimation = () => {
    const values = sceneInfo[currentScene].values;
    const objs = sceneInfo[currentScene].objs;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0: {
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        objs.canvas.style.opacity = calcValues(values.canvasOpacity, currentYOffset);

        let messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
        let messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
        let messageA_translate_in = calcValues(values.messageA_translate_in, currentYOffset);
        let messageA_translate_out = calcValues(values.messageA_translate_out, currentYOffset);

        let messageB_opacity_in = calcValues(values.messageB_opacity_in, currentYOffset);
        let messageB_opacity_out = calcValues(values.messageB_opacity_out, currentYOffset);
        let messageB_translate_in = calcValues(values.messageB_translate_in, currentYOffset);
        let messageB_translate_out = calcValues(values.messageB_translate_out, currentYOffset);

        let messageC_opacity_in = calcValues(values.messageC_opacity_in, currentYOffset);
        let messageC_opacity_out = calcValues(values.messageC_opacity_out, currentYOffset);
        let messageC_translate_in = calcValues(values.messageC_translate_in, currentYOffset);
        let messageC_translate_out = calcValues(values.messageC_translate_out, currentYOffset);

        let messageD_opacity_in = calcValues(values.messageD_opacity_in, currentYOffset);
        let messageD_opacity_out = calcValues(values.messageD_opacity_out, currentYOffset);
        let messageD_translate_in = calcValues(values.messageD_translate_in, currentYOffset);
        let messageD_translate_out = calcValues(values.messageD_translate_out, currentYOffset);

        if (scrollRatio <= 0.22) {
          objs.messageA.style.opacity = messageA_opacity_in;
          objs.messageA.style.transform = `translate3d(0, ${-50 + messageA_translate_in}%, 0)`;
        } else {
          objs.messageA.style.opacity = messageA_opacity_out;
          objs.messageA.style.transform = `translate3d(0, ${-50 + messageA_translate_out}%, 0)`;
        }

        if (scrollRatio <= 0.42) {
          objs.messageB.style.opacity = messageB_opacity_in;
          objs.messageB.style.transform = `translate3d(0, ${-50 + messageB_translate_in}%, 0)`;
        }
        else {
          objs.messageB.style.opacity = messageB_opacity_out;
          objs.messageB.style.transform = `translate3d(0, ${-50 + messageB_translate_out}%, 0)`;
        }
        
        if (scrollRatio <= 0.62) {
          objs.messageC.style.opacity = messageC_opacity_in;
          objs.messageC.style.transform = `translate3d(0, ${-50 + messageC_translate_in}%, 0)`;
        }
        else {
          objs.messageC.style.opacity = messageC_opacity_out;
          objs.messageC.style.transform = `translate3d(0, ${-50 + messageC_translate_out}%, 0)`;
        }
        
        if (scrollRatio <= 0.82) {
          objs.messageD.style.opacity = messageD_opacity_in;
          objs.messageD.style.transform = `translate3d(0, ${-50 + messageD_translate_in}%, 0)`;
        }
        else {
          objs.messageD.style.opacity = messageD_opacity_out;
          objs.messageD.style.transform = `translate3d(0, ${-50 + messageD_translate_out}%, 0)`;
        }
        break;
      }
      case 2: {
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        console.log({sequence})
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);

        if (scrollRatio <= 0.25) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
          objs.canvas.style.opacity = calcValues(values.canvasOpacityOn, currentYOffset);
        } else {
            // out
            objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
            objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
            objs.canvas.style.opacity = calcValues(values.canvasOpacityOff, currentYOffset);
        }

        if (scrollRatio <= 0.57) {
            // in
            objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
            objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
            objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        } else {
            // out
            objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
            objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
            objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        }

        if (scrollRatio <= 0.83) {
            // in
            objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
            objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
            objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        } else {
            // out
            objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
            objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
            objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        }
        break;
      }
      case 3:
        // ** 화면 대응이 중요함 **
        // 이미지의 비율이 깨지지 않는 (contain) 상태의 캔버스를 모든 화면에 적절히 대응하기 위해
        // 화면 비율과 캔버스 비율을 통해 각각 계산하는 과정을 거쳐야함

        // 가로 세로 모두 화면 비율에 맞게 계산 셋팅
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio;

        if (widthRatio <= heightRatio) { // 윈도우의 비율에 따라서 캔버스의 사이즈를 어떤 ratio를 기준으로 맞출 것인지 정함
          // 캔버스보다 브라우저 창이 홀쭉한 경우 (가로)
          canvasScaleRatio = heightRatio;
        } else {
          // 캔버스보다 브라우저 창이 납작한 경우 (세로)
          canvasScaleRatio = widthRatio;
        }

        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
        objs.context.drawImage(objs.images[0], 0, 0);

        // 캔버스 사이즈에 맞춰 가정한 innerWidth 와 innerHeight
        const recalculatedInnerWidth = window.innerWidth / canvasScaleRatio;
        const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
        console.log({recalculatedInnerWidth, recalculatedInnerHeight})
        const whiteRectWidth = recalculatedInnerWidth * 0.15;

        break;
    }
  }

  window.addEventListener("load", () => {
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
  });
  window.addEventListener("resize", setLayout);
  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
})()