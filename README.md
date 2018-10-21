
# Lit-App Starter Template

This is a simple starter template of a [Lit-html](https://github.com/polymer/lit-html) App (Almost PWA). It supports stylus so you can forget to put several `{ }` and `;` and just write the style fields - values.

This repo is an adaptation of the work of @thepassle in [create-lit-app](https://github.com/thepassle/create-lit-app) which is a bigger and a more complete Lit-App.

The main goal of this template is to support stylus

### Features
This template contains the following:

- PWA: Callback for offline mode, Workbox implemented, manifest with launcher icons  (**new**)
- Simple and *In Progress* karma & Jasmine testing tool added (**new**)
- Webpack configuration
- Support for Stylus (e.g: `import css from './my-style.styl'`)
- Examples of Lit-html directives
- Usage of feather-icons: Open source icons. More details [here](https://github.com/feathericons/feather).


### Usage

- install dependencies

        npm install
        # OR, if you use yarn
        yarn

- start

        npm run dev
        # yarn
        yarn dev

- test

        npm run test
        # yarn
        yarn test

- build to production

        #to build
        npm run build
        # yarn
        yarn build

### Usage (to create a project from this template)

Just clone the repo, e.g:

    git clone https://github.com/anargu/lit-app-starter-template.git <project_directory_name>

### TODO

- add a state management (Looking for different options from Redux)
- fix some issues with testing tool (firefox compatibility)

### In Process

- add Testing tools (with Karma & Jasmine)
