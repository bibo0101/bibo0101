import * as d3 from "d3";

describe("Tree Chart Node Path Generation", () => {
  // Mock Data
  const mockRoot = {
    descendants: () => [
      { x: 100, y: 100 }, // First parent node
      { x: 200, y: 200 }, // Second parent node
    ],
  };

  const nodeHeight = 50;

  it("should generate the correct path for the first parent node", () => {
    const firstParentNode = mockRoot.descendants()[0];

    if (firstParentNode) {
      const x = firstParentNode.x ?? 0;
      const y = firstParentNode.y ?? 0;

      // Calculate the path
      const d = `M${x},${y} L${x + 10},${y + nodeHeight / 2}`;
      expect(d).toBe("M100,100 L110,125");

      // Verify attributes
      const svg = d3.select("body").append("svg");
      svg.append("path").attr("d", d).attr("class", "arrow");

      const path = svg.select("path");
      expect(path.attr("d")).toBe(d);
      expect(path.attr("class")).toBe("arrow");
    }
  });

  it("should generate the correct path for the second parent node", () => {
    const anotherParentNode = mockRoot.descendants()[1];

    if (anotherParentNode) {
      const x1 = anotherParentNode.x ?? 0;
      const y1 = anotherParentNode.y ?? 0;

      // Calculate the path
      const d = `M${x1},${y1} L${x1 + 10},${y1 + nodeHeight / 2}`;
      expect(d).toBe("M200,200 L210,225");

      // Verify attributes
      const svg = d3.select("body").append("svg");
      svg.append("path").attr("d", d).attr("class", "arrow");

      const path = svg.select("path");
      expect(path.attr("d")).toBe(d);
      expect(path.attr("class")).toBe("arrow");
    }
  });
});
