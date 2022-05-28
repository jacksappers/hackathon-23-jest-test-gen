import moduleOne from 'moduleOne';
import moduleTwo from 'moduleTwo';
import myDefaultExport, { myNamedExport } from 'moduleThree/deep/file';
import helpers from './local/helpers';
import DefaultExportAssignment from './defaultExportAssignment';

jest.mock('moduleOne');
jest.mock('moduleTwo');
jest.mock('moduleThree/deep/file');
jest.mock('./local/helpers');

describe('DefaultExportAssignment', () => {
  let instance;

  beforeEach(() => {
    instance = new DefaultExportAssignment();
  });

  it('instance should be an instanceof DefaultExportAssignment', () => {
    expect(instance instanceof DefaultExportAssignment).toBeTruthy();
  });

  it('should have a method hiThere()', () => {
    // instance.hiThere();
    expect(false).toBeTruthy();
  });

  it('should have a method myDemoMethod()', () => {
    // instance.myDemoMethod();
    expect(false).toBeTruthy();
  });
});