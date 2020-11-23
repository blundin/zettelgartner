# Zettelgartner

![Travis CI build status](https://travis-ci.org/blundin/zettelgartner.svg?branch=master) [![codecov](https://codecov.io/gh/blundin/zettelgartner/branch/master/graph/badge.svg?token=5BHTEPSNFZ)](https://codecov.io/gh/blundin/zettelgartner) [![Maintainability](https://api.codeclimate.com/v1/badges/e1822c7d10438a991a00/maintainability)](https://codeclimate.com/github/blundin/zettelgartner/maintainability)

Zettelgartner is a made-up German name for a lightweight, node.js-based Zettelkasten maintenance utility for Zettelkasten notes with wiki-style links.

## Table of Contents

- [What is Zettelgartner?](#what-is-zettelgartner)
- [Features](#features)
- [Usage](#usage)
- [Installation](#installation)
- [Configuration](#configuration)
- [Background](#background)
- [Contributing](#contributing)
- [License](#license)

## What is Zettelgartner?

Zettelgartner is a made-up German name for a lightweight, node.js-based [Zettelkasten](https://zettelkasten.de) maintenance utility. Zettelgartner was designed as an opinionated collection of wiki-style hypertext maintenance tools to help manage a markdown-based zettelkasten. It is implemented in Node.js, and installed via Yarn or NPM. 

### Philosophy

Simply put, Zettelgartner implements a number of features that I've found to beuseful in my own zettelkasten. There are many opinions amongst other practitioners about backlinks, managing sources, tag usage, and more. All major features can be enabled or disabled in the configuration file, allowing you to choose what features you use. For future development, [Code contributions are welcome]() as are feature suggestions (please open an issue in Github). 

## Features

### Backlinks

This feature is inspired by the more elegant [note-link-janitor](https://github.com/andymatuschak/note-link-janitor) by Andy Matuschak, and my desire to bring backlinks to my Zettelkasten after trying out [Obsidian](https://obsidian.md).

When executed, Zettelgartner will scan all markdown notes for wiki-style links, and will append a block of backlinks to each note.

### Reports

Coming soon.

## Usage

Zettelgartner is a command line utility that scans all markdown files in a single target directory, processes their contents, and updates them with backlinks and more. The user must use a cron job or [some other mechanism](https://apps.apple.com/us/app/lingon-3/id450201424?mt=12) to schedule execution if desired. It currently requires Node.js 14.0 or greater.

After installing run it like so:

```shell
zettelgartner /path/to/markdown/notes
```

If you encounter an issue or just want to see more information about what Zettelgarnter is doing you can pass in `-v` and `--verbose`, or `d`/`--debug` for more details that can help with troubleshooting.

## Installation

Zettelgartner is pre-release software, so for now you can install Zettelgartner directly from this repository, using either Yarn or NPM.

Yarn:

```shell
yarn global add https://github.com/blundin/zettelgartner.git
```

NPM:

```shell
npm install -g https://github.com/blundin/zettelgartner.git
```

## Configuration

### Feature options

Coming soon.

### Logging options

Coming soon.

## Background

Zettelkasten (in German: "slip box") is a note-taking and organization method that first appeared over 500 years ago.<sup>1</sup> The method has received more attention lately from its association with Niklas Luhman, who credits his zettelkasten for his unbelievably prolific career (over 70 books and 400 articles).

There are currently many different options for maintaining a digital zettelkasten, adapting the card catalog-like approach for modern tools. Any note-taking app or text editor that supports wiki-style links can be adapted for use with a zettelkasten. Text editors like [Atom]() and [Sublime Text]() have packages meant help with the methodology. [The Archive](https://zettelkasten.de/the-archive/) is an editor specifically designed to support and implement a zettelkasten in plain text markdown files. Apps like [Obsidian]() and [Roam Reasearch]() facilitate the zettelkasten method with features like backlinks, visual graphs, rich text formatting, and more.

<sup>1</sup> See [https://en.wikipedia.org/wiki/Zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten) for more on the history and development of Zettelkasten.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT License](LICENSE). Feel free to fork, modify, use, and share.
