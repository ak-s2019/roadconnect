import { _decorator, AudioClip, AudioSource, Component, Node, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {

    @property({type: AudioSource})
    public bgmSource: AudioSource;

    @property({type: AudioSource})
    public sfxSource: AudioSource;

    @property({type:AudioClip})
    public buttonClick: AudioClip;

    @property({type:AudioClip})
    public pieceTurn: AudioClip;

    @property({type:AudioClip})
    public pieceAppear: AudioClip;

    @property({type:AudioClip})
    public levelComplete: AudioClip;


    start() {
        this.bgmSource.volume = 0;
        this.bgmSource.play();
        tween(this.bgmSource).to(3,{volume: 0.5}).start();
    }

    update(deltaTime: number) {
        
    }

    playPieceTurn(){
        this.sfxSource.playOneShot(this.pieceTurn);
    }

    playPieceAppear(){
        this.sfxSource.playOneShot(this.pieceAppear);
    }

    playButtonClick(){
        this.sfxSource.playOneShot(this.buttonClick);
    }

    playLeveLComplete(){
        this.sfxSource.playOneShot(this.levelComplete);
    }
}


