# webapp boilerplate

Webapp boilerplate/starter for React/Webpack/ES6 projects with hot-reloading and sample dockerfile.

This repo shows **a** way to get a web-app project started using React, webpack, and ES6 for both client and server code. I have also included some common app and repo elements which I find useful in projects I build.

Take the time to understand what and why some of the various components are included so you can better understand how to adapt this to your needs. This project shows some of the tooling I find useful when taking an app from prototype to production.

## Copy

Copy and paste the following commands to start your own project from this repo. There is no point in keeping this repo's history for your project so the commands below simply delete the existing `.git` folder and start from a single `initial` commit created by you.

```
git clone --depth=1 --branch=master https://github.com/defunctzombie/react-webpack-boilerplate.git my-web-project
cd my-web-project
rm -rf .git
git init
git add .
git commit -m 'initial boilerplate'
```

## Launch

To start the development server which includes automatic React and Javascript module bundling and reloading.

```
npm run dev
open http://localhost:3000
```

You can edit any server file and the server will automatically restart via the [node-dev](https://github.com/fgnass/node-dev) module.

Client sides changes will also cause an automatic re-bundle via webpack and the hot module reloader plugins. In general, you won't need to hard-refresh your pages but might want to do so every once in a while anyway.

### Production

To launch services in production mode, set the `NODE_ENV` environment variable to `production`.

For production, you MUST first build the javascript assets (no webpack dev middleware or hot reloading is enabled).

```
npm run build
NODE_ENV=production npm start
```

I have also included a basic `Dockerfile` which properly packages the app by first building the assets. More complex setups like uploading assets to S3 or CDNs are not currently included.

## Extras

The repo comes with a few extras which I find myself adding to projects to help with aspects of code quality, maintainability, and general nice-to-haves that end up being useful as a project grows.

### ESLint (with git-hooks)

A basic [ESLint](http://eslint.org/) configuration file via `.eslintrc` setup for ES6 and React. Obviously you will want to tweak rules to your liking; the ones I have included are my preferred style.

```
npm run lint
```

Using a git `pre-commit` hook is a great way to ensure you never break the lint rules before a commit. Simply run `npm run git-hook` and a symlink will be created from `.git/hooks/pre-commit` to `bin/pre-commit` (doesn't work on windows). Now, any commit you make which breaks linting rules will be rejected.

### Editorconfig

[Editorconfig](http://editorconfig.org/) is the closest I have come to ensuring that editor settings are consistent across your team without imposing strict editor requirements. It has plugins for every common editor. I recommend installing a plugin for your editor and keeping the editorconfig file updated and basic.

### Safestart

[Safestart](https://www.npmjs.com/package/safestart) is a great module to have in all of your `bin` scripts. It will check that everything specified in your `package.json` file is actually installed and at the correct version. This is INDISPENSABLE on multi-person teams whenever a `package.json` is updated and you forget to run `npm install` before starting your server. Tracking down bugs from mis-matched dependencies is a major time sink and this helps avoid those errors!

### Localenv

[Localenv](https://www.npmjs.com/package/localenv) is for easy sharing of development environment variables for app configuration if you buy into the whole [12 factor apps](http://12factor.net/) thing. It will read environment variables from a `.env` file which lives in your repo. This file is not read in production.

### Book

Eventually you will want to capture errors and other logging information. I have found it easier to start with a basic logging library than to sprinkle console.error everywhere. This way you can easily hook into application error reporting tools or even basic emailing of errors.

I have included a basic [book](https://github.com/defunctzombie/node-book) config file (via [bookrc](https://github.com/defunctzombie/node-bookrc) but if you are familiar with [winston](https://www.npmjs.com/package/winston) or [bunyan](https://www.npmjs.com/package/bunyan) I think both a viable options. Pick something with the `log.error()`, `log.warn()` convention and it will be easiy enough to switch if you feel like it.

## References

Work for this repo is based on these reference repos and heavily influenced by practices I have found useful as an app develops from a prototype to production:

* https://github.com/gaearon/react-transform-boilerplate
* https://github.com/gaearon/react-transform-catch-errors
* https://github.com/marcello3d/react-hotplate
