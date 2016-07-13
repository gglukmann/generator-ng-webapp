'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // welcome message
        if (!this.options['skip-welcome-message']) {
            // Have Yeoman greet the user.
            this.log(yosay('Welcome to the kickass ' + chalk.red('Net Group UX team template') + ' generator!'));
            this.log(chalk.green('Out of the box you get jQuery, Bootstrap SASS, Modernizr, FontAwesome and a gruntfile.js to build your app.'));
            this.log(chalk.magenta('Brought to you by Gert Glükmann'));
        }

        var prompts = [{
            type    : 'input',
            name    : 'appName',
            message : 'Write your project name',
            default : this.appname // Default to current folder name
        },{
            type: 'confirm',
            name: 'addLink',
            message: 'Are you from Net Group?',
            default: true
        },{
            when: function (response) {
                return response.addLink;
            },
            type    : 'input',
            name    : 'urlEnd',
            message : 'Write URL ending http://ux.netgroupdigital.com/...',
            default : this.appname.replace(/ /g,"")
        }];

        this.prompt(prompts, function (answers) {
            // this.log(answers.appName);
            this.name = answers.appName;
            this.appName = answers.appName.replace(/ /g,"");
            this.addLink = answers.addLink;
            this.urlEnd = answers.urlEnd;
            this.frontEndFramework = true;
            this.log("This should be the state of frontendframework: " + chalk.magenta(this.frontEndFramework));
            if ( this.frontEndFramework == true ) {
              this.javascript =
              '\t \t<script src="../node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js"></script> \n' +
              '\t \t<script src="../node_modules/bootstrap-sass/assets/javascripts/bootstrap/affix.js"></script> \n' +
              '\t \t<script src="../node_modules/bootstrap-sass/assets/javascripts/bootstrap/alert.js"></script> \n' +
              '\t \t<script src="../node_modules/bootstrap-sass/assets/javascripts/bootstrap/button.js"></script> \n' +
              '\t \t<script src="../node_modules/bootstrap-sass/assets/javascripts/bootstrap/carousel.js"></script> \n' +
              '\t \t<script src="../node_modules/bootstrap-sass/assets/javascripts/bootstrap/collapse.js"></script> \n' +
              '\t \t<script src="../node_modules/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js"></script> \n' +
              '\t \t<script src="../node_modules/bootstrap-sass/assets/javascripts/bootstrap/modal.js"></script> \n' +
              '\t \t<script src="../node_modules/bootstrap-sass/assets/javascripts/bootstrap/popover.js"></script> \n' +
              '\t \t<script src="../node_modules/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js"></script> \n' +
              '\t \t<script src="../node_modules/bootstrap-sass/assets/javascripts/bootstrap/tab.js"></script> \n' +
              '\t \t<script src="../node_modules/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js"></script> \n' +
              '\t \t<script src="../node_modules/bootstrap-sass/assets/javascripts/bootstrap/transition.js"></script>';
            } else {
              this.javascript =
              '\t \t<script src="../node_modules/foundation/js/foundation/foundation.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/vendor/custom.modernizr.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/vendor/zepto.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/foundation/foundation.alerts.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/foundation/foundation.clearing.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/foundation/foundation.cookie.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/foundation/foundation.dropdown.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/foundation/foundation.forms.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/foundation/foundation.interchange.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/foundation/foundation.joyride.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/foundation/foundation.magellan.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/foundation/foundation.orbit.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/foundation/foundation.placeholder.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/foundation/foundation.reveal.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/foundation/foundation.section.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/foundation/foundation.tooltips.js"></script> \n' +
              '\t \t<script src="../node_modules/foundation/js/foundation/foundation.topbar.js"></script>';
            }

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            this.copy('browserconfig.xml', 'app/browserconfig.xml');
            this.copy('crossdomain.xml', 'app/crossdomain.xml');
            this.copy('robots.txt', 'app/robots.txt');
            this.copy('README.md', 'README.md');

            this.copy('apple-touch-icon.png', 'app/apple-touch-icon.png');
            this.copy('favicon.ico', 'app/favicon.ico');
            this.copy('tile.png', 'app/tile.png');
            this.copy('tile-wide.png', 'app/tile-wide.png');
        },

        projectfiles: function () {
            this.template('includes/views/index.html', 'app/includes/views/index.html');
            this.template('includes/partials/_header.html', 'app/includes/partials/_header.html', { title: this.name });

            this.template('index.html', 'app/index.html', { title: this.name, javascript: this.javascript });

            this.copy('.gitignore-example', '.gitignore');
            this.copy('editorconfig', '.editorconfig');
            this.copy('jshintrc', '.jshintrc');
            this.copy('.jscsrc', '.jscsrc');
            this.template('_package.json', 'package.json', { name: this.appName });
            this.copy('_gulpfile.js', 'gulpfile.js');

            this.copy('_variables.scss', 'app/assets/sass/_variables.scss');
            this.copy('_style.scss', 'app/assets/sass/_style.scss');

            if (this.frontEndFramework == true) {
              this.copy('_app_bootstrap.scss', 'app/assets/sass/app.scss');
            } else {
              this.copy('_app_foundation.scss', 'app/assets/sass/app.scss');
            }

            this.copy('app.js', 'app/assets/js/app.js');
            this.copy('scripts.js', 'app/assets/js/scripts.js')

            this.template('doc/TOC.md', 'doc/TOC.md', { name: this.name, urlend: this.urlEnd, addLink: this.addLink });
            this.template('doc/css.md', 'doc/css.md', { name: this.name, urlend: this.urlEnd, addLink: this.addLink });
            this.template('doc/faq.md', 'doc/faq.md', { name: this.name, urlend: this.urlEnd, addLink: this.addLink });
            this.template('doc/html.md', 'doc/html.md', { name: this.name, urlend: this.urlEnd, addLink: this.addLink });
            this.template('doc/js.md', 'doc/js.md', { name: this.name, urlend: this.urlEnd, addLink: this.addLink });
            this.template('doc/misc.md', 'doc/misc.md', { name: this.name, urlend: this.urlEnd, addLink: this.addLink });
            this.template('doc/usage.md', 'doc/usage.md', { name: this.name, urlend: this.urlEnd, addLink: this.addLink });

            this.mkdir('app/assets/images');
            this.mkdir('app/assets/svg');
        }
    },

    install: function () {
        this.installDependencies();
    },

    end: function () {
        this.log(chalk.green('Much wow! Everything installed successfully! Next run "gulp init" to get you started.'));
    }
});
