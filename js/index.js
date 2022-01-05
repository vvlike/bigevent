/*
 * @Author: your name
 * @Date: 2022-01-05 11:49:01
 * @LastEditTime: 2022-01-05 22:02:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo\js\index.js
 */
$(function() {

    getUserInfo()

    var layer = layui.layer
        //事件点击退出

    $('#btn_exit').on('click', function() {

        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function(index) {

            //清空本地存储数据
            localStorage.removeItem('token')
                //重新跳到登录页面
            location.href = '/login.html'


            //do something

            layer.close(index);
        });

    })

    function getUserInfo() {

        $.ajax({


            url: '/my/userinfo',

            method: 'GET',
            success: function(res) {
                console.log(res.data);

                render_avatar(res.data)


            }


        })
    }

    //渲染头像
    function render_avatar(user) {

        //获取用户名昵称优先
        var name = user.nickname || user.username
        $('#wel_name').html('&nbsp&nbsp' + name)


        //头像设置
        if (user.user_pic !== null) {

            $('.he_Img').attr('src', user.user_pic).show()
            $('.he_Ig').hide()

        } else {

            var usr = user.username[0].toUpperCase()

            $('.he_Ig').html(usr)
            $('.he_Img').hide()

        }


    }
    $('#home').click()
})