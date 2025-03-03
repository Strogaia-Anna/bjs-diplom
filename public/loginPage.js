"use strict";

const userForm = new UserForm();
userForm.loginFormCallback = data => {
    ApiConnector.login(data, loginCb);
};

function loginCb (data) {
    if (data.success) {
        location.reload();
    } else {
        userForm.setLoginErrorMessage(data.error);
    }
}

userForm.registerFormCallback = data => {
    ApiConnector.register(data, registerCb);
}

function registerCb (data) {
    if (data.success) {
        location.reload();
    } else {
        userForm.setRegisterErrorMessage(data.error);
    }
}