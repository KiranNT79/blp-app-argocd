# @dlcm/cc-blp-vue

## Overview

`@dlcm/cc-blp-vue` is a blueprint for a micro frontend application based on `Vue.js` that provides various UI screens and functionalities designed for use in shell application. It is part of the DLCM project.

## Table of Contents

- [Installation](#installation)
    - [Shell compatible dev server](#compiles-and-hot-reloads-for-development)
    - [Local development](#compiles-and-hot-reloads-for-development)
    - [Build](#compiles-and-minifies-for-production)
    - [Test](#run-your-unit-tests)
        - [Run in watch mode](#run-your-unit-tests-in-watch-mode)
        - [E2E Test](#run-your-end-to-end-tests)
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
yarn serve
```

### Compiles and hot-reloads for development
```bash
yarn serve:standalone
```

### Compiles and minifies for production
```bash
yarn build
```

### Run your unit tests
```bash
yarn test:unit
```

### Run your unit tests in watch mode
```bash
yarn test:unit:watch
yarn test:unit:watch -- yourTest.spec.ts
```

### Run your end-to-end tests
```bash
yarn test:e2e
```

### Lints and fixes files
```bash
yarn lint
```

### Docker

To run the project as docker container, run:

```bash
docker build -t dlcm-cc-blp-vue .
docker run -d --name dlcm-cc-blp-vue-container -p 9060:9060 dlcm-cc-blp-vue
```

## References

### Customize configuration
- [Configuration Reference](https://cli.vuejs.org/config/).

### Single Spa

- [Building single-spa applications](https://single-spa.js.org/docs/building-applications/)


- [Single Spa Vue Ecosystem](https://single-spa.js.org/docs/ecosystem-vue/)