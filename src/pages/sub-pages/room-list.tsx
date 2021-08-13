import React, { FunctionComponent } from "react";
import styled from "styled-components";
import cloneDeep from "lodash/cloneDeep";
import { ConsoleSqlOutlined } from "@ant-design/icons";
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

const RoomListItemSelected = styled("div")<listItemPropsEditStyles>`
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
  const toggleClass = (id, index) => {
    console.log("toggleClass", id, index);
    const selectedClone = cloneDeep(isActive);

    if (selectedClone === null) {
      setActive(id);
    } else if (selectedClone === id) {
      setActive(null);
    } else {
      setActive(id);
    }
  };

  const messageAlert = (element) => {
    console.log("msgAlert", msgAlert);
    console.log("element", element);
    // return null;
    if (
      msgAlert.type === "message" &&
      !element.privateRoomID &&
      msgAlert.newMsg === true
    ) {
      return "3px solid #52c41a";
    }

    if (
      msgAlert.type === "private_message" &&
      element.privateRoomID &&
      msgAlert.newMsg === true
    ) {
      return "3px solid #52c41a";
    } 
    else {
      // msgAlert.newMsg === false;
      return "";
    }
    // else {
    //   return (
    //     '3px solid #52c41a'
    //   )
    // }
    // msgAlert.type === "message" && isActive !== element.id
  };

  const clearMessageAlert = () => {
    msgAlert.newMsg = false;
    return "";
  };

  return (
    <RoomListComponent>
      <RoomListing>
        {rooms &&
          rooms.map((element, index) => {
            if (isActive === element.privateRoomID) {
              element.selected = true;
            } else {
              element.selected = false;
            }
            return (
              <RoomListItem
                key={index}
                style={{
                  backgroundColor:
                    isActive === element.privateRoomID ? "#e6f7ff" : "#1890ff",
                  border:
                    isActive !== element.privateRoomID
                      ? messageAlert(element)
                      : clearMessageAlert(),
                }}
                onClick={() => toggleClass(element.privateRoomID, index)}
                open={isActive === element.privateRoomID}
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
