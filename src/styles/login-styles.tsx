import styled from 'styled-components';

const Heading = styled.h1<{ active: boolean }>`
	color: ${(props) => (props.active ? 'red' : 'blue')};
`;

export const LoginContainer = styled.div`
	margin: 0 auto;
	border: 1px solid;
	border-radius: 10px;
	border: 3px solid #f1f1f1;
	display: flex;
	justify-content: start;
	flex-direction: column;
	align-items: center;
	width: 80vw;
	height: 20vh;
`;

export const LoginMain = styled.div`

}

`;
