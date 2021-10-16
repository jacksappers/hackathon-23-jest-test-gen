import moduleOne from 'moduleOne';
import moduleTwo from 'moduleTwo';
import myDefaultExport, { myNamedExport } from 'moduleThree/deep/file';
import helpers from './local/helpers';
import { MyDemoClass, myTestHelper } from './namedExportClassDefinition';

jest.mock('moduleOne')
jest.mock('moduleTwo')
jest.mock('moduleThree/deep/file')
jest.mock('./local/helpers', () => ({}))

describe('MyDemoClass', () => {
  let instance;

  beforeEach(() => {
    instance = new MyDemoClass();
  });
  it('instance should be an instanceof MyDemoClass ', () => {
    expect(instance instanceof MyDemoClass).toBeTruthy();
  });
  
  it('should have a method hiThere()',  () => {
    //instance.hiThere(name,surname)
    expect(false).toBeTruthy()
  });
  
  it('should have a method myDemoMethodOne()',  () => {
    //instance.myDemoMethodOne(demoParam)
    expect(false).toBeTruthy()
  });
  
  it('should have a method myDemoMethodTwo()',  () => {
    //instance.myDemoMethodTwo(demoParam)
    expect(false).toBeTruthy()
  });
  
  it('should have a method myDemoMethodThree()',  () => {
    //instance.myDemoMethodThree(demoParam)
    expect(false).toBeTruthy()
  });
  
});

describe('myTestHelper', () => {
  it('should expose a function',  () => {
    //const retValue = myTestHelper(arg1,arg2)
    expect(false).toBeTruthy()
  });
});