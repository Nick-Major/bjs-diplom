const exitBtn = new LogoutButton();
exitBtn.action = () => {
    ApiConnector.logout(response => {
        if (response.success === true) {
            location.reload();
        }

        console.log(response);
    });
}

ApiConnector.current(response => {
    console.log(response);
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
});

const currencyRates = new RatesBoard();
//Напишите интервал, который будет многократно выполняться (раз в минуту) и вызывать вашу функцию с получением валют.
ApiConnector.getStocks(response => {
    console.log(response);
    if (response.success === true) {
        currencyRates.clearTable();
        currencyRates.fillTable(response.data);
    }
})

//Также выведите сообщение об успехе или *ошибку* (причину неудачного действия) пополнении баланса в окне отображения сообщения (`setMessage`).
const moneyWork = new MoneyManager();
moneyWork.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        console.log(response);
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
        }

        this.setMessage(isSuccess, message);
    })
}

//Также выведите сообщение об успехе или *ошибку* (причину неудачного действия) пополнении баланса в окне отображения сообщения (`setMessage`).
moneyWork.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        console.log(response);
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
        }

        this.setMessage(isSuccess, message);
    })
}

//Также выведите сообщение об успехе или *ошибку* (причину неудачного действия) пополнении баланса в окне отображения сообщения (`setMessage`).
moneyWork.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        console.log(response);
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
        }

        this.setMessage(isSuccess, message);
    })
}

const favorites = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    console.log(response);
    if (response.success === true) {
        favorites.clearTable();
        favorites.fillTable(response.data);
        moneyWork.updateUsersList(response.data);
    }
})

favorites.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        console.log(response);
        if (response.success === true) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            moneyWork.updateUsersList(response.data);
        }
    })
}

favorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        console.log(response);
        if (response.success === true) {
            favorites.clearTable();
            favorites.fillTable(response.data);
            moneyWork.updateUsersList(response.data);
        }
    })
}