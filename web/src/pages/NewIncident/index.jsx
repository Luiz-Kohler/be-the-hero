import React, {useState} from 'react';

import {Link, useHistory} from 'react-router-dom'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import {FiArrowLeft} from 'react-icons/fi'

//Importando a API que criamos
import api from '../../services/api'

export default function NewIncident(){

    //Pegando o id da ONG armazenada no localStorage quando a ONG loga
    const ongId = localStorage.getItem('ongId');


    //Declarando o History
    const history = useHistory();

    //Declarando os estados
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    //Metodo com funçao de criar um novo incident
    async function handleNewIncident(event){
        
        //Configurando para que não recarregue a pagina quando o usuario clicar em Criar
        event.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try{
            await  api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            history.push('/profile')

        }catch (err){
            alert('Erro ao tentar cadastrar caso, tente novamente.')
            
        }
    }

    return(

        <div className="new-incident-container">

            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>

                    <p>Descreva o caso detalhadamente para enontrar um herói disposto a ajudar.</p>

                    <Link  className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form >

                <input type="text" placeholder="Título do caso" value={title} onChange={event => setTitle(event.target.value)}/> 
                <textarea type="text" placeholder="Descrição" value={description} onChange={event => setDescription(event.target.value)}/>   
                <input type="text" placeholder="Valor em reais (R$)" value={value} onChange={event => setValue(event.target.value)}/>   

                <button className="button" type="submit" onClick={handleNewIncident}>Cadastrar</button>

                </form>

            </div>

        </div>

    )
}