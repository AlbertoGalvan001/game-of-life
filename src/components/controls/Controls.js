import React, { useState } from "react";
import { connect } from "react-redux";
import {
  initializeGridAction,
  animateGameAction,
  randomizeGridAction
} from "../../actions";
import styled from "styled-components";

const Button = styled.button`
  border: 2px solid white;
  background: #1e7b4f;
  color: #31ce83;
  font-family: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px 20px;
`;

const Controls = props => {
  let getAnimationId = React.useRef();
  let start;
  const [initialized, setInitialized] = useState(false);

  function continuousAnimation(timestamp) {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    if (elapsed > 150) {
      props.animateGameAction();
      start = timestamp;
    }
    getAnimationId.current = requestAnimationFrame(continuousAnimation);
  }

  if (!initialized) {
    props.initializeGridAction(25, 60);
    setInitialized(true);
  }

  return (
    <ButtonContainer>
      <Button onClick={() => props.setShowModal(prevState => !prevState)}>
        Select Configuration
      </Button>

      <Button
        onClick={() => {
          props.randomizeGridAction();
          cancelAnimationFrame(getAnimationId.current);
          props.setModify(true);
        }}
      >
        Randomize Grid
      </Button>

      <Button
        onClick={() => {
          cancelAnimationFrame(getAnimationId.current);
          props.setModify(true);
          props.initializeGridAction(25, 60);
        }}
      >
        Reset Grid
      </Button>

      <Button
        onClick={() => {
          props.animateGameAction();
        }}
      >
        Next
      </Button>

      <Button
        onClick={() => {
          props.setModify(false);
          getAnimationId.current = requestAnimationFrame(continuousAnimation);
        }}
      >
        Start
      </Button>

      <Button
        onClick={() => {
          props.setModify(true);
          cancelAnimationFrame(getAnimationId.current);
        }}
      >
        Stop
      </Button>
    </ButtonContainer>
  );
};

const mapStateToProps = state => {
  return {
    canModify: state.canModify
  };
};

export default connect(mapStateToProps, {
  initializeGridAction,
  animateGameAction,
  randomizeGridAction
})(Controls);
