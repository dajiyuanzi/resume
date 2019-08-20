

var EventCenter = {
  on: function(type, handler){
    $(document).on(type, handler)
  },
  fire: function(type, data){
    $(document).trigger(type, data)
  }
}

// EventCenter.on('hello', function(e, data){
//   console.log(data)
// })

// EventCenter.fire('hello', '浣犲ソ')



var Footer = {//底部的音乐滑动
  init: function(){
    this.$footer = $('footer')
    this.$ul = this.$footer.find('ul')
    this.$box = this.$footer.find('.box')
    this.$leftBtn = this.$footer.find('.icon-left')
    this.$rightBtn = this.$footer.find('.icon-right')
    this.isToEnd = false //下面的曲目横向列表是否滑到底部，默认 没到底。
    this.isToStart = true //下面的曲目横向列表是否滑到开头
    this.isAnimate = false //当一个滑动动画为执行完，此状态为false，防止重复点击。连续点击播放滚动时，会溢出（下面的监听不管用了），所以要设置此状态。

    this.bind()
    this.render()
  },

  bind: function(){
    var _this = this

    this.$rightBtn.on('click', function(){//朝右可以滚动的距离
      if(_this.isAnimate) return//如果上个滚动动画还在播放，当前这个点击就不要触发了，毙掉。

      var itemWidth = _this.$box.find('li').outerWidth(true)
      var rowCount = Math.floor(_this.$box.width()/itemWidth)//求底部一共几个音乐
      if(!_this.isToEnd){
        _this.isAnimate = true//当前滑动播放，就设为true。那么之后重复点击的动画就在上面return，不再播放了。
        _this.$ul.animate({//$(selector).animate(styles,speed,easing,callback)方法执行 CSS 属性集的自定义动画。该方法通过CSS样式将元素从一个状态改变为另一个状态。
          left: '-='+rowCount*itemWidth //自减相当于ul在容器内朝左移动移动，将右边的溢出内容移到容器内以可见
        }, 400, function(){//播放完成后
          _this.isAnimate = false
          _this.isToStart = false
          //当右滚到底部时，即容器的宽度-溢出容器的内容部分 的长度（是负值）>= 内容的全部长度
          if(parseFloat(_this.$box.width()) - parseFloat(_this.$ul.css('left')) >= parseFloat(_this.$ul.css('width')) ){
            _this.isToEnd = true
          }
        })
      }
    })

    this.$leftBtn.on('click', function(){//朝左可以滚动的距离
      if(_this.isAnimate) return
      var itemWidth = _this.$box.find('li').outerWidth(true)
      var rowCount = Math.floor(_this.$box.width()/itemWidth)
      if(!_this.isToStart) {
        _this.isAnimate = true
        _this.$ul.animate({
          left: '+='+rowCount*itemWidth
        }, 400, function(){
          _this.isToEnd = false
          _this.isAnimate = false
          if(parseFloat(_this.$ul.css('left')) >= 0 ){
            _this.isToStart = true
          }
        })
      }     
    })

    this.$footer.on('click', 'li', function(){
      $(this).addClass('active')
        .siblings().removeClass('active')

      EventCenter.fire('select-albumn', {
        channelId: $(this).attr('data-channel-id'),
        channelName: $(this).attr('data-channel-name')
      })
    })
  },

  render(){
    var _this = this
    $.getJSON('//jirenguapi.applinzi.com/fm/getChannels.php')
      .done(function(ret){
        console.log(ret)
        _this.renderFooter(ret.channels)
      }).fail(function(){
        console.log('error')
      })
  },

  renderFooter: function(channels){
    console.log(channels)
    var html = ''
    channels.unshift({
      channel_id: 0,
      name: '鎴戠殑鏈€鐖�',
      cover_small: 'http://cloud.hunger-valley.com/17-10-24/1906806.jpg-small',
      cover_middle: 'http://cloud.hunger-valley.com/17-10-24/1906806.jpg-middle',
      cover_big: 'http://cloud.hunger-valley.com/17-10-24/1906806.jpg-big',
    })
    channels.forEach(function(channel){
      html += '<li data-channel-id='+channel.channel_id+' data-channel-name='+channel.name+'>'
            + '  <div class="cover" style="background-image:url('+channel.cover_small+')"></div>'
            + '  <h3>'+channel.name+'</h3>'
            +'</li>'
    })
    this.$ul.html(html)
    this.setStyle()
  },

  setStyle: function(){
    var count = this.$footer.find('li').length
    var width = this.$footer.find('li').outerWidth(true)
    this.$ul.css({
      width: count * width + 'px'
    })
  }
}



