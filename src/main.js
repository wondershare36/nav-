const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const $li = $siteList.find('li')
const x = localStorage.getItem("x")
const xObject = JSON.parse(x)
const hasMap =xObject&&xObject.length!==0?xObject:[
  { logo: 'A', url: 'https://www.acfun.cn' },
  { logo: 'B', url: 'https://www.bilibili.com' },
  { logo: 'D', url: 'http://www.dasabi99.top' },
]
const removeX = (url) => {
  return url.replace("http://", '').replace("https://", '').replace("www.", '')
}
const render = () => {
  const $siteList = $('.siteList')
  $siteList.find('li:not(.last)').remove()
  hasMap.forEach(node => {
    const $site = $(`<li>
    <a href="${node.url}" class="site">
      <div class="logo">${node.logo}</div>
      <div class="link">${removeX(node.url)}</div>
      <div class="close">x</div>
    </a>
    </li>`).insertBefore($lastLi)
  })
}

render()
$('.addButton').on('click', () => {
  let url = window.prompt('请问你要添加的网址是啥？')
  url = url.replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/,"")
  let parseUrl = ""
  if (url.indexOf('http') !== 0) {
    parseUrl = 'http://' + url
  }
  hasMap.push({
    logo: url[0].toUpperCase(),
    url: parseUrl
  })

  render()
})

// 监听点击关闭按钮，坑：当页面重新渲染后不能监听js创建出来的元素
// 使用事件委托，将监听事件交给父元素
$siteList.on("click",(e)=>{
  if(e.target.className==="close"){
    e.preventDefault();
    let url=e.target.parentNode.getAttribute("href")
    let index= hasMap.findIndex(v=>v.url==url)
    hasMap.splice(index,1)
    render()
  }
  
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hasMap)
  localStorage.setItem('x', string)
}
$(".globalHeader").on("keypress",(e)=>{
  e.stopPropagation();
})
$(document).on("keypress",(e)=>{
  const {key}=e
  for (let i = 0; i < hasMap.length; i++) {
    if(hasMap[i].logo.toLowerCase()===key){
      window.open(hasMap[i].url)
    }
  }
})