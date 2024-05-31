import { _decorator, Component, Node, Label, CCString, CCInteger, find } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('SingleLevelUiManager')
export class SingleLevelUiManager extends Component {

  

    @property({type: Label}) 
    private levelNumLabel;

    @property({type: CCInteger})
    private prefabLevel: number;


    @property({type: GameManager})
    private gameManager: GameManager;

    start() {
        this.gameManager = find("GameManager").getComponent(GameManager);
       // this.setup(5);
    }

    update(deltaTime: number) {
        
    }

    setup(levelnum: number) {
        this.prefabLevel = levelnum;
        let a: number = this.prefabLevel+1;
        this.levelNumLabel.string = ""+a;
    }

    openLevel() {
        this.gameManager.openGameLevel(this.prefabLevel);
    }
}


