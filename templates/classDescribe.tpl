<% if(parsedSource.exportClass) {%>describe('<%=parsedSource.exportClass.name %>', () => {
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