const maxSubsetOfEdges = (n) => {
    return Math.floor(n * (n - 1) / 2);
}

const defaultRandomDAGOptions = (dagOptions) => {
    dagOptions = !!dagOptions ? dagOptions : {
        minWidth: 1,
        maxWidth: 5,
        minHeight: 3,
        maxHeight: 5,
        percentPerEdge: 0.3
    };

    dagOptions.minWidth = !!dagOptions.minWidth ? dagOptions.minWidth : 1;
    dagOptions.maxWidth = !!dagOptions.maxWidth ? dagOptions.maxWidth : 5;
    dagOptions.minHeight = !!dagOptions.minHeight ? dagOptions.minHeight : 3;
    dagOptions.maxHeight = !!dagOptions.maxHeight ? dagOptions.maxHeight : 5;
    dagOptions.percentPerEdge = !!dagOptions.percentPerEdge ? dagOptions.percentPerEdge : 0.3;

    return dagOptions;
}

const doubleLinkCycleDirectedGraph = (number) => {
    let nodes = {};
    let links = [];
    for (let i = 1; i <= number; i++) {
        nodes[i] = {
            id: i,
            neighbors: []
        }
        links.push({
            source: i,
            target: i % number + 1
        });
        links.push({
            source: i % number + 1,
            target: i
        });
        nodes[i].neighbors.push(i % number + 1);
        //Todo backwards neighbor values
    }
    return {
        nodes,
        links
    };
};

const singleLinkCycleDirectedGraph = (number) => {
    let nodes = {};
    let links = [];
    for (let i = 1; i <= number; i++) {
        nodes[i] = {
            id: i,
            neighbors: []
        }
        links.push({
            source: i,
            target: i % number + 1
        });
        nodes[i].neighbors.push(i % number + 1);
    }
    return {
        nodes,
        links
    };
}

const completeGraph = (number) => {
    let nodes = {};
    let links = [];
    for (let i = 1; i <= number; i++) {
        nodes[i] = {
            id: i,
            neighbors: []
        }
        for(let j = i + 1; j <= number; j++){
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

const randomGraph = (max) => {
    let nodes = {};
    let links = [];
    const edgeNumber = Math.ceil(Math.random() * maxSubsetOfEdges(max));
    for(let i = 1; i <= max; i++){
        nodes[i] = {
            id: i,
            neighbors: []
        };
    }
    for(let i = 0; i < edgeNumber; i++){
        let source = Math.ceil(Math.random() * max);
        let target = Math.ceil(Math.random() * max);
        links.push({
            source: source,
            target: target
        });
        nodes[source].neighbors.push(target);
    }
    return {
        nodes,
        links
    };
}

//Source: https://stackoverflow.com/questions/12790337/generating-a-random-dag
const randomDAG = (dagOptions) => {
    dagOptions = defaultRandomDAGOptions(dagOptions);
    let nodes = {};
    let links = [];

    const height = dagOptions.minHeight + Math.ceil(Math.random() * (dagOptions.maxHeight - dagOptions.minHeight));
    let width;
    let nodesCounter = 0;
    for(let i=0; i< height; i++){
        width = dagOptions.minWidth + Math.ceil(Math.random() + (dagOptions.maxWidth - dagOptions.minWidth));

        for(let counter = nodesCounter; counter < nodesCounter + width; counter++ ){
            nodes[counter + 1] = {
                id: counter + 1,
                neighbors: []
            }
        }

        for(let j=0; j < nodesCounter; j++){
            for(let k = 0; k < width; k++){
                //Add edge
                if(Math.random() >= dagOptions.percentPerEdge && (j+1) !== (k + nodesCounter)){
                    links.push({
                        source: j + 1,
                        target: k + nodesCounter
                    });
                    nodes[j + 1].neighbors.push(k + nodesCounter);
                }
            }
        }
        nodesCounter += width;
    }
    
    return {
        nodes,
        links
    };
}

const dataGenerator = {
    singleLinkCycleDirectedGraph,
    doubleLinkCycleDirectedGraph,
    completeGraph,
    randomGraph,
    randomDAG
};

export default dataGenerator;