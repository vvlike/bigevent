/*
 * @Author: your name
 * @Date: 2022-01-06 15:47:17
 * @LastEditTime: 2022-01-06 16:45:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo\js\user\user_avatar.js
 */
$(function() {

    var layer = layui.layer
        // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    $('#upImg').on('click', function() {

        $('#files').click()
    })

    $('#files').on('change', function(e) {

            var filelist = e.target.files
            if (filelist.length === 0) {
                return layer.msg('请选择照片！')
            }

            // 1. 拿到用户选择的文件
            var file = e.target.files[0]
                // 2. 将文件，转化为路径
            var imgURL = URL.createObjectURL(file)
                // 3. 重新初始化裁剪区域
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', imgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        //为无额定按钮添加一个点击事件
    $('#btnUpload').on('click', function() {

        // 1. 要拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            // 2. 调用接口，把头像上传到服务器

        $.ajax({

            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            method: 'POST',
            success: function(res) {

                if (res.status !== 0) {

                    return layer.msg("更换头像失败")
                }
                layer.msg("更换头像成功")
                window.parent.getUserInfo()
            }


        })
    })



})