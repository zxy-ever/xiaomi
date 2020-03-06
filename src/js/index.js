

// 获取banner左边的列表
let navListArr = []
$.ajax({
  url: '../lib/banner_nav.json',
  dataType: 'json',
  success: function (res) {
    let str = ''
    res.forEach(item => {
      str += `
        <li>
          <a href="javascript:;"><span>${item.name}</span><span class="iconfont icon-iconfonti"></span></a>
        </li>
        `
    })
    $('.list > ul')
      .html(str)
      .on({
        mouseenter: () => $('.navlist_wrap').show(),
        mouseleave: () => $('.navlist_wrap').hide()
      })
      .on('click','li',function(){
        location.href = './list.html'
      })
      .children('li')
      .on('mouseover', function () {
        let index = $(this).index()
        let list = res[index].list
        let str = ''
        list.forEach(item => {
          str += `
          <li data-id="${item.goods_id}">
            <img
              src="${item.pc_img}"
              alt="">
            <p>${item.goods_name}</p>
          </li>
          `
        })
        $('.navlist_wrap>.nav_list>ul').html(str)
        navListArr = list
      })
    $('.navlist_wrap')
      .on({
        mouseover: function () {
          $(this).finish().show()
        },
        mouseout: function () {
          $(this).finish().hide()
        }
      })
  }
})
// nav_list跳转详情页
$('.nav_list > ul').on('click', 'li', function () {
  let pid = $(this).data('id')
  let data = {}
  for (let i = 0; i < navListArr.length; i++) {
    if (navListArr[i].goods_id == pid) {
      data = navListArr[i]
      break;
    }
  }
  localStorage.setItem('goods_info', JSON.stringify(data))
  location.href = `./detail.html`
})

// 小米闪购列表 及 跳转详情页
let secKillArr = []
$.ajax({
  url: '../lib/seckill.json',
  dataType: 'json',
  success: function (res) {
    let str = ''
    res.forEach(item => {
      str += `
      <div class="swiper-slide" data-id="${item.goods_id}">
        <img
          src="${item.pc_img}"
          alt="">
        <h4 class="title">${item.goods_name}</h4>
        <p class="desc">${item.desc}</p>
        <p class="price">
          <span>${item.goods_price}</span>元
          <del>${item.seckill_Price}元</del>
        </p>
      </div>
      `
    })
    $('.shop_r > .swiper-wrapper').html(str)
    secKillArr = res
  }
})
$('.shop_r > .swiper-wrapper').on('click', '.swiper-slide', function () {
  let pid = $(this).data('id')
  let data = {}
  for (let i = 0; i < secKillArr.length; i++) {
    if (secKillArr[i].goods_id == pid) {
      data = secKillArr[i]
      break;
    }
  }
  localStorage.setItem('goods_info', JSON.stringify(data))
  location.href = `./detail.html`
})

// 手机列表及跳转详情页
let phoneListArr = []
$.ajax({
  url: '../lib/phone.json',
  dataType: 'json',
  success: function (res) {
    let str = ''
    res.forEach(item => {
      str += `
      <li data-id="${item.goods_id}">
        <img
          src="${item.pc_img}"
          alt="">
        <h4 class="title">${item.goods_name}</h4>
        <p class="desc">${item.desc}</p>
        <p class="price">
          <span>${item.goods_price}</span>元
        </p>
      </li>
      `
    })
    $('.phone_r ul').html(str)
    phoneListArr = res
  }
})

$('.phone_r > ul').on('click', 'li', function () {
  let pid = $(this).data('id')
  let data = {}
  for (let i = 0; i < phoneListArr.length; i++) {
    if (phoneListArr[i].goods_id == pid) {
      data = phoneListArr[i]
      break;
    }
  }
  localStorage.setItem('goods_info', JSON.stringify(data))
  location.href = `./detail.html`
})


// 倒计时
let hour = document.querySelector('#hour')
let min = document.querySelector('#min')
let sec = document.querySelector('#sec')
let endTime = new Date(2020, 3, 10)
let timer = setInterval(() => {
  // 开始时间
  let start = new Date()
  // 时间间隔
  let c = endTime - start
  // 小时
  let h = parseInt(c / 1000 / 60 / 60) % 24
  // 分钟
  let m = parseInt(c / 1000 / 60) % 60
  // 秒
  let s = parseInt(c / 1000) % 60
  if (h < 10) {
    h = '0' + h
  }
  if (m < 10) {
    m = '0' + m
  }
  if (s < 10) {
    s = '0' + s
  }
  hour.innerHTML = h
  min.innerHTML = m
  sec.innerHTML = s

  if (start.getTime() >= endTime.getTime()) {
    clearInterval(timer)
  }
}, 1000);