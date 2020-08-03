//Importando React
import React, {useState ,useEffect} from 'react'

//Importando css
import './styles.css'

//Importando o Link que ira substituir a ancora
import {Link, useHistory} from 'react-router-dom'

//Importando as logos
import {FiPower, FiTrash2} from 'react-icons/fi'

//Importando a logo
import logoImg from '../../assets/logo.svg'

//Importando nossa API
import api from '../../services/api'

export default function Profile(){

    //Criando o estado para os incidents, valor iniciar sera um vetor/[] vazio
    const [incidents, setIncidents] = useState([])

    //Declarando o history
    const history = useHistory();

    //Pegando o objeto que salvamos no localStorage na pagina de login
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    //Função responsavel por fazer logout
    function handleLogout(){
        //Removendo dados do localStorage que colocamos lá na tela de Logon
        localStorage.clear()

        //Levando para tela de login novamente
        history.push('/')
    }

    //Função que tem como objetivo deletar um caso
    async function handleDeleteIncident(incidentId){
        try{
            await api.delete(`incidents/${incidentId}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== incidentId))

        }
        catch(err){
            alert(`Error ao deletar caso ${incidentId}, tente novamente.`)
        }
    }

    //Recebe 2 parametros, qual ação deve ser executada e outro é quando ira ser executado
    //No exemplo do array ele so ira executar os metodos quando o array mudar
    useEffect(() => {

        console.log(ongId)

        api.get('profile', 
            {headers: {
                authorization: ongId
            }
         }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    return (
        <div className="profile-container">

            <header>

                <img src={logoImg} alt="Be The Hero"/>

                <span>Bem vindo, {ongName}</span>

                <Link className="button" to="/incidents/new">
                Cadastrar novo caso
                </Link>

                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>

            {incidents.map(incident => (

            <li key={incident.id}>

            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                <FiTrash2 size={20} color="#E02041"/>
            </button>

            </li>

            ))}

            </ul>

        </div>
    )
}