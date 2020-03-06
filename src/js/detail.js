let goodsinfo = JSON.parse(localStorage.getItem('goods_info'))
    if (goodsinfo == null) {
      $('.detail').html('您查看的商品已下架')
    } else {
      let str = `
                <div class="small fl">
                  <img class="my-foto" src="${goodsinfo.pc_img}" data-large="${goodsinfo.pc_img}" title="Фото">
                    
                </div>
                <div class="info fl">
                    <h2>${goodsinfo.goods_name}</h2>
                    <p>${goodsinfo.desc}</p>
                    <p class="txt">小米自营</p>
                    <p class="price"><span>${goodsinfo.goods_price}</span>元</p>
                    <button id="addCart" data-id="${goodsinfo.goods_id}">加入购物车</button>
                </div>
            `
      $('.detail').html(str)
    }
    // 加入购物车
    $('#addCart').click(function () {
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
      location.reload()
    })





    jQuery(function () {

      $(".my-foto").imagezoomsl({

        innerzoommagnifier: true,
        classmagnifier: window.external ? window.navigator.vendor === "Yandex" ? "" : "round-loupe" : "",
        magnifierborder: "5px solid #F0F0F0", // fix для Opera, Safary, Yandex		  
        zoomrange: [2, 8],
        zoomstart: 4,
        magnifiersize: [150, 150]
      });
    });