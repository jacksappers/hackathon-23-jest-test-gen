
export interface ParsedClass {
  name: string;
  methods: ParsedMethod[];
  isDefaultExport: boolean;
}

export interface ParsedMethod {
  methodName: string;
  isAsync: boolean;
  params: string[];
}

export interface ParsedFunction {
  name?: string;
  isAsync: boolean;
  isDefaultExport: boolean;
}

export interface ParsedPojo {
  name: string;
  methods: ParsedMethod[];
  isDefaultExport: boolean;
}

export interface ParsedClassDependency {
  name: string;
  type?: string;
  token?: string;
}
export interface ParsedImport {
  path: string;
  names: string[];
  importText: string;
}

export interface ParsedSourceFile {
  imports: ParsedImport[];
  exportFunctions: ParsedFunction[],
  exportPojos: ParsedPojo[],
  exportClass?: ParsedClass,
  classes: ParsedClass[];
  functions: ParsedFunction[],
  pojos: ParsedPojo[],
}

export interface ClassOptions {
  declarations: { name: string, type: string }[];
  initializers: { name?: string, value: string }[];
  dependencies: { name: string, token: string }[];
  imports: ParsedImport[];
}

export interface TemplateOptions {
  instanceVariableName: string;
  templateType: string;
  templatePath: string;
}

export interface DependencyHandlerOptions {
  variableName: string;
  injectionToken?: string;
  sourceCode: string;
  allImports: ParsedImport[];
  quoteSymbol: string;
}
export interface DependencyHandler {
  run(result: ClassOptions, dep: ParsedClassDependency, options: DependencyHandlerOptions): void

  test(dep: ParsedClassDependency): boolean;
};