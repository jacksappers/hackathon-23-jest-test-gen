<% parsedSource.exportComponents.forEach(function(value) { %>describe('<<%=value.name %>>', () => {<% if(value.props.filter(function(prop) {return !prop.isOptional})){ %>
  it('should render component', () => {
    render(<<%=value.name %> <% value.props.filter(function(prop) {return !prop.isOptional}).forEach(function(propType) { %> 
      <%=propType.name %>={/* <%=propType.type %> */} <%}) %>
    />);
    expect(document.querySelector('body')).toMatchSnapshot();
  });<%} %>
  <% if(value.props.length){ %>it('should render component with props', () => {
    render(<<%=value.name %> <% value.props.forEach(function(propType) { %> 
      <%=propType.name %>={/* <%=propType.type %> */} <%}) %>
    />);
    expect(document.querySelector('body')).toMatchSnapshot();
  });<%} %>
});
<% })%>
