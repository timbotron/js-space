function s(v,val) {
	sessionStorage.setItem(v,val);
}
function g(v) {
	var ret = sessionStorage.getItem(v);
	return ret;
}

function randBetween(min, max) {
	var ret = Math.random() * (max - min) + min;
	if(arguments.length > 2) {
		return ret;
	} else {
	  return parseInt(ret);
	}
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
			'y':randBetween(0,ss),
			'sd':null
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

function gen_mainseq_map() {
	// we are going to generate all of the startypes
	// Data: https://en.wikipedia.org/wiki/Stellar_classification#Harvard_spectral_classification

	var r = new Array(6);

	r[0] = {cls: "B",
				type:"main sequence",
				min_t: 100,
				max_t: 300,
				color: "deep blue white",
				min_m: 2.1,
				max_m: 16,
				min_r: 1.8,
				max_r: 6.6,
				min_l: 25,
				max_l: 30000};
	r[1] = {cls: "A",
				type:"main sequence",
				min_t: 75,
				max_t: 100,
				color: "blue white",
				min_m: 1.4,
				max_m: 2.1,
				min_r: 1.4,
				max_r: 1.8,
				min_l: 5,
				max_l: 25};
	r[2] = {cls: "F",
				type:"main sequence",
				min_t: 60,
				max_t: 75,
				color: "white",
				min_m: 1.04,
				max_m: 1.4,
				min_r: 1.15,
				max_r: 1.4,
				min_l: 1.5,
				max_l: 5};
	r[3] = {cls: "G",
				type:"main sequence",
				min_t: 52,
				max_t: 60,
				color: "yellowish white",
				min_m: 0.8,
				max_m: 1.04,
				min_r: 0.96,
				max_r: 1.15,
				min_l: 0.6,
				max_l: 1.5};
	r[4] = {cls: "K",
				type:"main sequence",
				min_t: 37,
				max_t: 52,
				color: "pale yellow orange",
				min_m: 0.45,
				max_m: 0.8,
				min_r: 0.7,
				max_r: 0.96,
				min_l: 0.08,
				max_l: 0.6};
	r[5] = {cls: "M",
				type:"main sequence",
				min_t: 24,
				max_t: 37,
				color: "light orange red",
				min_m: 0.08,
				max_m: 0.45,
				min_r: 0.01,
				max_r: 0.7,
				min_l: 0.001,
				max_l: 0.08};
	return r;
}

function gen_other_map() {
	// These are white dwarf or Red Giants

	var r = new Array(2);

	r[0] = {cls: "F",
				type:"white dwarf",
				min_t: 4,
				max_t: 150,
				color: "dim white",
				min_m: 0.5,
				max_m: 0.7,
				min_r: 0.008,
				max_r: 0.02,
				min_l: 0.1,
				max_l: 0.001};
	r[1] = {cls: "K",
				type:"giant",
				min_t: 30,
				max_t: 45,
				color: "red",
				min_m: 0.3,
				max_m: 8,
				min_r: 10,
				max_r: 100,
				min_l: 100,
				max_l: 400};
	
	return r;
}

function genName()
{
    var text = "";
    var let = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var num = "0123456789";

    for(i=0;i < 4;i++) {
        text += let.charAt(Math.floor(Math.random() * let.length));
    }
    text += '-';
    for(i=0;i < 4;i++) {
        text += num.charAt(Math.floor(Math.random() * num.length));
    }

    return text;
}

function getStar() {
	// first, is this main sequence or not?
	var r = randBetween(0,10);
	var i;

	if(r >= 1) {
		var m = gen_mainseq_map();

		r = randBetween(0,10000);

		if(r <= 13) {
			i = 0;
		} else if(r <= 60) {
			i = 1;
		} else if(r <= 300) {
			i = 2;
		} else if(r <= 760) {
			i = 3;
		} else if(r <= 1210) {
			i = 4;
		} else {
			i = 5;
		}
	} else {
		var m = gen_other_map();

		r = randBetween(0,10);

		if(r <= 9) {
			i = 0;
		} else {
			i = 1;
		}
	}

	
	var ret = {};
	var tmp;
	var fraction;
	// effective temperature
	tmp = randBetween(m[i].min_t,m[i].max_t);
	fraction = tmp / m[i].max_t;
	ret.t = tmp * 100;
	ret.type = m[i].type;
	ret.cls = m[i].cls;
	ret.c = m[i].color;
	tmp = m[i].max_m * fraction;
	ret.m = tmp.toFixed(2);
	tmp = m[i].max_r * fraction;
	ret.r = tmp.toFixed(2);
	tmp = m[i].max_l * fraction;
	ret.l = tmp.toFixed(3);
	ret.name = genName();
	
	return ret;

}

function birth() {
	var start = Date.now();
	output_this("Beginning galaxy generation..");
	var c = get_config();

	// https://github.com/davidbau/seedrandom
	Math.seedrandom('10.16.2010');
	var star_count = 0;

	
	// var tmp = JSON.stringify(scratch);

	var sectors = {};
	for(sector_x = -c.cradle_size;sector_x <= c.cradle_size; sector_x++) {
		for(sector_y = -c.cradle_size;sector_y <= c.cradle_size; sector_y++) {
			// Generating a sector!

			// First we create a blank sector, which we will be saving to the sector
			// array when we're done.
			var scratch = matrix(c.sector_size,c.sector_size);
			//output_this("Generating Sector ("+sector_x+","+sector_y+")");

			var ns = randBetween(c.min_stars_per_sector,c.max_stars_per_sector);
			sectors[sector_x+":"+sector_y] = [];
			for(aa = 0; aa < ns; aa++) {
				// generating stars
				var star = genPin(scratch,c.sector_size,c.min_star_distance);
				star.sd = getStar();
				star_count++;
				//output_this("Star! ("+star.x+","+star.y+")");
				sectors[sector_x+":"+sector_y].push(star);


			}
		}
	}
	//console.log(sectors);

	
	var end = Date.now();
	output_this("Saving galaxy..");
	s('sectors',JSON.stringify(sectors));
	output_this(star_count+" stars generated..");
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

