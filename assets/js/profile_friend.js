{
    let freindship = function () {
        let friendButton = $("#friend-btn");

        friendButton.click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: friendButton.attr("href"),
                success: function (data) {
                    let friendStatus = data.data.deleted;
                    if (friendStatus) {
                        friendButton.html("Add Friend");
                    }
                    else {
                        friendButton.html("Unfriend");
                    }
                },
                error: function () {
                    console.log('error in completing the request');
                }
            });
        });
    }

    freindship();
}