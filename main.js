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
        messageA_translate_in: [20, 0, {start:0.1, end:0.2}],
        messageA_opacity_out: [1, 0, {start:0.25, end:0.3}],
        messageA_translate_out: [0, -20, {start:0.25, end:0.3}],

        messageB_opacity_in: [0, 1, {start:0.3, end:0.4}],
        messageB_translate_in: [20, 0, {start:0.3, end:0.4}],
        messageB_opacity_out: [1, 0, {start:0.4, end:0.5}],
        
        messageC_opacity: [0, 1, {start:0.5, end:0.6}],
        messageD_opacity: [0, 1, {start:0.7, end:0.8}],
      }
    },
    {
      type: "normal",
      heightNum: 5,
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
      },
    },
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  let yOffset = 0; // window.pageYOffset
  let prevScrollHeight = 0; // 현재 스크롤 위치 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이 합
  let currentScene = 0; // 현재 보고있는 씬
  let enterNewScene = false;

  // 각 스크롤 세션의 높이 셋팅
  const setLayout = () => {
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
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

        if (scrollRatio <= 0.22) {
          objs.messageA.style.opacity = messageA_opacity_in;
          objs.messageA.style.transform = `translateY(${-50 + messageA_translate_in}%)`;
        } else {
          objs.messageA.style.opacity = messageA_opacity_out;
          objs.messageA.style.transform = `translateY(${-50 + messageA_translate_out}%)`;
        }
        // TODO: 나머지 요소들 적용해주기
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;        
    }
  }

  window.addEventListener("load", setLayout);
  window.addEventListener("resize", setLayout);
  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
})()