// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
// import "./App.css";

// function Portfolio() {
//   const [series1, setSeries1] = useState([]);
//   const [series2, setSeries2] = useState([]);
//   const [series3, setSeries3] = useState([]);
//   const [series4, setSeries4] = useState([]);

//   // Fetch data from the server when the component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/portfolio');
//         const data = await response.json();
        
//         // Assuming data is an array with three elements
//         setSeries1(data[0]);
//         setSeries2(data[1]);
//         setSeries3(data[2]);
//         setSeries4(data[3]);

//         console.log("Realised per Comp: ", data[0]);
//         console.log("UnRealised per Comp: ", data[1]);
//         console.log("Realised Total: ", data[2]);
//         console.log("UnRealised Total: ", data[3]);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     fetchData();
//   }, []); // Empty dependency array means this effect runs once after the initial render

//   const barChartOptions = {
//     colors: ["#9F9800", "#F90E63"],
//     chart: {
//       id: "basic-bar",
//     },
//     xaxis: {
//       categories: ["Infosys", "Wipro", "ICICI", "ITC"],
//     },
//   };

//   const barChartOptions2 = {
//     colors: ["#9F9800", "#F90E63"],
//     chart: {
//       id: "basic-bar",
//     },
//     xaxis: {
//       categories: ["Total Realised Profit/Loss"],
//     },
//   };

//   const barChartOptions3 = {
//     colors: ["#9F9800", "#F90E63"],
//     chart: {
//       id: "basic-bar",
//     },
//     xaxis: {
//       categories: ["Total UnRealised Profit/Loss"],
//     },
//   };

// //   const pieChartOptions = {
// //     labels: ['Profit', 'Loss'],
// //     colors: ["#34A853", "#EA4335"],
// //   };

//   return (
//     <div className="App">
//       <h1>
//         Stock Portfolio <i className="fas fa-user"></i>{" "}
//       </h1>
//       <div className="row">
//         <div className="col-4">
//         <h2>Realised per stock profit/loss</h2>
//           <Chart options={barChartOptions} series={series1} type="bar" width="1000" height="300" />
//         </div>
//         <div className="col-4">
//         <h2>Unrealised per stock profit/loss</h2>
//           <Chart options={barChartOptions} series={series2} type="bar" width="1000" height="300" />
//         </div>
//         <h2>Realised overall profit/loss</h2>
//         <div className="col-4">
//           <Chart options={barChartOptions2} series={series3} type="bar" width="1000" height="300" />
//         </div>
//         <div className="col-4">
//             <h2>Unrealised overall profit loss</h2>
//           <Chart options={barChartOptions3} series={series4} type="bar" width="1000" height="300"/>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Portfolio;


import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "./App.css";

function Portfolio() {
  const [series1, setSeries1] = useState([]);
  const [series2, setSeries2] = useState([]);
  const [series3, setSeries3] = useState([]);
  const [series4, setSeries4] = useState([]);

  // Fetch data from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/portfolio');
        const data = await response.json();
        
        // Assuming data is an array with three elements
        setSeries1(data[0]);
        setSeries2(data[1]);
        setSeries3(data[2]);
        setSeries4(data[3]);

        console.log("Realised per Comp: ", data[0]);
        console.log("UnRealised per Comp: ", data[1]);
        console.log("Realised Total: ", data[2]);
        console.log("UnRealised Total: ", data[3]);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const barChartOptions = {
    colors: ["#9F9800", "#F90E63"],
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["Infosys", "Wipro", "ICICI", "ITC"],
    },
  };

  const barChartOptions2 = {
    colors: ["#9F9800", "#F90E63"],
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["Total Realised Profit/Loss"],
    },
  };

  const barChartOptions3 = {
    colors: ["#9F9800", "#F90E63"],
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["Total UnRealised Profit/Loss"],
    },
  };

  return (
    <div className="App">
      <h1>
        Stock Portfolio <i className="fas fa-user"></i>{" "}
      </h1>
      <div className="row">
        <div className="col-4" style={{ backgroundColor: "#e6e6e6" }}>
          <h2>Realised per stock profit/loss</h2>
          <Chart options={barChartOptions} series={series1} type="bar" width="1000" height="300" />
        </div>
        <div className="col-4" style={{ backgroundColor: "#f2f2f2" }}>
          <h2>Unrealised per stock profit/loss</h2>
          <Chart options={barChartOptions} series={series2} type="bar" width="1000" height="300" />
        </div>
        <div className="col-4" style={{ backgroundColor: "#e6e6e6" }}>
          <h2>Realised overall profit/loss</h2>
          <Chart options={barChartOptions2} series={series3} type="bar" width="1000" height="300" />
        </div>
        <div className="col-4" style={{ backgroundColor: "#f2f2f2" }}>
          <h2>Unrealised overall profit loss</h2>
          <Chart options={barChartOptions3} series={series4} type="bar" width="1000" height="300"/>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
