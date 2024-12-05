import * as d3 from 'd3';
import { HierarchyPointNode, HierarchyPointLink } from 'd3';
import { HierarchicalData } from '../../../interfaces/HierarchicalData';

/**
 * Renders links connecting nodes in a D3 hierarchical tree.
 *
 * @param svg - The D3 SVG selection to render the links on.
 * @param links - Array of hierarchical links.
 * @param nodeHeight - Height of each node (used for positioning links).
 */
export const renderLinks = (
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  links: HierarchyPointLink<HierarchicalData>[],
  nodeHeight: number
) => {
  svg.append('g')
    .selectAll('.link')
    .data(links)
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', (d) => {
      // Adjust path for vertical spacing
      const sourceX = d.source.x;
      const sourceY = d.source.y + nodeHeight / 2; // Position at the center of source node
      const targetX = d.target.x;
      const targetY = d.target.y - nodeHeight / 2; // Position at the center of target node

      // Use elbow-style path for hierarchical links
      return `M${sourceX},${sourceY}
              V${(sourceY + targetY) / 2}
              H${targetX}
              V${targetY}`;
    })
    .attr('fill', 'none')
    .attr('stroke', 'gray')
    .attr('stroke-width', 1);
};

-------------------------------------------------------main.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Icon } from '@blueprintjs/core';
import { ThemeProvider as BarclaysThemeProvider, Section, SectionItem, Grid } from '@barclays/blueprint-react';

// Import utility functions
import { renderNodes } from './utils/renderNodes';
import { renderLinks } from './utils/renderLinks';
import { setupZoom } from './utils/setupZoom';

// Import types
import { HierarchicalData } from '../../interfaces/HierarchicalData';

import './styles/flowChart.css';

interface FlowChartProps {
  data: HierarchicalData[];
  onNodeClick: (nodeData: HierarchicalData) => void;
}

export const FlowChart: React.FC<FlowChartProps> = ({ data, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update chart dimensions dynamically on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Clear previous SVG content to prevent duplication
    svg.selectAll('*').remove();

    const treeLayout = d3.tree<HierarchicalData>().nodeSize([220, 200]);
    const root = d3.stratify<HierarchicalData>()
      .id((d) => d.id)
      .parentId((d) => d.parentId)(data);

    treeLayout(root);

    const nodes = root.descendants();
    const links = root.links();

    // Calculate the viewBox and setup zoom behavior
    setupZoom(svgRef, nodes, dimensions);

    // Render links and nodes
    renderLinks(svg, links);
    renderNodes(svg, nodes, onNodeClick);
  }, [data, dimensions]);

  // Zoom control handlers
  const handleZoomIn = () => {
    if (svgRef.current) {
      d3.select(svgRef.current).transition().call(d3.zoom().scaleBy, 1.2);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current) {
      d3.select(svgRef.current).transition().call(d3.zoom().scaleBy, 0.8);
    }
  };

  return (
    <div className="chart-container">
      <BarclaysThemeProvider>
        <Section>
          <SectionItem>
            <Icon icon="minus" onClick={handleZoomOut} />
            <Icon icon="plus" onClick={handleZoomIn} />
            <Grid flex="fit" alignment="middle" justify="center">
              <svg ref={svgRef}>
                <g />
              </svg>
            </Grid>
          </SectionItem>
        </Section>
      </BarclaysThemeProvider>
    </div>
  );
};
----------------------------------------------renderLink.tsx
import * as d3 from 'd3';
import { HierarchyLink } from 'd3';

export const renderLinks = (
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  links: HierarchyLink<unknown>[]
) => {
  svg.append('g')
    .selectAll('.link')
    .data(links)
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', (d) => {
      return `M${d.source.x},${d.source.y}
              V${(d.source.y + d.target.y) / 2}
              H${d.target.x}
              V${d.target.y}`;
    })
    .attr('fill', 'none')
    .attr('stroke', 'gray')
    .attr('stroke-width', 1)
    .attr('marker-end', 'url(#arrow-up)');
};
------------------------------------------------renderNode.tsx
import * as d3 from 'd3';
import { HierarchyPointNode } from 'd3';
import { HierarchicalData } from '../../../interfaces/HierarchicalData';

export const renderNodes = (
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  nodes: HierarchyPointNode<HierarchicalData>[],
  onNodeClick: (nodeData: HierarchicalData) => void
) => {
  const gNodes = svg
    .append('g')
    .selectAll('.node')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.x},${d.y})`)
    .on('click', (event, d) => onNodeClick(d.data));

  // Add rectangles
  gNodes.append('rect')
    .attr('width', 200)
    .attr('height', 100)
    .attr('rx', 10)
    .attr('ry', 10)
    .attr('fill', '#e1e1e1')
    .attr('stroke', '#515151')
    .attr('stroke-width', 1);

  // Add labels
  gNodes.append('text')
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .text((d) => d.data.name);
};
---------------------------------------------setupZoom.tsx
import * as d3 from 'd3';
import { HierarchyPointNode } from 'd3';
import { HierarchicalData } from '../../../interfaces/HierarchicalData';

export const setupZoom = (
  svgRef: React.RefObject<SVGSVGElement>,
  nodes: HierarchyPointNode<HierarchicalData>[],
  dimensions: { width: number; height: number }
) => {
  const padding = 100;
  const [minX, maxX] = d3.extent(nodes, (node) => node.x) as [number, number];
  const [minY, maxY] = d3.extent(nodes, (node) => node.y) as [number, number];

  const viewBoxWidth = maxX - minX + 2 * padding;
  const viewBoxHeight = maxY - minY + 2 * padding;

  const svg = d3.select(svgRef.current);
  svg.attr('viewBox', `${-padding} ${-padding} ${viewBoxWidth} ${viewBoxHeight}`)
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  svg.call(
    d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.5, 5]).on('zoom', (event) => {
      svg.select('g').attr('transform', event.transform);
    })
  );
};
----------------------------------------------------------------
  export interface HierarchicalData {
  id: string;
  parentId: string | null;
  name: string;
}
----------------------------------------------
.chart-container {
  width: 100%;
  height: 100%;
}
.node rect {
  fill: #e1e1e1;
  stroke: #515151;
}
.link {
  stroke: gray;
  stroke-width: 1;
}

  
