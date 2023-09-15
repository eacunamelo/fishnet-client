import { useContext, useState } from 'react'
import { AiOutlineBell, AiOutlineUser } from 'react-icons/ai'
import styled, { css } from 'styled-components'
import AuthService from '../../services/AuthService'
import { DataContext } from '../../services/dataContext'
import { useNavigate } from 'react-router-dom'

const icon = css`
  font-size: ${props => props.theme.sizes.headerIcon};
	color: ${props => props.theme.colors.primary};
	cursor: pointer;
`

const BellIcon = styled(AiOutlineBell)`
	${icon}
`

const UserIcon = styled(AiOutlineUser)`
  ${icon}
`
const UserOptions = styled.div`
  display: ${props => props.isVisible ? 'block' : 'none'};
  position: absolute;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray};
  border-top: none;
  top: 47px;
  right: 0;

  li {
    white-space: nowrap;
    width: 100%;
    padding: 10px 40px;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`

const User = () => {
  const [ isVisible, setIsVisible ] = useState(false)
  const { setDataContext } = useContext(DataContext)
  const navigate = useNavigate()

  const handleClick = () => {
    setIsVisible(!isVisible)
  }

  const handleLogout = () => {
    AuthService.logOut()
    setDataContext({auth: {isLoggedIn: false}, profile: { hasStartedLot: false }})
    navigate('/login')
  }

  return (
    <>
      <UserIcon onClick={handleClick}/>
      <UserOptions isVisible={isVisible} >
        <ul>
          <li onClick={handleLogout}>
            Cerrar Sesión
          </li>
        </ul>
      </UserOptions>
    </>
  )
}

const Buttons = styled.div.attrs(() => ({
  children: <><BellIcon /><User/> </>
}))`
  margin-left: auto;
  position: relative;
  
  & > * {
    margin-right: 15px;
  }

  & > *:nth-last-child(-n+2) {
    margin-right: 0;
  }
  
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-left: 0;
		order: 3;
	}
`

export default Buttons