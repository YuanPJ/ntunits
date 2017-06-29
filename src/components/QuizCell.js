import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import cell1 from '../images/cell1.png';
import cell2 from '../images/cell2.png';
import cell3 from '../images/cell3.png';
import cell4 from '../images/cell4.png';
import cell5 from '../images/cell5.png';
import cell6 from '../images/cell6.png';
import cell7 from '../images/cell7.png';
import cell8 from '../images/cell8.png';
import cell9 from '../images/cell9.png';
import cell10 from '../images/cell10.png';
import cell11 from '../images/cell11.png';
import cell12 from '../images/cell12.png';

export default class QuizCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    switch (this.props.id) {
      default: return;
      case 0: return (<div> <img src={cell1} className="img-responsive" alt="" /> </div>);
      case 1: return (<div> <img src={cell2} className="img-responsive" alt="" /> </div>);
      case 2: return (<div> <img src={cell3} className="img-responsive" alt="" /> </div>);
      case 3: return (<div> <img src={cell4} className="img-responsive" alt="" /> </div>);
      case 4: return (<div> <img src={cell5} className="img-responsive" alt="" /> </div>);
      case 5: return (<div> <img src={cell6} className="img-responsive" alt="" /> </div>);
      case 6: return (<div> <img src={cell7} className="img-responsive" alt="" /> </div>);
      case 7: return (<div> <img src={cell8} className="img-responsive" alt="" /> </div>);
      case 8: return (<div> <img src={cell9} className="img-responsive" alt="" /> </div>);
      case 9: return (<div> <img src={cell10} className="img-responsive" alt="" /> </div>);
      case 10: return (<div> <img src={cell11} className="img-responsive" alt="" /> </div>);
      case 11: return (<div> <img src={cell12} className="img-responsive" alt="" /> </div>);
    }
  }
}
