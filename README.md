# JestTestGen


Automates creation of initial unit test files taking dependencies into account.

Supported exported types:

* ES6 Classes default export or named exports
* exported POJOs with methods
* exported named functions and arrow functions
* async function and methods will generate async test blocks

This tool will take a js/ts file as input and generate a jest unit test file next to it with all imports mocked and tests stubs for every class method and function exported.

## Preview

Basic input/output example: 

![Basic](./assets/demo.jpg)

## Usage

### Installation

run `npm i -g jest-test-gen`

### Basic Usage

run `jest-test-gen <path-to-file>`

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
