import moduleOne from 'moduleOne';
import moduleTwo from 'moduleTwo';
import myDefaultExport, { myNamedExport } from 'moduleThree/deep/file';
import helpers from './local/helpers';
import { helloNamedFunction } from './namedExportDefinition';

jest.mock('moduleOne')
jest.mock('moduleTwo')
jest.mock('moduleThree/deep/file')
jest.mock('./local/helpers', () => ({}))

describe('helloNamedFunction', () => {
  it('should expose a function',  () => {
    //const retValue = helloNamedFunction(myArgOne,myArgTwo)
    expect(false).toBeTruthy()
  });
});