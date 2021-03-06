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

function getPos(el) {
    for (var lx=0, ly=0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly};
}

function output_this(str) {
	var output = document.getElementsByClassName('output');
  output[0].innerHTML += str +'<br />';
  output[0].scrollTop = output[0].scrollHeight;
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
	var bx, tx, by, ty, xx, yy = 0;
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

	r[0] = {cls: "D",
				type:"white dwarf",
				min_t: 4,
				max_t: 150,
				color: "dim white",
				min_m: 0.5,
				max_m: 0.7,
				min_r: 0.008,
				max_r: 0.02,
				min_l: 0.001,
				max_l: 0.1};
	r[1] = {cls: "Gi",
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
	var color;

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
	ret.cssClass = "startype-" + ret.cls;
	ret.color = m[i].color;
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

	Math.seedrandom(g('galaxy_seed'));
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
				scratch[star.x][star.y] = 1;
				star_count++;
				sectors[sector_x+":"+sector_y].push(star);


			}
		}
	}
	
	var end = Date.now();
	output_this("Saving galaxy..");
	s('sectors',JSON.stringify(sectors));
	output_this(star_count+" stars generated..");
	output_this("Time elapsed: "+(end - start)+" ms");

	// is the screen so small we need to crop height?
	// var main = document.getElementById("main");
	var grid = document.getElementsByClassName("grid");
	grid = grid[0];
	var g_pos = getPos(grid);
	var b_height = window.innerHeight || document.body.clientHeight;
	var b_width = window.innerWidth || document.body.clientWidth;

	// we need the smallest of 550, b_width or b_height
	var base_line = 450;
	if(base_line > b_width) {
		base_line = b_width;
	}
	if(base_line > b_height) {
		base_line = b_height;
	}
	
	base_line -= (g_pos.y + 6); // where 6 is a buffer
	// main.style.minHeight = b_height + "px";
	// var g_width = grid.offsetWidth;
	// if(b_height < b_width) {
	// 	grid.style.width = b_height + "px";
	// 	g_width = b_height - 10;
	// } else {
	// 	grid.style.width = b_width + "px";
	// 	g_width = b_height - 10;
	// }

	s('cube_height',base_line);

	grid.style.height = base_line + "px";
	grid.style.width = base_line + "px";
	grid.parentNode.parentNode.style.width = base_line + "px";

	// now lets start with output!!
	move(0,0,38);
}

function move(x,y,dir) {
	// we read in config
	var c = g('sectors');
	c = JSON.parse(c);

	var config = g('config');
	config = JSON.parse(config);

	// Are we moving to an unknown region?
	var sec = x+":"+y;
	if(c[sec] === undefined && config.is_infinite === false) {
		// give feedback that you cant go that way
		if(dir === 38) {
			barrier('borderTop');
		} else if(dir === 40) {
			barrier('borderBottom');
		} else if(dir === 39) {
			barrier('borderRight');
		} else {
			barrier('borderLeft');
		}
		return false;
	}

	// Lets remove any selected star box thing
	var selected_stars = document.getElementsByClassName("selected-star");
	while(selected_stars.length > 0){
        selected_stars[0].parentNode.removeChild(selected_stars[0]);
    }
	
	var grid = document.getElementsByClassName("grid");
	grid = grid[0];

	// update labels
	var lbl = document.getElementById("sec-00");
	lbl.innerHTML = "("+x+","+y+")";

	// remove current stars
	var stars = document.getElementsByClassName("star");
	while(stars.length > 0){
        stars[0].parentNode.removeChild(stars[0]);
    }
    var bg_star = document.getElementsByClassName("bg-star");
	while(bg_star.length > 0){
        bg_star[0].parentNode.removeChild(bg_star[0]);
    }
	var offset, top_off, left_off;
	
	// only one sector
	offset = (100 / parseInt(config.sector_size));
	top_off = 100;
	left_off = 0;

	

	// draw bottom left
	draw_sector(x,y,c,offset,top_off,left_off,grid,config.sector_size);

	// now we add listeners
	stars = document.getElementsByClassName("star");

	for(i = 0;i < stars.length; i++) {
		stars[i].addEventListener("click",star_info,false);
	}

	grid.dataset.cursec = x+":"+y;
}

