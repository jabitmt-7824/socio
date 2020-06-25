{
    let createComment = function () {
        let newCommentForm = $("#new-comment-form");
        newCommentForm.submit(function (e) {
            e.preventDefault();

            // method to new post data tp create new post
            $.ajax({
                type: "post",
                url: "/comment/create",
                data: newCommentForm.serialize(),
                success: function (data) {
                    console.log(data);
                    let newComment = newCommentDom(data.data.comment);
                    $(".post-comments-list>ul").prepend(newComment);
                    new Noty({
                        type: "success",
                        layout: 'topRight',
                        theme: 'mint',
                        text: "Comment Published",
                        timeout: 1500
                    }).show();
                    deleteComment($(" .delete-comment-btn", newComment));
                },
                error: function (err) {
                    new Noty({
                        type: "error",
                        layout: 'topRight',
                        theme: 'mint',
                        text: err,
                        timeout: 1500
                    }).show();
                }
            });

        });
    }

    let newCommentDom = function (comment) {
        return $(`<li id="comment-${comment._id}">   
    <p>
        <small><a class="delete-comment-btn" href="/comment/delete/${comment._id}">x</a></small>
        ${comment.comment}
        <br>
        <small>
            ${ comment.user.name}  
        </small>
    </p>
</li> `);
    }

    let deleteComment = function () {
        let deleteLink = $(".delete-comment-btn");
        deleteLink.click(function(e) {
            e.preventDefault();
            console.log("hello");

            $.ajax({
                type: "get",
                url: deleteLink.prop("href"),
                success: function (data) {
                    console.log(data);
                    $(`#comment-${data.data.commentId}`).remove();
                    new Noty({
                        type: "success",
                        layout: 'topRight',
                        theme: 'mint',
                        text: "Comment Deleted",
                        timeout: 1500
                    }).show();
                },
                error: function (err) {
                    new Noty({
                        type: "error",
                        layout: 'topRight',
                        theme: 'mint',
                        text: err,
                        timeout: 1500
                    }).show();
                }
            });
        });
    }

    createComment();
    // deleteComment();

}