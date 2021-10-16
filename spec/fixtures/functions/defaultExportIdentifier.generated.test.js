import moduleOne from 'moduleOne';
import moduleTwo from 'moduleTwo';
import myDefaultExport, { myNamedExport } from 'moduleThree/deep/file';
import helpers from './local/helpers';
import helloDefFunc  from './defaultExportIdentifier';

jest.mock('moduleOne')
jest.mock('moduleTwo')
jest.mock('moduleThree/deep/file')
jest.mock('./local/helpers', () => ({}))

describe('helloDefFunc', () => {
  it('should expose a function', async () => {
    //const retValue = await helloDefFunc()
    expect(false).toBeTruthy()
  });
});