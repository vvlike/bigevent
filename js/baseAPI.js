/*
 * @Author: your name
 * @Date: 2022-01-05 16:21:06
 * @LastEditTime: 2022-01-06 13:17:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo\js\baseAPI.js
 */
$(function() {


    //ajax 请求之前会调用这个函数option 配置对象
    $.ajaxPrefilter(function(option) {


        option.url = 'http://www.liulongbin.top:3007' + option.url

        if (option.url.indexOf(/my/) !== -1) {


            option.headers = {
                // 如果没有就是空
                Authorization: localStorage.getItem('token') || ''
            }


        }

        //不论成功还是失败都会执行

        option.complete = function(res) {
            // console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {

                //1.清空token
                localStorage.removeItem('token')

                //2.强制跳转到登录页面
                location.href = '/login.html'

            }


        }

    })

})