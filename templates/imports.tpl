<% allImports.forEach(function(value) { %><%=value.importText %>
<% }) %>import <%if(defaultExport)
{ %><%=defaultExport.name %> <% }%><%=(defaultExport && namedExportsList.length ? ',' : '') %><%if(namedExportsList.length) {%>{ <%=namedExportsList %> }<%} %> from <%=quoteSymbol %><%=path.split('.').slice(0,-1).join('.') %><%=quoteSymbol %>;
