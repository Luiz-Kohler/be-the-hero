//Importando o React
import React, {useState} from 'react';

//Importanto o Link para usar "ancoras" sem precisar carregar
import {Link, useHistory} from 'react-router-dom'

//Importanto o icone de Login
import {FiLogIn} from 'react-icons/fi'

//Importando o css
import './styles.css';

//Importando imagens do meu computador para usar
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

//Importando  nossa API
import api from '../../services/api'

//o arquivo index / este vai exportar este metodo abaixo
export default function Logo() {

    //Delcarando o estado do ID
    const [id, setId] = useState('')

    //Declarando o history
    const history = useHistory()

    //Metodo que tem como função enviar uma requisição para o login da ONG
    async function HandleLogin(event){

        //Quando o usuario clicar em logar, ele não ira recarregar a pagina
        event.preventDefault()

        try{
            //Enviando a requisição para logar com o ID que o usuario informou
            const response = await  api.post('session', {id})

            //localStorage permiti salvar objetos, esses objetos só são removidos quando o usuario fechar a pagina
            //Salvando o ID da ong
            localStorage.setItem('ongId', id)
            //Salvando o nome da ong com o data do response pegando a propriedade name
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')

        }catch(err){
            alert('Falha ao login, tente novamento')
        }
    }

    //metodo logon ira retornar
    return ( 
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={HandleLogin}>
                    <h1>Faça seu logon</h1>

                    <input placeholder="Seu ID" value={id} onChange={event => setId(event.target.value)}/>

                    <button className="button" type="submit">Entrar</button>
                    
                    <Link  className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>

                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}