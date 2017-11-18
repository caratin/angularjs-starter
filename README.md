# AngularJS Starter

[![Build Status](https://travis-ci.org/rjcarneiro/angularjs-starter.svg?branch=master)](https://travis-ci.org/rjcarneiro/angularjs-starter)

A complete out-of-the-box starter pack to develop web apps using [AngularJs](https://angularjs.org/) and [Bootstrap](http://getbootstrap.com/).

## Changelog

- 2017-11-18: Added [bootstrap4-fs-modal](https://github.com/keaukraine/bootstrap4-fs-modal) to put modals as fullscreen in mobile devices;
- 2017-11-09: Added progress bar everytime the route changes;
- 2017-11-08: bootstrap 4.0.0.0-beta all set up;

## How to use

In order to start just follow the steps:

   `git clone https://github.com/rjcarneiro/angularjs-starter.git`  
   `npm install`     
   `gulp serve`  

## Project structure

- app
  - images
  - scripts
  - styles
  - views

## Build
In order to build the project, just need to run `gulp build` or even just `gulp`. It will create the files in `/dist/` folder.

### Run javascripts errors
To make sure your javascript code has quality we use [jslint](http://www.jslint.com/). To run the tool just type `gulp jslint` and you can see the output. Also [Team City](https://www.jetbrains.com/teamcity/) integration is already made.  

## Contributors
Feel free to open `pull-requests` and contribute to this code.

### People that contribute to this project
- [Ricardo Carneiro](https://github.com/rjcarneiro)

## Used Libraries
* Twitter Bootstrap used under the MIT License https://github.com/twbs/bootstrap/blob/master/LICENSE
* AngularJs used under the MIT License https://github.com/angular/angular.js/blob/master/LICENSE
* Bootstrap4-fs-modal used under the MIT License https://github.com/keaukraine/bootstrap4-fs-modal/blob/master/LICENSE.txt
* angular-loading-bar used under the MIT License https://github.com/chieffancypants/angular-loading-bar/blob/master/LICENSE

## License

**The MIT License**

Copyright (c) 2017 Ricardo Carneiro

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.