import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

const chartData = {
  labels: ['', '', '', '', ''],
  datasets: [{
    label: '# of Votes',
    data: [0, 0, 0, 0, 0],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
    ],
    borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
    ],
    borderWidth: 1,
  }],
};

const chartOptions = {
  scales: {
    xAxes: [{
      gridLines: {
        offsetGridLines: true,
      },
    }],
  },
};

export default class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: [],
    };
  }

  componentWillMount() {
    fetch(`/api/answer/${this.props.id}`)
      .then(res => res.json())
      .then((data) => { this.setState({ answer: data.answer }, () => this.updateData()); })
      .catch(err => console.log(err));
    const options = this.props.options;
    for (let i = 0; i < 5; i++) {
      chartData.labels[i] = options[i];
    }
  }

  updateData() {
    for (let i = 0; i < 5; i++) {
      chartData.datasets[0].data[i] = 0;
    }
    for (let i = 0; i < this.state.answer.length; i++) {
      switch (this.state.answer[i]) {
        default: break;
        case 1: chartData.datasets[0].data[0] += 1; break;
        case 2: chartData.datasets[0].data[1] += 1; break;
        case 3: chartData.datasets[0].data[2] += 1; break;
        case 4: chartData.datasets[0].data[3] += 1; break;
        case 5: chartData.datasets[0].data[4] += 1; break;
      }
    }
  }

  render() {
    return (
      <div>
        <Bar data={chartData} options={chartOptions} />
      </div>
    );
  }
}
