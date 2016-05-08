import React, { Component } from 'react';
import { socket } from '../../utils/socket.js';
import { Link } from 'react-router';

export class VoteTable extends Component {

  updateVoteStore (data) {
    this.props.updateVotes(data, this.props.votes);
  }

  componentDidMount () {
    socket.on("vote update", function (data) {
      this.updateVoteStore.call(this, data);
    }.bind(this));

    socket.emit("vote get", {token: this.props.token})
  }

  componentWillUnmount () {
    socket.removeAllListeners("vote update");
  }

  render() {
    const { votes } = this.props;
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Opened by</th>
            
          </tr>
        </thead>
        <tbody>

          {
            Object.keys(votes).map((item, index) => 
              <tr key={index}>
                <td>{item}</td>
                <td>{votes[item].creator}</td>
                <td><button type="button" className="btn btn-primary" disabled={votes[item].closed}>
                  <Link to={'/dashboard/delegate/vote/' + encodeURIComponent(item)} style={{color: "white"}}>
                    Vote
                  </Link>
                </button></td>
              </tr>
            )
          }

        </tbody>
      </table>
    );
  }
}