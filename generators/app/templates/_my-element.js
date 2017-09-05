/* 
@license
Copyright (c) 2017 @cicciosgamino Author. All rights reserved.
This code may only be used under the license found at https://github.com/CICCIOSGAMINO/LICENSE.txt

Attention  > Polymer 3.0 Preview in USE ! */ 

import {Element as PolymerElement} 
  from "../node_modules/@polymer/polymer/polymer-element.js";

import "../node_modules/@polymer/paper-button/paper-button.js"

export class  <%= className %> extends PolymerElement {

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
customElements.define('<%= elementName %>', <%= className %>);
