# generator-ng-webapp [![Build Status](https://secure.travis-ci.org/gglukmann/generator-ng-webapp.png?branch=master)](https://travis-ci.org/gglukmann/generator-ng-webapp)

> [Yeoman](http://yeoman.io) generator


## Getting Started

To get you started on Windows:

- Install [NodeJS](https://nodejs.org/)
- Install [git](https://git-scm.com/)
- Make sure node and git are in your environment variables PATH
- Check if everything is installed correctly in cmd or git bash
```bash
node -v
git --version
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
npm install -g yo gulp gulp-cli generator-ng-webapp
```

Finally, initiate the generator:

```bash
yo ng-webapp
```

### Starting project

Run grunt on terminal

```bash
gulp init
```

And you should have working project up and running on port:9001


## Features

> - Angular 1
> - Gulp
> - Bootstrap SASS
> - FontAwesome
> - Automagically compile Sass and JS
> - Built-in preview server with BrowserSync
> - JSON support

## License

MIT
