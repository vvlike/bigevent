/*
 * @Author: your name
 * @Date: 2022-01-05 11:50:54
 * @LastEditTime: 2022-01-05 17:26:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo\js\login.js
 */
$(function() {

    var form = layui.form
    var layer = layui.layer
    form.verify({


        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            //通过形参拿到的是确认密码框里面的内容
            //还要拿到密码框里面的的内容
            //然后进行一次等于的判断
            //如果判断失败 则return一个提示消息即可

            var pwd = $('.box2 [name=password]').val()

            if (pwd !== value) {

                return '两次密码不一致'
            }

        }

    })

    $('#reg').on('click', function() {

        // alert(111)

        $('.box1').hide()
        $('.box2').show()

    })

    $('#nowR').on('click', function() {

        $('.box1').show()
        $('.box2').hide()


    })

    //给登入表单检测提交事情

    $('#form-login').on('submit', function(e) {
        e.preventDefault()
            // alert(111)

        $.ajax({

            url: '/api/login',
            data: $('#form-login').serialize(),
            method: 'POST',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {

                    return layer.msg("登入失败请重新登录")
                }

                localStorage.setItem('token', res.token)

                location.href = '/index.html'
            }


        })

    })


    //给注册按钮添加submit提交事件检测
    $('#form-regin').on('submit', function(e) {

        e.preventDefault()

        // alert(111)
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: $('#form-regin').serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {

                    return layer.msg("注册失败请重新注册")
                }

                layer.msg("注册成功")

                $('.box1').show()
                $('.box2').hide()
            }


        })

    })


})