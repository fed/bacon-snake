# Snake meets Bacon.js

Snake arcade game implementation in Bacon.js using ES6. This is a somewhat modified version of [Philip Nilsson's implementation](https://github.com/philipnilsson/Snake-Bacon). Most of the topics on [this tutorial](http://philipnilsson.github.io/badness/) still apply to this project.

![Snake meets Bacon.js](http://i.imgur.com/hytpjsy.png)

## Building and Development Tasks

Run `npm install` the first time you clone this project in order to fetch all the dependencies.

For development purposes, Grunt's default task will automatically watch all of your source files for changes, build the appropriate distribution files and refresh the page for you. To start the app and the watch task, run `npm start`. The application will go live on [http://localhost:6789/](http://localhost:6789/).

To build the app only, run `npm run build` instead. You'll find the distribution files on the `dist` folder.

| Command | Description |
| ------- | ------ |
| `npm install` | Fetch all the dependencies. |
| `npm start` | Start development server and watch for changes. App will go live on [http://localhost:6789/](http://localhost:6789/) |
| `npm run build` | Build all the things! Check out the `dist` folder. |

## Release Versions

Follow these steps to have your feature branch merged:

1. `git fetch`
2. `git checkout develop && git reset --hard origin/develop`
3. `npm version [<newversion> | major | minor | patch]`
4. `git checkout master && git reset --hard origin/master`
5. `git merge develop`
6. `git push --tags && git push && git checkout develop && git push`

## Semantic Versioning

Given a version number `MAJOR.MINOR.PATCH`, increment the:

1. `MAJOR` version when you make incompatible API changes,
2. `MINOR` version when you add functionality in a backwards-compatible manner, and
3. `PATCH` version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata [are available](https://docs.npmjs.com/cli/version) as extensions to the `MAJOR.MINOR.PATCH` format.

See the [Semantic Versioning](http://semver.org/) specification for more information.
