import React from 'react';
import { render, screen } from '@testing-library/react';
import Flowchart from './Flowchart'; // Path to your Flowchart component
import * as d3 from 'd3'; // Mocked d3

jest.mock('d3', () => ({
  stratify: jest.fn(() => ({
    id: jest.fn().mockReturnThis(),
    parentId: jest.fn().mockReturnThis(),
    (data: any) => ({
      each: jest.fn(),
      x: 0,
      y: 0,
      children: [],
    }),
  })),
  tree: jest.fn(() => ({
    size: jest.fn().mockReturnThis(),
    nodeSize: jest.fn().mockReturnThis(),
  })),
  hierarchy: jest.fn(),
}));

describe('Flowchart Component', () => {
  const mockData = [
    { id: '1', parentId: null, name: 'Root' },
    { id: '2', parentId: '1', name: 'Child 1' },
    { id: '3', parentId: '1', name: 'Child 2' },
  ];

  it('renders node text correctly', () => {
    render(<Flowchart data={mockData} width={500} height={500} />);

    // Assert nodes are rendered with correct text
    expect(screen.getByText('Root')).toBeInTheDocument();
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('calls d3 methods correctly', () => {
    render(<Flowchart data={mockData} width={500} height={500} />);

    // Check that stratify is called with correct data
    expect(d3.stratify).toHaveBeenCalledTimes(1);
    expect(d3.stratify().id).toHaveBeenCalled();
    expect(d3.stratify().parentId).toHaveBeenCalled();

    // Check that tree layout is initialized
    expect(d3.tree).toHaveBeenCalled();
  });

  it('handles empty data gracefully', () => {
    render(<Flowchart data={[]} width={500} height={500} />);

    // Assert no nodes are rendered
    expect(screen.queryByText('Root')).not.toBeInTheDocument();
  });
});
