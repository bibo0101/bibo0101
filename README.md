import { render } from '@testing-library/react';
import { select } from 'd3';
import FlowChart from './valpre-tree-chart';

jest.mock('d3', () => ({
  select: jest.fn(() => ({
    append: jest.fn(() => ({
      attr: jest.fn().mockReturnThis(),
    })),
  })),
}));

test('renders the first arrow correctly', () => {
  const mockData = {
    descendants: () => [
      { x: 100, y: 200 },
      { x: 300, y: 400 },
    ],
  };

  render(<FlowChart root={mockData} />);
  expect(select).toHaveBeenCalledWith('svg');
  expect(select().append).toHaveBeenCalledWith('path');
  expect(select().append().attr).toHaveBeenCalledWith('class', 'arrow');
  expect(select().append().attr).toHaveBeenCalledWith('fill', 'gray');
  expect(select().append().attr).toHaveBeenCalledWith(
    'd',
    expect.stringMatching(/^M\d+,\d+ L\d+,\d+$/) // Validate the d attribute
  );
});
