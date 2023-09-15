import { useFormik } from 'formik'
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Form } from '../components/Form'
import { Input, Select } from '../components/Input'
import Label from '../components/Label'
import Link from '../components/Link'
import P from '../components/P'
import { Title } from '../components/Title'
import AuthService from '../services/AuthService'
import { useContext } from 'react';
import { DataContext } from '../services/dataContext';
import LotRepository from '../services/repository/LotRepository'

const Login = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const previousPath = state ? state.pathname : '/'
  const { setDataContext } = useContext(DataContext)

  const formik = useFormik({
    initialValues: {
      user: '',
      password: '',
      org: '',
    },
    onSubmit: values => {
      AuthService.login(values)
        .then((res) => {
          navigate(previousPath)
          LotRepository.getCurrent().then((res) => {
            setDataContext({
              auth: { isLoggedIn: true }, 
              profile: { 
                hasStartedLot: res.hasOwnProperty('id')
              }
            })
          })
        })
    }
  })
  
  return (
    <>
      <Form onSubmit={formik.handleSubmit} autoComplete='off'>
        <Title gap={'2rem'}>Ingresar</Title>
        <Label>Organización</Label>
        <Select 
          name='org'
          onChange={formik.handleChange}
          value={formik.values.org}
        >     
          <option value=''>Ninguna</option>
          <option value='FISHERS'>Pescadores</option>
          <option value='PARTNERS'>Socios</option>
          <option value='PUBLIC'>Invitados</option>
        </Select>
        <Label>Usuario</Label>
        <Input 
          type='text' 
          name='user'
          onChange={formik.handleChange}
          value={formik.values.user}
        />
        <Label>Contraseña</Label>
        <Input 
          type='password' 
          name='password'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Button type='submit'>Ingresar</Button>
        <P align='right'>¿No tienes una cuenta? <Link to='/sign-in'>Crea una aquí</Link></P>
      </Form>
    </>
  )
}

export default Login