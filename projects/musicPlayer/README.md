![runscreen](https://github.com/dajiyuanzi/resume/tree/master/projects/musicPlayer/runscreen.PNG)
Demo https://dajiyuanzi.github.io/resume/projects/musicPlayer/  
  
The RESTful API from the backend cannot support HTTPS protocol and only can offer HTTP. But Github can only work with HTTPS, and therefore the online demo in Github cannot play the music. Localhost can play the music.
Use command 'http-server -c-1' to run localhost (no cache).
  
**Summary:** Generally, using the Audio class of native JS to control and load music sources; as well, using some JS events listens to users' actions so as to modify the action of audio class and the style of CSS.
Then JS uses Ajax to send the request in JSON files for resources (URL) to th server.
  
****

因为后台API不支持HTTPS协议，只有HTTP协议，而Github需HTTPS协议，故GitHub上无法播放音乐，需本机运行。

本机上要打开htto-server才能正常运行 （无缓存运行server命令  http-server -c-1）  

具体原理看代码注释。  

可播放音乐和跳转歌曲。  

**原理:** 总的来说，就是用js的Audio类来控制音频资源的加载和操作;同时，再用一些js的事件来监听用户的操作，以对audio类的动作和一些css的样式进行修改。js用ajax来把json文件中的资源请求（url）发送给服务器。
