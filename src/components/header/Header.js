import styled, { useTheme } from 'styled-components'
import { Navbar, NavbarItem } from './Nav'
import Logo from './Logo'
import Buttons from './UserButtons'
import Container from '../Container'
import { useContext, useState } from 'react'
import useWindowResize from '../../hooks/useWindowResize'
import LoginButton from './LoginButton'
import AuthService from '../../services/AuthService'
import { DataContext } from '../../services/dataContext'

const Wrapper = styled.div`
	width: 100%;
	height: 60px;
	background-color: ${props => props.theme.colors.white};
	box-shadow: 0 1px 1px rgba(0,0,0,.1);

	& ${Container} {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	@media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
		& ${Container} {
			justify-content: space-between;
			width: 100%;
			padding: 0 20px;
		}
	}
`

const Header = ({ className, ...props }) => {
	const theme = useTheme()
	
	const [ isOpen, setIsOpen ] = useState(false)
	const handleOpen = () => {
		setIsOpen(!isOpen)
	}
	
	const [ screenWidth ] = useWindowResize()
	const isCollapsed = (screenWidth <= Number(theme.breakpoints.sm.replace('px','')))
											? true
											: false

	const { dataContext } = useContext(DataContext)
	const isLoggedIn = dataContext.auth.isLoggedIn
	const hasStartedLot = dataContext.profile.hasStartedLot
	
	return (
		<Wrapper>
			<Container>
					<Logo to={'/'} text={'FishNet'} />
					<Navbar isCollapsed={isCollapsed} isOpen={isOpen} handleOpen={handleOpen} >
						{
							!hasStartedLot
							? <NavbarItem to='/faena/iniciar' text='Faena' onClick={handleOpen} orgs={['FISHERS']} />	
							: <NavbarItem to='/faena/finalizar' text='Faena' onClick={handleOpen} orgs={['FISHERS']} />	
						}
						<NavbarItem to='/sensores' text='Sensores' onClick={handleOpen} orgs={['FISHERS', 'PARTNERS']}/>
						<NavbarItem to='/lotes' text='Lotes' onClick={handleOpen} />
						<NavbarItem to='/pescados' text='Pescados' onClick={handleOpen} />
					</Navbar>
					{
						isLoggedIn
						? <Buttons />
						: <LoginButton />
					}
			</Container>
		</Wrapper>
  )
}

export default Header