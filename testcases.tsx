import React from "react";
import { render } from "@testing-library/react";
import * as d3 from "d3";
import TreeChart from "./TreeChart"; // Replace with your component path

// Mock Data
const mockRoot = {
  descendants: () => [
    { x: 100, y: 100 }, // First parent node
    { x: 200, y: 200 }, // Second parent node (anotherParentNode)
  ],
};

describe("TreeChart First Condition Tests", () => {
  beforeEach(() => {
    jest.spyOn(d3, "select").mockImplementation(() => ({
      selectAll: jest.fn().mockReturnThis(),
      data: jest.fn().mockReturnThis(),
      enter: jest.fn().mockReturnThis(),
      append: jest.fn().mockReturnThis(),
      attr: jest.fn().mockReturnThis(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the arrow path for the first parent node", () => {
    render(<TreeChart root={mockRoot} />);

    const firstParentNode = mockRoot.descendants()[0];
    expect(firstParentNode).toBeDefined();
    expect(firstParentNode.x).toEqual(100);
    expect(firstParentNode.y).toEqual(100);

    // Check if the path for the first parent node is appended
    expect(d3.select().append).toHaveBeenCalledWith("path");
    expect(d3.select().attr).toHaveBeenCalledWith("class", "arrow");
    expect(d3.select().attr).toHaveBeenCalledWith(
      "d",
      expect.stringContaining(`M${firstParentNode.x},${firstParentNode.y}`)
    );
  });
});

----------------------------------------
  describe("TreeChart Second Condition Tests", () => {
  it("should render the arrow path for the second parent node", () => {
    render(<TreeChart root={mockRoot} />);

    const anotherParentNode = mockRoot.descendants()[1];
    expect(anotherParentNode).toBeDefined();
    expect(anotherParentNode.x).toEqual(200);
    expect(anotherParentNode.y).toEqual(200);

    // Check if the path for the second parent node is appended
    expect(d3.select().append).toHaveBeenCalledWith("path");
    expect(d3.select().attr).toHaveBeenCalledWith("class", "arrow");
    expect(d3.select().attr).toHaveBeenCalledWith(
      "d",
      expect.stringContaining(`M${anotherParentNode.x},${anotherParentNode.y}`)
    );
  });
});
