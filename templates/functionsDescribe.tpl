<% parsedSource.exportFunctions.forEach(function(value) { %>describe('<%=value.name %>', () => {
  it('should expose a function', <%if(value.isAsync){%>async <%}%>() => {
    // const retValue = <%if(value.isAsync){%>await <%}%><%=value.name %>(<%=value.params %>);
    expect(false).toBeTruthy();
  });
});
<% })%>