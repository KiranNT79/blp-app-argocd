# @dlcm/cc-blp-react

## Overview

`@dlcm/cc-blp-react` is a blueprint for a micro frontend application based on `React.js` that provides various UI screens and functionalities designed for use in shell application. It is part of the DLCM project.

## Table of Contents

- [Installation](#installation)
    - [Shell compatible dev server](#compiles-and-hot-reloads-for-development)
    - [Local development](#compiles-and-hot-reloads-for-development)
    - [Build](#compiles-and-minifies-for-production)
    - [Test](#run-your-tests)
        - [Run in watch mode](#run-your-unit-tests-in-watch-mode)
    - [Lint](#lints-and-fixes-files)
    - [Docker](#docker)
- [References](#references)



## Installation

To install the dependencies for this project, run:

```bash
yarn
```

> NOTE: Each time the branch is changed, the dependencies could have been changed too. So you need to call `yarn` again to make sure everything is up-to-date!


### Compiles and hot-reloads for shell compatible dev server
```bash
yarn start
```

### Compiles and hot-reloads for development
```bash
yarn start:standalone
```

### Compiles and minifies for production
```bash
yarn build
```

### Run your tests
```bash
yarn test
```

### Run your unit tests in watch mode
```bash
yarn watch-tests
```

### Lints and fixes files
```bash
yarn format
```

### Docker

To run the project as docker container, run:

```bash
docker build -t dlcm-cc-blp-react .
docker run -d --name dlcm-cc-blp-react-container -p 9050:9050 dlcm-cc-blp-react
```

## References

### Single Spa

- [Building single-spa applications](https://single-spa.js.org/docs/building-applications/)

- [Single Spa React Ecosystem](https://single-spa.js.org/docs/ecosystem-react)

