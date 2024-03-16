"use strict";
const userForm = new UserForm();
userForm.loginFormCallback = data => {
	ApiConnector.login(data, (responce)=>{
		if (responce.success === true) {
			return	location.reload();
		} else {
			console.error(responce.error);
		}
	})
}

userForm.registerFormCallback = data => {
	ApiConnector.register(data, (responce)=>{
		if (responce.success === true) {
			return	location.reload();
		} else {
			console.error(responce.error);
		}
	});
}
