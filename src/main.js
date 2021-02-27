const $siteList = $('.siteList')
const $lastLi=$siteList.find('li.last')
const x=localStorage.getItem("x")
const xObject=JSON.parse(x)
const hasMap=xObject|| [
  {logo:'A',url:'https://www.acfun.cn'},
  {logo:'B',url:'https://www.bilibili.com/'},
]

const render=()=>{
  hasMap.forEach(node=>{
    const $site = $(`<li>
    <a href="${node.url}" class="site">
      <div class="logo">${node.logo}</div>
      <div class="link">${node.url}</div>
    </a>
    </li>`).insertBefore($lastLi)
    })
}
render()
$('.addButton').on('click', () => {
  let url = window.prompt('请问你要添加的网址是啥？')
  let parseUrl=''
  if (url.indexOf('http') !== 0) {
    parseUrl = 'https://' + url
  }
  hasMap.push({
    logo:url[0],
    logoType:'text',
    url:url
  })
const $siteList = $('.siteList')
  $siteList.find('li:not(.last)').remove()
 render()
})

window.onbeforeunload=()=>{
  const string=JSON.stringify(hasMap)
  localStorage.setItem('x',string)
}