{
    let createPost = function () {
        let newPostForm = $("#new-post-form");
        newPostForm.submit(function (e) {
            e.preventDefault();

            // method to new post data tp create new post
            $.ajax({
                type: "post",
                url: "/post/create",
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    new Noty({
                        type: "success",
                        layout: 'topRight',
                        theme: 'mint',
                        text: "Post Published",
                        timeout: 1500
                    }).show();
                    $("#posts-list-container>ul").prepend(newPost);

                    deletePost($(" .delete-post-btn", newPost));
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

    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
        <p>
            <small><a class="delete-post-btn" href="/post/delete/${post._id}">x</a></small>
            ${ post.post}
            <br>
            <small>
            ${ post.user.name}
            </small>
        </p>
        <div class="post-comments">
                <form action="/comment/create" id="new-comment-form" method="POST">
                    <input type="text" name="content" placeholder="Type Here to add comment..." required>
                    <input type="hidden" name="post" value="<${ post._id}" >
                    <input type="submit" value="Add Comment">
                </form>
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                     
                </ul>
            </div>
        </div>
        
    </li>`);
    }

    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: "get",
                url: $(deleteLink).prop("href"),
                success: function (data) {
                    console.log(data);
                    $(`#post-${data.data.postId}`).remove();
                    new Noty({
                        type: "success",
                        layout: 'topRight',
                        theme: 'mint',
                        text: "Post and associated comments are deleted",
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

    createPost();

}