function draw_sector(x,y,c,offset,top_off,left_off,grid,sector_size) {
	var sec = x+":"+y;
	// Draw real stars
	for(i = 0;i < c[sec].length;i++) {
		var star = document.createElement('a');
		star.href = "javascript:;";
		star.title = c[sec][i].sd.name;
		star.className = "star "+c[sec][i].sd.cssClass;
		star.dataset.id = sec+"."+i;
		star.style.top = String(top_off - (c[sec][i].y * offset)) + "%";
		star.style.left = String((c[sec][i].x * offset) + left_off) + "%";
		grid.appendChild(star);
	}
	// Now draw background stars
	var secSeed = sec + g('galaxy_seed');
	Math.seedrandom(secSeed);
	var num_background_stars = randBetween(70,90);
	var limit = g('cube_height');
	for(var i = 0;i < num_background_stars; i++) {
		var back_star = document.createElement('div');
		var x = randBetween(0,limit);
		var y = randBetween(0,limit);
		var l = randBetween(0,3);
		back_star.className = "bg-star bg-star-" + String(l);
		back_star.style.top = String(y) + "px";
		back_star.style.left = String(x) + "px";
		grid.appendChild(back_star);

	}

}

function barrier(target) {
	var color = 'red';
	var grid = document.getElementsByClassName("grid");
	grid = grid[0];
	grid = grid.parentElement;
	grid.style[target] = '3px solid '+color;
	window.setTimeout(function() {
		grid.style[target] = '3px solid #F0F8FF';
	},100);
	// window.setTimeout(function() {
	// 	grid.style[target] = '6px solid '+color;
	// 	window.setTimeout(function() {
	// 		grid.style[target] = '3px solid '+color;
	// 		window.setTimeout(function() {
	// 			grid.style[target] = '1px solid '+color;
	// 			window.setTimeout(function() {
	// 				grid.style[target] = 'none';
	// 			},100);
	// 		},100);
	// 	},100);
	// },100);
}

function checkKey(e) {

    e = e || window.event;

    if(e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39' || e.keyCode == '40') {
    	var grid = document.getElementsByClassName("grid");
		grid = grid[0];
		var sec = grid.dataset.cursec;
		sec = sec.split(":");
		sec[0] = parseInt(sec[0]);
		sec[1] = parseInt(sec[1]);
		e.preventDefault();
    }

    if (e.keyCode == '38') {
        // up arrow
        move(sec[0],(sec[1]+1),38);
    }
    else if (e.keyCode == '40') {
        // down arrow
        move(sec[0],(sec[1]-1),40);
    }
    else if (e.keyCode == '37') {
       // left arrow
       move((sec[0]-1),sec[1],37);
    }
    else if (e.keyCode == '39') {
       // right arrow
       move((sec[0]+1),sec[1],39);
    }


}

function fetchTemplate(name,id,label) {
	var tpl = document.getElementById(name);
	var ret;
	ret = tpl.innerHTML;
	ret = ret.replace(/{id}/i, id);
	ret = ret.replace(/{label}/i, label);
	return ret;
}

function clearStarInfo() {
	// clear the box
	var content_area = document.getElementsByClassName('infoContent');
	content_area = content_area[0];
	content_area.innerHTML = '';

	// clear the highlight
	var selected_star = document.getElementsByClassName("selected-star");
	if(selected_star.length > 0) {
	    selected_star[0].parentNode.removeChild(selected_star[0]);
	}

}

function addHighlight(top,left,width,height) {
	var adjuster = 1.5;
	var high = document.createElement('div');
	top = parseFloat(top.replace("%","")) - adjuster;
	high.style.top = String(top) + "%";
	left = parseFloat(left.replace("%","")) - adjuster;
	high.style.left = String(left) + "%";
	high.className = "selected-star";

	// we need to alter the position a bit


	var grid = document.getElementsByClassName("grid");
	grid = grid[0];
	grid.appendChild(high);

}

function star_info() {
	var info = this.dataset.id.split('.');
	var sec = info[0];
	var i = info[1];

	// we read in config
	var c = g('sectors');
	c = JSON.parse(c);

	// first we clear out the detail window
	clearStarInfo();

	// Then we add the highlight for that star
	addHighlight(this.style.top,this.style.left);

	var info_data = "\t<dl>\n";
	info_data += "\t\t<dt>Name:</dt><dd>"+c[sec][i].sd.name + "</dd>\n";
	info_data += "\t\t<dt>Coordinates:</dt><dd>S(" + sec + ") (" + c[sec][i].x +" ," + c[sec][i].y+")</dd>\n";
	info_data += "\t\t<dt>Class:</dt><dd>" + c[sec][i].sd.cls + "</dd>\n";
	info_data += "\t\t<dt>Type:</dt><dd>"+c[sec][i].sd.color + " " + c[sec][i].sd.type + "</dd>\n";
	info_data += "\t\t<dt>Temp:</dt><dd>"+c[sec][i].sd.t + " K</dd>\n";
	info_data += "\t\t<dt>Solar Mass:</dt><dd>"+c[sec][i].sd.m + " M</dd>\n";
	info_data += "\t\t<dt>Solar Radii:</dt><dd>"+c[sec][i].sd.r + " R</dd>\n";
	info_data += "\t\t<dt>Lumeniscence:</dt><dd>"+c[sec][i].sd.l + " l</dd>\n";
	info_data += "\t</dl>\n";
	var content_area = document.getElementsByClassName('infoContent');
	content_area = content_area[0];
	content_area.innerHTML = info_data;



	
	// output_this("==========================================");
	// output_this("Name: "+c[sec][i].sd.name);
	// output_this("Coordinates: S("+sec+") ("+c[sec][i].x+","+c[sec][i].y+")");
	// output_this("Class: "+c[sec][i].sd.cls);
	// output_this("Type: "+c[sec][i].sd.color + " " + c[sec][i].sd.type);
	// output_this("Temp: "+c[sec][i].sd.t + " K");
	// output_this("Solar Mass: "+c[sec][i].sd.m + " M");
	// output_this("Solar Radii: "+c[sec][i].sd.r + " R");
	// output_this("Lumeniscence: "+c[sec][i].sd.l + " l");
}

