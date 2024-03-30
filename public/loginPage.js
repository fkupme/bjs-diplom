"use strict";
const userForm = new UserForm();
userForm.loginFormCallback = data => {
	ApiConnector.login(data, (responce)=>{
		if (!responce.success) {
			return	userForm.setLoginErrorMessage(responce.error);
		} 
		location.reload();
	})
}

userForm.registerFormCallback = data => {
	ApiConnector.register(data, (responce)=>{
		if (!responce.success) {
			return	userForm.setRegisterErrorMessage(responce.error);
		}
		location.reload();
	});
}
