const senderId = document.getElementById('senderId').value;
const messageField = document.getElementById('messageField');
const messageFieldContainer = document.getElementById('messageFieldContainer');

const renderSentMessage = (message) => {
    messageFieldContainer.insertAdjacentHTML('beforebegin', `
    <li class="d-flex justify-content-between mb-4">
        <div class="card w-100">
            <div class="card-header d-flex justify-content-between p-3">
                <p class="fw-bold mb-0">${message.sender.username}</p>
                <p class="text-muted small mb-0"><i class="far fa-clock"></i> ${message.sentAt}</p>
            </div>
            <div class="card-body">
                <p class="mb-0">${message.content}</p>
            </div>
        </div>
        <img src="${message.sender.avatar}" alt="${message.sender.username}'s avatar"
            class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60">
    </li>
    `)
}

const renderReceivedMessage = (message) => {
    messageFieldContainer.insertAdjacentHTML('beforebegin', `
    <li class="d-flex justify-content-between mb-4">
        <img src="${message.sender.avatar}" alt="${message.sender.username}'s avatar"
            class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60">
        <div class="card">
            <div class="card-header d-flex justify-content-between p-3">
                <p class="fw-bold mb-0">${message.sender.username}</p>
                <p class="text-muted small mb-0"><i class="far fa-clock"></i> ${message.sentAt}</p>
            </div>
            <div class="card-body">
                <p class="mb-0">${message.content}</p>
            </div>
        </div>
    </li>
    `)
}

const sendMessage = () => {
    socket.emit('sendMessage', messageField.value, () => messageField.value = '');
}

socket.on('newMessage', (message) => {
    if (String(message.sender._id) === String(senderId)) renderSentMessage(message);
    else renderReceivedMessage(message);
})