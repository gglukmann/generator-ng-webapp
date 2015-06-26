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
            this.copy('README.md', 'README.md');

            this.copy('apple-touch-icon.png', 'app/apple-touch-icon.png');
            this.copy('favicon.ico', 'app/favicon.ico');
            this.copy('tile.png', 'app/tile.png');
            this.copy('tile-wide.png', 'app/tile-wide.png');
        },

        projectfiles: function () {
            this.template('includes/base.html', 'includes/base.html', { title: this.name });
            this.copy('includes/pages/index.html', 'includes/pages/index.html');
            this.template('includes/partials/_header.html', 'includes/partials/core/_header.html', { title: this.name });

            this.copy('.gitignore-example', '.gitignore');
            this.copy('editorconfig', '.editorconfig');
            this.copy('jshintrc', '.jshintrc');
            this.template('_package.json', 'package.json', { name: this.appName });
            this.template('_bower.json', 'bower.json', { name: this.appName });
            this.copy('_gruntfile.js', 'gruntfile.js');

            this.copy('_variables.scss', 'assets/sass/_variables.scss');
            this.copy('_flexbox.scss', 'assets/sass/_flexbox.scss');
            this.copy('_style.scss', 'assets/sass/_style.scss');
            this.copy('app.scss', 'assets/sass/app.scss');

            this.copy('app.js', 'assets/js/app.js');

            this.template('doc/TOC.md', 'doc/TOC.md', { name: this.name, urlend: this.urlEnd, addLink: this.addLink });
            this.template('doc/css.md', 'doc/css.md', { name: this.name, urlend: this.urlEnd, addLink: this.addLink });
            this.template('doc/faq.md', 'doc/faq.md', { name: this.name, urlend: this.urlEnd, addLink: this.addLink });
            this.template('doc/html.md', 'doc/html.md', { name: this.name, urlend: this.urlEnd, addLink: this.addLink });
            this.template('doc/js.md', 'doc/js.md', { name: this.name, urlend: this.urlEnd, addLink: this.addLink });
            this.template('doc/misc.md', 'doc/misc.md', { name: this.name, urlend: this.urlEnd, addLink: this.addLink });
            this.template('doc/usage.md', 'doc/usage.md', { name: this.name, urlend: this.urlEnd, addLink: this.addLink });

            this.mkdir('includes/partials/components');
        }

    },

    install: function () {
        this.installDependencies();
    },

    end: function () {
        this.log(chalk.green('Much wow! Everything installed successfully! Next run "grunt init" to get you started.'));
    }
});
