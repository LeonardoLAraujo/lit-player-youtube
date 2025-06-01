import {LitElement, html, css, TemplateResult, CSSResultGroup} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './css/material-icons.css';

export enum Icon  {
    AnimatedImages      = "animated_images",
    Apps                = "apps",
    ArrowBack           = "arrow_back",
    ArrowBackIos        = "arrow_back_ios",
    ArrowDropDown       =  "arrow_drop_down",
    ArrowForward        = "arrow_forward_ios",
    Book2               = "book_2",
    Book4Spark          = "book_4_spark",
    Cast                = "cast",
    Close               = "close",
    CropFree            = "crop_free",
    DeployedCodeAccount = "deployed_code_account",
    DesignServices      = "design_services",
    Download            = "download",
    EditNote            = "edit_note",
    Engineering         = "engineering",
    FolderSpecial       = "folder_special",
    FullCoverage        = "full_coverage",
    Fullscreen          = "fullscreen",
    GridView            = "grid_view",
    Home                = "home",
    InterpreterMode     = "interpreter_mode",
    LiveTV              = "live_tv",
    Logout              = "logout",
    LockPerson          = "lock_person",
    Menu                = "menu",
    NoSound             = "no_sound",
    PatientList         = "patient_list",
    Pause               = "pause",
    PauseCircle         = "pause_circle",
    PictureAsPDF        = "picture_as_pdf",
    PlayArrow           = "play_arrow",
    PlayCircle          = "play_circle",
    Repeat              = "repeat",
    Replay              = "replay",
    Right               = "arrow_forward_ios",
    Search              = "search",
    Settings            = "settings",
    SettingsSlowMotion  = "settings_slow_motion",
    SettingsVideo       = "settings_video_camera",
    SkipNext            = "skip_next",
    SkipPrevious        = "skip_previous",
    SmartDisplay        = "smart_display",
    Speed1X             = "1x_mobiledata",
    Speed1_5X           = "speed_1_5x",
    Speed2X             = "speed_2x",
    Subtitle            = "subtitles",
    SubtitleOff         = "subtitles_off",
    TimeLine            = "timeline",
    TwoPager            = "two_pager",
    Visibility          = "visibility",
    VolumeUp            = "volume_up",
    VolumeDown          = "volume_down",
    VolumeMute          = "volume_mute",
    Webhook             = "webhook",
    Wysiwyg             = "wysiwyg",
    Youtube             = "youtube_activity",
}

@customElement('lit-youtube-icon')
export class LitYoutubeIcon extends LitElement{

    override connectedCallback() {
        super.connectedCallback();
        this.ensureFontLoaded();
    }

    private ensureFontLoaded() {
        if (!document.getElementById('material-symbols-font')) {
            const link = document.createElement('link');
            link.id = 'material-symbols-font';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0';
            document.head.appendChild(link);
        }
    }

    static styles?: CSSResultGroup | undefined = [
        css`

            @font-face {
                font-family: 'Material Symbols Outlined';
                font-style: normal;
                font-weight: 100 700;
                font-display: block;
                src: url(../fonts/MaterialIcons/material_symbols.woff2) format('woff2');
            }

            :host{
                display: block;
                width: fit-content;
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                -webkit-user-select: none;
                user-select: none;
            }
    
            .material-symbols-outlined {
                font-family: 'Material Symbols Outlined';
                font-weight: normal;
                font-style: normal;
                font-size: 24px;
                line-height: 2;
                letter-spacing: normal;
                text-transform: none;
                display: inline-block;
                white-space: nowrap;
                word-wrap: normal;
                direction: ltr;
                -webkit-font-feature-settings: 'liga';
                font-feature-settings: "liga";
                -webkit-font-smoothing: antialiased;
                user-select: none;
                -webkit-user-select: none;
            }
        `
    ];

    @property({attribute: false})
    icon!: Icon;

    @property({type: Boolean})
    filled: boolean = false;

    @property({type: Number})
    size: number = 24;

    @property()
    color: string = "black";

    public hiddenIcon(): void{
        this.style.display = "none";
    }

    public showIcon(): void{
        this.style.display = "block";
    }

    protected override render(): TemplateResult{
        return html`
            <style>

                .material-symbols-outlined{
                    font-variation-settings:
                     'FILL' 1,
                    'wght' 700,
                    'GRAD' 0,
                    'opsz' 24;
                    font-size: ${this.size}px!important;
                    color: ${this.color};
                }

            </style>
            <span class="material-symbols-outlined">${this.icon}</span>
        `;
    }

}

declare global{
   interface HTMLElementTagNameMap{
        'lit-youtube-icon': LitYoutubeIcon
   }
}