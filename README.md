# generator-ng-webapp [![Build Status](https://secure.travis-ci.org/gglukmann/generator-ng-webapp.png?branch=master)](https://travis-ci.org/gglukmann/generator-ng-webapp)

> [Yeoman](http://yeoman.io) generator


## Getting Started

To get you started on Windows:

- Install [Ruby](http://rubyinstaller.org/)
- Install [NodeJS](https://nodejs.org/)
- Open Ruby cmd and install sass with gem
```bash
gem install sass
```
- Install [git](https://git-scm.com/)
- Make sure ruby, node and git are in your environment variables PATH
- Close cmd and reopen it
- Check if everything is installed correctly in Ruby cmd
```bash
ruby -v
node -v
git
```
- Make directory to store your project
```bash
mkdir /path/to/your-project-dir
cd /path/to/your-project-dir
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive.

To install generator-ng-webapp from npm, run:

```bash
npm install -g yo bower grunt-cli generator-ng-webapp
```

Finally, initiate the generator:

```bash
yo ng-webapp
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

### Starting project

Run grunt on terminal

```bash
grunt init
```

And you should have working project up and running on port:9001


## Features

> - Grunt & Bower
> - Bootstrap SASS
> - Modernizr
> - FontAwesome
> - Automagically compile Sass and JS
> - Built-in preview server with LiveReload
> - JSON support
> - different files for CSS media queries

## License

MIT
