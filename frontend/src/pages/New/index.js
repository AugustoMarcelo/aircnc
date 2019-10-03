import React, { useState } from 'react';

import camera from '../../assets/camera.svg';
import './styles.css';

export default function New() {
  const [data, setData] = useState({
    company: '',
    techs: '',
  });
  
  function handleSubmit() {

  }

  return (
    <form onSubmit={handleSubmit}>
      <label id="thumbnail">
        <input type="file" />
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