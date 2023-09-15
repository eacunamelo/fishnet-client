import { Route, Routes } from "react-router-dom"
import Container from './components/Container'
import Wrapper from './components/Wrapper'
import Header from './components/header/Header'
import Home from './pages/Home'
import LotAdd from './pages/TripStart'
import Sensor from './pages/SensorView'
import GlobalStyle from './theme/globalStyle'
import FishView from './pages/FishView'
import LotView from './pages/LotView'
import FishDetail from "./pages/FishDetail"
import LotDetail from "./pages/LotDetail"
import Login from './pages/Login'
import PrivateRoute from "./components/PrivateRoute"
import SignIn from "./pages/SignIn"
import LotClose from "./pages/TripFinish"
import { DataContextProvider } from "./services/dataContext"

const App = () => {
  return (
    <DataContextProvider>
      <GlobalStyle />
        <Header /> 
        <Container>
          <Wrapper>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/lotes' element={<LotView />} />
              <Route 
                path='/faena/iniciar' 
                element={<PrivateRoute orgs={['FISHERS']} component={<LotAdd />} />} 
              />
              <Route 
                path='/faena/finalizar' 
                element={<PrivateRoute orgs={['FISHERS']} component={<LotClose />} />} 
              />
              <Route path='/lotes/:id' element={<LotDetail />} />
              <Route 
                path='/sensores' 
                element={<PrivateRoute orgs={['FISHERS']} component={<Sensor />} />} 
              />
              <Route path='/pescados' element={<FishView />} />
              <Route path='/pescados/:id' element={<FishDetail />} />
              <Route path='/login' element={<Login />} />
              <Route path='/sign-in' element={<SignIn />} />
            </Routes>
          </Wrapper>
        </Container>
    </DataContextProvider>
  )
}



export default App
