
import moduleOne from 'moduleOne';
import moduleTwo from 'moduleTwo';
import myDefaultExport, { myNamedExport } from 'moduleThree/deep/file';
import helpers from './local/helpers';
import defaultExportAssignment  from './defaultExportAssignment';

jest.mock('moduleOne')

jest.mock('moduleTwo')

jest.mock('moduleThree/deep/file')


jest.mock('./local/helpers', () => ({}))


describe('defaultExportAssignment', () => {
  let instance;

  beforeEach(() => {
    instance = new defaultExportAssignment();
  });

  it('instance should be an instanceof defaultExportAssignment ', () => {
    expect(instance instanceof defaultExportAssignment).toBeTruthy();
  });

  
  it('should have a method hiThere()',  () => {
    //  instance.hiThere()
    expect(false).toBeTruthy()
  });
  
  it('should have a method myDemoMethod()',  () => {
    //  instance.myDemoMethod()
    expect(false).toBeTruthy()
  });
  
});