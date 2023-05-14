const receivedRequestsList = document.getElementById('receivedRequestsList');
const requestsCountNode = document.getElementById('requestsCount');

let socket = io();

socket.on('connect', () => {
    console.log('User Connected');
})

socket.on('error', msg => alertError(msg))

socket.on('receivedFriendRequest', (userId, userName) => {
    let noRequestsMsg = receivedRequestsList.querySelector('#noRequests');
    noRequestsMsg && noRequestsMsg.remove();
    receivedRequestsList.insertAdjacentHTML('beforeend', `<li id="request${userId}"><a class="dropdown-item" href="/profile/${userId}">${userName}</a></li>`);
    requestsCountNode.innerText = parseInt(requestsCountNode.innerText) + 1;
})

socket.on('cancelledFriendRequest', userId => {
    let user = receivedRequestsList.querySelector(`#request${userId}`);
    if (user) {
        user.remove();
        requestsCountNode.innerText = parseInt(requestsCountNode.innerText) - 1;
    }
})