import React, {useState}from 'react';
import './style.css';
import logoImg from '../../assets/logo.svg';
import {Link ,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/services';
export default function NewIncident(){
    const [titulo,  setTitulo] = useState('');
    const [description,  setDescription] = useState('');
    const [value,  setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            titulo, 
            description, 
            value
        }
        try {
            await api.post('incidents',data,{
                headers: {Authorization: ongId}
            });
            history.push('/profile');

        } catch (error) {
            alert('Erro ao cadastrar Caso');
        }
    }
    return(
        <div className="NewIncident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color=  '#e02041'/>
                            Voltar para home
                    </Link>
                </section>
                <form>
                    <input type="text" placeholder="Titulo do caso" value={titulo} onChange={e => setTitulo(e.target.value)} />
                    <textarea type="text" placeholder="Descrição"value={description} onChange={e => setDescription(e.target.value)} />
                    <input type="text" placeholder="Valor em reais"value={value} onChange={e => setValue(e.target.value)} />
                    <button className="button" onClick={handleNewIncident} type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
