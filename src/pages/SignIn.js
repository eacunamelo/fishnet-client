import { useFormik } from 'formik'
import { Button, Form } from '../components/Form'
import { Input } from '../components/Input'
import Label from '../components/Label'
import { Title } from '../components/Title'
import P from '../components/P'
import Link from '../components/Link'

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      user: '',
      password: '',
    },
    onSubmit: values => console.log(values)
  })

  return (
    <>
      <Form onSubmit={formik.handleSubmit} autoComplete='off'>
        <Title gap={'2rem'}>Crear una cuenta</Title>
        <Label>Nombre</Label>
        <Input 
          type='text' 
          name='name'
          onChange={formik.handleChange}
          value={formik.values.user}
        />
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
        <Button type='submit'>Registrarme</Button>
        <P align='right'>¿Ya tienes una cuenta? <Link to='/login'>Ingresa aquí</Link></P>
      </Form>
    </>
  )
}

export default SignIn