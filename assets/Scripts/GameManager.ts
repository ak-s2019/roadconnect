import { _decorator, Component, Node, input, Input, EventTouch, CCInteger, instantiate, Layout, Prefab, Label, RichText } from 'cc';
import { LevelData, Levels } from './LevelData';
import { SingleLevelUiManager } from './SingleLevelUiManager';
import { SinglePieceManager } from './SinglePieceManager';
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

    @property({type:Layout})
    private  allLevelsUIParent : Layout;

    @property({type:Node})
    private  gameplayPanel: Node;
   
    @property({type:RichText})
    private  gameLevelTitle: RichText;

    @property({type:Layout})
    private  gamePieceLayout: Layout;

    @property({type:Prefab})
    private  levelSelectPrefab: Prefab;

    @property({type:SinglePieceManager})
    private  allSinglePieceManagers: SinglePieceManager[] = [];

    @property({type: LevelData})
    private levelsData : LevelData;

    @property({type: Levels})
    private currentLevelData : Levels;

    @property({type:Prefab})
    private  piecePrefab: Prefab;

    @property({type: CCInteger})
    private currentLevel;


    start() {
        this.gameTitle.active = true;
        this.playBtn.active = true;
        this.levelSelectPanel.active = false;
        this.levelSelectTitle.active = false;
        this.gameplayPanel.active = false;

        for (let index = 0; index < this.levelsData.levelsData.length; index++) {
            //console.log("levels");
            let newLevelSelectUI = instantiate(this.levelSelectPrefab);
            newLevelSelectUI.parent = this.allLevelsUIParent.node;
            newLevelSelectUI.getComponent(SingleLevelUiManager).setup(index);
        }



    }

    update(deltaTime: number) {
        
    } 
     
    playClicked() {
         // console.log("hi");
          this.gameTitle.active = false;
          this.playBtn.active = false;
          this.levelSelectPanel.active = true;
          this.levelSelectTitle.active = true;
    }

    

    menuBtnClicked() {
        this.levelSelectPanel.active = true;
         this.levelSelectTitle.active = true;
         this.gameplayPanel.active = false;
    }

    openGameLevel(levelNum: number) {

        this.gamePieceLayout.node.destroyAllChildren();
        this.allSinglePieceManagers = [];

        this.currentLevel = levelNum;   
        let a: number = this.currentLevel+1;
        this.currentLevelData = this.levelsData.levelsData[levelNum];

        this.gameLevelTitle.string = "Level "+ a;

        for (let index = 0; index < this.currentLevelData.piecesData.length; index++) {
            let newGamePiece = instantiate(this.piecePrefab);
            newGamePiece.parent = this.gamePieceLayout.node;
            if(this.currentLevelData.piecesData[index].pieceId==-1){
                newGamePiece.getComponent(SinglePieceManager).setupEmpty();
            }
            else {
                newGamePiece.getComponent(SinglePieceManager).setup(
                    this.levelsData.textures[this.currentLevelData.piecesData[index].pieceId],
                    this.currentLevelData.piecesData[index].startRotation,
                    this.currentLevelData.piecesData[index].targetRotation
                )
            }
            this.allSinglePieceManagers.push(newGamePiece.getComponent(SinglePieceManager));
        }

        this.levelSelectPanel.active = false;
        this.levelSelectTitle.active = false;
        this.gameplayPanel.active = true;
    }


    checkForLeveLCompletion(){
        let allCorrect:boolean = true;
        this.allSinglePieceManagers.forEach(singlePieceManager => {
            if(!singlePieceManager.isCorrectPosition())
                allCorrect = false;
        });
        if(allCorrect){
            console.log("LEVEL COMPLETED!");
            this.openGameLevel(this.currentLevel+1);
        }
    }


}


