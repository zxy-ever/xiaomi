// 手机号失去焦点
let nameflag = false;
$('.username').blur(function () {
    console.log('失去焦点了')
    let username = $(this).val()
    console.log(username)
    if (username === '') {
        $(this).css('border-color', '#f00')
        $('.phone').css('display', 'none')
        $('.err').css('display', 'block')
        $('.err span').html('请输入手机号')
        nameflag = false;
        return false;
    }
    if (!(/^1[3456789]\d{9}$/.test(username))) {
        $(this).css('border-color', '#f00')
        $('.phone').css('display', 'none')
        $('.err').css('display', 'block')
        $('.err span').html('手机号码格式错误')
        nameflag = false;
        return false;
    } else {
        $(this).css('border-color', '#e8e8e8')
        $('.phone').css('display', 'block')
        $('.err').css('display', 'none')
        nameflag = true;
    }
    // 检测用户名是否存在
    $.ajax({
        url: 'http://jx.xuzhixiang.top/ap/api/checkname.php',
        type: 'get',
        data: {
            username
        }
    }).then(res => {
        console.log(res)
        if (res.code == 0) {
            $(this).css('border-color', '#f00')
            $('.phone').css('display', 'none')
            $('.err').css('display', 'block')
            $('.err span').html('用户名已存在')
            nameflag = false;
        } else {
            $(this).css('border-color', '#e8e8e8')
            $('.phone').css('display', 'block')
            $('.err').css('display', 'none')
            nameflag = true;
        }
    })
})

// 密码框失去焦点
let pwdflag = false;
$('.password').blur(function () {
    console.log('失去焦点了')
    let password = $(this).val()
    console.log(password)
    if (!(/\d{4,16}$/.test(password)) || password === '') {
        $(this).css('border-color', '#f00')
        $('.pwd').css('display', 'none')
        $('.err_pwd').css('display', 'block')
        $('.err_pwd span').html('请输入4~16位密码')
        pwdflag = false;
        return false;
    } else {
        $(this).css('border-color', '#e8e8e8')
        $('.pwd').css('display', 'block')
        $('.err_pwd').css('display', 'none')
        pwdflag = true;
    }
})
// 注册按钮
$('.regBtn').click(function () {
    if (nameflag && pwdflag) {
        $.ajax({
            url: 'http://jx.xuzhixiang.top/ap/api/reg.php',
            type:'get',
            data:{
                username,
                password
            }
        }).then(res=>{
            if(res.code == 1){
                alert('注册成功')
                location.href = './login.html'
            }
        })
    }else{
        alert('请完善信息')
    }
})