import React from 'react';
import { createComponent } from '@lit/react';
import { LitPlayerYoutube } from './lit-player-youtube';  // Importa a classe diretamente

export const LitPlayerYoutubeReact = createComponent({
    react: React,
    tagName: 'lit-player-youtube',
    elementClass: LitPlayerYoutube,
});