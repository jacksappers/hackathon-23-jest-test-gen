import * as ts from 'typescript';
import { ParsedSourceFile, ParsedClass, ParsedPojo } from './model';

export function parseSourceFile(file: ts.SourceFile): ParsedSourceFile {
  const result: ParsedSourceFile = {
    imports: [],
    exportFunctions: [],
    exportPojos: [],
    exportClass: undefined,
    classes: [],
    functions: [],
    pojos: [],
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
      case ts.SyntaxKind.ExportDeclaration:
        exportDeclarationWalker(node as ts.ExportDeclaration);
        break;
      case ts.SyntaxKind.ExportAssignment:
        exportAssignementWalker(node as ts.ExportAssignment);
        break;
      default:
        ts.forEachChild(node, walker);
    }
  }
  function hasAsyncModifier(node: ts.ClassDeclaration | ts.FunctionDeclaration |  ts.FunctionExpression | ts.MethodDeclaration) {
    return node.modifiers ? node.modifiers.some(mod => mod.kind === ts.SyntaxKind.AsyncKeyword): false;
  }
  function hasExportModifier(node: ts.ClassDeclaration | ts.FunctionDeclaration | ts.VariableStatement) {
    return node.modifiers ? node.modifiers.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword): false;
  }
  function hasDefaultModifier(node: ts.ClassDeclaration | ts.FunctionDeclaration | ts.FunctionExpression | ts.VariableStatement) {
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
        const methodChild = child as ts.MethodDeclaration;
        const methodName = methodChild.name ? (methodChild.name as ts.Identifier).escapedText : '';
        klass.methods.push({
          methodName,
          params: methodChild.parameters.map(param => (param.name as ts.Identifier).escapedText),
          isAsync: hasAsyncModifier(methodChild)
        })
      }
    });
    result.classes.push(klass)
    if (hasExportModifier(node)) {
      result.exportClass = klass;
    }
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
    const parsedFunction = {
      name: node.name ? node.name.escapedText: '',
      params: node.parameters.map(param => (param.name as ts.Identifier).escapedText),
      isAsync: hasAsyncModifier(node),
      isDefaultExport: hasDefaultModifier(node)
    };
    if(hasExportModifier(node)){
      result.exportFunctions.push(parsedFunction);
    } else {
      result.functions.push(parsedFunction);
    }
  }

  function variableStatementWalker(node: ts.VariableStatement){
    // check only exported variable statements.
    if(node.declarationList){
      node.declarationList.forEachChild((child) => {
        //handle arrow function declaration
        const varChild = child as ts.VariableDeclaration;
        if(varChild.initializer && varChild.initializer.kind === ts.SyntaxKind.ArrowFunction){
          const parsedFunction = {
            name: (varChild.name as ts.Identifier).escapedText,
            params: (varChild.initializer as ts.FunctionExpression).parameters.map(param => (param.name as ts.Identifier).escapedText),
            isAsync: hasAsyncModifier(varChild.initializer as ts.FunctionExpression),
            isDefaultExport: hasDefaultModifier(varChild.initializer as ts.FunctionExpression),
          };
          if(hasExportModifier(node)) {
            result.exportFunctions.push(parsedFunction);
          } else {
            result.functions.push(parsedFunction);
          }
        }
        //handle exported pojo with callable methods
        if(varChild.initializer && varChild.initializer.kind === ts.SyntaxKind.ObjectLiteralExpression){
          const parsedPojo: ParsedPojo = {
            name: varChild.name && (varChild.name as ts.Identifier).escapedText,
            isDefaultExport: hasDefaultModifier(varChild.initializer as ts.FunctionExpression),
            methods: [],
          };
          (varChild.initializer as ts.ObjectLiteralExpression).properties.forEach((propNode: ts.Node) => {
            if (propNode.kind === ts.SyntaxKind.MethodDeclaration){
              const methodNode = propNode as ts.MethodDeclaration;
              const methodName = methodNode.name ? (methodNode.name as ts.Identifier).escapedText : '';
              parsedPojo.methods.push({
                methodName,
                params: methodNode.parameters.map(param => (param.name as ts.Identifier).escapedText),
                isAsync: hasAsyncModifier(methodNode)
              })
            }
          });
          if(hasExportModifier(node)) {
            result.exportPojos.push(parsedPojo);
          } else {
            result.pojos.push(parsedPojo);
          }
        }
        if(varChild.initializer && varChild.initializer.kind === ts.SyntaxKind.ClassExpression){
          const klassExp: ParsedClass = {
            name: varChild.name && (varChild.name as ts.Identifier).escapedText,
            methods: [],
            isDefaultExport: false,
          };
          ts.forEachChild(varChild.initializer, (child) => {
            const methodChild = child as ts.MethodDeclaration;
            if (child.kind === ts.SyntaxKind.MethodDeclaration){
              const methodName = methodChild.name ? (methodChild.name as ts.Identifier).escapedText : '';
              klassExp.methods.push({
                methodName,
                params: (child as ts.MethodDeclaration).parameters.map(param => (param.name as ts.Identifier).escapedText),
                isAsync: hasAsyncModifier(child as ts.MethodDeclaration)
              })
            }
          });
          result.classes.push(klassExp);
          result.exportClass = klassExp;
        }
      })
    }
  }

  function exportDeclarationWalker(node: ts.ExportDeclaration){
    node.exportClause && (node.exportClause as ts.NamedExports).elements.forEach(identifier => {
      const idName = identifier.name.escapedText;
      const foundClassByIdentifier = result.classes.find(klass => klass.name === idName);
      if(foundClassByIdentifier) {
        result.exportClass = foundClassByIdentifier;
      }
      const foundFunctionByIdentifier = result.functions.find(func => func.name === idName);
      if(foundFunctionByIdentifier){
        result.exportFunctions.push(foundFunctionByIdentifier);
      }
      const foundPojoByIdentifier = result.pojos.find(pojo => pojo.name === idName);
      if(foundPojoByIdentifier){
        result.exportPojos.push(foundPojoByIdentifier);
      }
    });
  }

  function exportAssignementWalker(node: ts.ExportAssignment){
    const idName = (node.expression as ts.Identifier).escapedText;
    const foundClassByIdentifier = result.classes.find(klass => klass.name === idName);
    if(foundClassByIdentifier) {
      result.exportClass = {
       ...foundClassByIdentifier,
       isDefaultExport: true,
      };
    }
    const foundFunctionByIdentifier = result.functions.find(func => func.name === idName);
    if(foundFunctionByIdentifier){
      result.exportFunctions.push({
        ...foundFunctionByIdentifier,
        isDefaultExport: true,
      });
    }
    const foundPojoByIdentifier = result.pojos.find(pojo => pojo.name === idName);
      if(foundPojoByIdentifier){
        result.exportPojos.push({
          ...foundPojoByIdentifier,
          isDefaultExport: true,
        })
      }
  }
}
