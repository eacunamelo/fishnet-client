import { useEffect } from 'react'
import { Title } from '../components/Title'
import LotRepository from '../services/repository/LotRepository'

const Home = () => {
  useEffect(() => {
    // LotRepository.add({hola: "mundo"}).then((res) => console.log(res))
    // LotRepository.get(1).then((res) => console.log(res))
    // IpfsRepository.get("Qme3TSJNxEeWbYLFyKSpViT1eE6Gx9HLXrLo32fnLwzUZm")
    // .then(res => console.log(res))
    // LotRepository.getCurrent().then((res) => console.log(res))
  }, [])
  
  return (
    <Title>Bienvenido a Fishnet</Title>
  ) 
}

export default Home
