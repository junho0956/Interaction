(() => {

  const sections = [
    {
      container: document.querySelector('#scroll-section-0'),
      type: 'sticky',
      sectionHeight: 0,
      canvas: document.querySelector('#scroll-section-0 canvas'),
      elements: {
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
      },
      options: {
        toggleOnMessageA: [{start:0.1, end:0.2}, 0, 1],
        toggleOffMessageA: [{start:0.25, end:0.3}, 1, 0],
        toggleOnMessageB: [{start:0.3, end:0.4}, 0, 1],
        toggleOffMessageB: [{start:0.45, end:0.50}, 1, 0],
        toggleOnMessageC: [{start:0.50, end:0.60}, 0, 1],
        toggleOffMessageC: [{start:0.65, end:0.70}, 1, 0],
        toggleOnMessageD: [{start:0.70, end:0.80}, 0, 1],
        toggleOffMessageD: [{start:0.85, end:0.90}, 1, 0],
        transformOnMessageA: [{start:0.1, end:0.2}, -20, -50],
        transformOffMessageA: [{start:0.25, end:0.3}, -50, -80],
        transformOnMessageB: [{start:0.3, end:0.4}, -20, -50],
        transformOffMessageB: [{start:0.45, end:0.5}, -50, -80],
        transformOnMessageC: [{start:0.5, end:0.6}, -20, -50],
        transformOffMessageC: [{start:0.65, end:0.7}, -50, -80],
        transformOnMessageD: [{start:0.7, end:0.8}, -20, -50],
        transformOffMessageD: [{start:0.85, end:0.9}, -50, -80],
        fadeVideo: [{start:0.8, end:1}, 1, 0],
      }
    },
    {
      container: document.querySelector('#scroll-section-1'),
      type: 'normal',
      sectionHeight: 0,
    },
    {
      container: document.querySelector('#scroll-section-2'),
      type: 'sticky',
      sectionHeight: 0,
      canvas: document.querySelector('#scroll-section-2 canvas'),
      elements: {
        messageA: document.querySelector('#scroll-section-2 .main-message.a'),
        messageB: document.querySelector('#scroll-section-2 .desc-message.b'),
        messageC: document.querySelector('#scroll-section-2 .desc-message.c'),
        pinB: document.querySelector('#scroll-section-2 .sticky-elem.b .pin'),
        pinC: document.querySelector('#scroll-section-2 .sticky-elem.c .pin'),
      },
      options: {
        toggleOnMessageA: [{start:0.1, end:0.2}, 0, 1],
        toggleOffMessageA: [{start:0.25, end:0.3}, 1, 0],
        toggleOnMessageB: [{start:0.3, end:0.5}, 0, 1],
        toggleOffMessageB: [{start:0.5, end:0.52}, 1, 0],
        toggleOnMessageC: [{start:0.6, end:0.8}, 0, 1],
        toggleOffMessageC: [{start:0.8, end:0.82}, 1, 0],

        transformOnMessageA: [{start:0.1, end:0.2}, -20, -50],
        transformOffMessageA: [{start:0.25, end:0.3}, -50, -80],
        transformOnMessageB: [{start:0.3, end:0.5}, 60, 0],
        transformOffMessageB: [{start:0.5, end:0.52}, 0, 0],
        transformOnMessageC: [{start:0.6, end:0.8}, 60, 0],
        transformOffMessageC: [{start:0.8, end:0.82}, 0, 0],

        scalePinB: [{start:0.3, end:0.52}, 0, 1],
        scalePinC: [{start:0.6, end:0.82}, 0, 1],
      }
    },
    {
      container: document.querySelector('#scroll-section-3'),
      type: 'normal',
      sectionHeight: 0,
    },
  ]

  // 레이아웃의 특징에 따라 초기 높이를 설정한다
  function setLayout() {
    for (let i = 0; i < sections.length; i++) {
      let setHeight = sections[i].container.scrollHeight;
      if (sections[i].type === 'sticky') {
        setHeight = window.innerHeight * 5;
      }
      sections[i].sectionHeight = setHeight;
      sections[i].container.style.height = `${setHeight}px`;
    }

    setCurrentViewPage();
  }

  function getCurrentSectionScrollRatio(sectionId) {
    let prevSectionHeights = 0;
    for (let i = 0; i < sectionId; i++) prevSectionHeights += sections[i].sectionHeight;

    return (window.pageYOffset - prevSectionHeights) / sections[sectionId].sectionHeight;
  }

  // 초기 이미지 로드
  function initImage_section0() {
    const imgs = [];
    let loadedImgCnt = 0;
    const fullImgCnt = 7025 - 6726;

    function setSection0Viedeo() {
      const canvas = sections[0].canvas;
      const context = canvas.getContext('2d');
      context.drawImage(imgs[0], 0, 0);

      window.addEventListener('scroll', () => {
        const currentViewPage = document.body.getAttribute('id');
        if (currentViewPage.split('-').at(-1) == 0) {
          requestAnimationFrame(() => {
            const imgIdx = Math.round(getCurrentSectionScrollRatio(0) * fullImgCnt);
            context.drawImage(imgs[imgIdx], 0, 0);
          })
        }
      })
    }

    for (let i = 0; i <= fullImgCnt; i++) {
      const img = new Image();
      img.src = `./video/001/IMG_${6726 + i}.jpg`;
      imgs.push(img);
      img.addEventListener('load', () => {
        loadedImgCnt++;
        if (loadedImgCnt === fullImgCnt + 1) {
          setSection0Viedeo();
        }
      })
    }
  }

  function initImage_section2() {
    const imgs = [];
    let loadedImgCnt = 0;
    const fullImgCnt = 7986 - 7027;

    function setSection2Viedeo() {
      const canvas = sections[2].canvas;
      const context = canvas.getContext('2d');
      context.drawImage(imgs[0], 0, 0);

      window.addEventListener('scroll', () => {
        const currentViewPage = document.body.getAttribute('id');
        if (currentViewPage.split('-').at(-1) == 2) {
          requestAnimationFrame(() => {
            const imgIdx = Math.round(getCurrentSectionScrollRatio(2) * fullImgCnt);
            context.drawImage(imgs[imgIdx], 0, 0);
          })
        }
      })
    }

    for (let i = 0; i <= fullImgCnt; i++) {
      const img = new Image();
      img.src = `./video/002/IMG_${7027 + i}.jpg`;
      imgs.push(img);
      img.addEventListener('load', () => {
        loadedImgCnt++;
        if (loadedImgCnt === fullImgCnt + 1) {
          setSection2Viedeo();
        }
      })
    }
  }

  // 현재 보고 있는 페이지를 설정한다
  function setCurrentViewPage() {
    let prevSectionHeights = 0;
    let showScene = 0;
    for (let i = 0; i < sections.length; i++) {
      const currentScrollHeight = window.pageYOffset;
      const sectionHeight = sections[i].sectionHeight;
      if (currentScrollHeight >= prevSectionHeights + sectionHeight) {
        prevSectionHeights += sectionHeight;
      } else {
        showScene = i;
        document.body.id = `show-scene-${showScene}`;
        break;
      }
    }

    if (showScene == 0) section0Animation();
    if (showScene == 2) section2Animation();
  }

  function calculateValueFromRatio(options, ratio) {
    const [ { start:startRange, end:endRange }, sv, ev ] = options;
    let result = ev;

    if (ratio < startRange) result = sv;
    else if (ratio > endRange) result = ev;
    else {
      const Ratio = (ratio - startRange) / (endRange - startRange);
      result = Ratio * (ev - sv) + sv;
    }
    return result;
  }

  function section0Animation() {
    const sectionRatio = getCurrentSectionScrollRatio(0);
    const messageA = sections[0].elements.messageA;
    const messageB = sections[0].elements.messageB;
    const messageC = sections[0].elements.messageC;
    const messageD = sections[0].elements.messageD;
    const canvas = sections[0].canvas;

    canvas.style.opacity = `${calculateValueFromRatio(sections[0].options.fadeVideo, sectionRatio)}`;

    if (sectionRatio < 0.22) {
      messageA.style.opacity = `${calculateValueFromRatio(sections[0].options.toggleOnMessageA, sectionRatio)}`;
      messageA.style.transform = `translateY(${calculateValueFromRatio(sections[0].options.transformOnMessageA, sectionRatio)}%)`;
    } else {
      messageA.style.opacity = `${calculateValueFromRatio(sections[0].options.toggleOffMessageA, sectionRatio)}`;
      messageA.style.transform = `translateY(${calculateValueFromRatio(sections[0].options.transformOffMessageA, sectionRatio)}%)`;
    }

    if (sectionRatio < 0.42) {
      messageB.style.opacity = `${calculateValueFromRatio(sections[0].options.toggleOnMessageB, sectionRatio)}`;
      messageB.style.transform = `translateY(${calculateValueFromRatio(sections[0].options.transformOnMessageB, sectionRatio)}%)`;
    } else {
      messageB.style.opacity = `${calculateValueFromRatio(sections[0].options.toggleOffMessageB, sectionRatio)}`;
      messageB.style.transform = `translateY(${calculateValueFromRatio(sections[0].options.transformOffMessageB, sectionRatio)}%)`;
    }
    
    if (sectionRatio < 0.62) {
      messageC.style.opacity = `${calculateValueFromRatio(sections[0].options.toggleOnMessageC, sectionRatio)}`;
      messageC.style.transform = `translateY(${calculateValueFromRatio(sections[0].options.transformOnMessageC, sectionRatio)}%)`;
    } else {
      messageC.style.opacity = `${calculateValueFromRatio(sections[0].options.toggleOffMessageC, sectionRatio)}`;
      messageC.style.transform = `translateY(${calculateValueFromRatio(sections[0].options.transformOffMessageC, sectionRatio)}%)`;
    }

    if (sectionRatio < 0.82) {
      messageD.style.opacity = `${calculateValueFromRatio(sections[0].options.toggleOnMessageD, sectionRatio)}`;
      messageD.style.transform = `translateY(${calculateValueFromRatio(sections[0].options.transformOnMessageD, sectionRatio)}%)`;
    } else {
      messageD.style.opacity = `${calculateValueFromRatio(sections[0].options.toggleOffMessageD, sectionRatio)}`;
      messageD.style.transform = `translateY(${calculateValueFromRatio(sections[0].options.transformOffMessageD, sectionRatio)}%)`;
    }
  }

  function section2Animation() {
    const sectionRatio = getCurrentSectionScrollRatio(2);
    const messageA = sections[2].elements.messageA;
    const messageB = sections[2].elements.messageB;
    const messageC = sections[2].elements.messageC;
    const pinB = sections[2].elements.pinB;
    const pinC = sections[2].elements.pinC;

    if (sectionRatio < 0.22) {
      messageA.style.opacity = `${calculateValueFromRatio(sections[2].options.toggleOnMessageA, sectionRatio)}`;
      messageA.style.transform = `translateY(${calculateValueFromRatio(sections[2].options.transformOnMessageA, sectionRatio)}%)`;
    } else {
      messageA.style.opacity = `${calculateValueFromRatio(sections[2].options.toggleOffMessageA, sectionRatio)}`;
      messageA.style.transform = `translateY(${calculateValueFromRatio(sections[2].options.transformOffMessageA, sectionRatio)}%)`;
    }

    if (sectionRatio < 0.5) {
      messageB.style.opacity = `${calculateValueFromRatio(sections[2].options.toggleOnMessageB, sectionRatio)}`;
      messageB.style.transform = `translateY(${calculateValueFromRatio(sections[2].options.transformOnMessageB, sectionRatio)}%)`;
    } else {
      messageB.style.opacity = `${calculateValueFromRatio(sections[2].options.toggleOffMessageB, sectionRatio)}`;
      messageB.style.transform = `translateY(${calculateValueFromRatio(sections[2].options.transformOffMessageB, sectionRatio)}%)`;
    }

    if (sectionRatio < 0.8) {
      messageC.style.opacity = `${calculateValueFromRatio(sections[2].options.toggleOnMessageC, sectionRatio)}`;
      messageC.style.transform = `translateY(${calculateValueFromRatio(sections[2].options.transformOnMessageC, sectionRatio)}%)`;
    } else {
      messageC.style.opacity = `${calculateValueFromRatio(sections[2].options.toggleOffMessageC, sectionRatio)}`;
      messageC.style.transform = `translateY(${calculateValueFromRatio(sections[2].options.transformOffMessageC, sectionRatio)}%)`;
    }

    pinB.style.transform = `scale(${calculateValueFromRatio(sections[2].options.scalePinB, sectionRatio)})`;
    pinC.style.transform = `scale(${calculateValueFromRatio(sections[2].options.scalePinC, sectionRatio)})`;
  }

  window.addEventListener('load', () => {
    setLayout();
    initImage_section0();
    initImage_section2();
  })

  window.addEventListener('scroll', () => {
    setCurrentViewPage();
  })
})()