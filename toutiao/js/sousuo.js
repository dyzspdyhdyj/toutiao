$(function () {
//    返回按钮点击事件
    $('header span').click(function () {
        history.back();
    });
    //保存搜索记录
    let search='';
    if(localStorage.history){
        search=localStorage.history;
    }
    let arr=search.split(',');
    // console.log(arr)
    let str='';
    //截取五条记录，遍历放到span标签中，每遍历一次就会有一条记录，所以要拼接
    arr.splice(-5).forEach(val=>{
        str+=`<span>${val}</span>`;
    });
    $('section').html(str);
    //索索框失去焦点事件
    $('header input').blur(function () {
        if($(this).val()==''){
            return;
        }
        search+=','+$(this).val();    /*之前的搜索记录拼接现在的记录*/
        localStorage.history=search;    /*把搜索记录保存到本地*/
        $.ajax({
            url:'https://api.jisuapi.com/news/search?keyword='+$(this).val()+'&appkey=2b36cf368ec87b81',
            dataType:'JSONP',
            success:function (res) {
                // console.log(res)
                //隐藏搜索记录框
                $('section span').hide();
                //判断条件，如果历史纪录中有搜索的内容，就不保存
                // if()
                let brr=res.result.list;
                let str='';
                brr.forEach(function(val){
                    if(val.pic==''){    /*如果没图片的时候，布局*/
                        str+=`
                                <li class="list nopic">
                                    <a href="">
                                        <div>${val.title}</div>
                                        <span>${val.time}</span>
                                    </a>
                                </li>
                            `;
                    }else{       /*有图片的时候*/
                        str+=`
                        <li class="list">
                            <a href="">
                                <div class="left">
                                    <img src="${val.pic}" alt="">
                                </div>
                                <div class="right">${val.title}
                                    <span>${val.time}</span>
                                </div>
                            </a>
                        </li>  
                            `;
                    }
                });
                $('.content').html(str);
            }
        })
    })





})