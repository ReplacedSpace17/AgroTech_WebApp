import { Routes, Route } from "react-router-dom"

import App from "./App.jsx"
import Login from "./Views/Login/Login.jsx"
import CrearCuenta from "./Views/Cuenta/CrearCuenta.jsx"
import Home from "./Views/Home/Home.jsx"
import CodeVerify from "./Views/Cuenta/CodeEmail.jsx"
import CompleteProfile from "./Views/Cuenta/CompleteProfile.jsx"
import MisCepas from "./Views/MisCepas/MisCepas.jsx"
import AgregarCepa from "./Views/MisCepas/AgregarCepa.jsx"
import EditarCepa from "./Views/MisCepas/EditarCepa.jsx"
import MisCultivos from "./Views/MisCultivos/MisCultivos.jsx"
import AgregarCultivo from "./Views/MisCultivos/AgregarCultivo.jsx"
import EditarCultivo from "./Views/MisCultivos/EditarCultivo.jsx"

import ScreenInicio from "./Views/MisCultivos/ConfigInicial/ScreenInicio.jsx"
import ScreenLuz from "./Views/MisCultivos/ConfigInicial/ScreenLuz.jsx"
import ScreenCicloLuzConfig from "./Views/MisCultivos/ConfigInicial/ScreenCicloLuz.jsx"
import ScreenConfigPh from "./Views/MisCultivos/ConfigInicial/ScreenPhConfig.jsx"
import ScreenConfigTemp from "./Views/MisCultivos/ConfigInicial/ScreenTempConfig.jsx"

import ViewParcela from "./Views/ParcelaView/ViewParcela.jsx"

import Vista from "./Views/CultivoParcela.jsx"

function Rutas() {
  return (
    <div className="Aplicacion">
      <Routes>
        <Route path="/" element={ <App /> } />
        <Route path="/Login" element={ <Login /> } />
        <Route path="/Account" element={ <CrearCuenta /> } />
        <Route path="/Home" element={ <Home /> } />
        <Route path="/CodeVerify" element={ <CodeVerify /> } />
        <Route path="/CompleteProfile" element={ <CompleteProfile /> } />
        <Route path="/MisCepas" element={ <MisCepas /> } />
        <Route path="/AgregarCepa" element={ <AgregarCepa /> } />
        <Route path="/EditarCepa" element={ <EditarCepa /> } />
        <Route path="/MisCultivos" element={ <MisCultivos /> } />
        <Route path="/AgregarCultivo" element={ <AgregarCultivo /> } />
        <Route path="/EditarCultivo" element={ <EditarCultivo /> } />

        <Route path="/Settings/Introduction" element={ <ScreenInicio /> } />
        <Route path="/Settings/Light" element={ <ScreenLuz /> } />
        <Route path="/Settings/LightCycle" element={ <ScreenCicloLuzConfig /> } />
        <Route path="/Settings/Ph" element={ <ScreenConfigPh /> } />
        <Route path="/Settings/Temperature" element={ <ScreenConfigTemp /> } />

        <Route path="/View/Parcelas" element={ <ViewParcela /> } />
        
        <Route path="/draw" element={ <Vista /> } />

      </Routes>
    </div>
  )
}

export default Rutas