import moduleOne from 'moduleOne';
import moduleTwo from 'moduleTwo';
import myDefaultExport, { myNamedExport } from 'moduleThree/deep/file';
import helpers from './local/helpers';
import defaultExportAssignement  from './defaultExportAssignement';

jest.mock('moduleOne')
jest.mock('moduleTwo')
jest.mock('moduleThree/deep/file')
jest.mock('./local/helpers', () => ({}))

describe('defaultExportAssignement', () => {
  it('should expose a function',  () => {
    //const retValue = defaultExportAssignement(myArgOne,myArgTwo)
    expect(false).toBeTruthy()
  });
});