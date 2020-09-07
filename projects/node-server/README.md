# Intro
See details in code annotations.  
   
The general workflow of a node-server:  
The server listens to the port of one server, and then when receive the request from a client, parse the URL data in the request (that is, the name of requested source files or data);  
The server splices the file path where the resource is located with the requested file name into an accurate absolute path, and finds the resource in the host system where the server is located;
The server reads the identified file, writes the read data into the variable file stream, and returns it by HTTP;
If data is not found, the server will return the status number of HTTP connection failure, such as 404.
  
****  
  
# 简介
详见代码的annotation

node-server 大体流程
监听某个端口的server（服务器），收到了客户端的请求并解析其中url（即申请的资源文件/数据的名称）；
server把资源所在的文件路径与申请的文件名拼成一个准确的绝对路径，在server所在的主机系统内，找到资源；
server读取指定的文件，把读取数据 写入变量的 文件流 中，并由http返回；
如果没找到，返回http连接失败的状态号，如404等。