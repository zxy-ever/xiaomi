// let username = $('.username')
$('.btn').click(function(){
    console.log(111)
    let username = $('.username').val()
    let password = $('.password').val()
    console.log(username,password)
    $.ajax({
        url:'http://jx.xuzhixiang.top/ap/api/login.php',
        type:'get',
        data:{
            username,
            password
        }
    }).then((res)=>{
        console.log(res)
        if(res.code === 1){
            location.href = './index.html'
        }
    })
})