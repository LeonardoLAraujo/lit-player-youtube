import {LitElement, html, css, TemplateResult, CSSResult} from 'lit';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
import { LitYoutubeIcon, Icon } from './lit-youtube-icon';

const HOURS_SECONDS: number = 3600;

@customElement('lit-player-youtube')
export class LitPlayerYoutube extends LitElement{

    constructor() {
        super();

        if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
            const script = document.createElement('script');
            script.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag!.parentNode!.insertBefore(script, firstScriptTag);
        }

        // Define a função global apenas uma vez
        if (!(window as any)._youtubeApiReadySet) {
            (window as any).onYouTubeIframeAPIReady = () => {
            document.dispatchEvent(new CustomEvent('YouTubeIframeAPIReady'));
            };
            (window as any)._youtubeApiReadySet = true;
        }

        // Escuta o evento
        document.addEventListener('YouTubeIframeAPIReady', () => {
            this.onYouTubeIframeAPIReady();
        });
    }
    

    static override get styles(): CSSResult{
        return css`
            :host{
                display: inline-block;
                width: 100%;
                height: 100%;
                position: relative;
            }

            .connectionVideo{
                width: 100%;
                height: 100%;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .connectionVideo__fade{
                width: 100%;
                height: 100%;
                position: absolute;
                background-color: transparent;
                opacity: 0.7;
                z-index: 2;
            }

            #player{
                width: 100%;
                height: 100%;
            }

            .connectionVideo__players{
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0;
                right: 50;
            }

            .players__pauseVideo{
                display: none;
            }

            .player__icon{
                width: 160px;
                height: 160px;
                background: linear-gradient(to top, #d7e4ff, transparent);;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 4px 2px 98px 5px rgba(0,0,0,0.75);
                cursor: pointer;
            }

            .connectionVideo__animationControls{
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 80px;
                border: 0;
                clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
                z-index: 3;
            }

            .connectionVideo__controls{
                position: absolute;
                bottom: 0;
                background-color: var(--cinza);
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: 1px solid var(--cinza);
            }

            .players__playerVideo,
            .players__pauseVideo{
                z-index: 2;
            }

            .controls__container{
                display: flex;
                align-items: center;
                width: 100%;
            }

            .controls__fullscreen{
                display: flex;
            }

            .controls__fullscreen,
            .controls__container{
                background-color: #000000dc;
            }

            .control__volume{
                display: none; 
            }

            lit-youtube-icon{
                margin: 0rem 1rem 0rem 1rem;
                cursor: pointer;
            }

            .container__pauseVideo{
                display: none;
            }
            

            .players__progressVideo{
                width: 100%;
                background-color: #fff;
                height: 8px;
                border-radius: 0px;
                cursor: pointer;
                position: absolute;
                bottom: 60px;
                z-index: 2;
            }

            .progressVideo__timer{
                position: relative;
                width: 0.1%;


                transition: width cubic-bezier(0.95, 0.05, 0.795, 0.035);
                height: 100%;
                background-color: #E11111;
                max-width: 100%;
            }

            .timer__circle{
                display: none;
                width: 15px;
                height: 15px;
                position: absolute;
                background-color: red;
                border-radius: 50%;
                bottom: -3px;
                left: -1px;
            }

            .container__duration{
                color: #fff;
                margin-left: 10px;
                font-size: 14px;
            }

            span{
                font-family: PoppinsRegular, sans-serif;
            }


            .settingsVideo{
                display: none;
                flex-direction: column;
                width: 100%;
                align-items: flex-end;
                justify-content: flex-end;
                position: fixed;
                bottom: 0;
                z-index: 3;
            }

            .settingsVideo__legend{
                border-top-left-radius: 6px;
            }

            .settingsVideo__quality{
                border-bottom-right-radius: 6px;
            }

            .settingsVideo__legend,
            .settingsVideo__reproduction,
            .settingsVideo__quality{
                width: 100%;
                display: flex;
                justify-content: space-between;
                background-color: #000000dc;
                color: #fff;
                cursor: pointer;
                font-family: PoppinsRegular, sans-serif;
                z-index: 55; 
            }

            .settingsVideo__legend:hover,
            .settingsVideo__reproduction:hover,
            .settingsVideo__quality:hover{
                background-color: #272424f4;
             
            }

            .reproduction__options{
                width: 100%;
                background-color: #000000dc;
                display: none;
            }

            .playbackSpeed{
                cursor: pointer;
                padding: 0.5rem 1rem 0.5rem 2rem;
              
                color: #fff;
                transition: background-color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
                font-family: PoppinsRegular, sans-serif;
            }

            .playbackSpeed[speed="1"]{
                background-color: #E11111;
            }

            .playbackSpeed:hover{
                background-color: #353a45;
            }

            .options__reproduction{
                display: none;
                width: 100%;
            }

            .options__quality{
                width: 100%;
            }

            .quality{
                color: #fff;
                cursor: pointer;
                padding: 0.5rem 1rem 0.5rem 2rem;
                background-color: #000000dc;
                transition: background-color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
                font-family: PoppinsRegular, sans-serif;
            }

            .quality:hover{
                background-color: #353a45;
            }

            .quality[quality="auto"]{
                background-color: #E11111;
            }

            .fade{
                width: 100%;
                height: 100%;
                position: fixed;
                background-color: #000000dc;
                top: 0;
                z-index: 3;
                display: none;
            }

            @media (min-width: 1024px){
                .settingsVideo{
                    display: none;
                    flex-direction: column;
                    width: 26%;
                    position: absolute;
                    align-items: flex-end;
                    bottom: 4.8rem;
                    z-index: 2;
                    right: 0.5rem;
                }

                .settingsVideo__legend,
                .settingsVideo__reproduction,
                .settingsVideo__quality{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    background-color: #000000dc;
                    color: #fff;
                    cursor: pointer;
                    font-family: PoppinsRegular, sans-serif;
                    z-index: 5; 
                    padding-left: 1rem;
                    
                }

                .fade{
                    position: absolute;
                    z-index: 2;
                }

                .options__reproduction{
                    width: 100%;
                }

                .options__quality{
                    width: 100%;
                }
                
                /**Volume do Controle */
                .control__volume{
                    display: flex;
                    align-items: center;
                    position: relative;
                }

                .control__volume input{
                    display: block;
                    cursor: pointer;
                    width: 65px;
                    height: 3px;
                    margin-left: -0.70rem;
                    border: none;
                    -webkit-appearance: none;
                    appearance: none;
                    position: relative;
                    outline: none;
                    background-color: transparent;
                    z-index: 2;
                }

                /**Bolinha do Input */
                .control__volume input::-webkit-slider-thumb{
                    -webkit-appearance: none;
                    appearance: none;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background-color: #fff;
                    box-shadow: 0 0 0 0 black;
                }

                .progressAudio{
                    display: block;
                    position: absolute;
                    width: 60px;
                    height: 3px;
                    z-index: 1;
                    background: linear-gradient(to top, var(--preto), transparent);
                    left: 2.9rem;
                    overflow: hidden;
                }

                .progressAudioFill{
                    display: block;
                    width: 20%;
                    height: 100%;
                    background-color: #fff;
                }

                .animationAudioVideo{
                    display: flex;
                    align-items: center;
                    height: 20px;
            
                }
                
                #playerVideo:fullscreen .connectionVideo{
                    width: 100vw;
                    height: 100vh;
                }

                .connectionVideo__controls{
                    transform: translateX(400px);
                    animation: animationControl 400ms cubic-bezier(0, 0, 0.04, 1) forwards;
                }
                    
                @keyframes animationControl{
                    0%{
                        transform: translateY(400px);
                    }
                    100%{
                        transform: translateY(0px);
                    }
                }
                
            }
        `;
    }

    @state()
    public _player!: Window;

    @state()
    private _videoDoId: string = "";

    @state()
    private _isPlaying: boolean = false;

    @state()
    private _muted: boolean = false;

    @state()
    private _fullScreen: boolean = true;

    @state()
    private _numberProgressBar: number = 0;

    @state()
    private _openControllerPlayer: boolean = false;

    @state()
    private _activeSubtitle: boolean = false;

    @state()
    private _playbackNumber: number = 1;

    @state()
    private _playerbackQuality: string = "auto";

    @state()
    private _isOpenOptions: boolean = false;

    @query("#player")
    private _containerPlayer!: Window;

    @query("#containerMain")
    private _containerMain!: any;

    @query(".players__playerVideo")
    private _containerPlayerVideo!: HTMLDivElement;

    @query(".players__pauseVideo")
    private _containerPauseVideo!: HTMLDivElement;

    @query(".connectionVideo__players")
    private _containerPlayers!: HTMLDivElement;

    @query(".progressAudioFill")
    progressAudioFill!: HTMLSpanElement;

    @query(".progressAudio")
    progressAudio!: HTMLSpanElement;

    @query(".audio__volume")
    audioVolume!: HTMLInputElement;

    @query(".volume__icon")
    volumeIcon!: LitYoutubeIcon;

    @query(".playerVideo__player")
    playerVideoPlayerContainer!: HTMLDivElement;

    @query(".connectionVideo__controls")
    containerControls!: HTMLDivElement;

    @query(".container__playerVideo")
    containerPlayerVideo!: HTMLDivElement;

    @query(".container__pauseVideo")
    containerPauseVideo!: HTMLDivElement;

    @query(".players__progressVideo")
    progressBarVideo!: HTMLDivElement;

    @query(".progressVideo__timer")
    progressVideoTimer!: HTMLDivElement;

    @query(".timer__circle")
    timerCircle!: HTMLDivElement;

    @query(".duration__start")
    durationStart!: HTMLSpanElement;

    @query(".duration__end")
    durationEnd!: HTMLSpanElement;

    @query(".settingsVideo__legend")
    caption!: HTMLDivElement;

    @query(".settingsVideo")
    settingsVideo!: HTMLDivElement;

    @query(".settingsVideo__reproduction")
    settingsVideoReproducation!: HTMLDivElement;

    @query(".settingsVideo__quality")
    settingsVideoQuality!: HTMLDivElement;

    @query(".options__reproduction")
    optinsReproduction!: HTMLDivElement;

    @query(".reproduction__options")
    reproductionOptions!: HTMLDivElement;

    @query(".options__quality")
    optionsQuality!: HTMLDivElement;

    @query(".fade")
    fadeContainer!: HTMLDivElement;

    @queryAll(".playbackSpeed")
    private _listPlaybackSpeed!: Array<HTMLDivElement>;

    @queryAll(".quality")
    private _listPlaybackQuality!: Array<HTMLDivElement>;

    @property({ type: String })
    video = '';

    protected firstUpdated(): void {
        this._videoDoId = this._youTubeGetID(this.video);
            
        this.controlFillVolumeAudio();
        this.iconPlayerVolumeCurrent();
    }
    
    /***
     * Instancia o Iframe do youtube
     * @private
     * @method
     * @returns {void}
     */
     private onYouTubeIframeAPIReady(): void{
        try{
            window.YT.ready(() => {
                this._player = new window.YT.Player(this._containerPlayer, {
                    videoId: this._videoDoId,
                    playerVars: {
                        cc_load_policy: this._activeSubtitle ? 1 : 0,
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                        playersinline: 0,
                        autoplay: 0,
                        controls: 0,
                        disablekb: 1,
                        fs: 1,
                        loop: 0,
                        allowfullscreen: 1,
                        enablejsapi: 1,      
                        hl: 'pt-br',
                        cc_lang_pref: "pt-br",
                    },
                    events: {
                        onReady: this.onPlayerReady.bind(this),
                    },
                })
                window.player = this._player;
            });
        }catch(error){
            console.log(error);
        }   
    }

    /**
     * Quando o Youtube estiver pronto, podemos manipular com esse método
     * @private 
     * @method
     * @returns {void}
     */
    private onPlayerReady(_event: any): void{
        this.durationEnd.textContent = this.durationEndVideo(_event.target.playerInfo.duration);

        window.addEventListener("message", () => {          
            this.progressVideoTimer.style.width = `${this.progressBarVideo.clientWidth * (this._player.playerInfo.currentTime / (_event.target.playerInfo.duration - 1) )}px`;
            // this.timerCircle.style.left = `${this.progressBarVideo.clientWidth * (this._player.playerInfo.currentTime / (_event.target.playerInfo.duration) )}px`;

            this.durationEnd.textContent        = this.durationEndVideo(_event.target.playerInfo.duration);
            this.durationStart.textContent      = this.durationStartVideo(_event.target.playerInfo.currentTime);

            this._player.setPlaybackRate(this._playbackNumber);
            this._player.setPlaybackQuality(this._playerbackQuality);
        });
    }  

    /***
     * Pegando a url do youtube e cortando ela até pegar o id necessario
     * @private
     * @method
     * @returns {string}
     */
    private _youTubeGetID(url: string): string{
        let id: string = '';
        let idArray: Array<string>;
        let urlArray: Array<string>;

        let expressionRegular: number;
        let list: RegExp;

        list = new RegExp(/(?<=list=).*(?=[\&])|(?<=list=).*/, "gi");

        expressionRegular = url.search(list);  

        if(expressionRegular != -1){
            //Pegar a lista do vídeo 

            if(url.includes("&", expressionRegular)){
                id = url.substring(url.search(list), url.lastIndexOf("&"));
            }else{
                id = url.substring(url.search(list), url.lastIndexOf(""));
            } 
        }else{
            //Pegar um único vídeo
            urlArray = url.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

            if(urlArray[2] !== undefined){
                idArray = urlArray[2].split(/[^0-9a-z_\-]/i);
                id = idArray[0];
            }else{
                id = url;
            }
        }

        return id;
    }

    private hiddenOptions(): void{
        this.settingsVideoReproducation.style.display = "none";
        this.settingsVideoQuality.style.display = "none";
        this.caption.style.display = "none";
    }

     private openOptions(): void{
        this.settingsVideoReproducation.style.display = "flex";
        this.settingsVideoQuality.style.display = "flex";
        this.caption.style.display = "flex";
    }

    private stateIsPlaying(): boolean{
        return this._isPlaying = !this._isPlaying;
    }

    private playerVideo(): void{
        this.currentContainerPlayer();
        this._player.playVideo();
    }

    private pauseVideo(): void{
        this.currentContainerPlayer();
        this._player.pauseVideo();
    }

    public stopVideo(): void{
        this._isPlaying = false;
        this._player.pauseVideo();
        this.hiddenContainerPauseVideoAndShowContainerPlayerVideo();
    }

    private hiddenContainerPlayerVideoAndShowPauseVideo(): void{
        this._containerPlayerVideo.style.display = "none";
        this.containerPlayerVideo.style.display = "none";
        this._containerPauseVideo.style.display = "flex";
        this.containerPauseVideo.style.display = "flex";
    }

    private hiddenContainerPauseVideoAndShowContainerPlayerVideo(): void{
        this._containerPlayerVideo.style.display = "flex";
        this.containerPlayerVideo.style.display = "flex";
        this._containerPauseVideo.style.display = "none";
        this.containerPauseVideo.style.display = "none";
    }

    private currentContainerPlayer(): void{
        this._isPlaying ? this.hiddenContainerPlayerVideoAndShowPauseVideo() : this.hiddenContainerPauseVideoAndShowContainerPlayerVideo();
    }

    private onMouseLeave(): void{
        this._containerPlayers.style.display = "none";
        this.containerControls.style.display = "none";
        this._isOpenOptions = false;

        this.closeOptions();
    }
    private onMouseOver(): void{
        this._containerPlayers.style.display = "flex";
        this.containerControls.style.display = "flex";
    }  

    /**
     * Método informa a duração final do vídeo em string
     * @private
     * @returns {string}
     */
    private durationEndVideo(currentTime: number): string{
        let duration = currentTime < HOURS_SECONDS ? 
        new Date(currentTime * 1000).toISOString().slice(14, 19) : 
        new Date(currentTime * 1000).toISOString().slice(11, 19);

        return duration;
    }

    /**
     * Método informa a duração do vídeo em string
     * @private
     * @returns {string}
     */
    private durationStartVideo(currentTime: number): string{
        let duration = currentTime < HOURS_SECONDS ? 
        new Date(currentTime * 1000).toISOString().slice(14, 19) : 
        new Date(currentTime * 1000).toISOString().slice(11, 19);

        return duration;
    }

    /**
     * Altera o background do volume
     * @private
     * @returns {void}
     */
    private controlFillVolumeAudio(): void{
        if(this.progressAudioFill?.style == null || this.progressAudioFill?.style == undefined){
            return;
        }
        this.progressAudioFill.style.width = `${this.audioVolume.value}%`;
    }

    /**
     * Retorna o estado do vídeo em fullScreen 
     * @private
     * @returns {boolean}
     */
    private stateMute(): boolean{
        return this._muted = !this._muted;
    }

    private iconPlayerVolumeCurrent(): void{
        if(this.audioVolume?.value <= String(0)){
            this.volumeIcon.icon = Icon.NoSound;
        }else if(this.audioVolume?.value > String(0) && this.audioVolume?.value <= String(65)){
            this.volumeIcon.icon = Icon.VolumeDown;
        }else if(this.audioVolume?.value > String(70) || this.audioVolume?.value == String(100)){
            this.volumeIcon.icon = Icon.VolumeUp;
        }
    }

    private muteVolume(): void{
        this.stateMute();

        if(this._muted){
            this._player.mute();
            this.audioVolume.value = "0";
        }else{
            this._player.unMute();
            this.audioVolume.value = "50";
        }

        this.controlFillVolumeAudio();
        this.iconPlayerVolumeCurrent();
    }

    /**
     * Controla o volume do audio do vídeo
     * @private
     * @returns {void}
     */
    private controlVolumeAudioVideo(): void{
        
        this._player.isMuted() ? this.muteVolume() : this.audioVolume.value;

        if(this.audioVolume.value <= "0"){
            this.muteVolume();
        }

        this.controlFillVolumeAudio();
        this.iconPlayerVolumeCurrent();

        this._player.setVolume(Number(this.audioVolume.value));
    }

    /**
     * Retorna o estado do vídeo em fullScreen 
     * @private
     * @returns {boolean}
     */
    public stateFullScreen(): boolean{
        return this._fullScreen = !this._fullScreen;
    }

    /**
     * Ativa o fullScreen do vídeo
     * @private
     * @returns {void}
     */
    private fullScreen(): void{
        this.stateFullScreen();

        if(this._fullScreen){
            if(document.fullscreenElement === null){
                this.openFullScreen();
            }

            this.openFullScreen();
        }else{
            if(document.fullscreenElement === null){
                this.openFullScreen();
            }
            this.closeFullScreen();
        }
    }

    /**
     * Abri o vídeo em tela cheia
     * @method
     * @returns {void}
     */
    private openFullScreen(): void{  
        if (this._containerMain.requestFullscreen) {
            this._containerMain.requestFullscreen();
        } else if (this._containerMain.webkitRequestFullscreen) { /* Safari */
            this._containerMain.webkitRequestFullscreen();
        } else if (this._containerMain.msRequestFullscreen) { /* IE11 */
            this._containerMain.msRequestFullscreen();
        }
    }

    /**
     * Fecha a tela cheia do vídeo
     * @method
     * @returns {void}
     */
    private closeFullScreen(): void{
        if(document.exitFullscreen) {
            document.exitFullscreen();
        }else if ((document as any).webkitExitFullscreen) { /* Safari */
            (document as any).webkitExitFullscreen();
        }else if ((document as any).msExitFullscreen) { /* IE11 */
            (document as any).msExitFullscreen();
        }
    }

    /**
     * Altera o momento do vídeo ao clicar na barra de progresso
     * @private
     * @returns {void}
     */
    private alterTimerVideo(e: MouseEvent): void{
        this._numberProgressBar = (e.offsetX / this.progressBarVideo.offsetWidth) * this._player.playerInfo.duration - 1;

        this._player.seekTo(this._numberProgressBar, true);

        this.hiddenContainerPlayerVideoAndShowPauseVideo();
    }  

    /**
     * Verifica se controller esta aberto
     * @private
     * @returns {boolean}
     */
    private stateControllerPlayer(): boolean{
        return this._openControllerPlayer = !this._openControllerPlayer;
     }
 
     /**
      * Aparece os controller do vídeo
      * @private
      * @returns {void}
      */
     private openPopPupControllerPlayer(): void{
        if(!this._openControllerPlayer){
            this.onMouseOver();
        }else{
            this.onMouseLeave();
        }
    }

    /**
     * Verifica se a legenda do vídeo está ativada
     * @private
     * @returns {boolena}
     */
    private stateSubtitle(): boolean {
        return this._activeSubtitle = !this._activeSubtitle;
    }

    /**
     * Ativa a legenda do Vídeo
     * @private
     * @returns {void}
     */
    private activeSubtitle(): void{
        this.stateSubtitle();
        
        if(this._activeSubtitle){
            this.caption.style.backgroundColor = "#E11111";
        }else{
            this.caption.style.backgroundColor = "#000000dc";
        }
    }

    private closeOptions(): void{
        this.settingsVideo.style.display = "none";
        this.fadeContainer.style.display = "none";
    }

    private stateOptions(): boolean{
        return this._isOpenOptions = !this._isOpenOptions;
    }

    private openSettingsVideo(): void{

        if(this._isOpenOptions){
            this.settingsVideo.style.display = "flex";
            this.fadeContainer.style.display = "block";
        }else{
            this.closeOptions();
        }

        
    }

    /**
     * Retorna a velocidade de reprodução do vídeo
     * @private
     * @method
     * @returns {Array<TemplateResult>}
     */
    private playbackSpeed(): Array<TemplateResult>{
        const listPlayBackSpeed: Array<Number> = [0.25, 0.5, 1, 1.5, 2];

        return listPlayBackSpeed.map((speed: Number) => html`<div @click=${this.playbackRate} speed=${speed} class="playbackSpeed">
                                                                ${speed == 1 ? "Normal" : speed}
                                                            </div>`);

    }

    /**
     * Método que pega a taxa de produção
     * @private
     * @returns {void}
     */
    private playbackRate(e: MouseEvent): void {
        const element: HTMLDivElement = e.target as HTMLDivElement;

        this._listPlaybackSpeed.forEach((playbackSpeed: HTMLDivElement) => {
            playbackSpeed.style.backgroundColor = "#000000dc";
        });

        element.style.backgroundColor = "#E11111";

        this._playbackNumber = Number(element.getAttribute("speed"));
    }

    private openOptionsReproduction(): void{
        this.hiddenOptions();

        this.reproductionOptions.style.display = "flex";
        this.optinsReproduction.style.display = "block";
        this.optionsQuality.style.display = "none";
    }   

    private openOptionsQuality(): void{
        this.hiddenOptions();

        this.reproductionOptions.style.display = "flex";
        this.optinsReproduction.style.display = "none";
        this.optionsQuality.style.display = "block";
    }

    private backOptions(): void{    
        this.reproductionOptions.style.display = "none";
        this.optinsReproduction.style.display = "none";
        this.optionsQuality.style.display = "none";

        this.openOptions();
    }

    /**
     * Retorna uma array de templete result da lista de qualidades
     * @private
     * @method
     * @returns {Array<TemplateResult>}
     */
    private playbackQuality(): Array<TemplateResult>{
        const listQuality: Array<string> =  ["hd1080", "hd720", "large", "medium", "small", "tiny", "auto"];

        return listQuality?.map((quality: string) => html`<div quality=${quality} class="quality" @click=${this.playbackQualityVideo}>
                                                            ${quality == "hd1080" ? "1080p" : quality == "hd720" ? "720p" : quality == "large" ? "480p" : quality == "medium" ? "360p" : quality == "small" ? "240p" :  quality == "tiny" ? "144p" : quality == "auto" ? "automático" : quality}
                                                        </div>`);
    }

    /**
     * Informa ao vídeo a opção desejada pelo usuário
     * @private
     * @method
     * @returns {void}
     */
    private playbackQualityVideo(e: MouseEvent): void{
        const element: HTMLDivElement = e.target as HTMLDivElement;

        this._listPlaybackQuality.forEach((element: HTMLDivElement) => {
            element.style.backgroundColor = "#000000dc";
        });

        element.style.backgroundColor = "#E11111";

        this._playerbackQuality = String(element.getAttribute("quality"));
    }

    private settingVideoYoutube(): TemplateResult{
        return html`
            <div class="fade" @click=${this.closeOptions}></div>
            <div class="settingsVideo" >
                <div class="settingsVideo__legend" @click=${this.activeSubtitle}>
                    <p>Active Subtitle</p>
                    <lit-youtube-icon .icon=${!this._activeSubtitle ? Icon.Subtitle : Icon.SubtitleOff} color="#fff"></lit-youtube-icon>
                </div>  
                <div class="settingsVideo__reproduction" @click=${this.openOptionsReproduction}>
                    <p>Playback speed</p>
                    <lit-youtube-icon .icon=${Icon.ArrowForward} color="#fff"></lit-youtube-icon>
                </div>
                <div class="settingsVideo__quality" @click=${this.openOptionsQuality}>
                    <p>Quality</p>
                     <lit-youtube-icon .icon=${Icon.ArrowForward} color="#fff"></lit-youtube-icon>
                </div>

                <div class="reproduction__options">
                    <lit-youtube-icon .icon=${Icon.ArrowBackIos} color="#fff" @click=${this.backOptions}></lit-youtube-icon>
                    <div class="options__reproduction">
                        ${this.playbackSpeed()}
                    </div>
                    <div class="options__quality">
                        ${this.playbackQuality()}
                    </div>
                </div>
            </div>

            
        `; 
    }

    protected override render(): TemplateResult{
        return html`
            <div id="containerMain" class="connectionVideo" @mouseleave=${this.onMouseLeave} @mouseover=${this.onMouseOver}  >
                <div class="connectionVideo__fade" @click=${() => {this.stateControllerPlayer(); this.openPopPupControllerPlayer()}}></div>
                <div id="player"></div>
                <div class="connectionVideo__players">
                   
                    <div class="players__playerVideo" @click=${() => {this.stateIsPlaying(); this.playerVideo()}}>
                        <lit-youtube-icon class="player__icon" .icon=${Icon.PlayArrow} color="#fff" size=100 ?filled=${true}></lit-youtube-icon>
                    </div>
                    <div class="players__pauseVideo" @click=${() => {this.stateIsPlaying(); this.pauseVideo()}}>
                        <lit-youtube-icon class="player__icon" .icon=${Icon.Pause} color="#fff" size=100 ?filled=${true}></lit-youtube-icon>
                    </div>
                </div>
                <div class="connectionVideo__animationControls">
                    <div class="connectionVideo__controls">
                        <div class="players__progressVideo" @click=${this.alterTimerVideo}>
                            <div class="progressVideo__timer">
                                <div class="timer__circle"></div>
                            </div>
                        </div>
                        <div class="controls__container">
                            <lit-youtube-icon .icon=${Icon.PlayArrow} ?filled=${true} color="#fff" size=30 class="container__playerVideo"  @click=${() => {this.stateIsPlaying(); this.playerVideo()}}></lit-youtube-icon>
                            <lit-youtube-icon .icon=${Icon.Pause} ?filled=${true} color="#fff" size=30 class="container__pauseVideo" @click=${() => {this.stateIsPlaying(); this.pauseVideo()}}></lit-youtube-icon>
                            <div class="control__volume">
                                <lit-youtube-icon class="volume__icon" size=26 color="#fff" ?filled=${true} @click=${this.muteVolume}></lit-youtube-icon>
                                <div class="animationAudioVideo">
                                    <input type="range" max="95" class="audio__volume" @input=${this.controlVolumeAudioVideo}>
                                    <span class="progressAudio"><span class="progressAudioFill"></span></span>
                                </div>
                            </div>
                    
                            <div class="container__duration">
                                <span class="duration__start">00:00</span>/<span class="duration__end">00:00</span>
                            </div>
                        </div>
                        <div class="controls__fullscreen">
                            <lit-youtube-icon .icon=${Icon.Settings} color="#fff" size=30 @click=${() => {this.backOptions(); this.stateOptions() ;this.openSettingsVideo()}}></lit-youtube-icon>
                            <lit-youtube-icon .icon=${Icon.Fullscreen} color="#fff" size=30 @click=${this.fullScreen}></lit-youtube-icon>
                        </div>
                    </div>
                </div>
                
                ${this.settingVideoYoutube()}
            </div>


           
        `;
    }
}

declare global{
   interface HTMLElementTagNameMap{
        'lit-player-youtube': LitPlayerYoutube
   }

   interface Window {
        YT: any;
        player: any;
        playVideo(): void;
        pauseVideo(): void;
        mute(): void;
        unMute(): void;
        getVolume(): number;
        setVolume(valume: number): void;
        isMuted(): boolean;
        getPlayerState(): number;
        requestFullScreen(): any;
        loadVideoById(id: string, numberProgressBar: number): void;
        seekTo(seconds: number, allow: boolean): void;
        nextVideo(): void;
        previousVideo(): void;
        loadPlaylist(list: any): void;
        getPlaybackRate(): number;
        setPlaybackRate(velocity: number): void;
        getPlaybackQuality(): string;
        setPlaybackQuality(qualidade: string): void;
        getAvailableQualityLevels(): Array<string>;
        setSize(num1: number, num2: number): void;
        destroy(): void;
        getVideoUrl(): string;
        clearVideo(): void;
        playerInfo: any;
        currentTime: number;
        duration: number;
    }
}   