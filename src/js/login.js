$('.btn').click(function () {
    if ($('.username').val() == '') {
        $('.errInfo').show().children('span').html('请输入账号')
        $('.username').css('border-color', '#ff6700')
    } else if ($('.password').val() == '') {
        $('.username').css('border-color', '#e0e0e0')
        $('.errInfo').show().children('span').html('请输入密码')
        $('.password').css('border-color', '#ff6700')
    }else if(/[\u4E00-\u9FA5]/g.test($('.username').val())){
        $('.errInfo').show().children('span').html('用户名格式不正确')
    } else {
        $('.errInfo').hide()
        // $('.username').css('border-color','#e0e0e0')
        $('.password').css('border-color', '#e0e0e0')

        let username = $('.username').val()
        let password = $('.password').val()
        $.ajax({
            url: 'http://jx.xuzhixiang.top/ap/api/login.php',
            type: 'get',
            data: {
                username,
                password
            }
        }).then((res) => {
            if (res.code === 1) {
                let token = res.data.token
                let username = res.data.username
                localStorage.setItem('token', JSON.stringify(token))
                localStorage.setItem('username', JSON.stringify(username))

                location.href = './index.html'
            } else {
                $('.errInfo').show().children('span').html('用户名或密码不正确')
            }
        })
    }

})