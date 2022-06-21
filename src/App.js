import React, { Component } from 'react';
// Kalder den nye index fil
import DataTable from './DataTable/index2';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container mt-3">
        <DataTable rows={this.props.rows} locale="da" rowsPerPage={5} />
      </div>
    );
  }
}

export default App;
