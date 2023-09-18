
import {
    Scene, 
    Engine, 
    FreeCamera, 
    Vector3 as V3, 
    MeshBuilder,
    HemisphericLight,
    StandardMaterial,
    Texture,
    Mesh,
    SceneLoader,
} from "@babylonjs/core"
import '@babylonjs/loaders'
import { Obstacle } from "./Obstacle"


export class BasicScene{

    public engine: Engine
    public scene: Scene
    private canvas: HTMLCanvasElement
    private scene_size: Array<number> = [15, 15]
    private obstacle: Obstacle 
    private meshes: Mesh[] = []

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
        this.scene = scene

        
        // Add a ground 
        const ground = MeshBuilder.CreateGround(
            "ground", {width: this.scene_size[0], height: this.scene_size[1], updatable: true}, this.scene);
       
        
        ground.material = this.createGroundMaterial()

        this.createCamera(scene)
        
        
        const box  = MeshBuilder.CreateBox("my-box", {width: 2, height:2, depth:1},  scene)
        box.position = new V3(0, 1, 5)

        // Creates a light, aiming 0,1,0
        const light = new HemisphericLight("light", new V3(0, 1, 0), scene);;
        // Dim the light a small amount 0 - 1
        light.intensity = 0.6;
        
        return scene

    }

    public createCamera = (scene: Scene) => {

        // Camera view 
        // new V3 (Vector 3 positions the camera on 3D)
        const camera = new FreeCamera("camera", new V3(0, 5, -25), scene);
        
        camera.speed = 0.3

        // Camera control
        camera.setTarget(V3.Zero());
        camera.attachControl(this.canvas, true);

    }

    public createGroundMaterial = (): StandardMaterial => {

        const g = new StandardMaterial("ground", this.scene)
        let diffuseTexture = new Texture("assets/textures/ground/herringbone_parquet_diff_1k.jpg", this.scene)
        let aoTexture = new Texture("assets/textures/ground/herringbone_parquet_ao_1k.jpg", this.scene)
        let normalTexture = new Texture("assets/textures/ground/herringbone_parquet_nor_gl_1k.jpg", this.scene)


        let textures = [diffuseTexture, aoTexture, normalTexture]
        g.diffuseTexture = diffuseTexture
        g.bumpTexture = normalTexture
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
