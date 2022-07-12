import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Inicio from './Vistas/InicioMaltia';
import Administrador1 from './Vistas/Administrador1';
import Footer2 from './components/Footer2';
import Administrador3 from './Vistas/AdminVerEmpleado';
import AdminShowAna from './Vistas/AdminAnalista';
import AdminAddAna from './Vistas/AdminVerAnalista';
import AdminNewAna from './Vistas/AdminAddAsesor';
import AdminNewAna1 from './Vistas/AdminAddAnalista';
import Analista from'./Vistas/Analista';
import Asesor from './Vistas/Asesor';
import Main from './Vistas/Division';

import { useAuth } from './auth-context';

function App() {
  const { user } = useAuth();
  return (
      <React.Fragment>
        {
        user ? (
          <Router>

            <Switch> 

                <Route path="/Main" exact={true}>
                  <Main/>
                </Route>

                <Route path="/Administrador/new" exact={true}>
                  <AdminNewAna/>
                </Route>

                <Route path="/Administrador/newanalista" exact={true}>
                  <AdminNewAna1/>    
                </Route>

                <Route path="/Administrador" exact={true}>
                  <Administrador1/>
                </Route>

                <Route
                  path="/Administrador_empleado/:id"
                  render={(props) => <Administrador3 {...props}/>}
                  exact={true}
                />

                <Route path="/Administrador_analista" exact={true}>
                  <AdminShowAna/>
                </Route>

                <Route 
                  path="/Admin_addAnalista/:id" 
                  render={(props) => <AdminAddAna {...props}/>}
                  exact={true}
                />

                <Route path="/Administrador_analista" exact={true}>
                  <AdminShowAna/>
                </Route>

                <Route 
                  path="/Admin_addAnalista/:id" 
                  render={(props) => <AdminAddAna {...props}/>}
                  exact={true}
                />

                <Route path="/Asesor" exact={true}>
                  <Asesor/>
                </Route>

                <Route path="/Analista" exact={true}>
                  <Analista/>
                </Route>

              </Switch>
            <Footer2/>
          </Router>
        ) : (  
              <Inicio/>
        )
      }
    </React.Fragment> 
  );
}

export default App;
