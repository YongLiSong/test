require("./main.css");
require("./index.html");

var btn = document.querySelector("button");
var userReg = /1[3-9]\d{9}/;
var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
var btn = document.querySelector("button");
var userName = document.querySelector(".username");
var passWord = document.querySelector(".password");
var errortext = document.querySelector(".errortext");
var errorpass = document.querySelector(".errorpass")

btn.onclick = function () {
	if (userReg.test(userName.value)) {
		errortext.innerHTML = ""
	}
	if (userReg.test(userName.value) === false || userName.value === "") {
		errortext.innerHTML = "账号不正确"
	}

	if (passReg.test(passWord.value)) {
		errorpass.innerHTML = ""
	}
	if (passReg.test(passWord.value) === false || passWord.value === "") {
		errorpass.innerHTML = "密码不正确"
	}
	if(userReg.test(userName.value)&&passReg.test(passWord.value)){
		return location.href = "https://www.baidu.com"
	}
}

