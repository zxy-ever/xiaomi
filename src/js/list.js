$('.nav_top >li')
    .on({
        mouseenter: () => $('.nav_box').stop().slideDown(),
        mouseleave: () => $('.nav_box').stop().slideUp()
    })
    .on('mouseover', function () {
        let index = $(this).index()
        console.log(index)
        $.ajax({
            url: '../lib/nav_top.json',
            dataType: 'json',
            success: function (res) {
                let list = res[index].list
                let str = ''
                list.forEach(item => {
                    str += `
        <li>
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