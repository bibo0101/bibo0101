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
    { id: '3', parentId: '1', name: …
