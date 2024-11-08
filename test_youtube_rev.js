const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// 확장 프로그램 경로 설정
const extensionPath = path.resolve('/Users/minhyuk/Desktop/csf/test/Adblock');

// background.js 파일 경로 자동 탐색
const findBackgroundScript = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const foundPath = findBackgroundScript(fullPath);
      if (foundPath) return foundPath;
    } else if (file === 'background.js') {
      return fullPath;
    }
  }
  return null;
};

const backgroundPath = findBackgroundScript(extensionPath);
if (!backgroundPath) {
  console.error('background.js 파일을 찾을 수 없습니다.');
  process.exit(1);
}

// background.js 파일에서 로드 가능한 URL 추출하기
const extractValidUrls = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // URL 패턴 추출
  const urlPattern = /https?:\/\/[^\s'"]+/g;
  const matchedUrls = content.match(urlPattern);
  
  if (!matchedUrls) {
    console.log('No URLs found in background.js.');
    return [];
  }

  // 광고 추적, 리디렉션, API 및 JSON 엔드포인트를 제외한 URL만 남기기
  return matchedUrls.filter(url => {
    // API, 광고 추적, 리디렉션, JSON 엔드포인트, 특정 포트 포함하지 않는 URL만 포함
    return !url.includes("api.") && !url.includes("/api") && !url.endsWith('.json') &&
           !url.includes("googleadservices.com") && !url.includes("doubleclick.net") &&
           !url.match(/:\d+/);
  });
};

const validUrls = extractValidUrls(backgroundPath);
if (validUrls.length === 0) {
  console.error('로드 가능한 웹 페이지 URL을 찾을 수 없습니다.');
  process.exit(1);
}

console.log('Found valid URLs in background.js:', validUrls);

// Puppeteer 실행 및 웹 페이지 로드 후 네트워크 요청 모니터링
(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
        '--no-sandbox'
      ],
      devtools: true
    });

    for (const url of validUrls) {
      const page = await browser.newPage();
      await page.goto(url);  // 유효한 URL 로드
      console.log(`Loaded URL: ${url}`);
      
      // 네트워크 요청 모니터링 및 로깅
      page.on('request', (request) => {
        const requestUrl = request.url();
        console.log(`Network request detected: ${requestUrl}`);
        fs.appendFileSync('network_activity.log', `Network request: ${requestUrl}\n`);
      });

      await page.waitForTimeout(10000); // 10초 동안 대기하여 확장 프로그램 동작 관찰
      await page.close();
    }

    await browser.close();
    console.log('Monitoring complete.');

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

