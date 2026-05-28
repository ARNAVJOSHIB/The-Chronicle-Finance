'use client';

import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GraphRenderer = () => {
  const [data, setData] = useState<number[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [view, setView] = useState({ width: 800, height: 400 });

  // Generate some sample data for the chart
  useEffect(() => {
    // Initialize with some sample data
    const newData = Array.from({ length: 20 }, () => Math.random() * 100);
    setData(newData);
  }, []);

  // Create a more complex line chart using D3
  useEffect(() => {
    if (data.length > 0 && svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const margin = { top: 20, right: 30, bottom: 30, left: 30 };
      const width = view.width - margin.left - margin.right;
      const height = view.height - margin.top - margin.bottom;

      // Create scales
      const xScale = d3.scaleLinear()
        .domain([0, data.length - 1])
        .range([0, width]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data) || 0])
        .range([height, 0]);

      // Create the line generator
      const line = d3.line<number>()
        .x((d, i) => xScale(i))
        .y(d => yScale(d));

      // Create the area generator
      const area = d3.area<number>()
        .x((d, i) => xScale(i))
        .y0(height)
        .y1(d => yScale(d))
        .curve(d3.curveMonotoneX);

      // Create the SVG container
      const svgElement = svg
        .attr("width", width)
        .attr("height", height);

      // Append the path for the line
      svgElement.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#1B365C")
        .attr("stroke-width", 2)
        .attr("d", line);

      // Append the area
      svgElement.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("d", area);
    }
  }, [data, view]);

  return (
    <div className="p-6 bg-ivory rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-financial-blue">Financial Growth Chart</h2>
      <svg ref={svgRef} width="800" height="400"></svg>
      <button
        onClick={() => {
          const newData = Array.from({ length: 20 }, () => Math.random() * 100);
          setData(newData);
        }}
        className="mt-4 px-4 py-2 bg-financial-blue text-white rounded-md"
      >
        Regenerate Data
      </button>
    </div>
  );
};

export default GraphRenderer;