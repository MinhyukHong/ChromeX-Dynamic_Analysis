
domReady(() => {
  translateHTML()
  bindCheckboxes()
  initRateButton()
})

function domReady (callback) {
  if (document.readyState === 'complete') {
    callback()
  } else {
    window.addEventListener('load', callback, false);
  }
}

function translateHTML (dataKey = 'message') {
  for (const $element of document.getElementsByTagName('*')) {
    if ($element.dataset && $element.dataset[dataKey]) {

      var message = chrome.i18n.getMessage($element.dataset[dataKey]);

      if ($element.dataset['url']) {

          message = message.replace('__URL__', $element.dataset['url']);
      }

      $element.innerHTML = message;
    }
  }
}

function bindCheckboxes() {
  for (const $setting of document.querySelectorAll('.setting')) {
    const $input = $setting.querySelector('input')
    chrome.storage.local.get($input.name, (data) => {
      $input.checked = data[$input.name]
    });
    $setting.addEventListener('change', (event) => {
      chrome.storage.local.set({[$input.name]: $input.checked})
    }, false)
  }
}

function initRateButton() {
  document.querySelector('.teaser').href = `https://chrome.google.com/webstore/detail/${chrome.runtime.id}/reviews`
}
