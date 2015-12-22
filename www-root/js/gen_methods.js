var ret;
function output_this(str) {
	var output = document.getElementsByClassName('output');
  output[0].innerHTML += str +'<br />';
}

function open_local_json(path) {
	var oReq = new XMLHttpRequest();
	function saveJSON() {
		tmp = JSON.parse(this.responseText);
		console.log(tmp);
	};
	oReq.addEventListener("load", saveJSON);
	oReq.open("GET", path);
	oReq.send();
}

document.addEventListener("DOMContentLoaded", function(event) { 
  open_local_json('/js/config.mk2.json');

});

