import React from 'react';
import { createComponent } from '@lit/react';
import { LitPlayerYoutube } from './lit-player-youtube';  // Importa a classe diretamente
import './css/fonts.css';

export const LitPlayerYoutubeReact = createComponent({
    react: React,
    tagName: 'lit-player-youtube',
    elementClass: LitPlayerYoutube,
});