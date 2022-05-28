# JestTestGen
![badgenpm](https://img.shields.io/npm/dm/jest-test-gen.svg) ![badgenpm](https://img.shields.io/npm/v/jest-test-gen.svg)

Automates creation of initial unit test files taking dependencies into account.

Supported exports:

* React Functional components 🆕
* React Class based components 🆕
* ES6 Classes default export or named exports
* Exported named functions and arrow functions
* Exported POJOs with methods
* Async functions and methods

This tool will take a js/ts file as input and generate a jest unit test file next to it with all imports mocked and tests stubs for every class method and function exported.

This project is inspired and started as a fork of [jasmine-unit-test-generator](https://github.com/FDIM/jasmine-unit-test-generator)

## Preview

Basic ES6 Class example: 

![Basic](./assets/demo.jpg)

React Component example:

![ReactComponent](./assets/component.jpg)

## Usage

### Installation

run `npm i -g jest-test-gen`

### Basic Usage

run `jest-test-gen <path-to-file>`

## TODO

* Custom test output for React components
* Enhance jest.mock support
* TS unit test output for Typescript sources

## Development

It's probably best to:

* add an input file in `spec/fixtures` folder test.js
* add expected output file, e.g. expected.test.js
* link them in integration.spec.ts

Alternavely, you can:

* run `npm link`
* run `npm run build:dev`
* run `jest-test-gen <option>` in your project of choice

## Release
run `npm run build`
run `npm publish`
