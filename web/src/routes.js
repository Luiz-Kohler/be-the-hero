//Importando o react
import React from 'react'

//Importando os pacotes que irei usar para as rotas
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//importando os componentes que eu criei
import Logo from './pages/Logon'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncident'

//Routes ira exportar o metodo Routes
export default function Routes(){

    //Que ira retornar isto
    return(
        <BrowserRouter>
        
            <Switch>

                <Route path="/" exact component={Logo}/>

                <Route path="/register" exact component={Register}/>

                <Route path="/profile" exact component={Profile}/>

                <Route path="/incidents/new" exact component={NewIncident}/>

            </Switch>

        </BrowserRouter>
    )
}