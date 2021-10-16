<% allImports.forEach(function(value) { %><% if(['.','/'].includes(value.path[1])) {%>jest.mock(<%=value.path%>, () => ({}))<% }else { %>jest.mock(<%=value.path%>)<% }%>
<% }) %>