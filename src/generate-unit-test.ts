const template = require('lodash/template');
const uniq = require('lodash/uniq');
const trimEnd = require('lodash/trimEnd');

import { ParsedSourceFile, ParsedClass, ClassOptions, DependencyHandler, ParsedImport } from './model';
import { basename } from 'path';
import { readFileSync } from 'fs';
import debugFactory from 'debug';

const debug = debugFactory('jest-test-gen/generate-unit-test');
export function generateUnitTest(path: string, sourceCode: string, input: ParsedSourceFile, handlers: DependencyHandler[]) {
  const klass = input.classes[0];
  if (input.classes.length > 1) {
    console.warn('Multiple classes detected in source file, will only consider the first class declaration');
  }
  debug('parsedSourceCode', input);
  const templateOptions = {
    instanceVariableName: 'instance',
    templateType: 'Instance',
    templatePath: __dirname + '/../templates/class.ts.tpl'
  };

  const templateText = readFileSync(templateOptions.templatePath).toString();
  const generator = template(templateText);
  const relativePath = './' + basename(path).replace('.ts', '');
  const quoteSymbol = determinateUsedQuote(input.imports);

  const classOptions = getClassOptions(klass, handlers, {
    sourceCode,
    quoteSymbol,
    imports: input.imports,
    allImports: input.imports
  });

  const uniqueImports = prepareImports(input.imports, quoteSymbol);
  let namedExportsList = [
    input.exportClass,
    ...input.exportFunctions,
    ...input.exportPojos,
  ];
  
  namedExportsList = namedExportsList.filter(exp => exp && !exp.isDefaultExport).map( exp => exp.name);
  const maybeDefaultExport = [input.exportClass,...input.exportFunctions, ...input.exportPojos].find(exp => exp && exp.isDefaultExport);
  if (maybeDefaultExport) {
    maybeDefaultExport.name = maybeDefaultExport.name || basename(path).replace(/\.\w+/, '');
  }
  return trimEnd(generator({
    namedExportsList: namedExportsList.join(', '),
    defaultExport: maybeDefaultExport,
    path: relativePath,
    quoteSymbol,
    imports: uniqueImports,
    allImports: input.imports,
    parsedSource: input,
    ...classOptions,
    ...templateOptions,
  }), '\r\n');
}


function getClassOptions(klass: ParsedClass, handlers: DependencyHandler[], options: {
  sourceCode: string,
  quoteSymbol: string,
  imports: ParsedImport[],
  allImports: ParsedImport[]
}): ClassOptions {
  const result: ClassOptions = {
    declarations: [],
    initializers: [],
    dependencies: [],
    imports: options.imports
  };

  return result;
}

function prepareImports(imports: ParsedImport[], quoteSymbol: string): ParsedImport[] {
  const result: ParsedImport[] = [];
  let index = 0;
  while (index < imports.length) {
    const value = imports[index];
    if (!value.path.match(/['"']/)) {
      value.path = quoteSymbol + value.path + quoteSymbol;
    }
    result.push(value);
    index++;

    for (let i = imports.length - 1; i >= index; i--) {
      const target = imports[i];

      if (target.path === value.path) {
        value.names = uniq(value.names.concat(target.names));
        imports.splice(i, 1);
      }
    }
  }
  return result;
}

function determinateUsedQuote(imports: ParsedImport[]): string {

  for (const value of imports) {
    if (value.path.match(/['"']/)) {
      return value.path.substring(0, 1);
    }
  }

  return '\'';
}
