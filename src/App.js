import './App.css';
import React from 'react';
import * as draw from "./draw";
import * as convert from './convert'
import dataView from './dataview.json'

export class App extends React.Component {
  graph = {}

  constructor() {
    super();

    // convert data to graph
    this.graph = convert.TableToDFG(dataView)

    console.log("DFG", this.graph);
  }

  render() {
    return (
      <div className="app">
        <header className="app-header spinner">
          <div id="ignite"></div>
        </header>
      </div>
    )
  }

  componentDidMount() {
    // Draw graph
    this.delay(1000).then(() => draw.DirectFollowGraph(this.graph))
  }

  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}

