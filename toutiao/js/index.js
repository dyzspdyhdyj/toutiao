$(function () {

	
    myScroll = new IScroll('#wrapper', { scrollX: true, scrollY: false,click:true});

    //加载过渡动画
    $(document).ajaxSend(function(){
        $("#gd").show();
    });
    $(document).ajaxSuccess(function(){
        $("#gd").hide();
    });
    // 封装添加新闻函数
    function render(type,repaint=true,start=0) {
        $.ajax({
            url:"https://api.jisuapi.com/news/get?channel="+type+"&start="+start+"&num=10&appkey=6b54d90d60aab77d",
            dataType:'jsonp',
            beforeSend:function () {
                $('#shua').show()
            },
            success:function (res) {
                $('#shua').hide()
                let arr = res.result.list;
                let str = "";
                arr.forEach(val=>{
                    if(val.pic ==""){
                    str += `<li class="nopic list">
                                    <a href="${val.url}">
                                        <p>${val.title}</p>
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </a>
                                </li>`;
                }else{
                    str += `<li class="list">
                                    <a href="${val.url}">
                                        <div class="left">
                                            <img src="${val.pic}" alt="">
                                        </div>
                                        <div class="right">
                                            <p>${val.title}</p>
                                            <i>${val.time}</i>
                                            <i>${val.src}</i>
                                        </div>
                                    </a>
                                </li>`;
                }
            })
                if(repaint) {
                    $('.listBox').html(str);
                }else {
                    $('.listBox').html($('.listBox').html()+str);

                }
            }
        })
    }

//获取新闻频道
    $.ajax({
        url:'https://api.jisuapi.com/news/channel?appkey=6b54d90d60aab77d',
        dataType:'jsonp',
        success:function (res) {
            let arr = res.result;
            console.log(arr);
            let str = "";
            arr.forEach((val, index) => {
                if(index==0){
                str += `<li class="active">${val}</li>`;
            }
        else
            {
                str += `<li>${val}</li>`
            }
        })
            $('#scroller ul').html(str);
            render($('#scroller li.active').text());
        }
    })
// 点击栏目切换新闻
//     console.log($('#scroller ul').find('active'));
    $('#scroller ul').on('click','li',function () {
        if($(this).hasClass('active')){
            return;
        }
        $(this).siblings().removeClass('active').end().addClass('active');
        let text=$(this).html();
        render(text);
    })
// 点击加载更多
    $('#add').click(function () {
        // console.log($(".listBox").children("li").length);
        render($('#scroller li.active').html(),false,$(".listBox").children("li").length);
    })
})

// 回车搜索新闻
$(window).keydown(function(e){
    if(e.keyCode==13) {
        // 删除新闻栏目
        $('#wrapper').remove();
        // 获取输入内容
        let values=$('input').val();
        // 输出搜索新闻
        $.ajax({
            url:"https://api.jisuapi.com/news/search?keyword="+values+"&appkey=6b54d90d60aab77d",
            dataType:'jsonp',
            success:function (res) {
                let arr = res.result.list;
                let str = "";
                arr.forEach(val=>{
                    if(val.pic ==""){
                    str += `<li class="nopic list">
                                    <a href="${val.url}">
                                        <p>${val.title}</p>
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </a>
                                </li>`;
                }else{
                    str += `<li class="list">
                                    <a href="${val.url}">
                                        <div class="left">
                                            <img src="${val.pic}" alt="">
                                        </div>
                                        <div class="right">
                                            <p>${val.title}</p>
                                            <i>${val.time}</i>
                                            <i>${val.src}</i>
                                        </div>
                                    </a>
                                </li>`;
                }
            })
                $('.listBox').html(str);

            }
        })
    }
});