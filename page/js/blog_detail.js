var blog_detail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        content: "",
        ctime: "",
        tags: "",
        views: ""
    },
    computed: {

    },
    created: function () {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1] : "";
        if (searchUrlParams == "") {
            return;
        };
        var bid = -1;

        if (searchUrlParams.split("=")[0] == "bid") {
            try {
                bid = parseInt(searchUrlParams.split("=")[1]);
                // console.log(bid)
            } catch (e) {
                console.log(e);
            }
        }

        // console.log(searchUrlParams)
        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid
        }).then(function (resp) {
            var result = resp.data.data[0];
            blog_detail.title = result.title;
            blog_detail.content = result.content;
            blog_detail.ctime = result.ctime;
            blog_detail.tags = result.tags;
            blog_detail.views = result.views
        }).catch(function (r) {
            console.log(r)
        })

    }
});
var sendComment = new Vue({
    el: "#send_comment",
    data: {
        vcode: "",
        rightCode: ""
    },
    computed: {
        changeCode: function () {
            return function () {
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then(function (resp) {
                    // console.log(resp)
                    sendComment.vcode = resp.data.data.data;
                    sendComment.rightCode = resp.data.data.text;
                })
            }
        },
        sendComment: function () {
            return function () {
                var code = document.getElementById("comment_code").value;
                if (code != this.rightCode) {
                    alert("验证码有无");
                    return
                }
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1] : "";
                if (searchUrlParams == "") {
                    return;
                };
                var bid = -1;

                if (searchUrlParams.split("=")[0] == "bid") {
                    try {
                        bid = parseInt(searchUrlParams.split("=")[1]);
                        // console.log(bid)
                    } catch (e) {
                        console.log(e);
                    }
                }
                var replay_name = document.getElementById("reply_name").value;
                var reply = document.getElementById("reply").value;  //console.log(11)
                var name = document.getElementById("comment_name").value; //console.log(22)
                var email = document.getElementById("comment_email").value;// console.log(33)
                var content = document.getElementById("comment_content").value;// console.log(44)
                // console.log(reply, name, email, conte56nt)
                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName" + replay_name
                }).then(function (resp) {
                    alert(resp.data.msg)
                    location.reload();
                })

            }
        }
    },
    created: function () {
        this.changeCode();
    }
});
var blog_comments = new Vue({

    el: "#blog_comments",
    data: {
        msg: "",
        userArr: []
    },
    computed: {
        replyed: function () {
            return function (commentId, userName) {
                document.getElementById("reply").value = commentId;
                document.getElementById("reply_name").value = userName;
                location.href = "#send_comment"
            }
        }
    },
    created: function () {
        var bid = getbid()
        axios({
            method: "get",
            url: "/queryCommentss?bid=" + bid
        }).then(function (resp) {
            chenggong(resp)
        });
        axios({
            method: "get",
            url: "/queryCountCommentss?bid=" + bid
        }).then(function (resp) {
            // console.log(resp)
            blog_comments.msg =resp.data.data[0].count
        });

    }
})
var getmore = new Vue({
    el: "#more",
    data: {

    },
    computed: {
        getmore: function () {
            return function(){
                var bid = getbid()
            axios({
                method: "get",
                url: "/getmore?bid=" + bid
            }).then(function (resp) {
                chenggong(resp)
            })
            }
        }
    }
})
function getbid() {
    var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1] : "";
    if (searchUrlParams == "") {
        return;
    };
    var bid = -1;

    if (searchUrlParams.split("=")[0] == "bid") {
        try {
            bid = parseInt(searchUrlParams.split("=")[1]);
            // console.log(bid)
        } catch (e) {
            console.log(e);
        }
    }
    return bid
}
function chenggong(resp) {
    blog_comments.userArr = resp.data.data;
    for (var i = 0; i < blog_comments.userArr.length; i++) {
        if (blog_comments.userArr[i].parent > -1) {
            blog_comments.userArr[i].options = "回复@" + blog_comments.userArr[i].parent_name;
        }
    }
}