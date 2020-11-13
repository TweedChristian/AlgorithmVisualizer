import {line} from 'd3';

const addArrowToLines = (params) => {
    let markerBoxHeight = 10 + (2 * params.lineWidth);
    let markerBoxWidth = 10 + (2 * params.lineWidth);
    let refX = markerBoxWidth / 2;
    let refY = markerBoxHeight / 2;
    let markerWidth = markerBoxWidth / 2 + (2 * params.lineWidth);
    let markerHeight = markerBoxHeight / 2 + (2 * params.lineWidth);
    let arrowPoints = [[0, 0], [0, markerBoxHeight], [markerBoxWidth, Math.ceil(markerHeight / 2)]];

    params.svg.append('defs')
    .append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', `0 0 ${markerBoxWidth} ${markerBoxHeight}`)
    .attr('refX', refX + (2 * params.lineWidth) + (2 * params.nodeRadius))
    .attr('refY', refY - params.lineWidth)
    .attr('orient', 'auto-start-reverse')
    .attr('markerWidth', markerWidth) 
    .attr('markerHeight', markerHeight)
    .attr('xoverflow', 'visible')
    .append('svg:path')
    .attr('d', line()(arrowPoints))
    .attr('fill', params.color)
    .style('stroke','none');

    

    // select(svg)
    // .append('defs')
    // .append('marker')
    // .attr('id', 'arrow')
    // .attr('viewBox', [0,0, markerBoxWidth, markerBoxHeight])
    // .attr('refX', refX)
    // .attr('refY', refY)
    // .attr('orient', 'auto-start-reverse')
    // .attr('markerWidth', markerWidth)
    // .attr('markerHeight', markerHeight)
    // .attr('xoverflow', 'visible')
    // .append('svg:path')
    // .attr('d', line()(arrowPoints))
    // .attr('fill', '#999')
    // .style('stroke','#999');
    // {'id':'arrow',
    //     'viewBox':'-0 -5 10 10',
    //     'refX':13,
    //     'refY':0,
    //     'orient':'auto',
    //     'markerWidth':13,
    //     'markerHeight':13,
    //     'xoverflow':'visible'}
        // .append('svg:path')
        // .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        // .attr('fill', '#999')
        // .style('stroke','none');
    // select(svg).selectAll('line').attr('marker-end', 'url(#arrow)').style('stroke-width', 50)
}

export default addArrowToLines;