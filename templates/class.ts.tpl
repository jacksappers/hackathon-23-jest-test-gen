<% imports.forEach(function(value) { %>
<%=value.importText %><% }) %>
import <%if(defaultExport){ %><%=defaultExport.name %> <% }%><%=(defaultExport && namedExportsList.length ? ',' : '') %><%if(namedExportsList.length) {%>{ <%=namedExportsList %> }<%} %> from <%=quoteSymbol %><%=path.split('.').slice(0,-1).join('.') %><%=quoteSymbol %>;
<% imports.forEach(function(value) { %>
<% if(['.','/'].includes(value.path[1])) {%>
jest.mock(<%=value.path%>, () => ({}))<% }
 else { %>jest.mock(<%=value.path%>)<% }%>
<% }) %>
<% if(parsedSource.exportClass) {%>
describe('<%=parsedSource.exportClass.name %>', () => {
  let <%=instanceVariableName %>;

  beforeEach(() => {
    <%=instanceVariableName %> = new <%=parsedSource.exportClass.name %>();
  });

  it('<%=instanceVariableName %> should be an instanceof <%=parsedSource.exportClass.name %> ', () => {
    expect(<%=instanceVariableName %> instanceof <%=parsedSource.exportClass.name %>).toBeTruthy();
  });

  <% parsedSource.exportClass.methods.forEach(function(value) { %>
  it('should have a method <%=value.methodName %>()', <%if(value.isAsync){%>async<%}%> () => {
    //<%if(value.isAsync){%>await <%}%><%=instanceVariableName %>.<%=value.methodName %>(<%=value.params %>)
    expect(false).toBeTruthy()
  });
  <% }) %>
});
<% } %>
<% parsedSource.exportFunctions.forEach(function(value) { %>
describe('<%=value.name %>', () => {
  it('should expose a function', <%if(value.isAsync){%>async<%}%> () => {
    //const retValue = <%if(value.isAsync){%>await <%}%><%=value.name %>(<%=value.params %>)
    expect(false).toBeTruthy()
  });
});
<% })%>
<% parsedSource.exportPojos.forEach(function(value) { %>
describe('<%=value.name %>', () => {
  <% value.methods.forEach(function(method) { %>
  it('should expose a method <%=method.methodName %>()', <%if(value.isAsync){%>async<%}%> () => {
    //const retValue = <%if(value.isAsync){%>await <%}%><%=value.name %>.<%=method.methodName %>(<%=method.params %>)
    expect(false).toBeTruthy()
  });
  <% })%>
});
<% })%>
