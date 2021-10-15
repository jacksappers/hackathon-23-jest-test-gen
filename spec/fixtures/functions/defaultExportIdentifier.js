import moduleOne from 'moduleOne';
import moduleTwo from 'moduleTwo';
import myDefaultExport, { myNamedExport } from 'moduleThree/deep/file';
import helpers from './local/helpers';

function localHelper() {
  console.log('test');
};

async function helloDefFunc () {
  localHelper();
}

export default helloDefFunc;