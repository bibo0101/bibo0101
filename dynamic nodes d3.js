export const FlowChart = ({ data, onNodeClick }) => {
  useEffect(() => {
    const svg = d3.select("svg"); // Ensure the correct SVG is targeted

    const node = svg
      .selectAll("g.node")
      .data(data.nodes)
      .join("g")
      .attr("class", "node")
      .attr("transform", (d: any) => translate(${d.x}, ${d.y}));

    // Dynamically adjust dimensions based on the name length
    node.each(function (d: any) {
      const nodeWidth = Math.max(100, d.name.length * 10); // Calculate width dynamically
      const nodeHeight = Math.max(50, d.name.length * 2); // Calculate height dynamically

      const nodeGroup = d3.select(this);

      // Create a rectangle with dynamic dimensions
      nodeGroup
        .append("rect")
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        .attr("x", -nodeWidth / 2) // Center horizontally
        .attr("y", -nodeHeight / 2) // Center vertically
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("class", (d: any) => {
          const colors = ["primary", "success", "danger", "warning"];
          return colors[d.depth % colors.length];
        })
        .on("click", (event, d) => {
          console.log("Node clicked", d);
          return onNodeClick(d.data);
        });

      // Add the label or text inside the rectangle
      nodeGroup
        .append("text")
        .attr("x", 0) // Center text horizontally
        .attr("y", 5) // Adjust text vertically
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(d.name);

      // Add any additional child elements dynamically positioned
      nodeGroup
        .append("foreignObject")
        .attr("width", nodeWidth - 20) // Slightly smaller than the rectangle
        .attr("height", nodeHeight - 20) // Slightly smaller than the rectangle
        .attr("x", -nodeWidth / 2 + 10) // Adjust positioning within the rectangle
        .attr("y", -nodeHeight / 2 + 10)
        .html(<div>${d.name}</div>); // Example content
    });
  }, [data, onNodeClick]);

  return (
    <svg width="100%" height="100%">
      {/* Nodes will render dynamically here */}
    </svg>
  );
};
