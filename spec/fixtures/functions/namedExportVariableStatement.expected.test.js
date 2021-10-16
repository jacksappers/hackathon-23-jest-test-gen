import moduleOne from 'moduleOne';
import moduleTwo from 'moduleTwo';
import myDefaultExport, { myNamedExport } from 'moduleThree/deep/file';
import helpers from './local/helpers';
import { helloAssignedArrowFunction, myAsyncAssignedFunc } from './namedExportVariableStatement';

jest.mock('moduleOne')
jest.mock('moduleTwo')
jest.mock('moduleThree/deep/file')
jest.mock('./local/helpers', () => ({}))

describe('helloAssignedArrowFunction', () => {
  it('should expose a function',  () => {
    //const retValue = helloAssignedArrowFunction(myArgOne,myArgTwo)
    expect(false).toBeTruthy()
  });
});
describe('myAsyncAssignedFunc', () => {
  it('should expose a function', async () => {
    //const retValue = await myAsyncAssignedFunc(arg1)
    expect(false).toBeTruthy()
  });
});