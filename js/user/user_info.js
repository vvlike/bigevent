/*
 * @Author: your name
 * @Date: 2022-01-06 12:55:16
 * @LastEditTime: 2022-01-06 15:45:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo\js\user\user_info.js
 */
$(function() {
    var form = layui.form
    var layer = layui.layer
        // var data1 = form.val('formInfo')
        // console.log(data1);

    initUserInfo()

    //获取用户信息
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            data: '',
            method: 'GET',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                //表单快速赋值
                form.val('formInfo', res.data)
            }

        })
    }

    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
            // 阻止表单的默认重置行为
            e.preventDefault()
            initUserInfo()
        })
        //提交修改数据
    $('#formInfo').on('submit', function(e) {
        // 阻止表单提交行为
        e.preventDefault()
        var data1 = form.val("formInfo");
        console.log(data1);
        //更改用户信息
        $.ajax({
            url: "/my/userinfo",
            method: 'POST',
            data: data1,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }

        })


    })





})