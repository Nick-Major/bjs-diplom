"use strict";

const userForm = new UserForm();
userForm.loginFormCallback = data => getData(data);
const olegAuthorization = new ApiConnector.login({login: "oleg@demo.ru", password: "demo"}, response => console.log(response));

userForm.registerFormCallback = data => getData(data);
const nikitaRegistration = new ApiConnector.register({login: "nikita", password: "abcd"}, response => console.log(response));