var App = {//播放
  init: function(){
    this.channelId = 'public_shiguang_80hou'
    this.channelName = '80鍚�'
    this.$container = $('#page-music main')
    this.audio = new Audio()
    this.audio.autoplay = true
    this.currentSong = null
    this.clock = null
    this.collections = this.loadFromLocal()
    this.bind()

    EventCenter.fire('select-albumn', {//自己触发trigger一些自定义事件
      channelId: '0',
      channelName: '鎴戠殑鏈€鐖�'
    })
  },
  bind: function(){
    var _this = this//下面函数内的this指向的不是app类。
    EventCenter.on('select-albumn', function(e, channel){//自定义事件，选音乐时，触发。EventCenter是上面自定义的类。
      console.log('select ', channel)
      _this.channelId = channel.channelId
      _this.channelName = channel.channelName
      _this.loadSong()
    })

    this.$container.find('.btn-play').on('click', function(){//播放按钮
      if($(this).hasClass('icon-pause')){
        $(this).removeClass('icon-pause').addClass('icon-play')
        _this.audio.pause()
      }else{
        $(this).removeClass('icon-play').addClass('icon-pause')
        _this.audio.play()
      }
    })

    this.$container.find('.btn-next').on('click', function(){
      _this.loadSong()
    })

    this.audio.addEventListener('play', function(){//play事件 是audio类里自带的
      clearInterval(_this.clock)
      _this.clock = setInterval(function(){
        _this.updateState()
        _this.setLyric()
      }, 1000)//以免进度变化不均匀，所以设置定时，一秒走一格
      console.log('play')
    })

    this.audio.addEventListener('pause', function(){
      console.log('pause')
      clearInterval(_this.clock)
    })
    this.audio.addEventListener('end', function(){
      console.log('pause')
      _this.loadSong()
    })

    this.$container.find('.btn-collect').on('click', function(){
      var $btn = $(this)
      if($btn.hasClass('active')){
        $btn.removeClass('active')
        delete _this.collections[_this.currentSong.sid]
      }else{
        $(this).addClass('active')
        _this.collections[_this.currentSong.sid] = _this.currentSong
      }
      _this.saveToLocal()
    })



  },
  loadSong: function(){
    var _this = this
    if(this.channelId === '0'){
      _this.loadCollection()
    }else {
      $.getJSON('//jirenguapi.applinzi.com/fm/getSong.php', {channel: this.channelId})
        .done(function(ret){
          _this.play(ret.song[0]||null)
        })
    }

  },
  play: function(song){
    console.log(song)
    this.currentSong = song
    this.audio.src = song.url
    this.$container.find('.btn-play').removeClass('icon-play').addClass('icon-pause')
    
    this.$container.find('.aside figure').css('background-image','url('+song.picture +')')
    $('.bg').css('background-image','url('+song.picture +')')
    this.$container.find('.detail h1').text(song.title)
    this.$container.find('.detail .author').text(song.artist)
    this.$container.find('.tag').text(this.channelName)

    if(this.collections[song.sid]){
      this.$container.find('.btn-collect').addClass('active')
    }else{
      this.$container.find('.btn-collect').removeClass('active')
    }
    
    this.loadLyric(song.sid)
  },

  updateState: function(){//进度条的更新
    var timeStr = Math.floor(this.audio.currentTime/60)+':'
      + (Math.floor(this.audio.currentTime)%60/100).toFixed(2).substr(2) //获得已播放的分秒，toFix(2)规定小数四舍五入为2位，substr()方法可在字符串中抽取从 start 下标开始的指定数目的字符。
    this.$container.find('.current-time').text(timeStr)
    this.$container.find('.bar-progress').css('width', this.audio.currentTime/this.audio.duration * 100 + '%')
  },

  loadLyric: function(sid){
    var _this = this
    $.getJSON('//jirenguapi.applinzi.com/fm/getLyric.php', {sid: sid})
      .done(function(ret){
        console.log(ret.lyric)
        var lyricObj = {}
        ret.lyric.split('\n').forEach(function(line){
          var timeArr = line.match(/\d{2}:\d{2}/g)
          if(timeArr){
            timeArr.forEach(function(time){
              lyricObj[time] = line.replace(/\[.+?\]/g, '')
            })
          }
        })  
        _this.lyricObj = lyricObj
      })
  },
  setLyric: function(){
    var timeStr = '0'+Math.floor(this.audio.currentTime/60)+':'
      + (Math.floor(this.audio.currentTime)%60/100).toFixed(2).substr(2)
    if(this.lyricObj && this.lyricObj[timeStr]){
     // var styles = ['slideInUp','zoomIn','rollIn', 'rotateIn', 'flipInX','fadeIn', 'bounceIn','swing', 'pulse']
     // var style = styles[Math.floor(Math.random()*styles.length)]
      this.$container.find('.lyric p').text(this.lyricObj[timeStr])
       .boomText()

    }
    console.log(timeStr)
  },


  loadFromLocal: function(){
    return JSON.parse(localStorage['collections']||'{}')
  },

  saveToLocal: function(){
    localStorage['collections'] = JSON.stringify(this.collections)
  },

  loadCollection: function(){
    var keyArray = Object.keys(this.collections)
    if(keyArray.length === 0) return
    var randomIndex = Math.floor(Math.random()* keyArray.length)
    var randomSid = keyArray[randomIndex]
    this.play(this.collections[randomSid])
  }

}


//http://js.jirengu.com/zuvar/1/edit?html,js,console,output
$.fn.boomText = function(type){ //jquery自定义方法就是$.fn.func，方便之后调用。
  type = type || 'rollIn'
  console.log(type)
  this.html(function(){
    var arr = $(this).text()
    .split('').map(function(word){
        return '<span class="boomText">'+ word + '</span>'
    })
    return arr.join('')
  })
  
  var index = 0
  var $boomTexts = $(this).find('span')
  var clock = setInterval(function(){
    $boomTexts.eq(index).addClass('animated ' + type)
    index++
    if(index >= $boomTexts.length){
      clearInterval(clock)
    }
  }, 300)
}
//$('p').boomText('rollIn') //  https://github.com/daneden/animate.css



Footer.init()
App.init()


