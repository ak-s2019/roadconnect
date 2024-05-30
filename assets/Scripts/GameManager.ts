import { _decorator, Component, Node, input, Input, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property({type:Node})
    private  gameTitle: Node;
    @property({type:Node})
    private  playBtn : Node;
    @property({type:Node})
    private  levelSelectTitle: Node;
    @property({type:Node})
    private  levelSelectPanel : Node;
    @property({type:Node})
    private  gameplayPanel: Node;
   

    start() {
        this.gameTitle.active = true;
          this.playBtn.active = true;
          this.levelSelectPanel.active = false;
          this.levelSelectTitle.active = false;
          this.gameplayPanel.active = false;
    }

    update(deltaTime: number) {
        
    } 
     
    playClicked() {
          console.log("hi");
          this.gameTitle.active = false;
          this.playBtn.active = false;
          this.levelSelectPanel.active = true;
          this.levelSelectTitle.active = true;
    }

    levelSelected() {
         this.levelSelectPanel.active = false;
         this.levelSelectTitle.active = false;
         this.gameplayPanel.active = true;
    }

    menuBtnClicked() {
        this.levelSelectPanel.active = true;
         this.levelSelectTitle.active = true;
         this.gameplayPanel.active = false;
    }
}


