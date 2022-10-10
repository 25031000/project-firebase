
import {auth, userExists} from '../firebase/firebase.js';
import {GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from 'firebase/auth';
import { useEffect } from 'react';
import { useState } from 'react';

// imported hook for redirected to a page

import { useNavigate } from 'react-router-dom';
// importe component reutilizable
import AuthProvider from '../components/AuthProvider.jsx';
import handleUserLoggedIn from '../components/AuthProvider.jsx';
import handleUserNotRegistered from '../components/AuthProvider.jsx';
import handleUserNotLoggedIn from '../components/AuthProvider.jsx';

 export default  function LoginView() {
        const navigate = useNavigate();
        //const [currentUser, setCurrentUser] = useState(null);

        /*
        0: inicializado
        1: loading
        2: login completo
        3: login sin registro
        4: no esta logeado nadie
        */ 
        // ESTADOS DEPENDIENDO DEL NUMERO PARA SABER SI UN USUARIO ESTA LOGEADO, LOGEADO SIN REGISTRAR O NO LOGEADO
        const [state, setCurrentState] = useState(0);

        /* USE EFFECT, DESPUES DE QUE SE CARGUE EL RENDERIZADO ORIGINAL DE  LA PAGINA QUE ES UN : LOADING....
           ENTONCES CON EL METODO => ONAUTHSTATECHANGED: VERIFICA SI EL USER ESTA REGISTRADO O NO            
        
        */
       /*
        useEffect(() => {
            setCurrentState(1);
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const isRegistered = await userExists(user.uid);
    
                    if(isRegistered){
                        //TODO: redirigir a dashboard
                        navigate('/dashboard');
                        setCurrentState(2);
                    }else{
                        //TODO: redirigir a choose username
                        navigate('/choose-username');
                        setCurrentState(3);
                    }
                }else{
                    setCurrentState(4);
                    console.log("no esta conectado");
                }
            });
        }, [navigate]);
        */
        /*
            CALLBACK QUE VALIDA EL REGISTRO DE UN USER EN NUESTRA DATABASE
            DEPENDIENDO DE EL ESTADO DEL USER RENDERIZA UNO DE LOS ESTADOS DEFINIDOS POR NUMERACION
        */

        /*
            FUNCION QUE SE EJECUTA EN CASO DE QUE EL ESTADO DEL USUARIO SEA "NO LOGEADO NI REGISTRADO" (ES EL NUMERO 4)
            OBTENEMOS UN SERVICIO DE FIREBASE DE AUTENTICACION DE PROVEDOR DE GOOGLE
            CON LA FUNCION SIGNINGOOGLE SOLICITAMOS UN MODAL CON SIGNINWITHPOPUP(QUE ES NUESTRO MODAL PARA INGRESAR CON
                UNA CUENTA GOOGLE)
        */
       async function handleOnClick(){
                const provider =  new GoogleAuthProvider();
                await signInGoogle(provider);

                async function signInGoogle(provider){
            try {
                console.log("que ondaaaaa");
                const res = await signInWithPopup(auth, provider);
                console.log(res);
            } catch (error) {
                console.error(error);
            }
        }
        }

        function handleUserLoggedIn(user){
            navigate('/dashboard');
        }
        function handleUserNotRegistered(user){
            navigate('/choose-username');
        }
        function handleUserNotLoggedIn(){
            setCurrentState(4);
        }

        
            // ESTAS SON LAS RENDERIZACIONES CON LA CONDICION DE QUE SE CUMPLA ALGUN ESTADO, DESPUES DE LA VALIDACION
        
            if(state === 2){
                return <div>Logged and registered</div>
            }
            if(state === 3){
                return <div>Logged whithout registered</div>
            }
            
            if(state === 4){

                return(
                    <div>
                        <button onClick={handleOnClick}>Login with Google</button>
                    </div>
                );
            }
            return (
            <AuthProvider

                onUserLoggedIn={handleUserLoggedIn}
                onUserNotRegistered={handleUserNotRegistered}
                onUserNotLoggedIn={handleUserNotLoggedIn}

            >
              <div>Loading....</div>

           </AuthProvider>
        );
           
        
            
}