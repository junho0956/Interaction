(() => {

  const sections = [
    {
      scrollHeight: 0,
      type: 'sticky',
      contents: {
        container: document.getElementById('scroll-section-0'),
        mainMessage1: document.querySelector('#scroll-section-0 .main-message.a'),
        mainMessage2: document.querySelector('#scroll-section-0 .main-message.b'),
        mainMessage3: document.querySelector('#scroll-section-0 .main-message.c'),
        mainMessage4: document.querySelector('#scroll-section-0 .main-message.d'),
      },
      options: {
        mainMessage1ToggleOn: [0.1, 0.2, {start:0, end: 1}],
        mainMessage1ToggleOff: [0.25, 0.3, {start:1, end: 0}],
        mainMessage2ToggleOn: [0.3, 0.4, {start:0, end: 1}],
        mainMessage2ToggleOff: [0.45, 0.5, {start:1, end: 0}],
        mainMessage3ToggleOn: [0.5, 0.6, {start:0, end: 1}],
        mainMessage3ToggleOff: [0.65, 0.7, {start:1, end: 0}],
        mainMessage4ToggleOn: [0.7, 0.8, {start:0, end: 1}],
        mainMessage4ToggleOff: [0.85, 0.9, {start:1, end: 0}],

        mainMessage1TranslateOn: [0.1, 0.2, {start:20, end:0}],
        mainMessage1TranslateOff: [0.25, 0.3, {start:0, end:-20}],
        mainMessage2TranslateOn: [0.3, 0.4, {start:20, end:0}],
        mainMessage2TranslateOff: [0.45, 0.5, {start:0, end:-20}],
        mainMessage3TranslateOn: [0.5, 0.6, {start:20, end:0}],
        mainMessage3TranslateOff: [0.65, 0.7, {start:0, end:-20}],
        mainMessage4TranslateOn: [0.7, 0.8, {start:20, end:0}],
        mainMessage4TranslateOff: [0.85, 0.9, {start:0, end:-20}],
      }
    },
    {
      scrollHeight: 0,
      type: 'normal',
      contents: {
        container: document.getElementById('scroll-section-1'),
      }
    },
    {
      scrollHeight: 0,
      type: 'sticky',
      contents: {
        container: document.getElementById('scroll-section-2'),
      }
    },
    {
      scrollHeight: 0,
      type: 'sticky',
      contents: {
        container: document.getElementById('scroll-section-3'),
      }
    },
  ]

  const setLayout = () => {
    // 섹션들의 길이를 설정해줌
    // 모든 기기에서 비슷한 경험을 하기 위해 섹션의 길이를 일정하게 잡아주는 것이 포인트

    for (let i = 0; i < sections.length; i++) {
      let scrollHeight = 0;
      if (sections[i].type == 'sticky') {
        scrollHeight = window.innerHeight * 5;
      } else {
        scrollHeight = sections[i].contents.container.offsetHeight;
      }

      sections[i].scrollHeight = scrollHeight;
      sections[i].contents.container.style.height = `${scrollHeight}px`;
    }

    setViewingSection();
  }

  const setViewingSection = () => {
    // 스크롤 진행 시 현재 화면에서 보이는 섹션이 어떤 섹션인지 파악해야함
    // 섹션의 길이를 통해 계산
    let sectionId = 0;
    let totalScrollHeight = 0;
    const currentScrollY = window.scrollY;

    for (let i = 0; i < sections.length; i++) {
      totalScrollHeight += sections[i].scrollHeight;
      if (currentScrollY <= totalScrollHeight) {
        document.body.setAttribute('id', `show-scene-${sectionId}`);
        break;
      } else {
        sectionId++;
      }
    }

    if (sectionId == 0) {
      setViewSection0_Message();
    }
  }

  const getScrollSectionRatio = (sectionId) => {
    let prevSectionsHeight = 0;
    for (let i = 0; i < sectionId; i++) prevSectionsHeight += sections[i].scrollHeight;

    return (window.pageYOffset - prevSectionsHeight) / sections[sectionId].scrollHeight;
  }

  const calRatioValue = (scrollRatio, options) => {
    const { start:svalue, end:evalue } = options[2];
    const [start, end] = [...options];

    // start ~ end 구간에서 현재 scrollRatio 값에 따른 opacity값 구하기
    let result = 0;
    let ratio = 0;
    if (scrollRatio < start) result = svalue;
    else if (scrollRatio > end) result = evalue;
    else {
      ratio = (scrollRatio - start) / (end - start);
      result = (evalue - svalue) * ratio + svalue;
    }

    return result;
  }

  const setViewSection0_Message = () => {
    // section0 의 sticky message 에 스크롤 이벤트 설정
    const scrollRatio = getScrollSectionRatio(0);

    if (scrollRatio < 0.22) {
      sections[0].contents.mainMessage1.style.opacity = `${calRatioValue(scrollRatio, sections[0].options.mainMessage1ToggleOn)}`;
      sections[0].contents.mainMessage1.style.transform = `translateY(${-50 + calRatioValue(scrollRatio, sections[0].options.mainMessage1TranslateOn)}%)`;
    } else {
      sections[0].contents.mainMessage1.style.opacity = `${calRatioValue(scrollRatio, sections[0].options.mainMessage1ToggleOff)}`;
      sections[0].contents.mainMessage1.style.transform = `translateY(${-50 + calRatioValue(scrollRatio, sections[0].options.mainMessage1TranslateOff)}%)`;

    }

    if (scrollRatio < 0.42) {
      sections[0].contents.mainMessage2.style.opacity = `${calRatioValue(scrollRatio, sections[0].options.mainMessage2ToggleOn)}`;
      sections[0].contents.mainMessage2.style.transform = `translateY(${-50 + calRatioValue(scrollRatio, sections[0].options.mainMessage2TranslateOn)}%)`;
    } else {
      sections[0].contents.mainMessage2.style.opacity = `${calRatioValue(scrollRatio, sections[0].options.mainMessage2ToggleOff)}`;
      sections[0].contents.mainMessage2.style.transform = `translateY(${
        -50 +
        calRatioValue(scrollRatio, sections[0].options.mainMessage2TranslateOff)
      }%)`;
    }

    if (scrollRatio < 0.62) {
      sections[0].contents.mainMessage3.style.opacity = `${calRatioValue(scrollRatio, sections[0].options.mainMessage3ToggleOn)}`;
      sections[0].contents.mainMessage3.style.transform = `translateY(${
        -50 +
        calRatioValue(scrollRatio, sections[0].options.mainMessage3TranslateOn)
      }%)`;
    } else {
      sections[0].contents.mainMessage3.style.opacity = `${calRatioValue(scrollRatio, sections[0].options.mainMessage3ToggleOff)}`;
      sections[0].contents.mainMessage3.style.transform = `translateY(${
        -50 +
        calRatioValue(scrollRatio, sections[0].options.mainMessage3TranslateOff)
      }%)`;
    }

    if (scrollRatio < 0.82) {
      sections[0].contents.mainMessage4.style.opacity = `${calRatioValue(scrollRatio, sections[0].options.mainMessage4ToggleOn)}`;
      sections[0].contents.mainMessage4.style.transform = `translateY(${
        -50 +
        calRatioValue(scrollRatio, sections[0].options.mainMessage4TranslateOn)
      }%)`;
    } else {
      sections[0].contents.mainMessage4.style.opacity = `${calRatioValue(scrollRatio, sections[0].options.mainMessage4ToggleOff)}`;
      sections[0].contents.mainMessage4.style.transform = `translateY(${
        -50 +
        calRatioValue(scrollRatio, sections[0].options.mainMessage4TranslateOff)
      }%)`;
    }

  }

  const setSection0_Video = () => {
    // 캔버스 가져온다
    const canvas = document.querySelector("#scroll-section-0 canvas");
    const context = canvas.getContext('2d');

    // 이미지를 로드한다
    const totalImages = 960;
    let currentLoadedImages = 0;
    const imgArr = [];

    const loadImage = () => {
      for (let i = 0; i < totalImages; i++) {
        const image = new Image();
        image.src = `./video/002/IMG_${7027 + i}.jpg`;
        imgArr.push(image);

        image.addEventListener('load', () => {
          currentLoadedImages++;
          if (currentLoadedImages == totalImages) {
            context.drawImage(imgArr[0], 0, 0);

            window.addEventListener('scroll', () => {
              // 현재 show-scene 이 0 이면
              const currentShowScene = document.body.getAttribute('id');
              if (currentShowScene == 'show-scene-0') {
                requestAnimationFrame(() => {
                  // 스크롤을 얼마나 했는지
                  const scrollRatio = window.pageYOffset / (sections[0].scrollHeight);
                  const imageIdx = Math.round(scrollRatio * (totalImages - 1));
                  console.log({imageIdx})
                  context.drawImage(imgArr[imageIdx], 0, 0);
                });
              }
            })
          }
        })
      }
    }

    loadImage();
  }

  window.addEventListener('load', () => {
    setLayout();
    setSection0_Video();
  });
  window.addEventListener('scroll', setViewingSection);

})()