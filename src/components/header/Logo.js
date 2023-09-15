import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Logo = styled(Link).attrs(({ text }) => ({
	children: text
}))`
	font-family: 'Yanone Kaffeesatz';	
	color: ${props => props.theme.colors.primary};
	font-size: 2rem;
	font-weight: 600;
	margin-top: 5px;

	@media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
		order: 2;
		margin-right: auto;
	}
`

export default Logo