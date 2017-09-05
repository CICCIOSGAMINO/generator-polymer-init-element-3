'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the wonderful ' + chalk.red('generator-polymer-init-element-3') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'elementName',
      message: 'What would you like your element to be called?',
      default: 'my-element'
    }];

    return this.prompt(prompts).then(props => {

      // Prere the className eg  my-element > MyElement 
      props.className = props.elementName.split('-').map(x => {
        return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
      }).join('');

      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    const elementName = this.props.elementName;
    const className = this.props.className;

    // rename the files starting with _ 
    this.fs.copyTpl(
      this.templatePath('_my-element.js'),
      this.destinationPath(`${elementName}.js`),
      this.props
    );

  }

  install() {
    // this.installDependencies();
  }
  
};
