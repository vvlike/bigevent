/*
 * @Author: your name
 * @Date: 2022-01-06 20:51:37
 * @LastEditTime: 2022-01-06 23:19:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo\js\article\article_class.js
 */
$(function() {

    var layer = layui.layer

    var form = layui.form
    getArticle()
        //获取文章列表
    function getArticle() {
        $.ajax({

            url: "/my/article/cates",
            method: 'GET',
            success: function(res) {

                // console.log(res.data);
                if (res.status !== 0) {

                    return layer.msg("获取文章列表失败")
                }
                // layer.msg("获取文章列表成功")

                var str = template('tpl_table', res)
                    // console.log(str);
                $('tbody').html(str)

            }


        })


    }
    var indexAdd = null
        //为添加分类按钮添加点击事件
    $('#addClass').on('click', function() {

        indexAdd = layer.open({
            type: 1,
            title: "添加文章分类",
            area: ['500px', '250px'],
            content: $('#addText').html()
        });

    })

    // 通过代理的形式，为 addForm 表单绑定 submit 事件 因为是动态添加的

    $('body').on('submit', '#addForm', function(e) {

        e.preventDefault()

        addArticleClass()

    })


    //添加文章分类
    function addArticleClass() {

        $.ajax({

            url: '/my/article/addcates',
            data: $('#addForm').serialize(),
            method: 'POST',
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {


                    return layer.msg("添加文章分类失败")
                }
                layer.msg("添加文章分类成功")
                getArticle()
                layer.close(indexAdd)
            }


        })

    }

    //为删除按钮添加点击事件
    $('tbody').on('click', '.btn_delete', function() {

        var id = ($(this).attr('data-id'));
        $.ajax({

            url: '/my/article/deletecate/' + id,
            method: "GET",
            success: function(res) {

                if (res.status !== 0) {

                    return layer.msg("删除分类失败")
                }
                layer.msg("删除分类成功 你真的牛皮")

                //重新渲染页面
                getArticle()
            }

        })


    })
    var indexEdit = null;
    var editForm = null

    //为修改按钮添加点击事件
    $('tbody').on('click', '.btn_edit', function() {

        indexEdit = layer.open({
            type: 1,
            title: "添加文章分类",
            area: ['500px', '250px'],
            content: $('#editText').html()
        });


        var id = $(this).attr('data-id')
        $.ajax({

            url: "/my/article/cates/" + id,
            method: 'GET',
            success: function(res) {

                if (res.status !== 0) {

                    return layer.msg("此项内容不能编辑")
                }
                //给表单赋值
                form.val('formTest', res.data)

            }

        })

    })



    //检测表单的提交按钮
    $('body').on('submit', '#editForm', function(e) {

        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                getArticle()
            }
        })
    })
})