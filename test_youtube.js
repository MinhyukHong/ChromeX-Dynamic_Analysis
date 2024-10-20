const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// 대기 시간 처리 함수
const delay = (time) => {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
};

(async () => {
  try {
    // Adblock 확장 프로그램 경로 설정
    const extensionPath = path.resolve('/Users/minhyuk/Desktop/Lab/test/CMEDHIONKHPNAKCNDNDGJDBOHMHEPCKK_6_0_2_0');

    // Puppeteer로 브라우저를 실행하는 코드
    const browser = await puppeteer.launch({
      headless: false, // 브라우저를 실제로 띄워서 실행
      args: [
        '--disable-extensions-except=' + extensionPath,
        '--load-extension=' + extensionPath,
        '--no-sandbox'
      ],
      devtools: false
    });

    // YouTube 페이지 로드
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com');  // 유튜브 홈페이지 실행

    console.log('YouTube page has been loaded. The extension should be active now.');

    // 검색창에 입력하고 검색
    await page.waitForSelector('input#search'); // 검색창이 나타날 때까지 대기
    await page.type('input#search', 'trending video 2024'); // 검색어 입력
    await page.keyboard.press('Enter'); // 검색 수행

    // 검색 후 탐색이 완료될 때까지 대기
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    // 썸네일이 로드될 때까지 기다림
    await page.waitForSelector('ytd-video-renderer', { timeout: 60000 }); // 동영상 썸네일이 나타날 때까지 대기

    // 일반 동영상의 썸네일을 선택 (쇼츠 제외)
    const videoThumbnails = await page.$$('ytd-video-renderer');
    let clicked = false;

    for (let thumbnail of videoThumbnails) {
      // 쇼츠가 아닌 일반 동영상인지 확인
      const isShorts = await page.evaluate(el => el.closest('ytd-reel-shelf-renderer') !== null, thumbnail);
      if (!isShorts) {
        // 스크롤하여 화면에 표시되도록 처리
        await page.evaluate(el => el.scrollIntoView(), thumbnail);
        await delay(1000); // 스크롤 후 짧은 대기

        // 동영상 썸네일 클릭
        try {
          await thumbnail.$eval('a#thumbnail', el => el.click());
          clicked = true;
          console.log('Video clicked. The extension should handle ads now.');
          break; // 첫 번째 일반 동영상만 클릭
        } catch (clickError) {
          console.error('Error clicking on video:', clickError);
        }
      }
    }

    if (!clicked) {
      console.log('No suitable video found.');
    }

    if (!clicked) {
      console.log('No suitable video found.');
    }

    // 네트워크 요청 모니터링
    const isSuspiciousRequest = (url, method) => {
      // 정상적인 YouTube 및 Google 관련 요청 무시
      if (url.includes('youtube.com') || url.includes('googlevideo.com') || url.includes('play.google.com') || url.includes('googleapis.com') || url.includes('google.com')) {
        return false; // Youtube, Google 및 하위 도메인의 요청은 의심스럽지 않은 걸로 판단
      }

      // 의심스러운 도메인 목록 예시(논문 참고해서 도메인을 구체화하려고 함)
      const suspiciousDomains = [
        'malicious.com',
        'tracking.com',
        'ads.com',
        'clicktrack.com'
      ];

      // 서드파티 도메인에 대한 필터링 기준
      const isThirdParty = (url) => {
        return !url.includes('youtube.com') && !url.includes('google.com');
      };

      // POST 요청이면서 서드파티로 보내는 데이터는 의심스럽다고 판단
      if (method == 'POST' && isThirdParty(url)) {
        return true;
      }

      // 의심스러운 도메인에 포함된 요청
      for (const domain of suspiciousDomains) {
        if (url.includes(domain)) {
          return true;
        }
      }

      // 그 외의 경우는 의심스럽지 않다고 판단
      return false;
    };

    page.on('request', request => {
      const url = request.url();
      const method = request.method();

      // 의심스러운 네트워크 요청만 탐지
      if (isSuspiciousRequest(url, method)) {
        console.log(`Suspicious network request detected: ${url}`);
        fs.appendFileSync('network_activity.log', `Suspicious network request: ${url}\n`);
      }
    });

    // 무한 대기: 브라우저가 닫히지 않도록 설정
    await delay(3600000); // 1시간 대기 (필요시 더 긴 시간으로 설정 가능)

    console.log('Monitoring Complete!');
    await browser.close();

  } catch (error) {
    console.error('An error occurred:', error); // 에러를 출력하고 잡아냄
  }
})();