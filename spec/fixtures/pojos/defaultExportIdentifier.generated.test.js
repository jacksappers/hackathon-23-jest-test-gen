import moduleOne from 'moduleOne';
import moduleTwo from 'moduleTwo';
import myDefaultExport, { myNamedExport } from 'moduleThree/deep/file';
import helpers from './local/helpers';
import myPojo  from './defaultExportIdentifier';

jest.mock('moduleOne')
jest.mock('moduleTwo')
jest.mock('moduleThree/deep/file')
jest.mock('./local/helpers', () => ({}))

describe('myPojo', () => {
  
  it('should expose a method methodOne()',  () => {
    //const retValue = myPojo.methodOne(param1)
    expect(false).toBeTruthy()
  });
  
  it('should expose a method methodTwo()', async () => {
    //const retValue = await myPojo.methodTwo(a,b)
    expect(false).toBeTruthy()
  });
  
});