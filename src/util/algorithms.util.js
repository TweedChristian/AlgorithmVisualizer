
const bfs = (graph, id) => {
    Object.values(graph.nodes).forEach((node) => {
        graph.nodes[node.id].touched = false;
    });
    graph.nodes[id].touched = true;
    let layers = [];
    layers[0] = [graph.nodes[id]];
    let layerCounter = 0;
    while(layers[layerCounter].length !== 0){
        layers[layerCounter + 1] = [];
        layers[layerCounter].forEach((node) => {
            node.neighbors.forEach((neighbor) => {
                if(!graph.nodes[neighbor].touched){
                    graph.nodes[neighbor].touched = true;
                    layers[layerCounter + 1].push(graph.nodes[neighbor]);
                }
            })
        })
        layerCounter++;
    }
    //Remove empty array at the end
    layers.pop();
    return layers;
}

const algorithms = {
    bfs
}


export default algorithms