import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { NavLink as navLink } from 'react-router-dom';
import styled from 'styled-components'

const NavLink = styled(navLink)`
  font-size: 1.1rem;

  &:first-child {
    display: none;
  }

  &:not(:last-child):after {
    content: '/';
    margin: 0 10px;
  }
`

const Wrapper = styled.div`
  margin-bottom: 30px;

  & > a:last-child {
		color: ${props => props.theme.colors.primary};
    font-weight: 600;
	}
`

const Breadcrumbs = () => {
  const routes = [
    { path: '/:component/add', breadcrumb: 'Nuevo' },
  ];

  const breadcrumbs = useBreadcrumbs(routes);
  
  return (
    <Wrapper>
      {breadcrumbs.map(({
        match,
        breadcrumb
      }) => (
          <NavLink key={match.pathname} to={match.pathname}>{breadcrumb}</NavLink>
      ))}
    </Wrapper>
  );
};

export default Breadcrumbs