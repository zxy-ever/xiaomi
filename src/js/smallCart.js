    // 一个接收nav_box内容的数组
let navboxList = []
$('.nav_top >li')
  .on({
    mouseenter: () => $('.nav_box').stop().slideDown(),
    mouseleave: () => $('.nav_box').stop().slideUp()
  })
  .on('mouseover', function () {
    let index = $(this).index()
    $.ajax({
      url: '../lib/nav_top.json',
      dataType: 'json',
      success: function (res) {
        let list = res[index].list
        let str = ''
        list.forEach(item => {
          str += `
        <li data-id="${item.goods_id}">
          <div>
            <img
              src="${item.pc_img}"
              alt="">
          </div>
          <p>${item.goods_name}</p>
          <p>${item.goods_price}</p>
        </li>
        `
        });
        $('.nav_box > ul').html(str)
        navboxList = list
      }
    })
  })
$('.nav_box').on({
  mouseover: function () {
    $(this).finish().show()
  },
  mouseout: function () {
    $(this).finish().slideUp()
  }
})

// nav_box跳转详情页
$('.nav_box > ul').on('click', 'li', function () {
  let pid = $(this).data('id')
  let data = {}
  for (let i = 0; i < navboxList.length; i++) {
    if (navboxList[i].goods_id == pid) {
      data = navboxList[i]
      break;
    }
  }
  localStorage.setItem('goods_info', JSON.stringify(data))
  location.href = `./detail.html`
})


    // 鼠标移入移出购物车按钮事件
    $('.cart').on({
        mouseover:function(){
          $('.smallCart').show()
        },
        mouseleave:function(){
          $('.smallCart').hide()
        }
      })
      $('.smallCart').on({
        mouseover:function(){
          $('.smallCart').show()
        },
        mouseleave:function(){
          $('.smallCart').hide()
        }
      })
      //购物车小图显示
      let cartList = JSON.parse(localStorage.getItem('cart'))
      if(!cartList || cartList.length==0){
        let str = `
          <p>购物车中还没有商品,赶紧选购吧!</p>  
        `
        $('.smallCart').html(str)
      }else{
        $('.cart').css({
          'background':'#ff6700',
          'color':'#fff'
        })
        bindHtml() //显示购物车列表
      }
      function bindHtml(){
        let str = `
        <ul>
          `
          cartList.forEach(item=>{
            str += `
            <li>
              <img src="${item.pc_img}" alt="">
              <p>${item.goods_name}</p>
              <span><i>${item.goods_price}</i>元 ×<i>${item.pnum}</i></span>
            </li>
            `
          })
  
          // 件数
          let smallNum = 0;
          // 总价
          let smallCount = 0;
          cartList.forEach(item=>{
            smallNum += item.pnum
            smallCount += Number(item.pnum) * Number(item.goods_price)
          })
          str += `
          </ul>
          <div class="smallBottom">
            <div class="bottom_l">
              <p class="bnum">共 <i>${smallNum}</i> 件商品</p>
              <p class="btotal"><em>${smallCount}</em>元</p>
            </div>
            <button onclick="goCart()">去购物车结算</button>
          `
          $('.smallCart').html(str)
          $('.cart .num').html('（'+smallNum+'）')
      }
  
      // 点击去购物车按钮
      function goCart(){
        location.href = './cart.html'
      }

// 判断用户是否登录
let token = localStorage.getItem('token')
let username = JSON.parse(localStorage.getItem('username'))
if (token) {
    $('.login').html(`<a href="javascript:;">${username}</a>`)
    $('.reg').html(`<span class="exit">退出</span>`)
    $('.exit').css({
        'cursor':'pointer',
        'color':'#fff'
    })
    $('.exit').click(function(){
        localStorage.removeItem('token')
        location.href = './login.html'
    })
}
