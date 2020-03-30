import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './style.css';
import api from '../../services/services';
export default function Profile() {
    const  [incidents, setIncidents]  = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();
    /*função para carregar uma função em determinado momento*/
    /*passados dois parametros, o primeiro é a função e o segundo é quando essa função será carregada*/
    /*por exemplo, se for passado como parametro a variavel ong name, sempre que ela for alterada a função será executada*/
    useEffect(() => {
        api.get('profile', {
            headers: { Authorization: ongId, }
        }).then(res => {
            console.log(res.data)
            setIncidents(res.data);
        })
    }, { ongId });

    async function handleDeleteIncident(id){
        try { 
            await api.delete(`incidents/${id}`,{
                headers:{Authorization: ongId}
            });
            setIncidents(incidents.filter(incident => incident.id != id));
        } catch (error) {
            alert('error ao deletar caso');
        }
    }
    /*ao chamar incidents.map é possivel realizar uma varredura dentro do resultado de incidents*/ 
    /*a palavra key, indica um id unico que será usado para fazer o resultado de incidents*/
    /*incident é o retorno... usa-se parenteses para retornar o codigo diretamente concatenando com o react*/


    /*no botão para deletar se utilizar uma arrow function, se for utilizar a função diretamente todos os items serão deletados ao abrir a tela, já que a função já será carregada deletando*/

function handleLogout(){
    localStorage.clear();
    history.push('/')
}

    return (<div className="profile-container">
        <header>
            <img src={logoImg} alt="Be the hero" />
            <span>Bem vindo, {ongName}</span>
            <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
            <button type="button" onClick={handleLogout}>
                <FiPower size={18} color="#e02041" />
            </button>
        </header>
        <h1>Casos Cadastrados</h1>
        <ul>
            {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.titulo}</p>
                    <strong>Descrição</strong>
                    <p>{incident.description}</p>
                    <strong>Valor</strong>
            <p>{Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                    <button onClick={() => handleDeleteIncident(incident.id) }>
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>

            ))}
        </ul>
    </div>
    );
}