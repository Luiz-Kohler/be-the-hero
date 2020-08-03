//Importando o React
import React, {useState} from 'react';

//Importanto o Link para usar "ancoras" sem precisar carregar
import {Link, useHistory} from 'react-router-dom'

//Importanto o icone de Login
import {FiArrowLeft} from 'react-icons/fi'

//Importando o css
import './styles.css';

//Importando imagens do meu computador para usar
import logoImg from '../../assets/logo.svg'

//Importando nossa API que criamos
import api from '../../services/api'

//O arquivo Index / este vai exportar o metodo Register
export default function Register(){

    //Usando estado para os inputs - Dentro do parametro do " useState('') " vai o valor inicial/padrão
    const [name, setName]          = useState('')
    const [email, setEmail]        = useState('')
    const [whatsapp, setWhatsapp]  = useState('')
    const [city, setCity]          = useState('')
    const [uf, setUf]              = useState('')

    //Declarando o history importado
    const history = useHistory()

    //Metodo com Função de enivar dados para o banckend, para cadastrar a ONG no banco
    async function handleRegister(event){

        console.log("handleRegister - Chamado")

        //Evitando que toda vez que eu faço um submit recarregue a pagina
        event.preventDefault();

        //Criando um OBJETO que clona os valores dos estados 
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        console.log(data)

        try{
            //Chamando o backend para fazer uma requesição, no caso um Post/Criar uma nova ONG
            const response = await  api.post('ongs', data)

            console.log("CADASTRADO COM SUCESSO ", response.data.id)

            //Informar o ID da ONG para quem a cadastrou
            //mostrando o id da ong com o data do response pegando a propriedade name
            alert(`Seu ID de acesso: ${response.data.id}`)

            //Levando o Usuario para a tela padrão/Login
            history.push('/')
        }catch (err){
            //Caso de um Error no Try vai cair aqui
            console.log("Error ao  cadastrar: ", err)
            alert('Erro no cadastro tente novamente')
        }

    }

    //Metodo Register ira retornar
    return(
        <div className="register-container">

            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>

                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link  className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para login
                    </Link>
                </section>

                <form onSubmit={handleRegister}>

                <input type="text" placeholder="Nome da ONG" value={name} onChange={event =>  setName(event.target.value)}/> 
                <input type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)}/>   
                <input  placeholder="WhatsApp" value={whatsapp} onChange={event => setWhatsapp(event.target.value)}/>   

                <div className="input-group">
                    <input  placeholder="Cidade" value={city} onChange={event => setCity(event.target.value)}/>
                    <input placeholder="UF" style={{ width: 80}} value={uf} onChange={event => setUf(event.target.value)}/>
                </div>

                <button className="button" type="submit">Cadastrar</button>

                </form>

            </div>

        </div>
    )
}