<% if(parsedSource.exportComponents.length){%>const renderTree = tree => renderer.create(tree);<%}%>
<% parsedSource.exportComponents.forEach(function(value) { %>describe('<<%=value.name %>>', () => {
  <% if(value.props.filter(function(prop) {return !prop.isOptional})){ %> 
  it('should render component', () => {
    expect(renderTree(<<%=value.name %> <% value.props.filter(function(prop) {return !prop.isOptional}).forEach(function(propType) { %> 
      <%=propType.name %>={/* <%=propType.type %> */} <%}) %>
    />).toJSON()).toMatchSnapshot();
  });<%} %>
  <% if(value.props.length){ %>it('should render component with props', () => {
    expect(renderTree(<<%=value.name %> <% value.props.forEach(function(propType) { %> 
      <%=propType.name %>={/* <%=propType.type %> */} <%}) %>
    />).toJSON()).toMatchSnapshot();
  });<%} %>
});
<% })%>
