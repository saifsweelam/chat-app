const optionsContainer = document.getElementById('options');
const currentUserId = document.getElementById('userIdInput').value;

const addFriend = () => {
    socket.emit('addFriend', currentUserId);
}

const cancelFriendRequest = () => {
    socket.emit('cancelFriendRequest', currentUserId);
}

socket.on('sentFriendRequest', userId => {
    if (String(userId) === String(currentUserId)) {
        optionsContainer.innerHTML = '<button type="button" onclick="cancelFriendRequest();" class="btn btn-danger">Cancel Request</button>';
        alertSuccess('Request sent successfully');
    }
})

socket.on('cancelledFriendRequest', userId => {
    if (String(userId) === String(currentUserId)) {
        optionsContainer.innerHTML = '<button type="button" onclick="addFriend();" class="btn btn-primary">Add Friend</button>';
    }
})

socket.on('receivedFriendRequest', (userId) => {
    if (String(userId) === String(currentUserId)) {
        optionsContainer.innerHTML = 
        `<button type="submit" formaction="/friends/accept" class="btn btn-primary">Accept</button>
        <button type="submit" formaction="/friends/decline" class="btn btn-danger">Decline</button>`;
    }
})