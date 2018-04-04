# react-app-node-backend

## Intro

how to use react app on the client side and an express node backend

## Tutorial

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

    $ yarn add -D prettier

    $ yarn add -D eslint eslint-config-airbnb-base eslint-plugin-import eslint-config-prettier eslint-plugin-prettier eslint-config-react eslint-plugin-react


    $ touch .babelrc .gitignore .eslintrc.js .eslintignore .prettierrc.js .prettierignore webpack.config.js

```
# .babelrc
{
    "presets":[
        "env", "react"
    ]
}
```

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
# webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: './index.jsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
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

    $ mkdir components

    $ touch components/App.jsx

```js
import React from 'react';

export default function App() {
  return <div>The React App is working!</div>;
}
```

    $ touch index.jsx

```js
import React from 'react';
import { render } from 'react-dom';

import App from './components/App.jsx';

render(<App />, document.getElementById('root'));
```    

    $ mkdir public

    $ touch pubic/index.html

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The React App with Node Backend</title>
</head>

<body>
  <div id='root'></div>
</body>

</html>
```

edit package.json
```json
"scripts": {
  "build:dev": "webpack --mode development",
  "build:watch": "webpack --mode development --watch",
  "start:dev": "webpack-dev-server --mode development",
  "test": "echo \"Error: no test specified\" && exit 1"  
},
```

    $ yarn start:dev

#### create the express app

    $ cd ..

    $ mkdir server

    $ npm init -y

Install dependencies

    $ yarn add express

    $ yarn add -D babel-core babel-cli babel-preset-env

    $ yarn add -D prettier

    $ yarn add -D eslint eslint-config-airbnb-base eslint-plugin-import eslint-config-prettier eslint-plugin-prettier

    > TODO

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

const publicPath = express.static(path.join(__dirname, '../../app/build'));
const indexPath = path.join(__dirname, '../../app/build/index.html');

app.use(publicPath);

app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

export default app;
```

    $ yarn -d nodemon parallelshell

    edit package.json

```json
"scripts": {
  "app:dev": "cd ../app && yarn build:watch",
  "build": "babel ./src -d build/",
  "build:watch": "babel --watch ./src -d build/",
  "start:dev": "parallelshell 'yarn app:dev' 'yarn build:watch' 'nodemon build/server'",
  "start": "nodemon build/server",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

    $ yarn start:dev

## License

MIT

[LICENSE](LICENSE)
