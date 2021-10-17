import moduleOne from 'moduleOne';
import moduleTwo from 'moduleTwo';
import myDefaultExport, { myNamedExport } from 'moduleThree/deep/file';
import helpers from './local/helpers';
import MyDemoClass  from './defaultExportIdentifier';

jest.mock('moduleOne');
jest.mock('moduleTwo');
jest.mock('moduleThree/deep/file');
jest.mock('./local/helpers');

describe('MyDemoClass', () => {
  let instance;

  beforeEach(() => {
    instance = new MyDemoClass();
  });

  it('instance should be an instanceof MyDemoClass', () => {
    expect(instance instanceof MyDemoClass).toBeTruthy();
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