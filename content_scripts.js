
// 已进入视频详情页 通知发送消息
chrome.runtime.sendMessage({ type:'inbilbil' },
  function(response) {
  console.log('Bilbil-verticalscreen-video v1.0 —— Chrome Extensions');
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // 监听 popup.js 发送过来的切换横竖屏事件
    if (request.type === 'change_verticalvideo') {
      const isVertical = request.verticalvideo
      console.log( isVertical , 'isVertical' )
      changeVerticalVideo(isVertical)
      sendResponse({'changed_verticalvideo': isVertical});
      chrome.runtime.sendMessage({ type:'changed_verticalvideo',verticalvideo:isVertical })
    }
    // 监听 background.js 发送过来的检查竖屏事件
    if (request.type === 'check_verticalvideo'){
      const isVertical = checkVideIsVertical()
      sendResponse({'checked_verticalvideo': isVertical });
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

function checkVideIsVertical(){
  const video = document.querySelector('.bilibili-player-video video');

  console.log( video.style.transform ,  video.style)
  return !!video.style.transform
}

