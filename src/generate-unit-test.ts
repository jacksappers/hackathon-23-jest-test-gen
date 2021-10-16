const template = require('lodash/template');
const trimEnd = require('lodash/trimEnd');

import { ParsedSourceFile, ParsedImport } from './model';
import { basename } from 'path';
import { readFileSync } from 'fs';
import debugFactory from 'debug';

const debug = debugFactory('jest-test-gen/generate-unit-test');
export function generateUnitTest(path: string, _sourceCode: string, input: ParsedSourceFile) {
  if (input.classes.length > 1) {
    console.warn('Multiple classes detected in source file, will only consider the first class declaration');
  }
  debug('parsedSourceCode', input);
  const templateOptions = {
    instanceVariableName: 'instance',
  }
  const templateDir = `${__dirname}/../templates`;
  const relativePath = './' + basename(path).replace('.ts', '');
  const quoteSymbol = determinateUsedQuote(input.imports);

  let namedExportsList = [
    ...input.exportFunctions,
    ...input.exportPojos,
  ];
  if(input.exportClass){
    namedExportsList.unshift(input.exportClass);
  }
  const namedExportsNameList = namedExportsList.filter(exp => !exp.isDefaultExport).map(exp => exp.name);
  const maybeDefaultExport = namedExportsList.find(exp => exp.isDefaultExport);
  if (maybeDefaultExport) {
    maybeDefaultExport.name = maybeDefaultExport.name || basename(path).replace(/\.\w+/, '');
  }
  
  const testImports = template(
    readFileSync(`${templateDir}/imports.tpl`).toString()
  )({
    namedExportsList: namedExportsNameList.join(', '),
    defaultExport: maybeDefaultExport,
    path: relativePath,
    quoteSymbol,
    allImports: input.imports,
    parsedSource: input,
    ...templateOptions,
  });
  const testMocks = template(
    readFileSync(`${templateDir}/mocksDefinition.tpl`).toString()
  )({
    namedExportsList: namedExportsNameList.join(', '),
    defaultExport: maybeDefaultExport,
    path: relativePath,
    quoteSymbol,
    allImports: input.imports,
    parsedSource: input,
    ...templateOptions,
  })
  const testClass = template(
    readFileSync(`${templateDir}/classDescribe.tpl`).toString()
  )({
    namedExportsList: namedExportsNameList.join(', '),
    defaultExport: maybeDefaultExport,
    path: relativePath,
    quoteSymbol,
    allImports: input.imports,
    parsedSource: input,
    ...templateOptions,
  });
  const testFunctions = template(
    readFileSync(`${templateDir}/functionsDescribe.tpl`).toString()
  )({
    namedExportsList: namedExportsNameList.join(', '),
    defaultExport: maybeDefaultExport,
    path: relativePath,
    quoteSymbol,
    allImports: input.imports,
    parsedSource: input,
    ...templateOptions,
  })
  const testPojos = template(
    readFileSync(`${templateDir}/pojosDescribe.tpl`).toString()
  )({
    namedExportsList: namedExportsNameList.join(', '),
    defaultExport: maybeDefaultExport,
    path: relativePath,
    quoteSymbol,
    allImports: input.imports,
    parsedSource: input,
    ...templateOptions,
  })
  return trimEnd([
    testImports,
    testMocks,
    testClass,
    testFunctions,
    testPojos,
  ].filter(hasOutput => hasOutput).join('\r\n'), 
  '\r\n');
}

function determinateUsedQuote(imports: ParsedImport[]): string {

  for (const value of imports) {
    if (value.path.match(/['"']/)) {
      return value.path.substring(0, 1);
    }
  }

  return '\'';
}
