
import {
    Scene, 
    Engine, 
    FreeCamera, 
    Vector3 as V3, 
    MeshBuilder,
    HemisphericLight,
    StandardMaterial,
    Texture
} from "@babylonjs/core"

import {Border} from './Border'


export class SimpleScene{

    public engine: Engine
    public scene: Scene
    private canvas: HTMLCanvasElement

    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas
        this.engine = new Engine(canvas);
        this.scene = this.createScene()
    }

    /**
     * Create scene for the 3D view
     */
    public createScene(): Scene {
        let scene = new Scene(this.engine)
    

        // Add a ground 
        const ground = MeshBuilder.CreateGround(
            "ground", {width: 10, height: 10, updatable: true}, this.scene);
        
        //ground.applyDisplacementMap("assets/textures/ground/herringbone_parquet_disp_1k.jpg", 0, 1);
        ground.material = this.createGroundMaterial()

        // Camera view 
        // new V3 (Vector 3 positions the camera on 3D)
        const camera = new FreeCamera("camera", new V3(0, 5, -20), scene);
        
        camera.speed = 0.25

        // Camera control
        camera.setTarget(V3.Zero());
        camera.attachControl(this.canvas, true);

        // Creates a light, aiming 0,1,0
        const light = new HemisphericLight("light", new V3(0, 1, 0), scene);
        // Dim the light a small amount 0 - 1
        light.intensity = 1;
        

        const border = new Border(scene, ground)

        border.createBorder()
        
        return scene

    }

    public createGroundMaterial = (): StandardMaterial => {

        const g = new StandardMaterial("ground", this.scene)
        let diffuseTexture = new Texture("assets/textures/ground/herringbone_parquet_diff_1k.jpg", this.scene)
        let aoTexture = new Texture("assets/textures/ground/herringbone_parquet_ao_1k.jpg", this.scene)
        let normalTexture = new Texture("assets/textures/ground/herringbone_parquet_nor_1k.jpg", this.scene)


        let textures = [diffuseTexture, aoTexture, normalTexture]
        g.diffuseTexture = diffuseTexture
        // g.bumpTexture = normalTexture
        g.ambientTexture = aoTexture

        textures.forEach( (t) => {
            t.uScale = 4
            t.vScale = 4
        })

        return g
    }

    public render = () => {

        this.engine.runRenderLoop( () => {
            this.scene.render()
        })
    }

}