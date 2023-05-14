const alertsContainer = document.getElementById('alerts');

const alertError = (msg) => {
    alertsContainer.innerHTML = `<div class="alert alert-danger">${msg}</div>`;
}
const alertWarning = (msg) => {
    alertsContainer.innerHTML = `<div class="alert alert-warning">${msg}</div>`;
}
const alertSuccess = (msg) => {
    alertsContainer.innerHTML = `<div class="alert alert-success">${msg}</div>`;
}