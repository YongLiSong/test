require("./main.css");
require("./index.html");

var boxs = document.querySelectorAll(".putincar");
for(var i = 0;i<boxs.length;i++){
    boxs[i].nth = i
    boxs[i].onclick = function(){
        this.classList.add("buyit")
        this.parentNode.className.add("buyit")
    }
}
