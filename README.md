# JS-Space

Project Repo: https://github.com/timbotron/js-space

By [Tim Habersack](https://tim.hithlonde.com)

Try it here: https://js-space.graviton.systems

## Overview

JS-Space a tool/game that will generate a mostly-realistic galaxy from a seed, then let you navigate around it to view the various stars within the galaxy. It's designed to work well on computers and mobile devices.

## Controls

* Use the arrow keys on screen, or on your keyboard to navigate about the galaxy.
* Click/tap on a star to view it's details.

## Some neato features:

* Alter the config.json to change the number of sectors that are generated, min distance between generated stars, etc.
* The Sector View window is calibrated on page load, so on your phone try loading it in portrait vs landscape mode to see different layouts.
* All the star details are mostly realistic main sequence type stars, with appropriate percent chance of existing. (Class M are much more common than class A, for example.)
* You can pass in a seed via the URI, otherwise it uses the default seed.
* Only vanilla JS was used, no jQuery or anything else.
* No images are used, it's all done via CSS and/or [HTML Canvas](https://en.wikipedia.org/wiki/Canvas_element) elements
* The entire payload of this is less than 25kb! (when accounting for gzip)

## Giggly Technicial Aspects

It's important to note this project was a prototype for an idea I had for a browser-based space game. After this work I'm pretty convinced this is *not* the way to go, but I had great fun while writing it, and I became much more familiar with vanilla JavaScript.

## Credits

Many thanks to [David Bau](http://davidbau.com) for their [seedrandom](https://github.com/davidbau/seedrandom) random number generator in JavaScript.

## License

You are free to copy, modify, and distribute JS-Space with attribution under the terms of the MIT license. See the LICENSE file for details.