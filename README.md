# SimpleTask

Simple task management application.

All dependencies are packaged in bundle at ./dist/index.bundle.js
You can launch the app by opening ./dist/index.html from the web browser.

You can also launch the app on your localhost
```sh
$ npm install --save-dev serve
$ npm start
```
Open your browser, go to [http://localhost:3000/](http://localhost:3000/)

For development, install dependencies.
```sh
$ npm install
```

To create the bundle with source map for development
```sh
$ npm run build:dev
```

To create minified bundle for production
```sh
$ npm run build:prod
```
