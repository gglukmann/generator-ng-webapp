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
        }

        var prompts = [{
            type    : 'input',
            name    : 'appName',
            message : 'Write your project name',
            default : this.appname // Default to current folder name
        },{
            type    : 'input',
            name    : 'urlEnd',
            message : 'Write URL ending http://ux.netgroupdigital.com/...',
            default : this.appname // Default to current folder name
        }];

        this.prompt(prompts, function (answers) {
            // this.log(answers.appName);
            this.appName = answers.appName;
            this.urlEnd = answers.urlEnd;

            done();
        }.bind(this));

    },

    writing: {
        app: function () {
            this.copy('custom.css', 'app/assets/css/custom.css');
            this.copy('custom.js', 'app/assets/js/custom.js');

            this.copy('browserconfig.xml', 'app/browserconfig.xml');
            this.copy('crossdomain.xml', 'app/crossdomain.xml');
            this.copy('robots.txt', 'app/robots.txt');

            this.copy('apple-touch-icon.png', 'app/apple-touch-icon.png');
            this.copy('favicon.ico', 'app/favicon.ico');
            this.copy('tile.png', 'app/tile.png');
            this.copy('tile-wide.png', 'app/tile-wide.png');
        },

        projectfiles: function () {
            this.template('index.html', 'index.html', { title: this.appName });
            this.template('includes/header.html', 'includes/header.html', { title: this.appName });

            this.copy('.gitignore', '.gitignore');
            this.copy('editorconfig', '.editorconfig');
            this.copy('jshintrc', '.jshintrc');
            this.template('_package.json', 'package.json', { name: this.urlEnd });
            this.template('_bower.json', 'bower.json', { name: this.urlEnd });
            this.copy('_gruntfile.js', 'gruntfile.js');

            this.copy('_variables.scss', 'assets/sass/_variables.scss');
            this.copy('_flexbox.scss', 'assets/sass/_flexbox.scss');
            this.copy('_style.scss', 'assets/sass/_style.scss');
            this.copy('app.scss', 'assets/sass/app.scss');

            this.copy('app.js', 'assets/js/app.js');

            this.template('doc/TOC.md', 'doc/TOC.md', { name: this.appName, urlend: this.urlEnd });
            this.template('doc/css.md', 'doc/css.md', { name: this.appName, urlend: this.urlEnd });
            this.template('doc/faq.md', 'doc/faq.md', { name: this.appName, urlend: this.urlEnd });
            this.template('doc/html.md', 'doc/html.md', { name: this.appName, urlend: this.urlEnd });
            this.template('doc/js.md', 'doc/js.md', { name: this.appName, urlend: this.urlEnd });
            this.template('doc/misc.md', 'doc/misc.md', { name: this.appName, urlend: this.urlEnd });
            this.template('doc/usage.md', 'doc/usage.md', { name: this.appName, urlend: this.urlEnd });
        }

    },

    install: function () {
        this.installDependencies();
    },

    end: function () {
        this.log(chalk.green('Much wow! Everything installed successfully'));
    }
});
