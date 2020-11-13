const doubleLinkCircle = (number) => {
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
    }
    return {
        nodes,
        links
    };
};

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

const maxSubsetOfEdges = (n) => {
    return Math.floor(n * (n - 1) / 2);
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
        // for(let j = i + 1; j <= max; j++){
        //     if(Math.floor((Math.random() * 2))){
        //         links.push({
        //             source: i,
        //             target: j
        //         });
        //         nodes[i].neighbors.push(j);
        //     }
        // }
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

const dataGenerator = {
    doubleLinkCircle,
    completeGraph,
    randomGraph
}

export default dataGenerator;