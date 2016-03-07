# Implementing the Snake arcade game in Bacon.js

![Snake meets Bacon.js](http://i.imgur.com/hytpjsy.png)

## Prerequisites

* Node.js (http://nodejs.org/)
* Grunt CLI (http://gruntjs.com/)

Run `npm install` the first time you download the app in order to build the binaries for any node modules.

Grunt CLI can be installed globally for convenience with `npm install -g grunt-cli`, otherwise the binary can be found here: `./node_modules/grunt-cli/bin/grunt`.

## Building

Run `npm run build` to build the app.

## Building, Running and Watching for Changes

When developing, there's also a watch task that will automatically watch any of your source files for changes and refresh the page for you.

To run start the app and the watch task, run `npm start`. The app will go live on http://0.0.0.0:6789/.

## Release Versions

This repo uses [grunt-bump](https://github.com/vojtajina/grunt-bump) to version and tag releases. To version a release, move to master and run the appropriate command:

```
grunt release:major       # bump major version, eg. 1.0.2 -> 2.0.0
grunt release:minor       # bump minor version, eg. 0.1.3 -> 0.2.0
grunt release:patch       # bump patch version, eg. 0.0.1 -> 0.0.2
grunt release:prerelease  # bump pre-release version, eg. 1.0.0 -> 1.0.0-1
```

Make sure to push tags:

```
git push --tags origin master
```

## Semantic Versioning

Given a version number `MAJOR.MINOR.PATCH`, increment the:

1. `MAJOR` version when you make incompatible API changes,
2. `MINOR` version when you add functionality in a backwards-compatible manner, and
3. `PATCH` version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the `MAJOR.MINOR.PATCH` format.

See the [Semantic Versioning](http://semver.org/) specification for more information.

## Release History

See the [CHANGELOG](CHANGELOG.md).
