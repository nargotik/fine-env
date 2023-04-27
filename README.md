# fine-env
Original plugin clone: github.com/kovert99/fine-env

Read environment variables from `process.env` (`.env`) as convenient nested object.

Store objects and arrays as string variables.

[![NPM version](https://img.shields.io/npm/v/fine-env.svg)](https://www.npmjs.com/package/fine-env)
[![LICENSE](https://img.shields.io/github/license/nargotik/fine-env.svg)](LICENSE)

## Install

```bash
# with npm
npm install fine-env

# or with yarn
yarn add fine-env
```
## Usage

```javascript
const env = require('fine-env');

// getting environment vars from env object

// get PORT 
const port = env.port;

// get MONGODB_URL 
const mongodbUrl = env.mongodbUrl;

// get GOOGLE__APP_1__CLIENT_ID and GOOGLE__APP1__CLIENT_SECRET
const { clientId, clientSecret } = env.google.app1;
// or use original keys
const { CLIENT_ID, CLIENT_SECRET } = env.google.app1;

// get SystemRoot
const { SystemRoot } = env;
// or use camelCase style
const { systemRoot } = env;

// get all vars with prefix GOOGLE__
const { google } = env;
// or with require
const { google } = require('fine-env');

// get ROOT_VAR__parentVar__child_Var
const { childVar } = env.rootVar.parentVar;

// get _INIT_UTS__PLATFORM and _INIT_UTS__RELEASE
const db = env.db;
const { platform, release } = env._initUts;
```

## Array storage

```
FOO__BAR__=111,222,333,444,555
ALLOWED_HOSTS__=localhost,example.com,*.example.com
```

```javascript
const env = require('fine-env');

console.log(env.foo.bar); // => [111, 222, 333, 444, 555]
console.log(env.allowedHosts); // => ['localhost', 'example.com', '*.example.com']
```

## License

MIT