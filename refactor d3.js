// src/utils/zoomUtils.ts
import * as d3 from 'd3';

export const applyZoom = (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.5, 5]) // Minimum and maximum zoom levels
    .on('zoom', (event) => {
      svg.select('g') // Target the inner group for transformations
        .attr('transform', event.transform);
    });

  svg.call(zoom);
};

-------------------
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Icon } from '@blueprintjs/core';
import { ThemeProvider as BarclaysThemeProvider, Section, SectionItem, Grid } from '@barclays/blueprint-react';

// Define the types for your props
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

  // Handle window resize to update chart dimensions dynamically
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const markerWidth = 12;
  const markerHeight = 12;

  // Initialize zoom behavior
  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.5, 5]) // Min and max zoom levels
    .on('zoom', (event) => {
      if (svgRef.current) {
        d3.select(svgRef.current).select('g').attr('transform', event.transform);
      }
    });

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const containerWidth = dimensions.width;
    const containerHeight = dimensions.height;

    // Create tree layout
    const treeLayout = d3.tree<HierarchicalData>().nodeSize([220, 200]);
    const root = d3.stratify<HierarchicalData>()
      .id((d) => d.id)
      .parentId((d) => d.parentId)(data);

    treeLayout(root);
    const nodes = root.descendants();
    const links = root.links();

    // Calculate viewBox for responsive scaling
    const padding = 100;
    const [minX, maxX] = d3.extent(nodes, (node) => node.x) as [number, number];
    const [minY, maxY] = d3.extent(nodes, (node) => node.y) as [number, number];

    const translateX = Math.abs(minX) + padding;
    const translateY = padding;

    const viewBoxWidth = maxX - minX + 2 * padding;
    const viewBoxHeight = maxY - minY + 2 * padding;

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `${-padding} ${-padding} ${viewBoxWidth} ${viewBoxHeight}`)
      .attr('width', containerWidth)
      .attr('height', containerHeight);

    // Add markers for links
    svg.append('defs').append('marker')
      .attr('id', 'arrow-up')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 9)
      .attr('refY', 0)
      .attr('markerWidth', markerWidth)
      .attr('markerHeight', markerHeight)
      .attr('orient', 'auto-start-reverse')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5');

    // Add links
    const gLinks = svg.append('g').selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d) => {
        return `M${d.source.x},${d.source.y + markerHeight / 2}
                V${(d.source.y + d.target.y) / 2}
                H${d.target.x}
                V${d.target.y + markerHeight / 2}`;
      })
      .attr('marker-end', 'url(#arrow-up)')
      .attr('fill', 'none')
      .attr('stroke', 'gray')
      .attr('stroke-width', 1);

    // Add nodes
    const gNodes = svg.append('g').selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.x},${d.y})`)
      .on('click', (event, d) => onNodeClick(d.data));

    // Add rectangles for nodes
    gNodes.append('rect')
      .attr('width', 200)
      .attr('height', 100)
      .attr('rx', 10)
      .attr('ry', 10)
      .attr('fill', '#e1e1e1')
      .attr('stroke', '#515151')
      .attr('stroke-width', 1);

    // Add text labels for nodes
    gNodes.append('text')
      .attr('y', 50) // Vertical centering
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.name);
  }, [data, dimensions]);

  // Zoom controls
  const handleZoomIn = () => {
    if (svgRef.current) {
      d3.select(svgRef.current).transition().call(zoom.scaleBy, 1.2);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current) {
      d3.select(svgRef.current).transition().call(zoom.scaleBy, 0.8);
    }
  };

  return (
    <>
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
    </>
  );
};

---------------------------------------------------------------
  import * as d3 from 'd3';

export const renderNodes = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  root: d3.HierarchyPointNode<any>,
  nodeHeight: number
) => {
  const markerWidth = 12;
  const markerHeight = 12;

  // Apply zoom behavior
  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.5, 5]) // Minimum and maximum zoom levels
    .on('zoom', (event) => {
      if (svg.node()) {
        svg.attr('transform', event.transform);
      }
    });

  // Apply zoom to the SVG
  d3.select(svg.node()?.ownerSVGElement as SVGSVGElement).call(zoom);

  // Render links between nodes
  svg
    .selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', (d: any) => {
      return `M${d.source.x},${d.source.y + nodeHeight / 2} 
              V${(d.source.y + d.target.y) / 2} 
              H${d.target.x} 
              V${d.target.y - nodeHeight / 2}`;
    })
    .attr('marker-end', 'url(#arrow-up)') // Add arrowhead marker
    .attr('fill', 'none')
    .attr('stroke', 'gray')
    .attr('stroke-width', 1);

  // Add the first arrow
  const firstParentNode = root.descendants()[0];
  if (firstParentNode) {
    const x = firstParentNode.x ?? 0;
    const y = (firstParentNode.y ?? 0) + nodeHeight / 2;

    console.log(`First arrow position: x: ${x}, y: ${y}`);

    svg
      .append('path')
      .attr('class', 'arrow')
      .attr('fill', 'gray')
      .attr(
        'd',
        `M${x},${y + nodeHeight} 
         L${x + 10},${y + nodeHeight - 11} 
         L${x - 10},${y + nodeHeight - 11} 
         Z`
      );
  } else {
    console.error('First parent node not found.');
  }

  // Add another arrow
  const anotherParentNode = root.descendants()[1];
  if (anotherParentNode) {
    const x1 = anotherParentNode.x ?? 0;
    const y1 = (anotherParentNode.y ?? 0) + nodeHeight / 2;

    console.log(`Another arrow position: x: ${x1}, y: ${y1}`);

    svg
      .append('path')
      .attr('class', 'arrow')
      .attr('fill', 'gray')
      .attr(
        'd',
        `M${x1},${y1 + nodeHeight} 
         L${x1 + 10},${y1 + nodeHeight - 11} 
         L${x1 - 10},${y1 + nodeHeight - 11} 
         Z`
      );
  } else {
    console.error('Another parent node not found.');
  }
};


-------------------------------------------------------
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

  
