
getList()
        // 准备一个变量
        let flag = true;
        // 准备一个变量接受数组
        let sortList = []
        // 
        // 请求列表数据
        function getList() {
            $.ajax({
                url: '../lib/seckill.json',
                dataType: 'json',
                success(res) {
                    // 渲染分页器
                    $("#page").Page({
                        totalPages: Math.ceil(res.length / 9), //total Pages
                        liNums: 7, //the li numbers(advice use odd)
                        activeClass: 'activP', //active class style
                        firstPage: '首页', //first button name
                        lastPage: '末页', //last button name
                        prv: '<<', //prev button name
                        next: '>>', //next button name
                        hasFirstPage: true, //whether has first button
                        hasLastPage: true, //whether has last button
                        hasPrv: true, //whether has prev button
                        hasNext: true, //whether has next button
                        callBack: function (page) {
                            //callBack function，page:active page
                            let list = res.slice((page - 1) * 9, page * 9)
                            bindhtml(list)


                        }
                    });

                    bindhtml(res.slice(0, 9))
                    sortList = res
                }
            })

        }

        // 跳转详情页
        $('.list_con > ul').on('click', 'li img', function () {
            let pid = $(this).parent().parent().data('id')
            let data = {}
            for (let i = 0; i < sortList.length; i++) {
                if (sortList[i].goods_id == pid) {
                    data = sortList[i]
                    break;
                }
            }
            localStorage.setItem('goods_info', JSON.stringify(data))
            location.href = `./detail.html`
        })

        // 渲染列表数据
        function bindhtml(list) {
            let str = ''
            list.forEach(item => {
                str += `
                        <li class="clean" data-id="${item.goods_id}">
                            <div class="list_img fl">
                                <img src="${item.img}"
                                    alt="">
                            </div>
                            <div class="list_txt fr">
                                <h4>${item.goods_name}</h4>
                                <p>${item.desc}</p>
                                <p class="price"><span>${item.goods_price}</span>元</p>
                                <a href="javascript:;" id="addCart" data-id="${item.goods_id}">加入购物车</a>
                            </div>
                        </li>
                        `
            })
            $('.list_con > ul').html(str)
        }

        // 价格排序
        $('.byPrice').click(function () {
            flag = !flag;
            sortList.sort(function (a, b) {
                if (flag === true) {
                    return a.goods_price - b.goods_price
                } else {
                    return b.goods_price - a.goods_price
                }
            })
            $("#page").Page({
                totalPages: Math.ceil(sortList.length / 9), //total Pages
                liNums: 7, //the li numbers(advice use odd)
                activeClass: 'activP', //active class style
                firstPage: '首页', //first button name
                lastPage: '末页', //last button name
                prv: '<<', //prev button name
                next: '>>', //next button name
                hasFirstPage: true, //whether has first button
                hasLastPage: true, //whether has last button
                hasPrv: true, //whether has prev button
                hasNext: true, //whether has next button
                callBack: function (page) {
                    //callBack function，page:active page
                    let list = sortList.slice((page - 1) * 9, page * 9)
                    bindhtml(list)


                }
            });

            bindhtml(sortList.slice(0, 9))
        })
        // 综合排序
        $('.byTotal').click(function () {
            getList()
        })

        // 加入购物车
        $('.list_con > ul').on('click', '#addCart', function () {
            let id = $(this).data('id')
            $.ajax({
                url: '../lib/seckill.json',
                dataType: 'json',
                success: function (res) {
                    let goodsinfo = res.find(v => v.goods_id == id)
                    let jsonstr = localStorage.getItem('cart')
                    if (jsonstr) {
                        let jsonstr = localStorage.getItem('cart')
                        let arr = JSON.parse(jsonstr)
                        // 判断购物车中有没有要存入的商品
                        let pObj = arr.find(v => v.goods_id == goodsinfo.goods_id)
                        // 有
                        if (pObj) {
                            pObj.pnum++
                        } else {
                            // 没有
                            goodsinfo.pnum = 1;
                            arr.push(goodsinfo)
                        }
                        localStorage.setItem('cart', JSON.stringify(arr))
                    } else {
                        // 没有数据
                        goodsinfo.pnum = 1;
                        let tmpArr = [goodsinfo]
                        localStorage.setItem('cart', JSON.stringify(tmpArr))
                    }
                    alert('添加购物车成功')
                    location.reload()
                }
            })

        })
        