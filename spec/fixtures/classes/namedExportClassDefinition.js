import moduleOne from 'moduleOne';
import moduleTwo from 'moduleTwo';
import myDefaultExport, { myNamedExport } from 'moduleThree/deep/file';
import helpers from './local/helpers';

let moduleState = 1;

const myTestHelper = (arg1, arg2) => {
  return moduleState;
}

export class MyDemoClass {
  constructor(options = {}) {
    console.log('hello from MyDemoClass');
  }

  hiThere(name, surname) {
    console.log(`${name} ${surname}`);
  }

  myDemoMethodOne(demoParam) {
    return demoParam;
  }
  myDemoMethodTwo(demoParam) {}
  myDemoMethodThree(demoParam) {}
};

export { myTestHelper };