import { useFormik } from 'formik'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert'
import Alert from '../components/Alert'
import { Button, Form } from '../components/Form'
import { Input } from '../components/Input'
import Label from '../components/Label'
import { Title } from '../components/Title'
import { DataContext } from '../services/dataContext'
import LotRepository from '../services/repository/LotRepository'

const LotAdd = () => {
  const navigate = useNavigate()
  const { dataContext, setDataContext } = useContext(DataContext)

  const formik = useFormik({
    initialValues: {
      port: 'Matarani',
      vessel: 'Damaris II',
      owner: 'Edwin Aguilar',
      specie: 'Perico',
      gear: 'Pinta'
    },
    onSubmit: values => {
      LotRepository.start(values)
      .then((res) => {
        if (res.error) {
          //Alert("Error", res.error, "warning")
            Swal({
              title:"Error",
              text:res.error,
              icon:"warning"
           })
        } else{
          setDataContext({...dataContext, profile: { hasStartedLot: true }})
          navigate('/faena/finalizar')
        }
      })
    }
  })

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Title gap={'2rem'}>Registrar salida</Title>
        <Label>Puerto</Label>
        <Input 
          type='text' 
          name='port'
          onChange={formik.handleChange}
          value={formik.values.port}
        />
        <Label>Embarcación</Label>
        <Input 
          type='text' 
          name='vessel'
          onChange={formik.handleChange}
          value={formik.values.vessel}
        />
        <Label>Dueño</Label>
        <Input 
          type='text' 
          name='owner'
          onChange={formik.handleChange}
          value={formik.values.owner}
        />
        <Label>Especie</Label>
        <Input 
          type='text' 
          name='specie'
          onChange={formik.handleChange}
          value={formik.values.specie}
        />
        <Label>Arte de pesca</Label>
        <Input 
          type='text' 
          name='gear'
          onChange={formik.handleChange}
          value={formik.values.gear}
        />
        <Button type='submit'>Iniciar faena</Button>
      </Form>
    </>
  )
}

export default LotAdd