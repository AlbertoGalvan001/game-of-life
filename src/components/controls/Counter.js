import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const CountDiv = styled.div`
  display: flex;
  justify-content: center;
  color: white;

  .counter {
    color: white;
  }
`;

class Counter extends Component {
  render() {
    return <div className="counter">Generations: {this.props.generations}</div>;
  }
}

const mapStateToProps = ({ generations }) => {
  return { generations: generations };
};

export default connect(mapStateToProps)(Counter);
