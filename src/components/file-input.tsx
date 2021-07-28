import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import { MessageOptions } from '../styles/file-input-styles';
import { unixTimestamp } from '../util';

type messageObject = {
	// username: any;
	current: any;

};
let fileMetaData;
export const FileInput: FunctionComponent<messageObject> = ({ current }) => {
	const handleFile = (e) => {
		const content = e.target.result;
		// console.log('file content', content);
		console.log("fileMetaData", fileMetaData)
		current.send(JSON.stringify({ type: 'filetransfer_incoming', message: content, metaData: fileMetaData.name }));
		// You can set content in state and show it in render.
	};

	const handleChangeFile = (file) => {
		let fileData = new FileReader();
		// console.log("file",file);
		fileMetaData = file;
		fileData.onloadend = handleFile;
		fileData.readAsDataURL(file);
	};
	return (
		<MessageOptions className={'messageOptions'}>
			{/* file reader, gifs, webcam ? */}
			<label>
				Upload
				<input type='file' style={{ display: "none" }} onChange={(e) => handleChangeFile(e.target.files[0])}></input>
			</label>
		</MessageOptions>
	);
};
