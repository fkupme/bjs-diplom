"use strict";
const logout = new LogoutButton();
logout.action = () => {
	ApiConnector.logout((responce) => {
		if (responce.success === true) {
			location.reload();
		}
	})
};

ApiConnector.current((responce) => {
	if (responce.success === true) {
		ProfileWidget.showProfile(responce.data)
	}
});


const ratesBoard = new RatesBoard();
ratesBoard.action = () => {
	ApiConnector.getStocks(responce => {
		if(responce.success === true) {
			ratesBoard.clearTable()
			ratesBoard.fillTable(responce.data)
		}
		})
}
ratesBoard.action();
setInterval(ratesBoard.action(), 60000)


const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
	let success = false
	if (!data.amount) {
		moneyManager.setMessage(success, 'Введите сумму')
		return;
	}
	if (!data.currency) {
		moneyManager.setMessage(success, 'Введите валюту')
		return;
	}

	ApiConnector.addMoney(data, ()=>{
		ProfileWidget.showProfile(data);
		success = true;
		moneyManager.setMessage(success, 'Средства зачислены');
	});
	setTimeout(() => location.reload(), 3000) // костыль! а как сделать? без этого id и имя становятся undefined
};

moneyManager.conversionMoneyCallback = (data) =>{
	let success = false;
	if (!data.fromAmount) {
		moneyManager.setMessage(success, 'Введите сумму')
		return;
	}
	if (!data.fromCurrency) {
		moneyManager.setMessage(success, 'Введите текущую валюту')
		return;
	}
	if (!data.targetCurrency) {
		moneyManager.setMessage(success, 'Введите желаемую валюту')
		return;
	}
	ApiConnector.convertMoney(data, ()=>{
		ProfileWidget.showProfile(data)
		success = true;
		moneyManager.setMessage(success, 'операция прошла успешно');
	})
	setTimeout(() => location.reload(), 3000)
}

moneyManager.sendMoneyCallback = (data) => {
	let success = false;

	if (!data.amount) {
		moneyManager.setMessage(success, 'Введите сумму')
		return;
	}
	if (!data.currency) {
		moneyManager.setMessage(success, 'Введите валюту')
		return;
	}
	if (!data.to) {
		moneyManager.setMessage(success, 'Введите получателя')
		return;
	}
	ApiConnector.transferMoney(data, ()=> {
		ProfileWidget.showProfile(data)
		success = true;
		moneyManager.setMessage(success, 'операция прошла успешно');
	})
	setTimeout(() => location.reload(), 3000)
}


const favoritesWidget = new FavoritesWidget();
	
	ApiConnector.getFavorites((responce)=> {
		if(responce.success){
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(responce.data);
			moneyManager.updateUsersList(responce.data);
		}
	})
	favoritesWidget.addUserCallback = (data) =>{
		let success = false;
		if (!data.id) {
			favoritesWidget.setMessage(success, 'Введите ID')
			return;
		}
		if (!data.name) {
			favoritesWidget.setMessage(success, 'Введите имя пользователя')
			return;
		}
		ApiConnector.addUserToFavorites(data, ()=>{
			success = true;
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(data);
			favoritesWidget.setMessage(success, 'Пользователь добавлен');
		})
	}

	favoritesWidget.removeUserCallback = (data) =>{
		let success = false;
		ApiConnector.removeUserFromFavorites(data, ()=>{
			console.log(data)
			success = true;
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(data);
			favoritesWidget.setMessage(success, 'Пользователь удален');
		})
	}