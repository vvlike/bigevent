/*
 * @Author: your name
 * @Date: 2022-01-05 11:50:54
 * @LastEditTime: 2022-01-05 13:07:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo\js\login.js
 */
$(function() {

    $('#reg').on('click', function() {

        // alert(111)

        $('.box1').hide()
        $('.box2').show()

    })

    $('#nowR').on('click', function() {

        $('.box1').show()
        $('.box2').hide()


    })

})