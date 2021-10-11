import * as ts from 'typescript';
import { ParsedSourceFile, ParsedClass } from './model';

export function parseSourceFile(file: ts.SourceFile): ParsedSourceFile {
  const result: ParsedSourceFile = {
    imports: [],
    exportFunctions: [],
    exportPojos: [],
    classes: []
  };
  walker(file);
  return result;

  function walker(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.ImportDeclaration:
        importsWalker(node as ts.ImportDeclaration);
        break;
      case ts.SyntaxKind.ClassDeclaration:
        classWalker(node as ts.ClassDeclaration);
        break;
      case ts.SyntaxKind.FunctionDeclaration:
        functionDeclarationWalker(node as ts.FunctionDeclaration);
        break;
      case ts.SyntaxKind.VariableStatement:
        variableStatementWalker(node as ts.VariableStatement);
        break;
      default:
        ts.forEachChild(node, walker);
    }
  }
  function hasAsyncModifier(node: ts.ClassDeclaration | ts.FunctionDeclaration) {
    return node.modifiers ? node.modifiers.some(mod => mod.kind === ts.SyntaxKind.AsyncKeyword): false;
  }
  function hasExportModifier(node: ts.ClassDeclaration | ts.FunctionDeclaration | ts.VariableStatement) {
    return node.modifiers ? node.modifiers.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword): false;
  }
  function hasDefaultModifier(node: ts.ClassDeclaration | ts.FunctionDeclaration | ts.VariableStatement) {
    return node.modifiers ? node.modifiers.some(mode => mode.kind === ts.SyntaxKind.DefaultKeyword): false;
  }
  function classWalker(node: ts.ClassDeclaration) {
    const klass: ParsedClass = {
      name: node.name && node.name.escapedText as any,
      methods: [],
      isDefaultExport: hasDefaultModifier(node),
    };
    ts.forEachChild(node, (child) => {
      if (child.kind === ts.SyntaxKind.MethodDeclaration){
        const methodName = child.name ? child.name.escapedText : '';
        klass.methods.push({
          methodName,
          isAsync: hasAsyncModifier(child)
        })
      }
    });
    result.classes.push(klass);
  }

  function importsWalker(node: ts.ImportDeclaration) {
    const names: string[] = [];
    let importText: string = ''; 
    if (node.importClause) {
      importText = node.getText();
      ts.forEachChild(node.importClause, (child) => {
        ts.forEachChild(child, (element) => {
          names.push(element.getText());
        });
      });
    }
    result.imports.push({
      path: node.moduleSpecifier.getText(),
      names,
      importText,
    });
  }

  function functionDeclarationWalker(node: ts.FunctionDeclaration){
    if(hasExportModifier(node)){
      result.exportFunctions.push({
        name: node.name && node.name.escapedText,
        params: node.parameters.map(param => param.name.escapedText),
        isAsync: hasAsyncModifier(node),
        isDefaultExport: hasDefaultModifier(node)
      });
    }
  }

  function variableStatementWalker(node: ts.VariableStatement){
    if(hasExportModifier(node) && node.declarationList){
      node.declarationList.forEachChild((child: ts.VariableDeclaration) => {
        //handle export arrow function declaration
        if(child.initializer && child.initializer.kind === ts.SyntaxKind.ArrowFunction){
          result.exportFunctions.push({
            name: child.name.escapedText,
            params: child.initializer.parameters.map(param => param.name.escapedText),
            isAsync: hasAsyncModifier(child.initializer),
            isDefaultExport: hasDefaultModifier(child.initializer),
          });
        }
        //handle exported pojo with callable methods
        if(child.initializer && child.initializer.kind === ts.SyntaxKind.ObjectLiteralExpression){
          const parsedPojo = {
            name: child.name && child.name.escapedText,
            isDefaultExport: hasDefaultModifier(child.initializer),
            methods: [],
          } 
          child.initializer.properties.forEach(propNode => {
            if (propNode.kind === ts.SyntaxKind.MethodDeclaration){
              const methodName = propNode.name ? propNode.name.escapedText : '';
              parsedPojo.methods.push({
                methodName,
                params: propNode.parameters.map(param => param.name.escapedText),
                isAsync: hasAsyncModifier(propNode)
              })
            }
          });
          result.exportPojos.push(parsedPojo);
        }
      })
    }
  }
}
