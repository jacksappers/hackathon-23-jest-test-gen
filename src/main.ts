import { readFileSync, writeFileSync } from 'fs';
import * as ts from 'typescript';
import { parseSourceFile } from './parse-source-file';
import { generateUnitTest } from './generate-unit-test';

export function run(params: string[]) {
  if (!params.length) {
    // tslint:disable-next-line:no-console
    console.error('missing path argument');
    process.exit(1);
  }

  if (params.length > 1 && params[0].indexOf('--require') === 0) {
    require(params[1]);
    params = params.slice(2);
  }

  const path = params[0];

  const specPath = path.substring(0, path.length - 2) + 'generated.test.js';
  const sourceCode = readFileSync(path).toString();

  const sourceFile = ts.createSourceFile(
    path,
    sourceCode,
    ts.ScriptTarget.Latest,
        /*setParentNodes */ true
  );

  const input = parseSourceFile(sourceFile);
  const output = generateUnitTest(path, sourceCode, input);

  writeFileSync(specPath, output);
}
