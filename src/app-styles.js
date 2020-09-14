import styled from "styled-components";

export const CombinedContainer = styled.div`
  display: flex;
`;
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
  
`;
export const OnlineContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid blue;
  overflow: scroll;
`;

export const DeleteButton = styled.button`
background-color: red;
color: white;
`
export const Online = styled.ul`
  text-align: center;
  // margin-right: 3rem;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 90vh;
  overflow: scroll;
  width: 90%;
`;

export const Table = styled.table`
  width: 100%;
`;
export const TableBody = styled.tbody``;

export const TableRowUser = styled.td`
  padding: 0;
  font-weight: 700;
  color: green;
`;

export const TableRowMessage = styled.td`
  padding: 0.4rem 0 0.4rem 0;
  border-bottom: 1px solid lightgrey;
  // > last-child {
  //   position: sticky;
  //   bottom: 0;
  // }
`;
export const TableRowTimeStamp = styled.td`
  padding: 0;
  border-bottom: 1px solid lightgrey;
  text-align: right;
  color: grey;
`;

export const MessageButton = styled.button`
  width: 10%;
`;

export const InputMessage = styled.input`
  width: 90%;
  height: 3rem;
`;

export const AppContainer = styled.div``;

export const ChatWindowContainer = styled.div``;
