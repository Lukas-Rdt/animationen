import React from 'react';
import bmfsfjLogo from '../assets/images/BMFSFJ_Logo.jpg';
import imis from '../assets/images/IMIS_Logo.png';

const Footer = () => {
  return (
    <div className='Footer flex justify-between items-center p-3' style={{background: '#ffffff'}}>
      <a href="https://ux-fuer-ki.de/impressum.html" className='w-40 hover:underline'>Impressum</a>
      <a href="https://www.bmfsfj.de/bmfsfj">
        <img src={bmfsfjLogo} alt="Logo Bundesministerium für Familie, Senioren, Frauen und Jugend" className='w-40' />
      </a> 
      <a href="https://www.uni-luebeck.de/universitaet/universitaet.html">
        <img src={imis} alt="Logo Institut für Multimedia und Interaktive Systeme" className='w-40' />
      </a>
    </div>
  );
};

export default Footer;