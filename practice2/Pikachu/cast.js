// 关键：同时以文本的形式(innerText)和html(innerHTML)的形式，展示style标签。

import string from './css.js'

const player = {
  id: undefined,
  time: 100,
  ui: {
    demo: document.querySelector('#demo'),
    demo2: document.querySelector('#demo2')
  },
  events: {
    '#btnPause': 'pause',
    '#btnPlay': 'play',
    '#btnSlow': 'slow',
    '#btnNormal': 'normal',
    '#btnFast': 'fast'
  },
  n: 1,
  init: () => {
    player.ui.demo.innerText = string.substr(0, player.n) //css代码打印
    player.ui.demo2.innerHTML = string.substr(0, player.n) //让css起作用
    player.bindEvents()
    player.play()
  },

  bindEvents: () => {
    for (let key in player.events) {
      if (player.events.hasOwnProperty(key)) {
        const value = player.events[key] // pause / play / slow
        document.querySelector(key).onclick = player[value] //通过循环 给button挂上下面对应的方法pause / play / slow
      }
    }
  },

  run: () => {
    player.n += 1
    if (player.n > string.length) {
      window.clearInterval(player.id)
      return
    }
    player.ui.demo.innerText = string.substr(0, player.n) //逐码展示
    player.ui.demo2.innerHTML = string.substr(0, player.n) //逐码运行
    player.ui.demo.scrollTop = player.ui.demo.scrollHeight //展示框的滚动条要滚到底部
  },
  play: () => {
    player.id = setInterval(player.run, player.time) //通过修改运行时间，来设定快慢
  },
  pause: () => {
    window.clearInterval(player.id)
  },
  slow: () => {
    player.pause()
    player.time = 300
    player.play()
  },
  normal: () => {
    player.pause()
    player.time = 100
    player.play()
  },
  fast: () => {
    player.pause()
    player.time = 0
    player.play()
  }

}

player.init()


