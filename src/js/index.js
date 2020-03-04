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
  console.log($(this).html())
  console.log($(this).data('id'))
  console.log(navboxList)
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