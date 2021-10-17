<% parsedSource.exportPojos.forEach(function(value) { %>describe('<%=value.name %>', () => {
  <% value.methods.forEach(function(method) { %>
  it('should expose a method <%=method.methodName %>()', <%if(method.isAsync){%>async <%}%>() => {
    //const retValue = <%if(method.isAsync){%>await <%}%><%=value.name %>.<%=method.methodName %>(<%=method.params %>);
    expect(false).toBeTruthy();
  });
  <% })%>
});
<% })%>