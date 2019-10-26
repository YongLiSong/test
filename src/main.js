require("./main.css");
require("./index.html");

var data = [
	{
		name: "苹果",
		danjia: 9
	},
	{
		name: "香蕉",
		danjia: 5
	},
	{
		name: "榴莲",
		danjia: 18
	},
	{
		name: "雪梨",
		danjia: 6
	},
	{
		name: "西瓜",
		danjia: 10
	},
	{
		name: "火龙果",
		danjia: 8
	},
	{
		name: "荔枝",
		danjia: 11
	},
	{
		name: "哈密瓜",
		danjia: 8
	}
];
var divs = document.querySelectorAll("#goods div");
console.log(divs);
for (var i = 0; i < data.length; i++) {
	var text = document.createTextNode(data[i].name);
	divs[i].appendChild(text);
}
// var div1 = document.getElementById("goods");
// for (var i = 0; i < data.length; i++) {
// 	var div2 = document.createElement("div");
// 	//名称
// 	var nodeP = document.createElement("b");
// 	var textNode = document.createTextNode(data[i].name);
// 	nodeP.appendChild(textNode);
// 	div2.appendChild(nodeP);

// 	//单价
// 	var danjia = document.createElement("p");
// 	var danjiaNode = document.createTextNode("单价：" + data[i].danjia);
// 	danjia.appendChild(danjiaNode);
// 	div2.appendChild(danjia);

// 	//数量
// 	var num = document.createElement("p");
// 	var numNode = document.createTextNode("数量：");
// 	num.appendChild(numNode);
// 	div2.appendChild(num);

// 	div1.appendChild(div2);
// }
