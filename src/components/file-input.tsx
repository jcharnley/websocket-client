import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import { InputMessage, MessageButton, TextInputContainer } from '../styles/app-styles';
import { unixTimestamp } from '../util';

type messageObject = {
	// username: any;
	// current: any;
	// input: any;
	// setInput: any;
	// rooms: any;
};

export const FileInput: FunctionComponent<messageObject> = () => {
	return (
		<div className={'messageOptions'}>
			{/* file reader, faces, webcam ? */}
			<input type='file'></input>
		</div>
	);
};
