/*
 * @Author: your name
 * @Date: 2022-01-06 16:52:43
 * @LastEditTime: 2022-01-06 17:24:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo\js\user\user_pwd.js
 */
$(function() {
    var layer = layui.layer
    var form = layui.form
    form.verify({

        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var newpwd = $('#newPwd').val()

            if (value !== newpwd) {

                return '两次密码不一致';
            }

        }

    })

    //检测表单提交事件
    $('#changePwd').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            url: '/my/updatepwd',
            data: $('#changePwd').serialize(),
            method: 'POST',
            success: function(res) {

                if (res.status !== 0) {

                    return layer.msg("修改密码失败")
                }

                layer.msg("修改密码成功 --- 欧力给")
                $('[type=reset]').click()
            }


        })

    })






})