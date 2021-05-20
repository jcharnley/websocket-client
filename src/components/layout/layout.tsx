import * as React from 'react';
import { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { LayoutContainer } from '../../styles/layout-styles';

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const LayoutPage: React.FunctionComponent = ({ children }) => {
	return (
		<>
			<Layout>
				<Header></Header>
				<Content>{children}</Content>
				<Footer></Footer>
			</Layout>
		</>
	);
};

export default LayoutPage;
