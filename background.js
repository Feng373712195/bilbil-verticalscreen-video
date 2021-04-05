
// 是否在bilbil视频页中状态
let inbilbil = false;
// 当前视频竖屏
let isVerticalscreen = false;
// 当前tabId
let currnetTabId = null

// 记录每个tab对应的状态 { [tabid]:isVertical }
const stateCache = {}

// 监听 tab 切换时
chrome.tabs['onSelectionChanged'].addListener((id,{ status })=>{
  console.log('onSelectionChanged',stateCache , id)
  if(id in stateCache){
    setState(id)
  }else{
    resetState()
  }
}),

// 监听 tab 被删除时
chrome.tabs['onRemoved'].addListener((id,{ status })=>{
  if(id in stateCache){
    delete stateCache[id]
    resetState()
  }
}),

// 监听 content_script 发送过来的消息
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request,sender.tab,sender.tab ? "来自内容脚本：" + sender.tab.url : "来自扩展程序");
    // 监听是否进入了bilbil视频详情页
    if (request.type === 'inbilbil') {
      stateCache[sender.tab.id] = isVerticalscreen
      inbilbil = true
      currnetTabId = sender.tab.id
      sendResponse({ok: true});
    }
    // 监听是否切换了竖屏横竖状态
    if (request.type === 'changed_verticalvideo'){
      const isVertical = request.verticalvideo
      stateCache[sender.tab.id] = isVertical
      isVerticalscreen = isVertical
    }
  }
);

// 检查获取 InBilBil 状态
function checkInBilBil(){
  return inbilbil
}

// 检查获取 IsVerticalscreen 状态
function checkIsVerticalscreen(id){
  const tabId = getCurrentTabId()
  console.log(tabId , 'tabId')
  return new Promise((resolve)=>{
    chrome.tabs.sendMessage(tabId,{
      type:'check_verticalvideo',
    },{},(response)=>{
      // 同步状态
      isVerticalscreen = response['checked_verticalvideo']
      stateCache[id] = isVerticalscreen
      resolve(isVerticalscreen)
    })
  })
}

// 设置当前tabId 用于 popup.js 切换横竖屏时 给对应tab发送消息
function getCurrentTabId(){
  return currnetTabId
 }

// 重置状态
function resetState(){
  inbilbil = false
  isVerticalscreen = false
  currnetTabId = null
}

// 设置状态
function setState(id){
  inbilbil = true
  isVerticalscreen = stateCache[id]
  currnetTabId = id
}

