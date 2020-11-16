import * as force from 'd3-force';
import * as d3 from 'd3';
import * as zoom from 'd3-zoom';
import colors from '../util/colorsSchemes.enum';
import addArrowToLines from '../util/appendArrow.util';
import algorithms from '../util/algorithms.util';

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

        circles
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y)

        text.attr('x', (d) => d.x)
        .attr('y', (d) => d.y)
    };

    const clickNode = (node) => {
        // d3.select(node.target.parentNode)
        // .select('circle')
        // .style("stroke", colors.cool[7])
        // .style("fill", colors.cool[7])
        // .attr('r', options.nodeRadius + 2);
        d3.selectAll('circle').style('fill', colors.cool[5])
        let results = algorithms.bfs(data, node.target.parentNode.id);
        renderBFS(results);
    }

    const svg = d3.select('#graph')
        .attr('width', options.svgWidth)
        .attr('height', options.svgHeight)
        
    addArrowToLines({
        svg,
        lineWidth: options.lineWidth,
        nodeRadius: options.nodeRadius,
        color: colors.cool[0]
    });

    const zoomed = ({transform})  => {
        svg.selectAll('line').attr('transform', transform);
        svg.selectAll('.node').attr('transform', transform)
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
        .style("stroke", colors.cool[0])
        .style('stroke-width', options.lineWidth);

    let nodes = svg.selectAll(".node")
        .data(Object.values(data.nodes)).enter()
        .append('g')
        .attr('class', 'node')
        .attr('id', (d) => d.id)
        .on('click', (d) => clickNode(d))

    let circles = nodes.append('circle')
    .attr('r', options.nodeRadius)
    .style('fill', colors.cool[5])

    let text = nodes.append('text')
    .attr('fill', 'white')
    .attr('dy', '0.35em')
    .text((d) => d.id)
    .style("text-anchor", "middle")
    .attr('font-size', options.nodeRadius + 1)
    .attr('font-weight', 'bold')

    force.forceSimulation(Object.values(data.nodes))
        .force('link',
            force.forceLink().id((d) => d.id)
                .links(data.links).distance(6 * options.nodeRadius)
        )
        .force("charge", force.forceManyBody().strength(-90))
        .force("center", force.forceCenter(
            options.svgWidth / 2, 
            options.svgHeight / 2
        ))
        .on("tick", ticked);
};

const defaultOptions = (options) => {
    options = !!options ? options : {
        svgWidth: 800,
        svgHeight: 800,
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

const renderBFS = (layers) => {
    layers.forEach((layer, index) => {
        layer.forEach((node) => {
            d3.select('#graph')
            .select(`[id='${node.id}']`)
            .select('circle')
            // .attr('stroke', colors.magma[index])
            .style('fill', colors.magma[index])
        })
    });
}

//Used for arrow scaling
//https://stackoverflow.com/questions/11121465/scaling-an-arrowhead-on-a-d3-force-layout-link-marker
// const lineXEnd = (d, nodeRadius) => {
//     let length = Math.sqrt(Math.pow(d.target.y - d.source.y, 2) + Math.pow(d.target.x - d.source.x, 2));
//     let scale = (length - nodeRadius) / length;
//     let offset = (d.target.x - d.source.x) - (d.target.x - d.source.x) * scale;
//     return d.target.x - offset;
// }

// const lineYEnd = (d, nodeRadius) => {
//     let length = Math.sqrt(Math.pow(d.target.y - d.source.y, 2) + Math.pow(d.target.x - d.source.x, 2));
//     let scale = (length - nodeRadius) / length;
//     let offset = (d.target.y - d.source.y) - (d.target.y - d.source.y) * scale;
//     return d.target.y - offset;
// }

export default renderData;
