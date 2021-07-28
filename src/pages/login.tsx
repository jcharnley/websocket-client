import React, { useState } from "react";
import { RouteComponentProps } from 'react-router-dom';
import LayoutPage from '../components/layout/layout';
import { LoginContainer, LoginMain } from '../styles/login-styles';
import { Input, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';

interface SearchProps extends RouteComponentProps<any> {
	history: any;
}

export const UserSignIn: React.FunctionComponent<SearchProps> = ({ history }) => {
	const [username, setName] = useState<string>('');
	// const [size, setSize] = useState<object>({ size: 'large' });

	return (
		<LayoutPage>
			<LoginContainer className='loginContainer'>
				<label>
					<h5>Enter Name</h5>
				</label>
				<LoginMain className='container'>
					<label>
						<Input
							placeholder='Enter your username'
							prefix={<UserOutlined className='site-form-item-icon' />}
							onChange={(event) => {
								setName(event.currentTarget.value);
							}}
							required
							suffix={
								<Tooltip title='display name'>
									<InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
								</Tooltip>
							}
						/>
					</label>
					<Button
						type='primary'
						shape='round'
						onClick={() => history.push(`/chat?${username}`)}
						// onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
						// 	history.push(`/chat?${username}`);
						// }}
						// icon={<DownloadOutlined />}
						size={'large'}
					>
						Start Chatting
					</Button>
				</LoginMain>
			</LoginContainer>
		</LayoutPage>
	);
};
