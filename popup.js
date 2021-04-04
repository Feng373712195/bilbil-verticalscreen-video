
// 后台js
var bg = chrome.extension.getBackgroundPage();
// 提示
const tip = document.getElementById('tip');
// 切换横竖屏checkbox
const checkbox = document.getElementById('switch')

init()

// 监听checkbox切换横竖屏
checkbox.addEventListener('change',()=>{
  chrome.tabs.sendMessage(bg.getCurrentTabId(),{
    type:'change_verticalvideo',
    verticalvideo:!bg.checkIsVerticalscreen()
  })
})

// 初始化检查是否在bilbil视频页与是否已经切换为竖屏
function init(){
  let inBilBil = bg.checkInBilBil();
  let isVertical = bg.checkIsVerticalscreen();
  updateState(inBilBil,isVertical)
}

// 更新显示状态函数
function updateState(state,isVertical){
  checkbox.disabled = state ? false : true;
  checkbox.checked = isVertical;
  tip.className = `tip ${state ? 'active' : 'disabled' }`;
  tip.innerText = `当前${state ? '是' : '不是' }BilBil视频页面`;
}






