
import {Scene, Engine} from "@babylonjs/core"

class SimpleScene{

    public engine: Engine
    public scene: Scene

    constructor(canvas){
        this.engine = new Engine(canvas);
        this.scene = new Scene(this.engine)
    }


}