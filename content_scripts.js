let verticalvideo = false

// 已进入视频详情页 通知发送消息
chrome.runtime.sendMessage({ type:'inbilbil' },
  function(response) {
  console.log('Bilbil-verticalscreen-video v1.0 —— Chrome Extensions');
});

// 监听 popup.js 发送过来的切换横竖屏事件
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type === 'change_verticalvideo') {
      const isVertical = request.verticalvideo
      changeVerticalVideo(isVertical)
      sendResponse({'changed_verticalvideo': isVertical});
      chrome.runtime.sendMessage({ type:'changed_verticalvideo',verticalvideo:isVertical })
    }
  }
);

// 切换横竖屏方法
function changeVerticalVideo(isVertical){
 const video = document.querySelector('.bilibili-player-video video');
 if(isVertical){
    video.style.transform = 'rotate(-90deg) scale(2)'
 }else{
    video.style.transform = ''
    delete video.style.transform
 }
}

