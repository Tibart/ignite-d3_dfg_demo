export function TableToDFG(dataview) {

    refine: if (dataview.table && dataview.table.rows && dataview.table.rows.length > 0) {
        let graph = { nodes: [], edges: [], metadata: { lanes: [] } }

        // Columns
        const columns = dataview.table.columns,
            casesIdx = columns.find(e => e.roles.cases).index,
            eventIdIdx = columns.find(e => e.roles.eventId).index,
            eventStepIdx = columns.find(e => e.roles.eventStep).index,
            descriptionIdx = columns.find(e => e.roles.description).index,
            activityCharacterIdx = columns.find(e => e.roles.activityCharacter).index,
            durationFromCreatedIdx = columns.find(e => e.roles.durationFromCreated).index,
            departmentIdx = columns.find(e => e.roles.department).index,
            exceptionStepIdx = columns.find(e => e.roles.exceptionStep).index,
            addedValueIdx = columns.find(e => e.roles.addedValue).index,
            variantStringIdx = columns.find(e => e.roles.variantString).index
        let allColumnsAreSet = (...columnIdx) => { return !columnIdx.some(i => i === undefined) }
        if (!allColumnsAreSet(casesIdx, eventIdIdx, eventStepIdx, descriptionIdx, activityCharacterIdx, durationFromCreatedIdx, departmentIdx, exceptionStepIdx, addedValueIdx, variantStringIdx)) {
            console.error("Not all columns are set", columns);
            break refine
        }

        // Compose workable PowerBI object
        new Promise(res => {
            let pbiDataRows = new Array()
            for (let i = 0; i < dataview.table.rows.length; i++) {
                const row = dataview.table.rows[i]
                const nextRow = dataview.table.rows[i + 1]

                // Determine next activity char and duration between them
                let nextActivityCharacter = ""
                let stepDuration = 0
                if (nextRow && row[eventStepIdx] < nextRow[eventStepIdx]) {
                    nextActivityCharacter = nextRow[activityCharacterIdx]
                    const created = row[durationFromCreatedIdx]
                    stepDuration = nextRow[durationFromCreatedIdx] - created
                }

                const pbiData = {
                    cases: row[casesIdx],
                    eventId: row[eventIdIdx],
                    eventStep: row[eventStepIdx],
                    description: row[descriptionIdx],
                    activityCharacter: row[activityCharacterIdx],
                    nextActivityCharacter: nextActivityCharacter,
                    durationFromCreated: row[durationFromCreatedIdx],
                    department: row[departmentIdx],
                    exceptionStep: row[exceptionStepIdx],
                    addedValue: row[addedValueIdx],
                    variantString: row[variantStringIdx],
                    duration: stepDuration
                }

                // Add lanes to metadata
                let laneIndex = graph.metadata.lanes.indexOf(pbiData.department)
                if (laneIndex === -1) {
                    laneIndex = graph.metadata.lanes.push(pbiData.department) - 1
                } 

                // Add node to graph
                let node = graph.nodes ? graph.nodes.find(n => n.id === pbiData.activityCharacter) : undefined;
                if (!node) {

                    node = {
                        id: pbiData.activityCharacter,
                        label: pbiData.description,
                        metadata: {
                            belongsToLane: laneIndex,
                            addedValue: pbiData.addedValue,
                        },
                        getIndex: () => { return graph.nodes.findIndex(n => n.id === node.id); }
                    };

                    graph.nodes.push(node);
                }

                // Add pbiData to pbiDataRows
                pbiDataRows.push(pbiData)
            }

            res(pbiDataRows)

        }).then((pbiDataRows) => {
            // Iterate over pbiDataRows for adding edges to graph
            for (let i = 0; i < pbiDataRows.length; i++) {
                const pbiData = pbiDataRows[i];
                let edge = graph.edges ? graph.edges.find(e => e.source === pbiData.activityCharacter && e.target === pbiData.nextActivityCharacter) : undefined;
                if (!edge) {

                    edge = {
                        source: pbiData.activityCharacter,
                        target: pbiData.nextActivityCharacter,
                        metadata: {
                            duration: pbiData.duration,
                        },
                        getSourceNode: () => { return graph.nodes.find(n => n.id === edge.source); },
                        getTargetNode: () => { return graph.nodes.find(n => n.id === edge.target); }
                    };

                    graph.edges.push(edge);
                }
            }
        })

        return graph

    } else {
        console.warn("Could not create graph, function did not receive the correct data")
    }

}