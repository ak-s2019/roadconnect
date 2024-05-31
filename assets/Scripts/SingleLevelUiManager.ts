import { _decorator, Component, Node, Label, CCString, CCInteger, find, Button, Sprite, color } from 'cc';
import { GameManager } from './GameManager';

const { ccclass, property } = _decorator;

@ccclass('SingleLevelUiManager')
export class SingleLevelUiManager extends Component {

  

    @property({type: Label}) 
    private levelNumLabel;

    @property({type: CCInteger})
    private prefabLevel: number;


 

    start() {
        
       // this.setup(5);
    }

    update(deltaTime: number) {
        
    }

    setup(levelnum: number, unlocked: boolean) {
        this.prefabLevel = levelnum;
        let a: number = this.prefabLevel+1;
        this.levelNumLabel.string = ""+a;
        if(!unlocked){
            this.getComponent(Button).interactable = false;
            this.getComponent(Sprite).color =  color(128,128,128,255); 
        }
    }

    openLevel() {
        find("GameManager").getComponent(GameManager).openGameLevel(this.prefabLevel);
    }
}


