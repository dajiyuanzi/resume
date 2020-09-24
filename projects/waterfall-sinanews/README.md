# News Waterfall
**Demo** https://dajiyuanzi.github.io/resume/projects/waterfall-sinanews/index.html  
![waterfall](https://github.com/dajiyuanzi/resume/tree/master/projects/waterfall-sinanews/)  
  
This project was implemented with the RESTful API offered by Sina News and jQuery.
  
## Lazy-load Summary
If at first, there many images need loading and are loaded simultaneously, this will cost much of performance. 
This can work better through lazy-loading:  first onlu load the images viewed, and then when scroll the page down, load images required. 
Benefits: Ease the presssure of browser and increase user expirences, making the user to feel your website faster, which splits one-time pressure into multiple segments.  
  
## Principle of Waterfall
The layout with equal width and uneuqal height is Waterfall Page.
First it calculates how many dom elements one row can contain;
then it judges which column's height is the largest and put the next dom element to it;
afterwards it judges which column of elements is the shortest in the enti in the entire newly generated row after placing that element, and then place the next new element in this column;
and so on.

  
****
  
本项目使用jQuery和新浪新闻所提供的 RESTful API 实现。
  
## 懒加载原理
若一开始，页面上有许多的图片要加载，而如果同时加载这么多图片，会消耗性能。可以通过懒加载的方式，先只加载页面上所看到的图片，等滚动到页面下面时，再加载所需的图片。
作用： 可以缓解浏览器的压力，增强用户体验，让用户感觉到你的网站更快一些。将一次的压力，分解成好几段。

## 瀑布流原理
宽度一致，而高度不一样的布局就是瀑布流布局
先通过计算一排里面可以容纳多少列元素。
然后再判断哪一列元素的高度最短，就将下一个元素放到该列。
之后再判断放入该元素之后所形成的新的整排元素内，哪一列元素最短，再把下一个元素放置该列，以此类推。
关键变量是一个数组，存储的是当前每一列的高度之和。

## 实现原理
实现代码的2种思路技巧：
1.先假设所有需要的功能都已实现了，然后看 都是哪些功能，要拼接什么功能。
2.先看每步怎么做，一步步实现，再封装。

实现策略：
1.请求数据 ajax+json
2.把数据拼装成 dom 放到页面
3.使用瀑布流去拜访 dom 位置
瀑布流必须宽度固定，高度不固定。
数据量太大怎么办(伪代码)：
function dosth
a
1.获取 page=1 的 10条数据
2.把10条数据拼装成 dom 放到页面
3.使用瀑布流去摆放 dom 位置
4.page++
b 当页面滚动，“正在load”的元素出现在眼前的时候
1.获取 page=2 的 10条数据
2.把10条数据拼装成 dom 放到页面
3.使用瀑布流去摆放 dom 位置
4.page++