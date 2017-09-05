# generator-polymer-init-element-3
Yeoman and Polymer CLI generator for Polymer 3.0 Simple Element

## Installation

First, install [Yeoman](http://yeoman.io) and generator-polymer-init-element-seed using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-polymer-init-element-3
```

Then generate your new project:

```bash
yo polymer-init-element-3
```

## Element 
You can create the simple Polymer3.0 element, with no iron-page and all the stuff you need in the 
production mode, this is only a skeleton for the element! (updated 04/09/2017) : 

```javascript

/*  Attention  > Polymer 3.0 Preview in USE ! */ 

import {Element as PolymerElement} 
  from "../node_modules/@polymer/polymer/polymer-element.js";

import "../node_modules/@polymer/paper-button/paper-button.js"

export class  MyElement extends PolymerElement {

  constructor() {
    super();
    this.name = 'Polymer 3.0 Preview';
    this.count = 0;
    this.timer = {};
  }

  static get template() {
    return `
            <style>
              .main {
                width: 250px;
                height: 250px;
                margin: 1em;
                padding: 1em;
                background-color: red;
              }
            </style>
            <div class="main">
              This is my [[name]] app
              <hr>
              Count : <span>[[count]]</span>
              <hr>
              <paper-button on-tap="_restartTimer">RESTART</paper-button>
              <paper-button on-tap="_cancelTimer">CANCEL</paper-button>
            </div>`;
  }

  // properties, observers, are identical to 2.x 
  static get properties() {
    return {
      name: {
        Type: String
      },
      count: {
        Type: Number
      }
    }
  }

  // define the observers 
  static get observers() {
    return [
      '_nameChanged(name)'
    ]
  }

  ready() {
    super.ready();
    this.timer = setInterval(_ => {
      this.count++;
      console.log(this.count);
    }, 1000);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click',this._log);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._log);
    clearInterval(this.timer);
  }

  _log(e) {
    console.log(`${e.target.localName}:${e.target.nodeName}`);
  }

  _nameChanged(name) {
    console.log(`_nameChanged: ${name}`);
  }

  _startTimer() {
    this.timer = setInterval(_ => {
      this.count++;
      console.log(this.count);
    }, 1000);
  }

  _restartTimer(e) {
    this.timer = setInterval(_ => {
      this.count++;
      console.log(this.count);
    }, 1000);
  }

  _cancelTimer(e) {
    console.log('Cancel');
    clearInterval(this.timer);
  }

}

    
// Register custom element definition using standard platform API
customElements.define('my-element', MyElement);


```

## Up and Running 
To up and running the environment and the Polymer 3.0 custom element just follow these simple 
steps : 

```bash 
mkdir your_project && cd $_
yarn init
yarn add @polymer/polymer@next
yarn add @polymer/paper-button@next
```

create a index.html file where insert the Polymer3.0 custom element just created with the 
generator, this is an example of file : 

```html 
<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Polymer element - Test </title>

  <!-- Normal Script import (if needed) -->
  <script src="./@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>

  <!-- Import the ES6 module -->
  <script type="module" src="./src/my-element.js"></script>
  

</head>

<body>

  <my-element></my-element>

  <script>

    // Javascript power goes here 
    
  </script>

</body>
</html>

```

Launch a simple web server to check the Polymer3.0 element in action, (here we use the simple 
python simple server and polymer serve) : 

```bash
cd your_project 

// simple python web server 
python -m SimpleHTTPServer 8080 

// default polymer server
polymer serve --npm
```

Open the browser and navigate the address **localhost:8000** or **localhost:8081** ! 


## License

MIT © [@cicciosgamino](http://cicciosgamino.github.io/)

