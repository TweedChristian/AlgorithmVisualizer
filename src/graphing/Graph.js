import React, { Component } from 'react'
import * as force from 'd3-force';
import * as d3 from 'd3';
import cool from '../util/colorsSchemes.enum';

const initializeData = (number) => {
    let nodes = {};
    let links = [];
    for (let i = 1; i <= number; i++) {
        nodes[i] = {
            id: i,
            neighbors: []
        }
        for (let j = 1; j <= number; j++) {
            links.push({
                source: i,
                target: j
            });
            nodes[i].neighbors.push(j);
        }
    }
    return {
        nodes,
        links
    };
}

const data = initializeData(10);
const loadData = () => {
    const ticked = () => {
        links
            .attr('x1', (d) => d.source.x)
            .attr('y1', (d) => d.source.y)
            .attr('x2', (d) => d.target.x)
            .attr('y2', (d) => d.target.y);

        nodes
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y)
    };

    const clickNode = (node) => {
        d3.select(node.target).style("stroke", cool[7]).style("fill", cool[7]).attr('r', 4)
    }

    const svg = d3.select('#graph')
        .attr('width', 500)
        .attr('height', 500);

    let links = svg.selectAll('line').data(data.links)
        .enter()
        .append('line')
        .style("stroke", cool[0])
        .style('stroke-width', 0.2);

    let nodes = svg.selectAll("circle")
        .data(Object.values(data.nodes)).enter()
        .append('circle')
        .attr('r', 3)
        .attr('id', (d) => d.id)
        .style('fill', cool[5])
        .on('click', (d) => clickNode(d))

    force.forceSimulation(Object.values(data.nodes))
        .force('link',
            force.forceLink().id((d) => d.id)
                .links(data.links)
        )
        .force("charge", force.forceManyBody().strength(-50))
        .force("center", force.forceCenter(250, 250))
        .on("tick", ticked);
};


export class Graph extends Component {
    componentDidMount() {
        loadData();
    }
    render() {
        return (
            <svg id="graph">

            </svg>
        )
    }
}

export default Graph