function start() {
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", function(event) {
		output_this("Successfully stored config file");
		s('config',this.responseText);
		birth();
	});
	oReq.open("GET", 'js/config.json');
	oReq.send();
}

function paintLabelEnds() {
	var lefts = document.getElementsByClassName('ll-end');
	var rights = document.getElementsByClassName('rl-end');

	for(var i = 0;i < lefts.length;i++) {
		var ctx = lefts[i].getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = ' #F0F8FF';
		ctx.moveTo(0,15);
		ctx.lineTo(15,0);
		ctx.lineTo(50,0);
		ctx.lineTo(50,15);
		ctx.fill();
	}
	for(var i = 0;i < rights.length;i++) {
		var ctx = rights[i].getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = ' #F0F8FF';
		ctx.moveTo(0,0);
		ctx.lineTo(35,0);
		ctx.lineTo(50,15);
		ctx.lineTo(0,15);
		ctx.fill();
	}
}

function __triggerKeyboardEvent(el, keyCode)
{
    var eventObj = document.createEventObject ?
        document.createEventObject() : document.createEvent("Events");
  
    if(eventObj.initEvent){
      eventObj.initEvent("keydown", true, true);
    }
  
    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;
    
    el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj); 
  
} 

function paintArrows() {
	var left = document.getElementById("arrow-left");
	var right = document.getElementById("arrow-right");
	var up = document.getElementById("arrow-up");
	var down = document.getElementById("arrow-down");

	var ctx = up.getContext('2d');
	ctx.beginPath();
	ctx.strokeStyle = ' #F0F8FF';
	ctx.lineWidth = 4;
	ctx.moveTo(5,20);
	ctx.lineTo(23,5);
	ctx.lineTo(41,20);
	ctx.moveTo(23,5);
	ctx.lineTo(23,41);
	ctx.stroke();

	ctx = down.getContext('2d');
	ctx.beginPath();
	ctx.strokeStyle = ' #F0F8FF';
	ctx.lineWidth = 4;
	ctx.moveTo(5,26);
	ctx.lineTo(23,41);
	ctx.lineTo(41,26);
	ctx.moveTo(23,41);
	ctx.lineTo(23,5);
	ctx.stroke();

	ctx = left.getContext('2d');
	ctx.beginPath();
	ctx.strokeStyle = ' #F0F8FF';
	ctx.lineWidth = 4;
	ctx.moveTo(20,5);
	ctx.lineTo(5,23);
	ctx.lineTo(20,41);
	ctx.moveTo(5,23);
	ctx.lineTo(41,23);
	ctx.stroke();

	ctx = right.getContext('2d');
	ctx.beginPath();
	ctx.strokeStyle = ' #F0F8FF';
	ctx.lineWidth = 4;
	ctx.moveTo(26,5);
	ctx.lineTo(41,23);
	ctx.lineTo(25,41);
	ctx.moveTo(41,23);
	ctx.lineTo(5,23);
	ctx.stroke();

	// now lets add listeners
	up.addEventListener("click",function() {
		__triggerKeyboardEvent(document.body,38);
	});
	down.addEventListener("click",function() {
		__triggerKeyboardEvent(document.body,40);
	});
	left.addEventListener("click",function() {
		__triggerKeyboardEvent(document.body,37);
	});
	right.addEventListener("click",function() {
		__triggerKeyboardEvent(document.body,39);
	});

}

document.addEventListener("DOMContentLoaded", function(event) { 
	var seed = '10.16.2010 TJH AND TLL FOREVA!';
	var uri = window.location.search.replace("?", "");
	uri = uri.split('=');
	if(uri.length > 1) {
		seed = uri[1];
	}
	s('galaxy_seed',seed);
  	start();
  	paintLabelEnds();
  	paintArrows();

	document.onkeydown = checkKey;

});

