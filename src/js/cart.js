// 判断用户是否登录
let token = localStorage.getItem('token')
let username = JSON.parse(localStorage.getItem('username'))
if (token) {
    $('.already').show()
    $('.login').hide()
    $('.already .username').html(username)
    $('.loginBtn').hide()
    $('.listBtn').addClass('listBtnAlready')

} else {
    $('.already').hide()
    $('.login').show()
    $('.loginBtn').show()
    $('.listBtn').removeClass('listBtnAlready')
}

isEmpty()

function isEmpty() {
    // 判断购物车有没有数据
    let cartList = JSON.parse(localStorage.getItem('cart'))
    if (!cartList || cartList.length == 0) {
        $('.empty').show()
        $('.cartList').hide()
        $('.header .header_title > p').hide()
    } else {
        $('.empty').hide()
        $('.cartList').show()
        $('.header .header_title > p').show()

    }
}
getList()
// 获取购物车列表
function getList() {
    let jsonstr = localStorage.getItem('cart')
    if (jsonstr) {
        let cartList = JSON.parse(jsonstr)
        let str = ''
        cartList.forEach(item => {
            str += `
            <div class="cart_box clean">
                <div class="cart-check fl">
                    <input type="checkbox" class="checkSingle">
                </div>
                <div class="cart-img fl">
                    <img src="${item.pc_img}"
                        alt="">
                </div>
                <div class="cart-name fl">${item.goods_name}</div>
                <div class="cart-price fl">
                    <i class="price">${item.goods_price}</i>
                    元</div>
                <div class="cart-num fl">
                    <input type="button" onclick="subClick(this,${item.goods_id})" class="subBtn fl" value="-">
                    <input type="text" class="num fl" value="${item.pnum}">
                    <input type="button" onclick="addClick(this,${item.goods_id})" class="addBtn fl" value="+">
                </div>
                <div class="cart-total fl">
                    <i class="total"></i>
                    元</div>
                <div class="cart-action fl">
                    <input type="button" onclick="delClick(this,${item.goods_id})" class="delBtn" value="×">
                </div>
            </div>
            `
        })
        $('.cart_list').html(str)
    }
}
// 全选 单选按钮
$('.checkAll').click(function () {
    let isChecked = $(this).prop('checked');
    $('.checkSingle').prop('checked', isChecked)

    // 已选总件数,总金额
    getCount()
    getState()

})

// 单选框按钮
$('.cart_list').on('click', '.checkSingle', function () {
    let isAllChecked = true
    $('.checkSingle').each(function (i, v) {
        if (!v.checked) {
            isAllChecked = false
        }
    })
    $('.checkAll').prop('checked', isAllChecked)
    // 已选总件数,总金额
    getCount()
    getState()
})
// 计算购物车总件数
getTotalNum()

function getTotalNum() {
    let jsonstr = localStorage.getItem('cart')
    let tmpArr = JSON.parse(jsonstr)
    let num = 0;
    tmpArr.forEach(v => {
        num += v.pnum
    })
    $('.cartNum').html(num)
}

// 计算小计 
subTotal()

function subTotal() {
    $('.total').each((i, v) => {
        let num = Number($(v).parent().siblings('.cart-num').children('.num').val())
        let price = Number($(v).parent().siblings('.cart-price').children('.price').html())
        $(v).html(num * price)
    })
}

getCount()
// 计算购物车选择总件数,总金额
function getCount() {
    let selnum = 0;
    let count = 0;
    $('.checkSingle').each((i, v) => {
        if ($(v).prop('checked')) {
            let num = Number($(v).parent().siblings('.cart-num').children('.num').val())
            let price = Number($(v).parent().siblings('.cart-price').children('.price').html())
            selnum += num
            count += num * price
        }
    })
    $('.selNum').html(selnum)
    // 总价
    $('.totalPrice').html(count)
}


// 增加按钮
function addClick(btn, id) {
    let cartList = JSON.parse(localStorage.getItem('cart'))
    let obj = cartList.find(v => v.goods_id == id)
    obj.pnum++
    $(btn).prev().val(obj.pnum)
    localStorage.setItem('cart', JSON.stringify(cartList))
    getCount() //总件数,总金额
    subTotal() //小计
    getTotalNum() //购物车总数量
}

// 减少按钮
function subClick(btn, id) {
    let cartList = JSON.parse(localStorage.getItem('cart'))
    let obj = cartList.find(v => v.goods_id == id)
    if (obj.pnum == 1) {
        return;
    }
    obj.pnum--
    $(btn).next().val(obj.pnum)
    localStorage.setItem('cart', JSON.stringify(cartList))
    getCount()
    subTotal()
    getTotalNum()
}

// 删除按钮
function delClick(btn, id) {
    let cartList = JSON.parse(localStorage.getItem('cart'))
    let tmpArr = cartList.filter(v => v.goods_id != id)
    $(btn).parent().parent().remove()
    localStorage.setItem('cart', JSON.stringify(tmpArr))
    // getList()
    isEmpty()
    getCount()
    subTotal()
    getTotalNum()
}

// 退出按钮
$('.exit').click(function(){
    localStorage.removeItem('token')
})
// 结算的状态
// getState()
function getState() {
    let singleArr = document.querySelectorAll('.checkSingle')

    let flag = Array.from(singleArr).some(v => {
        return v.checked == true
    })
    if (flag == true) {
        $('.pay').removeAttr('disabled').css({
            'background': '#ff7600',
            'color': '#fff'
        })
    } else {
        $('.pay').attr('disabled', 'disabled').css({
            'background': '#e0e0e0',
            'color': '#b0b0b0'
        })
    }
}
