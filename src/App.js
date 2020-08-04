import React, { useState } from "react";
// import "./App.css";
import Grid from "./components/grid/Grid";
import Controls from "./components/controls/Controls";
import Configurations from "./components/preset-configurations/Configurations";
import Counter from "../src/components/controls/Counter";
import styled from "styled-components";

const GridArea = styled.div`
  display: flex;
  flex-direction: column;
  background: #0a291a;
  height: 100vh;
`;

const GridCopy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  color: #1e7b4f;
`;

const Body = styled.h3`
  display: flex;
  color: #1e7b4f;
  width: 50%;
`;

const SubHeading = styled.h2`
  display: flex;
  color: #1e7b4f;
`;

function App() {
  const [modify, setModify] = useState(true);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="App">
      <GridArea>
        <Title>Conway's Game Of Life</Title>
        <Configurations showModal={showModal} setShowModal={setShowModal} />
        <Controls
          modify={modify}
          setModify={setModify}
          setShowModal={setShowModal}
        />
        <Grid modify={modify} />
        <GridCopy>
          <Counter />
          <SubHeading>About</SubHeading>
          <Body>
            The Game Of Life was created in 1970 by the British mathematician
            John Horton Conway. It is a groundbreaking computer automated
            intelligence simulating cellular evolution.
          </Body>
          <SubHeading>Rules</SubHeading>
          <Body>
            1. Any live cell with fewer than two live neighbors dies, as if by
            underpopulation.
          </Body>
          <Body>
            2. Any live cell with two or three live neighbors lives on to the
            next generation.
          </Body>
          <Body>
            3. Any live cell with more than three live neighbors dies, as if by
            overpopulation.
          </Body>
          <Body>
            4. Any dead cell with exactly three live neighbors becomes a live
            cell, as if by reproduction.
          </Body>
        </GridCopy>
      </GridArea>
    </div>
  );
}

export default App;
