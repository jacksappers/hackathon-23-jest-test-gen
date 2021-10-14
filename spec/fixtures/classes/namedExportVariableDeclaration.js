import moduleOne from 'moduleOne';
import moduleTwo from 'moduleTwo';
import myDefaultExport, { myNamedExport } from 'moduleThree/deep/file';
import helpers from './local/helpers';

export const MyVarClass = class {
  constructor(options = {}) {
    console.log('hello from MyVarClass');
  }

  hiThere() {}

  myDemoMethod(myMethodArg1) {

  }
};