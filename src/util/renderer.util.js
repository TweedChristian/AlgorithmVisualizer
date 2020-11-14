import * as force from 'd3-force';
import * as d3 from 'd3';
import * as zoom from 'd3-zoom';
import cool from '../util/colorsSchemes.enum';
import addArrowToLines from '../util/appendArrow.util';

/**
 * Loads the given data, and the options to create a displayed graph.
 * Width and Height default to 500.
 * LineWidth defaults to 1 and nodeRadius defaults to 5.
 * Directed defaults to false.
 * @param data { {nodes, links} } is the displayed data
 * @param options { { svgWidth?: number, svgHeight?: number, lineWidth?: number, nodeRadius?: number, directed?: boolean } }
 */
const renderData = (data, options) => {
    options = defaultOptions(options);

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
        d3
        .select(node.target)
        .style("stroke", cool[7])
        .style("fill", cool[7])
        .attr('r', 4)
    }

    const svg = d3.select('#graph')
        .attr('width', !!options.svgWidth ? options.svgWidth : 500)
        .attr('height', !!options.svgHeight ? options.svgHeight : 500)
        
    addArrowToLines({
        svg,
        lineWidth: !!options.lineWidth ? options.lineWidth : 1,
        nodeRadius:!!options.nodeRadius ? options.nodeRadius : 5,
        color: cool[0]
    });

    const zoomed = ({transform})  => {
        svg.selectAll('line').attr('transform', transform);
        svg.selectAll('circle').attr('transform', transform)
    };

    svg.call(
        zoom
        .zoom()
        .extent([[0,0], [500, 500]])
        .scaleExtent([1,10])
        .on('zoom', zoomed)
    );

    let links = svg.selectAll('line').data(data.links)
        .enter()
        .append('line')
        .attr('marker-end', 'url(#arrow)')
        .style("stroke", cool[0])
        .style('stroke-width',!!options.lineWidth ? options.lineWidth : 1);

    let nodes = svg.selectAll("circle")
        .data(Object.values(data.nodes)).enter()
        .append('circle')
        .attr('r', !!options.nodeRadius ? options.nodeRadius : 5)
        .attr('id', (d) => d.id)
        .style('fill', cool[5])
        .on('click', (d) => clickNode(d))

    force.forceSimulation(Object.values(data.nodes))
        .force('link',
            force.forceLink().id((d) => d.id)
                .links(data.links)
        )
        .force("charge", force.forceManyBody().strength(-90))
        .force("center", force.forceCenter(
            !!options.svgWidth ? options.svgWidth / 2 : 250, 
            !!options.svgWidth ? options.svgWidth / 2 : 250
        ))
        .on("tick", ticked);
};

const defaultOptions = (options) => {
    options = !!options ? options : {
        svgWidth: 500,
        svgHeight: 500,
        lineWidth: 1,
        nodeRadius: 5,
        directed: true
    };

    options.svgWidth = !!options.svgWidth ? options.svgWidth : 500;
    options.svgHeight = !!options.svgHeight ? options.svgHeight : 500;
    options.lineWidth = !!options.lineWidth ? options.lineWidth : 1;
    options.nodeRadius = !!options.nodeRadius ? options.nodeRadius : 5;
    options.directed = (options.directed === undefined || options.directed === null) ? false : options.directed;
    
    return options;
}

export default renderData;
