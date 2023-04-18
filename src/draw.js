import * as d3 from "d3"

export function DirectFollowGraph(graph) {
    // Clean up canvas
    d3.selectAll(".app-header").classed("spinner", false)
    d3.select(".app-header").selectAll("*").remove()

    // Environment variables
    const laneHeight = 100
    const nodeWidth = 50
    const nodeHeight = 30

    // Set svg canvas
    let svg = d3.select(".app-header")
        .append("svg")
        .attr("width", 1280)
        .attr("height", 720)

        .append("g").attr("id", "canvas").style("fill", "tomato")

    // // Draw lanes
    // svg.append("g").attr("id", "lanes").style("stroke", "#000").style("background", "transparent")

    //     .selectAll("g.lane")
    //     .data(graph.metadata.lanes)
    //     .enter()

    //     .append("g").attr("class", "lane")

    //     .append("rect")
    //     .attr("width", "100%")
    //     .attr("height", laneHeight)
    //     .attr("x", 0)
    //     .attr("y", (d, i) => { return i * laneHeight })

    // Draw dfg
    let dfg = svg.append("g")
        .attr("id", "dfg")

    // // DRAW NODES
    // dfg.selectAll("g.node")
    //     .data(graph.nodes)
    //     .enter()
    //     .each((d, i) => {

    //         const nodeX = (nodeWidth / 2) + (d.getIndex() * (nodeWidth * 2))
    //         const nodeY = (d.metadata.belongsToLane * laneHeight) + (laneHeight / 2) - (nodeHeight / 2)
    //         const radius = 10

    //         let node = dfg.append("g").attr("class", "node").style("stroke", "silver").style("stroke-width", 2).style("fill", "ivory")

    //         node.append("rect")
    //             .attr("width", nodeWidth).attr("height", nodeHeight)
    //             .attr("x", nodeX).attr("y", nodeY)
    //             .attr("rx", radius).attr("ry", radius)

    //         // // ADD TEXT
    //         // node.append("text")
    //         //     .attr("text-anchor", "middle")
    //         //     .attr("dominant-baseline", "hanging")
    //         //     .attr("width", nodeWidth).attr("height", nodeHeight)
    //         //     .attr("x", nodeX + (nodeWidth / 2)).attr("y", nodeY)
    //         //     .text(d.id)
    //     })

    // // DRAW EDGES
    // dfg.selectAll("g.edges")
    //     .data(graph.edges)
    //     .enter()
    //     .each((d, i) => {

    //         let edge = dfg.append("g").attr("class", "egde").style("stroke", "gold").style("stroke-width", 2).style("fill", "none")

    //         const targetNode = d.getTargetNode()
    //         if (targetNode) {

    //             const sourceNode = d.getSourceNode()
    //             if (sourceNode.metadata.belongsToLane < targetNode.metadata.belongsToLane) {

    //                 edge.append("path").attr("d", () => {
    //                     let path = d3.path()

    //                     const sourceX = nodeWidth + (sourceNode.getIndex() * (nodeWidth * 2))
    //                     const sourceY = (sourceNode.metadata.belongsToLane * laneHeight) + (laneHeight / 2) + (nodeHeight / 2)
    //                     path.moveTo(sourceX, sourceY)

    //                     const laneDifference = targetNode.metadata.belongsToLane - sourceNode.metadata.belongsToLane
    //                     const targetY = sourceY + (laneHeight * laneDifference) - (nodeHeight / 2)
    //                     path.lineTo(sourceX, targetY)

    //                     const targetX = nodeWidth + (targetNode.getIndex() * (nodeWidth * 2)) - (nodeWidth / 2)
    //                     path.lineTo(targetX, targetY)

    //                     return path
    //                 })

    //             } else if (sourceNode.metadata.belongsToLane > targetNode.metadata.belongsToLane) {

    //                 edge.append("path").attr("d", () => {
    //                     let path = d3.path()

    //                     const sourceX = nodeWidth + (sourceNode.getIndex() * (nodeWidth * 2))
    //                     const sourceY = (sourceNode.metadata.belongsToLane * laneHeight) + (laneHeight / 2) - (nodeHeight / 2)
    //                     path.moveTo(sourceX, sourceY)

    //                     const laneDifference = sourceNode.metadata.belongsToLane - targetNode.metadata.belongsToLane
    //                     const targetY = sourceY - (laneHeight * laneDifference) + (nodeHeight / 2)
    //                     path.lineTo(sourceX, targetY)

    //                     const targetX = nodeWidth + (targetNode.getIndex() * (nodeWidth * 2)) - (nodeWidth / 2)
    //                     path.lineTo(targetX, targetY)

    //                     return path
    //                 })

    //             } else {

    //                 edge.append("path").attr("d", () => {
    //                     let path = d3.path()

    //                     const sourceX = (nodeWidth * 1.5) + (sourceNode.getIndex() * (nodeWidth * 2))
    //                     const sourceY = (sourceNode.metadata.belongsToLane * laneHeight) + (laneHeight / 2)
    //                     path.moveTo(sourceX, sourceY)

    //                     const targetX = sourceX + nodeWidth
    //                     path.lineTo(targetX, sourceY)

    //                     return path
    //                 })
    //             }
    //         }
    //     })
}