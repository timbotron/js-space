var ret;
function output_this(str) {
	var output = document.getElementsByClassName('output');
  output[0].innerHTML += str +'<br />';
}

function generate_galaxy() {
	var oReq = new XMLHttpRequest();
	function saveJSON() {
		tmp = JSON.parse(this.responseText);
		console.log(tmp);
	};
	oReq.addEventListener("load", saveJSON);
	oReq.open("GET", '/js/config.mk2.json');
	oReq.send();
}

document.addEventListener("DOMContentLoaded", function(event) { 
  generate_galaxy();

});

