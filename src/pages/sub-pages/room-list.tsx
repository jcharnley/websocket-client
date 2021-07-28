import React, { FunctionComponent } from "react";
import styled from "styled-components";
import cloneDeep from "lodash/cloneDeep";
// import { ThemeContext } from "styled-components";
// import { configConsumerProps } from "antd/lib/config-provider";

type RoomlistObject = {
  rooms: Array<any>;
  isActive: any;
  setActive: any;
  msgAlert: any;
  setMsgAlert: any;
};

interface listItemProps {
  isActive?: boolean;
  open: any;
  onClick?: (e: React.MouseEvent) => void;
}

interface listItemPropsEditStyles {
  isIndented: any;
}

const RoomListComponent = styled.div`
  width: auto;
  border: 2px solid #91d5ff;
`;

const RoomListing = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const RoomListItem = styled.li<listItemProps>`
	height: 32px;
	width: 80px;
	display: flex;
	justify-content: center;
	align-items: center;s
	box-sizing: content-box;
	& + & {
		border-top: 0;
	  }
`;

const RoomListItemSelected = styled("div") <listItemPropsEditStyles>`
  ${(props) =>
    props.isIndented &&
    `
	background-color: white;
	position: relative;
	left: 7px;
    height: 32px;
    width: 5px;
`}
`;

export const Roomlist: FunctionComponent<RoomlistObject> = ({
  rooms,
  isActive,
  setActive,
  msgAlert,
  setMsgAlert,
}) => {
  const toggleClass = (id) => {
    const selectedClone = cloneDeep(isActive);
 console.log("selectedClone",selectedClone)
    if (selectedClone === null) {
      setActive(id);
    } else if (selectedClone === id) {
      setActive(null);
    } else {
      setActive(id);
    }
  };

  const messageAlert = (element) => {
    // console.log('msgAlert',msgAlert)
    if (msgAlert.type === "message" && element.id === 0) {
      return msgAlert.newMsg === true ? "3px solid #52c41a" : null;
    }
    // else {
    //   return (
    //     '3px solid #52c41a'
    //   )
    // }
    // msgAlert.type === "message" && isActive !== element.id
  };

  const alertToggle = () => {
    msgAlert.newMsg = false;
    return "";
  };

  return (
    <RoomListComponent>
      <RoomListing>
        {rooms.map((element, key) => {
          console.log("isActive, element.id", isActive, element.id)
          if (isActive === element.id) {
            element.selected = true;
          } else {
            element.selected = false;
          }
          return (
            <RoomListItem
              style={{
                backgroundColor:
                  isActive === element.id ? "#e6f7ff" : "#1890ff",
                border:
                  isActive !== element.id
                    ? messageAlert(element)
                    : alertToggle(),
              }}
              onClick={() => toggleClass(element.id)}
              open={isActive === element.id}
            >
              <span>{element.targetName}</span>
              {/* <RoomListItemSelected
                isIndented={isActive === element.id}
              ></RoomListItemSelected> */}
            </RoomListItem>
          );
        })}
      </RoomListing>
    </RoomListComponent>
  );
};
