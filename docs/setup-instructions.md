# Setup Instructions

## Pre-requisites

1. LTS release of node.js - https://nodejs.org/en/
2. JSPM for managing and building the client app - `$ npm install jspm -g`
3. Karma for unit tests - `$ npm install karma -g`
4. Gulp for tasks - `$ npm install gulp -g`

## Setting up client-side build

First install all of the dependencies -

```
$ npm install
$ jspm install
```

Now when we want the client app to run we can issue the following command -

```
$ gulp watch
```

## Developing against the dev server

Gigme.io operates a dev server to make the development experience a bit easier.

This is the IP address of the dev server -

http://162.243.2.41/

When signing up please note *right now only GitHub user registration works on the dev server*.

Next we need to install the Requestly Chrome extension -

https://chrome.google.com/webstore/detail/requestly-redirect-url-mo/mdnleldcmiljblolnjhpnblkcekpdkpa?hl=en

This extenstion redirects requests for the JavaScript and HTML from the dev server to your local running application via rules.

You can add the following rules to redirect to where the files should be served from the `gulp watch` task above -

```
[
  {
    "creationDate": 1508280507174,
    "description": "Gigme.io Dev Server",
    "id": "Replace_1508280507174",
    "name": "Gigme.io Dev Server",
    "pairs": [
      {
        "from": "http://162.243.2.41/",
        "source": {
          "key": "path",
          "operator": "Contains",
          "value": "/dist/"
        },
        "status": "Inactive",
        "to": "http://localhost:9000/"
      },
      {
        "from": "http://162.243.2.41/",
        "source": {
          "key": "path",
          "operator": "Contains",
          "value": "/jspm_packages/"
        },
        "status": "Inactive",
        "to": "http://localhost:9000/"
      },
      {
        "from": "http://162.243.2.41/",
        "source": {
          "key": "path",
          "operator": "Contains",
          "value": "/config.js"
        },
        "status": "Inactive",
        "to": "http://localhost:9000/"
      }
    ],
    "ruleType": "Replace",
    "status": "Active",
    "version": 2
  }
]
```

Once the rules are active you will see a 307 response in Chrome when requesting html and js files that redirects to your local versions.

Make a small change to an html to see the change reflected when refreshing the page.
