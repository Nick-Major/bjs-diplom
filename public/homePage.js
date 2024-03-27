const exitBtn = new LogoutButton();
exitBtn.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
}

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const currencyRates = new RatesBoard();

function getCurrencyRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            currencyRates.clearTable();
            currencyRates.fillTable(response.data);
        }
    })
}

getCurrencyRates();

const intervalId = setInterval(getCurrencyRates, 60000);

const moneyWork = new MoneyManager();
moneyWork.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }

        moneyWork.setMessage(response.success, response.success ? "Баланс пополнен успешно" : response.error);
    })
}

moneyWork.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }

        moneyWork.setMessage(response.success, response.success ? "Операция выполнена успешно" : response.error);
    })
}

moneyWork.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }

        moneyWork.setMessage(response.success, response.success ? "Перевод выполнен успешно" : response.error);
    })
}

const favorites = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        moneyWork.updateUsersList(response.data);
    }
})

favorites.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            moneyWork.updateUsersList(response.data);
        }

        moneyWork.setMessage(response.success, response.success ? "Пользователь успешно добавлен" : response.error);
    })
}

favorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            moneyWork.updateUsersList(response.data);
        }

        moneyWork.setMessage(response.success, response.success ? "Пользователь удален" : response.error);
    })
}