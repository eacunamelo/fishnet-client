import styled from 'styled-components'
import { AiOutlineMenu } from 'react-icons/ai'
import { NavLink as navLink } from "react-router-dom"
import AuthService from '../../services/AuthService'

const MenuIcon = styled(AiOutlineMenu)`
	font-size: ${props => props.theme.sizes.headerIcon};
	color: ${props => props.theme.colors.primary};
	cursor: pointer;

	@media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
		margin-right: 20px;
	}
`

const NavLink = styled(navLink)`
	display: block;
	width: 100%;
	padding: 20px 0;
`

const Li = styled.li`
	display: ${props => props.isVisible ? 'inline-block' : 'none'};
	margin: 0 1rem;
	font-size: 1.15rem;

	& > a.active {
		color: ${props => props.theme.colors.primary};
		font-weight: 600;
	}
`

const NavbarItem = ({to, onClick, text, orgs}) => {
	const isAuthenticated = AuthService.isLoggedIn()
	const org = isAuthenticated ? AuthService.getOrg() : 'PUBLIC'
	const isVisible = orgs ? orgs.find(x => x == org) : true
	
	return(
		<Li onClick={onClick} isVisible={isVisible}>
			<NavLink to={to} onClick={onClick} end>{text}</NavLink>
		</Li>
	)
}

// const isAuthenticated = AuthService.isLoggedIn()
// const org = isAuthenticated ? AuthService.getOrg() : 'PUBLIC'
// const NavbarItem = styled.li.attrs(({ to, onClick, text, orgs }) => ({
// 	children: 
// 				orgs.find(x => x == org) 
// 				? <NavLink to={to} onClick={onClick} end>{text}</NavLink>
// 				: null,
// 	onClick: onClick
// }))`
// 	display: inline-block;
// 	margin: 0 1rem;
// 	font-size: 1.15rem;

// 	& > a.active {
// 		color: ${props => props.theme.colors.primary};
//     font-weight: 600;
// 	}
// `

const Navbar = styled.nav.attrs(({ children, isCollapsed, isOpen, handleOpen }) => ({
	children: (!isCollapsed) 
						? <ul>{children}</ul> 
						: (isOpen)
						? <><MenuIcon onClick={handleOpen}/><ul>{children}</ul></>
						: <MenuIcon onClick={handleOpen}/>
}))`
	margin: 0 3rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	
	& ul {
		list-style-type: none;
		padding: 0;
		position: relative;
	}

	@media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
		margin: 0;

		& ul {
			background-color: ${props => props.theme.colors.white};
			width: 100%;
			position: absolute;
			top: 62px;
			left: 0px;
			box-shadow: 1px 1px 1px rgba(0,0,0,.1);
			display: flex;
			flex-direction: column;
			text-align: center;
			z-index: 2;
		}
	}
`

export { Navbar, NavbarItem }