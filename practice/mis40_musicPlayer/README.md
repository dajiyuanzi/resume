![musicradio.PNG](https://github.com/dajiyuanzi/resume/tree/master/practice/mis40_musicPlayer/musicradio.PNG)
  
Project Title: Music Radio  
Intro of Project Features: It can play music, switch the playlist in the radio, pause playing, play the next song, etc. And it can scroll to look through all the playlists.
  
Challenges in Implementation: 
1. The size of images has to fit the container inside. 
2. When users click continuously, the event listening get invalid; you can set a flag, and modify the flag before the current animation playback is completed so as to prevent responsing redundant events.
3. How to acquire the music file by debugging the returned data of URL.
4. The progress bar of music play cannot grow smoothly, and this needs to use setInterval().
5. As well it's challenging to handle data formats and their regex.

Learning:
Programming (not the type of math) resembles much playing piano, which needs both the music theory and music score. But if there is no daily practice of playing, any working will be vain.  
  
Notice: the music file loaded from API is blocked normally bcz of API's server shortage. This may need to click and refresh for tens of times.  
  
  
****
  
项目标题: 音乐电台
API's
项目功能介绍：
可以播放音乐，切换电台的歌单，暂停播放，播放下一首等。并且还可以滚动浏览所有歌单。

项目技术细节介绍(用了哪些技术，如何实现的，遇到什么问题，如何解决，如何改进...， 80字以上)  
图片的大小，要放到容器内；连续点击时，事件监听失效，可以设置flag，在当前animate播放完成前修改flag，阻止多余事件的响应；获得音乐资源，需要调试url返回的数据等。
另外，进度条增长不均匀，要用setinterval；歌词旋转出现，也用setinterval；加载歌词时的各种格式和正则匹配，也很麻烦。

项目收获
编程（非数学类的）其实就是和弹钢琴差不多，乐理和识谱要会，但不去天天弹奏，都是白搭。  
  
注意：加载自API的音乐文件常阻塞，因为API服务器的资源紧张。这可能需要点击和刷新数十次。
