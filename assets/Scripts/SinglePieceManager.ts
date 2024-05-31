import { _decorator, Button, CCBoolean, CCInteger, Component, find, Node, Sprite, SpriteFrame, Texture2D, tween, Vec3 } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('SinglePieceManager')
export class SinglePieceManager extends Component {

    @property({type: CCInteger})
    public startRotation: number = 0;
    
    @property({type: CCInteger})
    public targetRotation: number = 0;

    @property({type: CCBoolean})
    public isMirrored: boolean;

    @property({type: CCBoolean})
    public isBonus: boolean;

    @property({type: CCBoolean})
    public isEmpty: boolean;

    @property({type: Sprite})
    public mySprite: Sprite;

   
   

    start() {
       
    }

    update(deltaTime: number) {
        
    }


   
    setupEmpty(){
        this.isEmpty = true;
    }


    setup(spriteImage: SpriteFrame, startRot: number, targetRot: number) {

        this.node.setScale(0,0,0);
        this.mySprite.spriteFrame = spriteImage;
        this.startRotation = startRot;

        this.mySprite.node.setRotationFromEuler(0,0,startRot);


        this.targetRotation = targetRot;



        if(this.mySprite.spriteFrame.name.endsWith("MR180")){
            this.isMirrored = true;
        }

        if(this.mySprite.spriteFrame.name.endsWith("BN360")){
            this.isBonus = true;
        }

        let randomDelay =  Math.random() * (0.75 - 0.25);
       tween(this.node).delay(randomDelay).to(0.25,{scale: new Vec3(1,1,1)},{easing: "quadInOut"}).start();

    }

    startTweenOut() {
        tween(this.node).delay(0.2).to(0.4,{scale: new Vec3(0,0,0)},{easing: "quadInOut"}).start();
    }

    isCorrectPosition(){

        if(this.isBonus || this.isEmpty){
            return true;
        }
        if(this.isMirrored){
            if(this.node.eulerAngles.z != this.targetRotation){
                let newTarget = 0;
                switch(this.node.eulerAngles.z){
                    case 0: 
                        newTarget = 180;
                        break;
                    case 180:
                        newTarget = 0;
                        break;
                    case 90:
                        newTarget = 270;
                        break;
                    case 270:
                        newTarget = 90;
                        break;
                }
                return (newTarget == this.targetRotation);
            }
        }

        return (this.node.eulerAngles.z == this.targetRotation);
    }

    onClickPiece(){
       
        this.getComponent(Button).interactable = false;
        tween(this.node).by(0.25,{eulerAngles : new Vec3(0,0,-90)},{easing: "sineInOut", onComplete: ()=>{
            let finalRot = this.node.eulerAngles.z;
            if(finalRot<0)
                finalRot = 360 + finalRot;
            this.node.setRotationFromEuler(new Vec3(this.node.eulerAngles.x,this.node.eulerAngles.y,finalRot));
            find("GameManager").getComponent(GameManager).checkForLeveLCompletion();
            this.getComponent(Button).interactable = true;
        }}).start();

        /*this.node.setRotationFromEuler(new Vec3(this.node.eulerAngles.x,this.node.eulerAngles.y,this.node.eulerAngles.z+90));
        if(this.node.eulerAngles.z>=360)
            this.node.setRotationFromEuler(new Vec3(this.node.eulerAngles.x,this.node.eulerAngles.y,this.node.eulerAngles.z-360));
        //console.log(this.isCorrectPosition());
        */
        
    }

}


