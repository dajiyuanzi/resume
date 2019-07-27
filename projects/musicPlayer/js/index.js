var musicList = []//歌单，作为 全局变量 
var currentIndex = 0 //当前播放音乐的index
var clock
var audio = new Audio() //音乐播放功能
audio.autoplay = true

//函数$ 获取元素
function $(selector){
  return document.querySelector(selector)
}

//请求音乐资源 函数执行 定义在下面
getMusicList(function(list){
  musicList = list
  generateList(list)
  loadMusic(list[currentIndex])//该函数使用generateList的数据，所以要在其后执行，否则加载不到会报错。报错调试，就在浏览器设置断点，一个个的/由浅入深的console.log变量，找到null/undefined的变量，很有可能是数据没有加载到造成的。
})

//播放的进度条
audio.ontimeupdate = function(){//当currentTime更新时会触发timeupdate事件，触发的频率是随机的
  $('.musicbox .progress-now').style.width = (this.currentTime/this.duration)*100 + '%'
}

//播放进度时间中的秒数位
audio.onplay = function(){//音乐一开始播放
  clock = setInterval(function(){//设置每1秒更新一次的定时器。如果不用定时器，而和上面的ontimeupdate写在一起，时间数字的变化会时快时慢，因为timeupdate的频率是随机的
    var min = Math.floor(audio.currentTime/60)
    var sec = Math.floor(audio.currentTime)%60 + ''//秒数，当前时长取余60，余数为秒数；加空字符 可将数据变成字符串。
    sec = sec.length === 2? sec : '0' + sec //如果秒数（取余的余数）小于2位，则前面加0，如01，02，03.
    $('.musicbox .time').innerText = min + ':' + sec
  }, 1000)
}

//onpause当音乐暂停时或结束时触发，暂停音乐的播放，同时也暂停了currentTime
audio.onpause = function(){
  clearInterval(clock)
}

//播放/暂停 的图标切换
$('.musicbox .play').onclick = function(){//点击icon时 触发
  if(audio.paused){//暂停时，audio.pauser=true
    audio.play()
    this.querySelector('.fa').classList.remove('fa-play')
    this.querySelector('.fa').classList.add('fa-pause')
  }else {
    audio.pause()
    this.querySelector('.fa').classList.add('fa-play')
    this.querySelector('.fa').classList.remove('fa-pause')
  }
}

//播放下一曲
$('.musicbox .forward').onclick = function(){
  currentIndex =  (++currentIndex)%musicList.length//如果最后一首的index，再点下一首，取余为0，就是跳到第一首。
  loadMusic(musicList[currentIndex])
}
//播放完后，跳到下一曲
audio.onended = function(){
  console.log('end')
  currentIndex =  (++currentIndex)%musicList.length
  loadMusic(musicList[currentIndex])   
}

//播放上一曲
$('.musicbox .back').onclick = function(){
  currentIndex =  (musicList.length + --currentIndex)%musicList.length//非常巧妙的implementation
  loadMusic(musicList[currentIndex])
}

//点击进度条，跳转进度。很巧妙的实现
$('.musicbox .bar').onclick = function(e){
  console.log(e)
  var percent = e.offsetX / parseInt(getComputedStyle(this).width)//offsetx：设置或者是得到鼠标相对于目标事件的父元素的内边界在x坐标上的位置。
  console.log(percent)
  audio.currentTime = audio.duration * percent
}

//请求音乐资源，由json中的url来请求 （回调函数实现解耦）
function getMusicList(callback){
  var xhr = new XMLHttpRequest()
  xhr.open('GET', '/music.json', true)
  xhr.onload = function(){
    if((xhr.status >=200 && xhr.status < 300) || xhr.status === 304){
      callback(JSON.parse(this.responseText))
    }else {
      console.log('获取数据失败')
    }
  }
  xhr.onerror = function(){
    console.log('网络异常')
  }
  xhr.send()
}

//换音乐时，改变歌曲名称和作者名称
function loadMusic(musicObj){
  audio.src = musicObj.src //调整audio类的数据
  console.log('begin play ', musicObj)
  $('.musicbox .title').innerText = musicObj.title
  $('.musicbox .auther').innerText = musicObj.auther
  $('.cover').style.backgroundImage = 'url(' + musicObj.img + ')' //每次加载新音乐时，更改背景图片

  //点击时，修改 列表中的音乐条目 的样式状态，先清除所有条目的playing样式，再给点击的条目加上。
  for(var i = 0; i < $('.musicbox .list').children.length; i++){
    $('.musicbox .list').children[i].classList.remove('playing')
  }
  console.log(currentIndex)
  console.log($('.musicbox .list').children[currentIndex])
  $('.musicbox .list').children[currentIndex].classList.add('playing')
}

//加载并展示音乐列表
function generateList(list){ 
  var container = document.createDocumentFragment()
  list.forEach(function(musicObj){
    var node = document.createElement('li')
    node.innerText = musicObj.auther + '-' + musicObj.title
    console.log(node)
    container.appendChild(node)
  })
  $('.musicbox .list').appendChild(container)
}

//点击列表中的音乐 并加载选中的音乐，使用了事件代理，事件绑定在li的容器ul
$('.musicbox .list').onclick = function(e){
  if(e.target.tagName.toLowerCase() === 'li'){
    for(var i = 0; i < this.children.length; i++){
      if(this.children[i] === e.target){
        currentIndex = i
      }
    }
    console.log(currentIndex)
    loadMusic(musicList[currentIndex])
  }
}