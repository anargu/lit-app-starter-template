> ## 🛠 Status: In Development
> LitElement is currently in development. As long as LitElement is, so is create-lit-app. This repo will be kept up to date with the latest version of LitElement, but there are things that haven't been finalized yet and you can expect some changes.

# Lit-App Starter Template

This is a simple starter template of a Lit-html App. It supports stylus so you can forget to put several `{ }` and `;` and just write the style fields - values.

This repo is an adaptation of the work of @thepassle in [create-lit-app](https://github.com/thepassle/create-lit-app) which is a bigger and a more complete Lit-App.

The main goal of this template is to support stylus

This template contains the following:

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

- build to production

        #to build
        npm run build
        # yarn
        yarn build

### Usage (to create a project from this template)

Just clone the repo, e.g:

    git clone http://xx.git <project_directory_name>

### TODO

- add PWA features
- add Testing tools (possibly Jest)