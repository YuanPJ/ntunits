import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

const chartData = {
  labels: ['', '', '', '', ''],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
};

// const chartOptions = {
//     scales: {
//         xAxes: [{
//             gridLines: {
//                 offsetGridLines: true
//             }
//         }]
//     }
// };

export default class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['', '', '', '', ''],
      options: [],
      number: this.props.number,
    };
  }

  componentWillMount() {
    // fetch('/api/getQuiz')
    //   .then(res => res.json())
    //   .then(data => this.setState({ data }))
    //   .catch(err => console.log(err));
    // console.log("component will mount");
    for (let i = 0; i < 5; i++) {
        chartData.labels[i] = this.props.data[i];
    }
  }

  render() {
    return (
      <div>
         <Bar data={chartData} />
      </div>
    );
  }
}
