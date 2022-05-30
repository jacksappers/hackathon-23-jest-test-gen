import { run } from '../src/main';
import { unlinkSync, readFileSync } from 'fs';

const leaveSpecFilesOnDisk = true;

describe('integration', () => {
  describe(`single class default export by identifier`, () => {
    createSpec({
      file: 'spec/fixtures/classes/defaultExportIdentifier.js',
      spec: 'spec/fixtures/classes/defaultExportIdentifier.generated.test.js',
      expected: 'spec/fixtures/classes/defaultExportIdentifier.expected.test.js'
    });
  });
  describe(`single class default export of assigned class`, () => {
    createSpec({
      file: 'spec/fixtures/classes/defaultExportAssignment.js',
      spec: 'spec/fixtures/classes/defaultExportAssignment.generated.test.js',
      expected: 'spec/fixtures/classes/defaultExportAssignment.expected.test.js'
    });
  });
  describe(`single class named export of assigned class definition`, () => {
    createSpec({
      file: 'spec/fixtures/classes/namedExportClassDefinition.js',
      spec: 'spec/fixtures/classes/namedExportClassDefinition.generated.test.js',
      expected: 'spec/fixtures/classes/namedExportClassDefinition.expected.test.js'
    });
  });
  describe(`single class named export of class identifier`, () => {
    createSpec({
      file: 'spec/fixtures/classes/namedExportIdentifier.js',
      spec: 'spec/fixtures/classes/namedExportIdentifier.generated.test.js',
      expected: 'spec/fixtures/classes/namedExportIdentifier.expected.test.js'
    });
  });
  describe(`single class named export of variable declaration with class assignement`, () => {
    createSpec({
      file: 'spec/fixtures/classes/namedExportVariableDeclaration.js',
      spec: 'spec/fixtures/classes/namedExportVariableDeclaration.generated.test.js',
      expected: 'spec/fixtures/classes/namedExportVariableDeclaration.expected.test.js'
    });
  });
  describe(`function default export assignement`, () => {
    createSpec({
      file: 'spec/fixtures/functions/defaultExportAssignement.js',
      spec: 'spec/fixtures/functions/defaultExportAssignement.generated.test.js',
      expected: 'spec/fixtures/functions/defaultExportAssignement.expected.test.js'
    });
  });
  describe(`function default export identifier`, () => {
    createSpec({
      file: 'spec/fixtures/functions/defaultExportIdentifier.js',
      spec: 'spec/fixtures/functions/defaultExportIdentifier.generated.test.js',
      expected: 'spec/fixtures/functions/defaultExportIdentifier.expected.test.js'
    });
  });
  describe(`function named export definition`, () => {
    createSpec({
      file: 'spec/fixtures/functions/namedExportDefinition.js',
      spec: 'spec/fixtures/functions/namedExportDefinition.generated.test.js',
      expected: 'spec/fixtures/functions/namedExportDefinition.expected.test.js'
    });
  });
  describe(`function named export variable statement`, () => {
    createSpec({
      file: 'spec/fixtures/functions/namedExportVariableStatement.js',
      spec: 'spec/fixtures/functions/namedExportVariableStatement.generated.test.js',
      expected: 'spec/fixtures/functions/namedExportVariableStatement.expected.test.js'
    });
  });
  describe(`pojo default export identifier`, () => {
    createSpec({
      file: 'spec/fixtures/pojos/defaultExportIdentifier.js',
      spec: 'spec/fixtures/pojos/defaultExportIdentifier.generated.test.js',
      expected: 'spec/fixtures/pojos/defaultExportIdentifier.expected.test.js'
    });
  });
  describe(`pojo named export assignement`, () => {
    createSpec({
      file: 'spec/fixtures/pojos/namedExportAssignement.js',
      spec: 'spec/fixtures/pojos/namedExportAssignement.generated.test.js',
      expected: 'spec/fixtures/pojos/namedExportAssignement.expected.test.js'
    });
  });
  describe(`pojo named export identifier`, () => {
    createSpec({
      file: 'spec/fixtures/pojos/namedExportIdentifier.js',
      spec: 'spec/fixtures/pojos/namedExportIdentifier.generated.test.js',
      expected: 'spec/fixtures/pojos/namedExportIdentifier.expected.test.js'
    });
  });
  describe(`component class based`, () => {
    createSpec({
      file: 'spec/fixtures/components/classComponent.js',
      spec: 'spec/fixtures/components/classComponent.generated.test.js',
      expected: 'spec/fixtures/components/classComponent.expected.test.js'
    });
  });
  describe(`component class based - default export`, () => {
    createSpec({
      file: 'spec/fixtures/components/defaultClassComponent.js',
      spec: 'spec/fixtures/components/defaultClassComponent.generated.test.js',
      expected: 'spec/fixtures/components/defaultClassComponent.expected.test.js'
    });
  });
  describe(`component functional - default export`, () => {
    createSpec({
      file: 'spec/fixtures/components/functionalDefaultExportComponent.js',
      spec: 'spec/fixtures/components/functionalDefaultExportComponent.generated.test.js',
      expected: 'spec/fixtures/components/functionalDefaultExportComponent.expected.test.js'
    });
  });
  describe(`component functional - anonymous default export`, () => {
    createSpec({
      file: 'spec/fixtures/components/unnamedDefaultComponent.js',
      spec: 'spec/fixtures/components/unnamedDefaultComponent.generated.test.js',
      expected: 'spec/fixtures/components/unnamedDefaultComponent.expected.test.js'
    });
  });
  describe(`component functional - named export`, () => {
    createSpec({
      file: 'spec/fixtures/components/functionalNamedComponent.js',
      spec: 'spec/fixtures/components/functionalNamedComponent.generated.test.js',
      expected: 'spec/fixtures/components/functionalNamedComponent.expected.test.js'
    });
  });
  describe(`components multiple - named export`, () => {
    createSpec({
      file: 'spec/fixtures/components/multipleComponent.js',
      spec: 'spec/fixtures/components/multipleComponent.generated.test.js',
      expected: 'spec/fixtures/components/multipleComponent.expected.test.js'
    });
  });
});

function createSpec(input: {
  file: string,
  spec: string,
  expected: string,
  arguments?: string[]
}) {
  beforeAll(() => {
    //run the generator on the input file
    run([...(input.arguments || []), input.file]);
  });

  if (!leaveSpecFilesOnDisk) {
    afterAll(() => {
      unlinkSync(input.spec);
    });
  }

  it('should create a matching spec file', () => {
    const content = readFileSync(input.spec).toString().split(/\r\n|\n/) || [];
    const expected = readFileSync(input.expected).toString().split(/\r\n|\n/) || [];
    let line = 0;
    // compare lines
    while (content.length || expected.length) {
      line++;
      const prefix = `line(${line}): `; // line number
      const contentLine = content.shift();
      const expectedLine = expected.shift();
      expect(prefix + contentLine ).toEqual(prefix + expectedLine);
      if (contentLine !==  expectedLine) break;
    }
  });
}
