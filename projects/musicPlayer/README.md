本机上要打开htto-server才能正常运行 （无缓存运行server命令  http-server -c-1）

具体原理看代码注释。

可播放音乐和跳转歌曲。

原理：总的来说，就是用js的Audio类来控制音频资源的加载和操作，同时，再用一些js的事件来监听用户的操作，以对audio类的动作和一些css的样式进行修改。js用ajax来把json文件中的资源请求（url）发送给服务器。
