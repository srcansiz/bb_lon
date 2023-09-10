
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
    int,
    SceneLoader
} from "@babylonjs/core"
import '@babylonjs/loaders'
import {Border} from './Border'


export class SimpleScene{

    public engine: Engine
    public scene: Scene
    private canvas: HTMLCanvasElement
    private scene_size: Array<number> = [30, 30]

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
            "ground", {width: this.scene_size[0], height: this.scene_size[1], updatable: true}, this.scene);
        
        //ground.applyDisplacementMap("assets/textures/ground/herringbone_parquet_disp_1k.jpg", 0, 1);
        ground.material = this.createGroundMaterial()

        // Camera view 
        // new V3 (Vector 3 positions the camera on 3D)
        const camera = new FreeCamera("camera", new V3(0, 10, -40), scene);
        
        camera.speed = 0.25

        // Camera control
        camera.setTarget(V3.Zero());
        camera.attachControl(this.canvas, true);

        // Creates a light, aiming 0,1,0
        const light = new HemisphericLight("light", new V3(0, 1, 0), scene);
        // Dim the light a small amount 0 - 1
        light.intensity = 1;
        

        const border = new Border(scene, ground)

        border.createBorder(this.scene_size)
        this.createTube()
        this.loadRoadBarrier()
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


    public createTube = () => {
        const path = [
           new V3(0.0, 1, 0.0),
           new V3(0.0, 1, 2.0)
        ];
        let tube = MeshBuilder.CreateTube("tube", {radius: 1, path: path, sideOrientation: Mesh.DOUBLESIDE, updatable: true}, this.scene)
        tube.position = new V3(-12, 1, 3)
    
    }


    public loadRoadBarrier = async (): Promise<void> => {

       const {meshes} = await SceneLoader.ImportMeshAsync( "", 
       "assets/models/", "concrete_road.gltf", this.scene, (meshes) => {})
    }


    public render = () => {

        this.engine.runRenderLoop( () => {
            this.scene.render()
        })
    }

}