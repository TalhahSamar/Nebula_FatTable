import React, { useState } from "react";
import { metricsData } from "./data";
import "./App.css";

function App() {
  const [serviceFilter, setServiceFilter] = useState("");
  const [sideFilter, setSideFilter] = useState("");
  const [sortConfig, setSortConfig] = useState(null);

  const filteredData = metricsData.filter((data) => {
    const matchesService =
      serviceFilter === "" || data.service.includes(serviceFilter);
    const matchesSide =
      sideFilter === "" ||
      sideFilter.toLowerCase() === "client" ||
      sideFilter.toLowerCase() === "server";
    return matchesService && matchesSide;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig !== null) {
      const side = sortConfig.side;
      const metric = sortConfig.metric;

      if (a[side][metric] < b[side][metric]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[side][metric] > b[side][metric]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (side, metric) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.side === side &&
      sortConfig.metric === metric &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ side, metric, direction });
  };

  return (
    <div className="App">
      <h1>Service Metrics Table</h1>

      <div>
        <label>
          Filter by Service Name:{" "}
          <input
            type="text"
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
          />
        </label>
        <label>
          Filter by Side:{" "}
          <input
            type="text"
            value={sideFilter}
            onChange={(e) => setSideFilter(e.target.value)}
            placeholder="client/server"
          />
        </label>
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>Service</th>
            <th>Side</th>
            <th onClick={() => requestSort("client", "requests")}>Requests</th>
            <th onClick={() => requestSort("client", "rate")}>Rate</th>
            <th onClick={() => requestSort("client", "p75")}>p75</th>
            <th onClick={() => requestSort("client", "p90")}>p90</th>
            <th onClick={() => requestSort("client", "p99")}>p99</th>
            <th onClick={() => requestSort("client", "error")}>Error</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((data, index) => (
            <React.Fragment key={index}>
              {(sideFilter === "" || sideFilter.toLowerCase() === "client") && (
                <tr>
                  <td rowSpan="2">{data.service}</td>
                  <td>Client</td>
                  <td>{data.client.requests}</td>
                  <td>{data.client.rate}</td>
                  <td>{data.client.p75}</td>
                  <td>{data.client.p90}</td>
                  <td>{data.client.p99}</td>
                  <td>{data.client.error}</td>
                </tr>
              )}
              {(sideFilter === "" || sideFilter.toLowerCase() === "server") && (
                <tr>
                  {sideFilter === "server" && <td>{data.service}</td>}
                  <td>Server</td>
                  <td>{data.server.requests}</td>
                  <td>{data.server.rate}</td>
                  <td>{data.server.p75}</td>
                  <td>{data.server.p90}</td>
                  <td>{data.server.p99}</td>
                  <td>{data.server.error}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;




// import React from "react";
// import { metricsData } from "./data";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <h1>Service Metrics Table</h1>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Service</th>
//             <th>Side</th>
//             <th>Requests</th>
//             <th>Rate</th>
//             <th>p75</th>
//             <th>p90</th>
//             <th>p99</th>
//             <th>Error</th>
//           </tr>
//         </thead>
//         <tbody>
//           {metricsData.map((data, index) => (
//             <React.Fragment key={index}>
//               <tr>
//                 <td rowSpan="2">{data.service}</td>
//                 <td>Client</td>
//                 <td>{data.client.requests}</td>
//                 <td>{data.client.rate}</td>
//                 <td>{data.client.p75}</td>
//                 <td>{data.client.p90}</td>
//                 <td>{data.client.p99}</td>
//                 <td>{data.client.error}</td>
//               </tr>
//               <tr>
//                 <td>Server</td>
//                 <td>{data.server.requests}</td>
//                 <td>{data.server.rate}</td>
//                 <td>{data.server.p75}</td>
//                 <td>{data.server.p90}</td>
//                 <td>{data.server.p99}</td>
//                 <td>{data.server.error}</td>
//               </tr>
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
