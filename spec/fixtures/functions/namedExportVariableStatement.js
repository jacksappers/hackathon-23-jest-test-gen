import moduleOne from 'moduleOne';
import moduleTwo from 'moduleTwo';
import myDefaultExport, { myNamedExport } from 'moduleThree/deep/file';
import helpers from './local/helpers';

const helloAssignedArrowFunction = (myArgOne, myArgTwo) => {

};

const myAsyncAssignedFunc = async (arg1) => {

}

export { helloAssignedArrowFunction, myAsyncAssignedFunc};