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
      }
    },
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
        canvasCaption: document.querySelector('.canvas-caption'),
      },
      values: {

      }
    },
  ];

  let yOffset = 0; // window.pageYOffset
  let prevScrollHeight = 0; // 현재 스크롤 위치 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이 합
  let currentScene = 0; // 현재 보고있는 씬
  let enterNewScene = false;

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
  };

  const initCanvas = () => {
    const canvas = document.querySelector('#scroll-section-0 canvas');
    const ctx = canvas.getContext('2d');
    const imgArr = [];

    const loadFullImage = () => {
      const totalImageCnt = 960;
      let loadedImageCnt = 0;
      for (let i = 0; i<totalImageCnt; i++) {
        const image = new Image();
        image.src = `video/002/IMG_${7027 + i}.jpg`;
        imgArr.push(image);

        image.addEventListener('load', () => {
          loadedImageCnt++;
          if (loadedImageCnt == totalImageCnt) {
            ctx.drawImage(imgArr[0], 0, 0);

            window.addEventListener('scroll', () => {
              const renderIdx = Math.round((window.pageYOffset / (document.body.offsetHeight - window.innerHeight)) * totalImageCnt);
              const movedHeight = window.innerHeight + window.pageYOffset;

              requestAnimationFrame(() => {
                ctx.drawImage(imgArr[renderIdx], 0, 0);
                if (movedHeight >= (sceneInfo[0].scrollHeight - window.innerHeight)) {
                  let opacity = 1 - ((movedHeight - (sceneInfo[0].scrollHeight - window.innerHeight)) / window.innerHeight);
                  if (opacity < 0) opacity = 0;
                  canvas.style.opacity = opacity;
                }
              })
            })
          }
        })
      }

    }

    loadFullImage();
  }

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
      case 0:
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

      case 2:
        if (scrollRatio <= 0.25) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
            // out
            objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
            objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
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

      case 3:
        break;        
    }
  }

  window.addEventListener("load", () => {
    setLayout();
    initCanvas();
  });
  window.addEventListener("resize", setLayout);
  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
})()