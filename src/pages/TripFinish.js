import { useFormik } from 'formik'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from '../components/Form'
import { Input } from '../components/Input'
import Swal from 'sweetalert'
import Label from '../components/Label'
import { Title } from '../components/Title'
import LotRepository from '../services/repository/LotRepository'
import { DataContext } from '../services/dataContext';
import useSocket from '../hooks/useSocket'
import LocalStorageService from '../services/LocalStorageService'

const LotClose = () => {
  const navigate = useNavigate()
  const { dataContext, setDataContext } = useContext(DataContext)
  const [ws, ws1, message, setMessage] = useSocket()

  const formik = useFormik({
    initialValues: {
      port: 'Matarani',
      volume: '2000',
    },
    onSubmit: values => {
      LotRepository.finish({...values, volume: parseInt(values.volume)})
      .then((res) => {
        ws.current.send(JSON.stringify({
          type: "SEND_BLOCKCHAIN", 
          apiProfile: LocalStorageService.getApiProfile(),
        }))
        ws1.current.onmessage = e => {
          const message = e.data;
          if (message.includes('INFO: Los hashes se subieron a la blockchain correctamente')) {
            setDataContext({...dataContext, profile: { hasStartedLot: false }})
            navigate('/faena/iniciar')
          } else {
              if (message.includes('Error')) {
                Swal({
                  title:"Error",
                  text:message,
                  icon:"warning"
               })
              } 
            }
        }
      })
    }
  })

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Title gap={'2rem'}>Registrar desembarco</Title>
        <Label>Puerto</Label>
        <Input 
          type='text' 
          name='puerto'
          onChange={formik.handleChange}
          value={formik.values.port}
        />
        <Label>Volumen de pesca</Label>
        <Input 
          type='text' 
          name='volume'
          onChange={formik.handleChange}
          value={formik.values.volume}
        />
        <Button type='submit'>Terminar faena</Button>
      </Form>
    </>
  )
}

export default LotClose