var blogList = new Vue({
    el:"#blog_list",
    data:{
        list:[]
    },
    computed:{

    },
    created: function(){
        axios({
            method:"get",
            url:"/getAllBlog"
        }).then(function(resp){
            for(var i = 0; i < resp.data.data.length; i++){
                resp.data.data[i].link = "/blog_detail.html?bid=" + resp.data.data[i].id;
            }
        
            blogList.list = resp.data.data;
        })
    }
}) 