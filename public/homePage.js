'use strict';


const logoutButton = new LogoutButton();


logoutButton.action = () => {
	ApiConnector.logout(response => {
		if (response.success) {
			location.reload();
		} else {
			alert('Что-то пошло не так, перезагрузите страницу');
		}
	});
};


const currentUserProfile = ApiConnector.current(response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
});


const ratesBoard = new RatesBoard();


const exchangeRates = () => {
	ApiConnector.getStocks(response => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	});
};


exchangeRates();
setInterval(exchangeRates, 60000);


const moneyManager = new MoneyManager();


moneyManager.addMoneyCallback = data => {
	ApiConnector.addMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, 'Выполнено успешно');
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
};


moneyManager.conversionMoneyCallback = data => {
	ApiConnector.convertMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, 'Выполнено успешно');
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
};


moneyManager.sendMoneyCallback = data => {
	ApiConnector.transferMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, 'Выполнено успешно');
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
};


const favoritesWidget = new FavoritesWidget();


ApiConnector.getFavorites(response => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
});


favoritesWidget.addUserCallback = data => {
	ApiConnector.addUserToFavorites(data, response => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(response.success, 'Выполнено успешно');
		} else {
			favoritesWidget.setMessage(response.success, response.error);
		}
	});
};


favoritesWidget.removeUserCallback = data => {
	ApiConnector.removeUserFromFavorites(data, response => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(response.success, 'Выполнено успешно');
		} else {
			favoritesWidget.setMessage(response.success, response.error);
		}
	});
};