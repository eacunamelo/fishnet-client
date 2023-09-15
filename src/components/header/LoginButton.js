import styled from "styled-components"
import Link from '../Link'

const LoginButton = styled.div.attrs(({props}) => ({
    children: <Link to='/login'>Login</Link>
}))`
    padding: 8px 20px;
    font-family: ${props => props.theme.fonts.primary};
    font-size: 1.1rem;
    font-weight: 500;
    color: ${props => props.theme.colors.primary};
    border: 1.25px solid ${props => props.theme.colors.primary};
    border-radius: 5px;
    cursor: pointer;
    margin-left: auto;

    @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
        margin-left: 0;
		order: 3;
	}
`

export default LoginButton