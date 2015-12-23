function s(v,val) {
	sessionStorage.setItem(v,val);
}
function g(v) {
	sessionStorage.getItem(v);
}
function output_this(str) {
	var output = document.getElementsByClassName('output');
  output[0].innerHTML += str +'<br />';
}

function generate_cradle() {
	config = JSON.parse(this.responseText);
	console.log(config);
	s('config',config);
	// let us begin!
	
	
}
function test() {
	console.log(g('config'));	
}

function start() {
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", generate_cradle);
	oReq.open("GET", '/js/config.mk2.json');
	oReq.send();
}

document.addEventListener("DOMContentLoaded", function(event) { 
  start();

});

