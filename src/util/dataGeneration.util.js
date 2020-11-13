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

const randomGraph = (max) => {
    let nodes = {};
    let links = [];
    for(let i = 1; i <= max; i++){
        nodes[i] = {
            id: i,
            neighbors: []
        };
        for(let j = i + 1; j <= max; j++){
            if(Math.floor((Math.random() * 2))){
                links.push({
                    source: i,
                    target: j
                });
                nodes[i].neighbors.push(j);
            }
        }
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