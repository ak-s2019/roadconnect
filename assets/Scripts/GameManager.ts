import { _decorator, Component, Node, input, Input, EventTouch, CCInteger, instantiate, Layout, Prefab, Label, RichText, tween, Vec3 } from 'cc';
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

    @property({type:Node})
    private  allLevelsCompleted: Node;

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


    //animation items
    @property({type:Node})
    private  gameTitleRoad: Node;
    @property({type:Node})
    private  gameTitleConnect: Node;

    start() {

        //localStorage.clear()




        this.gameTitle.active = true;
        this.playBtn.active = true;
        this.levelSelectPanel.active = false;
        this.levelSelectTitle.active = false;
        this.gameplayPanel.active = false;
        this.allLevelsCompleted.active = false;

      
        tween(this.gameTitleRoad).to(0.5,{position : new Vec3(0,220,0)},{easing: "quadInOut"}).start();
        tween(this.gameTitleConnect).delay(0.25).to(0.5,{position : new Vec3(0,140,0)},{easing: "quadInOut"}).start();
        tween(this.playBtn).delay(0.5).to(0.5,{scale: new Vec3(1.5,1.5,1.5)},{easing: "quadInOut"}).start();
    }

    update(deltaTime: number) {
        
    } 
     
    playClicked() {


        tween(this.playBtn).to(0.3,{scale: new Vec3(2,2,2)},{easing: "quadInOut"})
        .to(0.3,{scale: new Vec3(1.5,1.5,1.5)},{easing: "quadInOut",onComplete: ()=>{
            this.gameTitle.active = false;
            this.playBtn.active = false;
           
        
            this.createLevelSelectButtons();
        }})
        .start();

         // console.log("hi");
          
    }

    

    menuBtnClicked() {
       
         this.gameplayPanel.active = false;
         this.createLevelSelectButtons();
    }


    createLevelSelectButtons(){
        this.levelSelectPanel.active = true;
        this.levelSelectTitle.active = true;
        this.allLevelsUIParent.node.destroyAllChildren();

          for (let index = 0; index < this.levelsData.levelsData.length; index++) {
            //console.log("levels");
            let newLevelSelectUI = instantiate(this.levelSelectPrefab);
            newLevelSelectUI.parent = this.allLevelsUIParent.node;
            newLevelSelectUI.getComponent(SingleLevelUiManager).setup(index, this.isUnlocked(index));
            }
    }


    isUnlocked(levelNum: number){
        console.log(localStorage.getItem("level"+levelNum));
        if(levelNum==0){
            return true;
        }

        if(localStorage.getItem("level"+levelNum)==null){
            return false;
        }
       
        return true;
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
        this.allLevelsCompleted.active = false;
        this.gameplayPanel.active = true;
        this.gamePieceLayout.node.active = true;
        this.gameLevelTitle.node.active = true;
        this.allLevelsCompleted.active = false;



        tween(this.gameLevelTitle.node).to(0.5,{position : new Vec3(0,780,0)},{easing: "quadInOut"}).start();

    }


    checkForLeveLCompletion(){
        let allCorrect:boolean = true;
        this.allSinglePieceManagers.forEach(singlePieceManager => {
            if(!singlePieceManager.isCorrectPosition())
                allCorrect = false;
        });
        if(allCorrect){
            console.log("LEVEL COMPLETED!");
           
            this.allLevelsCompleted.setScale(0,0,0);

            if(this.levelsData.levelsData.length ==this.currentLevel+1 ) {
              
                this.allSinglePieceManagers.forEach(singlePieceManager => {
                    singlePieceManager.startTweenOut();
                });
                tween(this.gameLevelTitle.node).delay(0.2).to(0.5,{position : new Vec3(-800,780,0)},{easing: "quadInOut", onComplete: ()=>{
                    this.gamePieceLayout.node.active = false;
                    this.gameLevelTitle.node.active = false;
                    this.allLevelsCompleted.active = true;
                    tween(this.allLevelsCompleted).delay(0.15).to(0.25,{scale: new Vec3(1,1,1)},{easing: "quadInOut"}).start();
                }}).start();
            }
            else {
                let a = this.currentLevel+1;
                console.log(a);
                localStorage.setItem("level"+a,"ready");
                this.allSinglePieceManagers.forEach(singlePieceManager => {
                    singlePieceManager.startTweenOut();
                });
                tween(this.gameLevelTitle.node).delay(0.2).to(0.5,{position : new Vec3(-800,780,0)},{easing: "quadInOut", onComplete: ()=>{
                    this.gameLevelTitle.node.setPosition(800,780,0);
                    this.openGameLevel(this.currentLevel+1);
                }}).start();

                
            }
           
        }
    }


}


