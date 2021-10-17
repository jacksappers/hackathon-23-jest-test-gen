# JestTestGen

Automates creation of initial unit test files taking dependencies into account.

Supported exported types:

* ES6 Classes default export or named exports
* Exported named functions and arrow functions
* Exported POJOs with methods
* Async function and methods will generate async test blocks

This tool will take a js/ts file as input and generate a jest unit test file next to it with all imports mocked and tests stubs for every class method and function exported.

This project is inspired and started as a fork of [jasmine-unit-test-generator](https://github.com/FDIM/jasmine-unit-test-generator)

## Preview

Basic input/output example: 

![Basic](./assets/demo.jpg)

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
