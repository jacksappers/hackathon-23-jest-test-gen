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
});

function createSpec(input: {
  file: string,
  spec: string,
  expected: string,
  arguments?: string[]
}) {
  beforeAll(() => {
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
      const prefix = `line(${line})`; // line number
      expect(prefix + content.shift()).toEqual(prefix + expected.shift());
    }
  });
}
