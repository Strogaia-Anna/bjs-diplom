const exit = new LogoutButton();

exit.action = () => {
    ApiConnector.logout(logoutCb);
}

function logoutCb (data) {
    if (data.success) {
        location.reload();
    }
}

ApiConnector.current(currentCb);

function currentCb (data) {
    if (data.success) {
        ProfileWidget.showProfile(data.data);
    }
}

const rate = new RatesBoard();

ApiConnector.getStocks(getStocksCb);

function getStocksCb (data) {
    if (data.success) {
        rate.clearTable();
        rate.fillTable(data.data);
    }
}

let timerId = setInterval(() => ApiConnector.getStocks(getStocksCb), 60000);

const money = new MoneyManager();

money.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, addMoneyCb);
}

function addMoneyCb (data) {
    if (data.success) {
        ProfileWidget.showProfile(data.data);
    }
    money.setMessage(data.success, data.error || '');
}

money.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, convertCb);
}

function convertCb (data) {
    if (data.success) {
        ProfileWidget.showProfile(data.data);
    }
    money.setMessage(data.success, data.error || '');
}

money.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, sendMoneyCb);
}

function sendMoneyCb (data) {
    if (data.success) {
        ProfileWidget.showProfile(data.data);
    }
    money.setMessage(data.success, data.error || '');
}

const widget = new FavoritesWidget();

ApiConnector.getFavorites(favoritesCb);

function favoritesCb (data) {
    if (data.success) {
        widget.clearTable();
        widget.fillTable(data.data);
        money.updateUsersList(data.data);
    }
}

widget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, addUserCb);
}

function addUserCb (data) {
    if (data.success) {
        widget.clearTable();
        widget.fillTable(data.data);
        money.updateUsersList(data.data);
    }
    widget.setMessage(data.success, data.error || '');
}

widget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, deleteUserCb);
}

function deleteUserCb (data) {
    if (data.success) {
        widget.clearTable();
        widget.fillTable(data.data);
        money.updateUsersList(data.data);
    }
    widget.setMessage(data.success, data.error || '');
}