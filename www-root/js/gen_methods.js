function output_this(str) {
	var output = document.getElementsByClassName('output');
  output[0].innerHTML += str +'<br />';
}

function open_json(path) {
	var request = new XMLHttpRequest();
	console.log(path);
	request.open("GET", path, false);
	console.log(request);
	return JSON.parse(request.responseText);
}

var config = open_json('/js/config.mk2.json');

console.log(config.result);