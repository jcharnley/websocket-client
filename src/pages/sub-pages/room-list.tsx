import React, { useState, FunctionComponent, useContext } from 'react';
import styled, { css } from 'styled-components';
import cloneDeep from 'lodash/cloneDeep';
import { ThemeContext } from 'styled-components';
import { configConsumerProps } from 'antd/lib/config-provider';

type RoomlistObject = {
	rooms: Array<any>;
	isActive: any;
	setActive: any;
	// isActive: Boolean;
};

interface listItemProps {
	key: any;
	isActive?: any;
	status: any;
	onClick?: (e: React.MouseEvent) => void;
}

const RoomListComponent = styled.div`
	width: auto;
	height: 100%;
`;

const RoomListing = styled.ul`
	list-style: none;
	margin: 0;
	height: 100%;
	padding: 0;
`;

const RoomListItem = styled.li<listItemProps>`
	height: 32px;
	width: 90px;
	display: flex;
	justify-content: center;
	align-items: center;s
	box-sizing: content-box;
	& + & {
		border-top: 0;
	  }
`;

export const Roomlist: FunctionComponent<RoomlistObject> = ({ rooms, isActive, setActive }) => {

	const toggleClass = (id) => {
		const newSelected = cloneDeep(isActive);

		if (newSelected === false) {
			setActive(id);
		} else if (newSelected === id) {
			setActive(null);
		} else {
			setActive(id);
		}
	};

	return (
		<RoomListComponent>
			<RoomListing>
				{rooms.map((element, key) => {
					if (isActive === element.id) {
						element.selected = true;
					} else {
						element.selected = false;
					}
					return (
						<RoomListItem
							key={key}
							style={{
								border: isActive === element.id ? '1px solid green' : '1px solid grey',
							}}
							onClick={() => toggleClass(element.id)}
							status={isActive === element.id ? true:false}
						>
							<span>{element.targetName}</span>
						</RoomListItem>
					);
				})}
			</RoomListing>
		</RoomListComponent>
	);
};
