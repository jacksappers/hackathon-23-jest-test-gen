import moduleOne from 'moduleOne';
import moduleTwo from 'moduleTwo';
import myDefaultExport, { myNamedExport } from 'moduleThree/deep/file';
import helpers from './local/helpers';

class MyDemoClass {
  constructor(options = {}) {
    console.log('hello from MyDemoClass');
  }

  hiThere() {}

  myDemoMethod() {

  }
};
export { MyDemoClass };