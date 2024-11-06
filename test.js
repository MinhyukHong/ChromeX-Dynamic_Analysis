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
  // 압축 풀린 확장 프로그램 폴더 경로 설정(추후 데이터셋으로 대체 예정)
  const extensionPath = path.resolve('/Users/minhyuk/Desktop/Lab/test/ChatGPT-Sidebar');

  // Puppeteer로 브라우저를 실행하는 코드
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--disable-extensions-except=' + extensionPath,
      '--load-extension=' + extensionPath,
      '--no-sandbox'
    ],
  devtools: false
  });



  // 페이지 테스트
  const page = await browser.newPage();
  await page.goto('https://www.google.com'); // 디폴트 페이지 설정

  console.log('The extension has been loaded.');

  // 악성 행동 감지 로직 - 네트워크 요청 모니터링
  page.on('request', request => {
    const url = request.url();
    const method = request.method();

    // 악성 URL 패턴 감지 예시
    if (url.includes('malicious.com') || url.includes('tracking') || method == 'POST') {
      console.log(`Suspicious network request detected: ${url}`);
      fs.appendFileSync('malicious_activity.log', `Suspicious console message: ${url}\n`);
    }
  });

  // 악성 행동 감지 로직 - 페이지 변경 감지
  page.on('domcontentloaded', async () => {
    const bodyText = await page.evaluate(() => document.body.innerText);

    if (bodyText.includes('You have won') || bodyText.includes('Click here for a reward')) {
      console.log('Suspicious DOM content detected!');
      fs.appendFileSync('malicious_activity.log', `Suspicious DOM message: ${bodyText}\n`);
    }
  });

  // 악성 팝업 감지
  browser.on('targetcreated', async target => {
    const newPage = await target.page();
    if (newPage) {
      const newPageUrl = newPage.url();
      console.log('Popup opened with URL: ${newPageUrl}');

      if (newPageUrl.includes('advertising') || newPageUrl.includes('popup')) {
        console.log(`Suspicious popup detected: ${newPageUrl}`);
        fs.appendFileSync('malicious_activity.log', `Suspicious popup: ${newPageUrl}\n`);
        await newPage.close(); // 팝업 자동 중단
      }
    }
  });

  // 악성 알림 감지
  page.on('dialog', async dialog => {
    console.log(`Dialog detected: ${dialog.message()}`);
    fs.appendFileSync('malicious_activity.log', `Dialog detected: ${dialog.message()}\n`);
    await dialog.dismiss();  // 자동으로 알림 닫기
  });

  // 추가적인 행동 대기(1분간)
  await delay(3600000);

  console.log('Monitoring Complete!');
  await browser.close();

})();