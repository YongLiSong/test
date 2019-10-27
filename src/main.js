require("./main.css");
require("./index.html");

var btnred = document.querySelector("#box #changecolor .btnred");//红键
var btngreen = document.querySelector("#box #changecolor .btngreen");//绿键
var btnblue = document.querySelector("#box #changecolor .btnblue");//蓝键
var showcolor = document.querySelector("#showcolor");//颜色显示框；

function rgb (a){//创建一个方法，用来改变颜色；
	a.onmousedown = function (evt) {
		var downX = evt.clientX
		var downLeft = this.offsetLeft
		window.onmousemove = function (evt) {
			var pointerX = evt.clientX - downX
			var bL = downLeft + pointerX;
			if (bL < 0) {
				bL = 0
			} else if (bL > 255) {
				bL = 255
			} else {
				//nothing
			}
			a.style.left = bL + "px";
			var rText = bL
			var r = btnred.offsetLeft;
			var g = btngreen.offsetLeft;
			var b = btnblue.offsetLeft;

			showcolor.style.backgroundColor = "rgb(" + r +","+ g +", "+ b +")"
		}
		window.onmouseup = function () {
			window.onmousemove = null;
			window.onmouseup = null;
		}
	}
}

//⬇️哪个按钮被点击，就调用改变颜色的函数；
btnred.onmousedown = function(){
	rgb(this)
}
btngreen.onmousedown = function(){
	rgb(this)
}
btnblue.onmousedown = function(){
	rgb(this)
}

//原本我是想遍历，所有的按键，但是遍历完了，出不来东西，就放弃了..