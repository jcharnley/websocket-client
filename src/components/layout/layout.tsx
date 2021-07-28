import React from "react";
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

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
