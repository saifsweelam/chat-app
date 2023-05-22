const onlineFriendsContainer = document.getElementById('onlineFriendsContainer');

socket.on('friendOnline', user => {
    let noOnlineFriends = document.getElementById('noOnlineFriends');
    noOnlineFriends && noOnlineFriends.remove();

    onlineFriendsContainer.insertAdjacentHTML('beforeend', `
    <div id="friend${String(user.userId)}" class="col-xl-3 col-sm-6 mb-5">
        <div class="bg-white rounded shadow-sm py-5 px-4">
            <img src="${user.avatar}" alt="${user.username}'s avatar" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
            <h5 class="mb-0"><a href="/profile/${String(user.userId)}">${user.username}</a></h5>
            <a href="/chat/${String(user.chat)}" class="btn btn-success my-2">Chat</a>
        </div>
    </div>
    `);
})

socket.on('friendOffline', userId => {
    let friendNode = document.getElementById(`friend${userId}`);
    friendNode && friendNode.remove();
})