import moduleOne from 'moduleOne';
import moduleTwo from 'moduleTwo';
import myDefaultExport, { myNamedExport } from 'moduleThree/deep/file';
import helpers from './local/helpers';
import { MyVarClass } from './namedExportVariableDeclaration';

jest.mock('moduleOne')
jest.mock('moduleTwo')
jest.mock('moduleThree/deep/file')
jest.mock('./local/helpers', () => ({}))

describe('MyVarClass', () => {
  let instance;

  beforeEach(() => {
    instance = new MyVarClass();
  });
  it('instance should be an instanceof MyVarClass ', () => {
    expect(instance instanceof MyVarClass).toBeTruthy();
  });
  
  it('should have a method hiThere()',  () => {
    //instance.hiThere()
    expect(false).toBeTruthy()
  });
  
  it('should have a method myDemoMethod()',  () => {
    //instance.myDemoMethod(myMethodArg1)
    expect(false).toBeTruthy()
  });
  
});