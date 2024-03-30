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
setInterval(ratesBoard.action, 600);


const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, (responce) => {
		if(!responce.success){
			return	moneyManager.setMessage(responce.success, responce.error)
		}
		ProfileWidget.showProfile(responce.data)
		moneyManager.setMessage(responce.success, 'операция прошла успешно')
	});
};

moneyManager.conversionMoneyCallback = (data) =>{
	ApiConnector.convertMoney(data, (responce)=>{
		if(!responce.success){
			return	moneyManager.setMessage(responce.success, responce.error)
		}
		ProfileWidget.showProfile(responce.data)
		moneyManager.setMessage(responce.success, 'операция прошла успешно');
	})
}

moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (responce)=> {
		if(!responce.success){
			return	moneyManager.setMessage(responce.success, responce.error)
		}
		ProfileWidget.showProfile(responce.data)
		moneyManager.setMessage(responce.success, 'операция прошла успешно');
	})
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
		ApiConnector.addUserToFavorites(data, (responce)=>{
			if(!responce.success){
				return	favoritesWidget.setMessage(responce.success, responce.error);
			}
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(responce.data);
			favoritesWidget.setMessage(responce.success, 'Пользователь добавлен');
		})
	}

	favoritesWidget.removeUserCallback = (data) =>{
		ApiConnector.removeUserFromFavorites(data, (responce)=>{
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(responce.data);
			favoritesWidget.setMessage(responce.success, 'Пользователь удален');
		})
	}