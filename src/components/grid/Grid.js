import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { modifyGridAction } from "../../actions";

const CellRow = styled.div`
  display: flex;
`;

const CellDiv = styled.div`
  width: 94%;
  min-width: 15px;
  min-height: 20px;
  ${props => (props.alive ? "background: white;" : "background: black;")}
`;

const GridHolder = styled.div`
  border: 2px solid white;
  margin: 0 auto;
  width: 94%;
`;

const Grid = props => {
  const modifyGrid = (row, col) => {
    if (props.modify) {
      props.modifyGridAction(row, col);
    }
  };
  return (
    <GridHolder>
      {props.grid
        ? props.grid.map((val, row) => {
            return (
              <CellRow key={row}>
                {val.map((cell, col) => {
                  return (
                    <CellDiv
                      key={col}
                      alive={cell.alive}
                      onClick={() => modifyGrid(row, col)}
                    ></CellDiv>
                  );
                })}
              </CellRow>
            );
          })
        : null}
    </GridHolder>
  );
};

const mapStateToProps = state => {
  return {
    grid: state.swapGrid ? state.grid1 : state.grid2,
    canModify: state.canModify
  };
};

export default connect(mapStateToProps, { modifyGridAction })(Grid);
