import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({ history }) {
  const [data, setData] = useState({
    company: '',
    techs: '',
    price: '',
    thumbnail: null,
  });

  const preview = useMemo(() => {
    return data.thumbnail ? URL.createObjectURL(data.thumbnail) : null;
  }, [data.thumbnail])
  
  async function handleSubmit(event) {
    event.preventDefault();

    const spotData = new FormData();
    const user_id = localStorage.getItem('user');

    spotData.append('thumbnail', data.thumbnail);
    spotData.append('company', data.company);
    spotData.append('techs', data.techs);
    spotData.append('price', data.price);

    await api.post('/spots', spotData, {
      headers: { user_id }
    });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label 
        id="thumbnail" 
        style={{ backgroundImage: `url(${preview})` }}
        className={data.thumbnail ? 'has-thumbnail' : ''}
        >
        <input type="file" onChange={event => setData({ ...data, thumbnail: event.target.files[0] })} />
        <img src={camera} alt="Select img"/>
      </label>
      <label htmlFor="company">EMPRESA *</label>
      <input 
        id="company" 
        placeholder="Sua empresa incrível" 
        value={data.company} 
        onChange={event => setData({...data, company: event.target.value})} 
      />

      <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span> </label>
      <input 
        id="techs" 
        placeholder="Quais tecnologias usam?" 
        value={data.techs} 
        onChange={event => setData({ ...data, techs: event.target.value })} 
      />
      
      <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span> </label>
      <input 
        id="price" 
        placeholder="Valor cobrado por dia" 
        value={data.price} 
        onChange={event => setData({ ...data, price: event.target.value })} 
      />

      <button className="btn" type="submit">Cadastrar</button>
    </form>
  )
};