import React, { Component } from 'react'
import dataGenerator from '../util/dataGeneration.util';
import renderData from '../util/renderer.util';

const data = dataGenerator.randomGraph(10);
export class Graph extends Component {
    componentDidMount() {
        renderData(data);
    }
    render() {
        return (
            <svg id="graph">

            </svg>
        )
    }
}

export default Graph

