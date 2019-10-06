var randomTags = new Vue({
    el:"#random_tags",
    data:{
        tags:[]
    },
    computed:{
        randomColor: function(){
            return function(){
                var red = Math.random() * 255 + 50;
                var green = Math.random() * 255 + 50;
                var blue = Math.random() * 255 + 50;
                return "rgb(" + red + "," + green + "," + blue + ")"
            }
        },
        randomSize: function(){
            return function (){
                var size = (Math.random() * 20 + 12) +"px";
                return size;
            }
        }
    },
    created: function (){
        // console.log(1212)
        axios({
            method:"get",
            url:"/queryRandomTags"
        }).then(function (resp){
            var result =[];
            for(var i = 0; i < resp.data.data.length; i++){
                result.push({text:resp.data.data[i].tag, link:"/?tag=" + resp.data.data[i].tag});
            }
            randomTags.tags = result;
        });
        
    }
});
var newHot = new Vue({
    el:"#new_hot",
    data:{
        titleList:[]
    },
    created:function(){
        axios({
            method:'get',
            url:"/queryHost"
        }).then(function(result){
            var rep = [];
            for(var i = 0; i < result.data.data.length; i++){
                var temp = {};
                temp.title = result.data.data[i].title;
                temp.link = "/blog_detail.html?bid" + result.data.data[i].id;
                rep.push(temp);
            }
            newHot.titleList = rep;
        })
    }
});
var newComments = new Vue({
    el:"#new_comments",
    data:{
        commentList:[]
    },
    created:function(){
        axios({
            method:'get',
            url:"/getNew"
        }).then(function(result){
            var rep = [];
            for(var i = 0; i < result.data.data.length; i ++){
                var temp = {};
                temp.name = result.data.data[i].user_name;
                temp.date = result.data.data[i].ctime;
                temp.comment = result.data.data[i].commentss;
                rep.push(temp)
            }
            newComments.commentList = rep
            // console.log(result);
        })
    }
})
