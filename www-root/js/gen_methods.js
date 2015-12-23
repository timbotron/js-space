function s(v,val) {
	sessionStorage.setItem(v,val);
}
function g(v) {
	var ret = sessionStorage.getItem(v);
	return ret;
}

function randBetween(min, max) {
	var ret = Math.random() * (max - min) + min;
  return parseInt(ret);
}

function output_this(str) {
	var output = document.getElementsByClassName('output');
  output[0].innerHTML += str +'<br />';
}

function matrix(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = matrix.apply(this, args);
    }

    return arr;
}

function get_config() {
	var tmp = g('config');
	return JSON.parse(tmp);
}

function genPin(scratch,ss,md) {
	//Generate a pin
	var pin = {
			'x':randBetween(0,ss),
			'y':randBetween(0,ss)
			};
	// Get range (beginning, terminating) to check for neighbors
	var bx = pin.x - md
	if(bx < 0) {
		bx = 0;
	}
	var tx = pin.x + md
	if(tx > ss) {
		tx = ss;
	}
	var by = pin.y - md
	if(by < 0) {
		by = 0;
	}
	var ty = pin.y + md
	if(ty > ss) {
		ty = ss;
	}

	for(xx = bx; xx < tx; xx++) {
		for(yy = by; yy < ty; yy++) {
			if(scratch[xx][yy] === 1) {
				return genPin(scratch,ss,md);
			}
		}
	}

	return pin;
}

function birth() {
	var start = Date.now();
	output_this("Beginning galaxy generation..");
	var c = get_config();

	// https://github.com/davidbau/seedrandom
	Math.seedrandom('10.16.2010');

	
	// var tmp = JSON.stringify(scratch);

	var sectors = {};
	for(sector_x = -c.cradle_size;sector_x <= c.cradle_size; sector_x++) {
		for(sector_y = -c.cradle_size;sector_y <= c.cradle_size; sector_y++) {
			// Generating a sector!

			// First we create a blank sector, which we will be saving to the sector
			// array when we're done.
			var scratch = matrix(c.sector_size,c.sector_size);
			output_this("Generating Sector ("+sector_x+","+sector_y+")");

			var ns = randBetween(c.min_stars_per_sector,c.max_stars_per_sector);
			sectors[sector_x+":"+sector_y] = [];
			for(aa = 0; aa < ns; aa++) {
				// generating stars
				var star = genPin(scratch,c.sector_size,c.min_star_distance);
				output_this("Star! ("+star.x+","+star.y+")");
				sectors[sector_x+":"+sector_y].push(star);


			}
		}
	}
	//console.log(sectors);

	
	var end = Date.now();
	output_this("Saving galaxy..");
	s('sectors',JSON.stringify(sectors));
	output_this("Time elapsed: "+(end - start)+" ms");
}

function start() {
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", function(event) {
		output_this("Successfully stored config file");
		s('config',this.responseText);
	});
	oReq.open("GET", '/js/config.mk2.json');
	oReq.send();
}

document.addEventListener("DOMContentLoaded", function(event) { 
  	start();

	var btn = document.getElementById("build");
	btn.addEventListener("click",birth,false);

});

