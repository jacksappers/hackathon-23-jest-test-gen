<% allMocks.forEach(function(value) { %>jest.mock(<%=value.path%>);
<% }) %>