import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import { InputMessage, MessageButton, TextInputContainer } from '../styles/app-styles';
import { unixTimestamp } from '../util';

type messageObject = {
	// username: any;
	current: any;
 
};

export const FileInput: FunctionComponent<messageObject> = ({current}) => {
	const handleFile = (e) => {
		const content = e.target.result;
		console.log('file content', content);

        current.send(JSON.stringify({ type: 'filetransfer_incoming', data: content }));
		// You can set content in state and show it in render.
	};

	const handleChangeFile = (file) => {
        console.log("file",file)
		let fileData = new FileReader();
		fileData.onloadend = handleFile;
		fileData.readAsDataURL(file);
	};
	return (
		<div className={'messageOptions'}>
			{/* file reader, faces, webcam ? */}
			<input type='file' onChange={(e) => handleChangeFile(e.target.files[0])}></input>
		</div>
	);
};
