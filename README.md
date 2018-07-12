# react-app-node-backend

## Intro

How to use react app on the client side and an express node backend.

## Tutorial

#### prerequisites

* node
* yarn

On OSX `$ brew install node yarn`

#### prepare folders

    $ mkdir react-app-node-backend/app

    $ cd react-app-node-backend/

create a global node gitignore file

    $ curl --url "https://www.gitignore.io/api/node" -o .gitignore

#### create the react app

    $ cd app

    $ npm init -y

Install dependencies

    $ yarn add react react-dom

    $ yarn add -D webpack webpack-cli html-webpack-plugin webpack-dev-server

    $ yarn add -D babel-core babel-cli babel-loader babel-preset-env babel-preset-react

  - babel-cli is the terminal interface i.e. it allows us to compile files from the command line
  - babel-loader allows transpiling JavaScript files using Babel and webpack
  - babel-preset-env and babel-preset-react, transpiles es2015 (ES6) to ES5 and jsx to readable js, respectively.
  - html-webpack-plugin allows webpack to use an html file that we have created, make a copy and then insert the script that refers to the bundled (compiled) js file that has just been created.

```
    $ yarn add -D sass-loader node-sass style-loader css-loader

    $ yarn add -D stylelint stylelint-config-standard

    $ yarn add -D npm-run-all

    $ yarn add -D prettier

    $ yarn add -D eslint eslint-config-airbnb-base eslint-plugin-import eslint-config-prettier eslint-plugin-prettier eslint-config-react eslint-plugin-react

    $ touch .babelrc .eslintrc.js .eslintignore .prettierrc.js .prettierignore .stylelintrc webpack.config.js
```

```
# .babelrc
{
    "presets":[
        "env", "react"
    ]
}
```

add in `.gitignore` file
```
# .gitignore
build/
```

```
# .eslintrc.js
module.exports = {
  extends: [
    'airbnb-base', 'plugin:react/recommended', 'plugin:prettier/recommended'
  ],
  env: {
    browser: true
  }
};
```

```
# .eslintignore
build/
```

```
# .prettierrc.js
module.exports = {
  singleQuote: true,
  trailingComma: 'es5'
};
```

```
# .prettierignore
build/
```

```
#.stylelintrc
{
  "extends": "stylelint-config-standard",
}
```

```js
# webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};
```

    $ touch App.scss

```sass
// Google Fonts
@import url(http://fonts.googleapis.com/css?family=Roboto|Open+Sans);

// Font Variables
$roboto: 'Roboto', Helvetica;
$open-sans: 'Open Sans', sans-serif;

$header-font: $roboto;
$body-font: $open-sans;

$header-color: #478dbf;

// Styles
body {
  font-family: $body-font;
  font-weight: normal;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: $header-font;
  font-weight: normal;
  color: $header-color;
}  
```

    $ touch App.jsx

```js
import React from 'react';

import './App.scss';

const App = () => (
  <div>
    <h2>The React App</h2>
  </div>
);

export default App;
```

    $ touch index.jsx

```js
import React from 'react';
import { render } from 'react-dom';

import App from './App.jsx';

render(<App />, document.getElementById('root'));
```    

    $ mkdir public

    $ touch public/index.html

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The React App with Node Backend</title>
</head>

<body>
  <div id="root"></div>
</body>

</html>
```

edit package.json
```json
"scripts": {
  "build:prod": "webpack --mode production",
  "build:dev": "webpack --mode development",
  "build:watch": "webpack --mode development --watch",
  "lint:js": "eslint --ext=js --ext=jsx .",
  "lint:scss": "stylelint --config=.stylelintrc '**/*.scss'",
  "lint": "run-s lint:**",
  "prebuild:prod": "yarn lint",
  "start:dev": "webpack-dev-server --mode development",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

    $ yarn start:dev

    to stop : CRTL + C

#### create the express app

    $ cd ..

    $ mkdir server

    $ npm init -y

Install dependencies

    $ yarn add express

    $ yarn add -D babel-core babel-cli babel-preset-env

    $ yarn add -D prettier

    $ yarn add -D eslint eslint-config-airbnb-base eslint-plugin-import eslint-config-prettier eslint-plugin-prettier

    > TODO explain

    $ mkdir src

    $ touch src/server.js src/app.js

```js
// server.js
import app from './app';

const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 3000;

app.listen(port);
console.log(`Listening at ${host}:${port}`); // eslint-disable-line
```

```js
// app.js
import path from 'path';
import express from 'express';

const app = express();

const staticPath = express.static(path.join(__dirname, '../../app/build'));
const indexFile = path.join(__dirname, '../../app/build/index.html');
app.use(staticPath);
app.get('/', (req, res) => {
  res.sendFile(indexFile);
});

export default app;
```

    $ yarn add -D nodemon

    $ yarn add -D npm-run-all

    edit package.json

```json
"scripts": {
  "app:dev": "cd ../app && yarn build:watch",
  "build": "babel ./src -d build/",
  "build:watch": "babel --watch ./src -d build/",
  "start:dev": "run-p app:dev build:watch start",
  "start": "nodemon build/server",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

    $ yarn start:dev

    to stop : CRTL + C

## With docker

#### prerequisites

* docker-ce >= 17.05

#### get started

- clone the repo

    $ touch .env

```
#.env
# NGNIX PORT
NGINX_PORT=80

# BACKEND
BACKEND_PORT=3000

# REACT-dev
# FRONT_PORT=8080
```

- to start `$ make startdev`
- to stop `$ make stopdev`

## License

MIT

[LICENSE](LICENSE)
