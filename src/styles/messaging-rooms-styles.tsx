import styled from "styled-components";

export const TableContainer = styled.div`
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  overflow-y: scroll;
  width: 100%;
  border: 2px solid #40a9ff;
  box-sizing: border-box;
`;

export const Table = styled.table`
  width: 100%;
`;
export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  height: 20px;
`;

export const TableRowUser = styled.td`
  // padding: 0;
  font-weight: 700;
  // color: green;
`;

export const TableRowMessage = styled.td`
  // padding: 0.4rem 0 0.4rem 0;
  // border-bottom: 1px solid lightgrey;
  flex: 1;
`;
export const TableRowTimeStamp = styled.td`
  // padding: 0;
  // border-bottom: 1px solid lightgrey;
  // text-align: right;
  color: grey;
`;
