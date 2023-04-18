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
        .attr("width", 1024)
        .attr("height", 640)
        .append("g").attr("id", "canvas")

    // Draw lanes
    svg.append("g")
        .attr("id", "lanes")
        .style("stroke", "#000")
        .style("fill", "transparent")

        .selectAll("g.lane")
        .data(graph.metadata.lanes)
        .enter()
        .append("g")
        .attr("class", "lane")
        .append("rect")
        .attr("width", "100%")
        .attr("height", laneHeight)
        .attr("x", 0)
        .attr("y", (d, i) => { return i * laneHeight })

    // Draw dfg
    let dfg = svg.append("g")
        .attr("id", "dfg")

    // Draw edges
    dfg.selectAll("g.edges")
        .data(graph.edges)
        .enter()
        .each((d, i) => {

            const sourceNode = d.getSourceNode()
            const targetNode = d.getTargetNode()
            const laneIndex = graph.metadata.lanes.indexOf(sourceNode.metadata.belongsToLane)
            const nodeIndex = sourceNode.getIndex()
            const edgeX = (nodeWidth * 1.5) + (nodeIndex * (nodeWidth * 2))
            const edgeY = (laneIndex * laneHeight) + (laneHeight / 2) - (nodeHeight / 2)

            let edge = dfg.append("g")
                .attr("class", "egde")
                .style("stroke", "#555")
                .style("stroke-width", 1)
                .style("fill", "none")

                if (targetNode) {
                    edge.append("path")
                    .attr("d", () => {
                        let c = d3.path()
                        c.moveTo(edgeX, edgeY)
                        c.lineTo(edgeX + nodeWidth, edgeY) // TODO if no targetNode than no line
                        return c
                    })
                }
        })

    // Draw nodes
    dfg.selectAll("g.node")
        .data(graph.nodes)
        .enter()
        .each((d, i) => {

            const laneIndex = graph.metadata.lanes.indexOf(d.metadata.belongsToLane)
            const nodeIndex = d.getIndex()
            const nodeX = (nodeWidth / 2) + (nodeIndex * (nodeWidth * 2))
            const nodeY = (laneIndex * laneHeight) + (laneHeight / 2) - (nodeHeight / 2)

            dfg.append("g")
                .attr("class", "node")
                .style("stroke", "#555")
                .style("fill", "#aaa")

                .append("rect")
                .attr("width", nodeWidth)
                .attr("height", nodeHeight)
                .attr("x", nodeX)
                .attr("y", nodeY)

                .attr("rx", 3).attr("ry", 3)  // rounded corners
        })
}

function draw(context) {
    context.moveTo(10, 10); // move current point to ⟨10,10⟩
    context.lineTo(100, 10); // draw straight line to ⟨100,10⟩
    context.arcTo(150, 150, 300, 10, 40); // draw an arc, the turtle ends up at ⟨194.4,108.5⟩
    context.lineTo(300, 10); // draw straight line to ⟨300,10⟩
    // etc.
    return context; // not mandatory, but will make it easier to chain operations
  }