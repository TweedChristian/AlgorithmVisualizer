import React, { Component } from 'react'
import dataGenerator from '../util/dataGeneration.util';
import renderData from '../util/renderer.util';

// const data = dataGenerator.randomGraph(10);
let data = dataGenerator.randomGraph(12);
export class Graph extends Component {
    componentDidMount() {
        renderData(data, {nodeRadius: 5, lineWidth: 1});
    }
    render() {
        return (
            <svg id="graph">
            </svg>
        )
    }
}

export default Graph

