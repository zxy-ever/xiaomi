"use strict";var navboxList=[];$(".nav_top >li").on({mouseenter:function(){return $(".nav_box").stop().slideDown()},mouseleave:function(){return $(".nav_box").stop().slideUp()}}).on("mouseover",function(){var a=$(this).index();$.ajax({url:"../lib/nav_top.json",dataType:"json",success:function(n){var t=n[a].list,o="";t.forEach(function(n){o+='\n        <li data-id="'.concat(n.goods_id,'">\n          <div>\n            <img\n              src="').concat(n.pc_img,'"\n              alt="">\n          </div>\n          <p>').concat(n.goods_name,"</p>\n          <p>").concat(n.goods_price,"</p>\n        </li>\n        ")}),$(".nav_box > ul").html(o),navboxList=t}})}),$(".nav_box").on({mouseover:function(){$(this).finish().show()},mouseout:function(){$(this).finish().slideUp()}}),$(".nav_box > ul").on("click","li",function(){for(var n=$(this).data("id"),t={},o=0;o<navboxList.length;o++)if(navboxList[o].goods_id==n){t=navboxList[o];break}localStorage.setItem("goods_info",JSON.stringify(t)),location.href="./detail.html"}),$(".cart").on({mouseover:function(){$(".smallCart").show()},mouseleave:function(){$(".smallCart").hide()}}),$(".smallCart").on({mouseover:function(){$(".smallCart").show()},mouseleave:function(){$(".smallCart").hide()}});var cartList=JSON.parse(localStorage.getItem("cart"));if(cartList&&0!=cartList.length)$(".cart").css({background:"#ff6700",color:"#fff"}),bindHtml();else{var str="\n          <p>购物车中还没有商品,赶紧选购吧!</p>  \n        ";$(".smallCart").html(str)}function bindHtml(){var t="\n        <ul>\n          ";cartList.forEach(function(n){t+='\n            <li>\n              <img src="'.concat(n.pc_img,'" alt="">\n              <p>').concat(n.goods_name,"</p>\n              <span><i>").concat(n.goods_price,"</i>元 ×<i>").concat(n.pnum,"</i></span>\n            </li>\n            ")});var o=0,a=0;cartList.forEach(function(n){o+=n.pnum,a+=Number(n.pnum)*Number(n.goods_price)}),t+='\n          </ul>\n          <div class="smallBottom">\n            <div class="bottom_l">\n              <p class="bnum">共 <i>'.concat(o,'</i> 件商品</p>\n              <p class="btotal"><em>').concat(a,'</em>元</p>\n            </div>\n            <button onclick="goCart()">去购物车结算</button>\n          '),$(".smallCart").html(t),$(".cart .num").html("（"+o+"）")}function goCart(){location.href="./cart.html"}var token=localStorage.getItem("token"),username=JSON.parse(localStorage.getItem("username"));token&&($(".login").html('<a href="javascript:;">'.concat(username,"</a>")),$(".reg").html('<span class="exit">退出</span>'),$(".exit").css({cursor:"pointer",color:"#fff"}),$(".exit").click(function(){localStorage.removeItem("token"),location.href="./login.html"}));