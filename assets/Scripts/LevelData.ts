import { _decorator, CCInteger, Color, Component, ImageAsset, Node, Sprite, SpriteFrame, Texture2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("Pieces")
class Pieces {
    @property({type: CCInteger})
    public pieceId: number = 0;
    @property({type: CCInteger})
    public startRotation: number = 0;
    @property({type: CCInteger})
    public targetRotation: number = 0;
  }




@ccclass("Levels")
export class Levels {
    @property({type: CCInteger})
    public levelId: number = 0;
    @property({
        type: Pieces
    })
    public piecesData: Pieces[] = [];
  }



@ccclass('LevelData')
export class LevelData extends Component {


    @property({
        type: Levels
    })
    public levelsData: Levels[] = [];

    @property({
        type: SpriteFrame
    })
    public textures: SpriteFrame[] = [];
   
   

    start() {
           
    }

    update(deltaTime: number) {
        
    }
}


