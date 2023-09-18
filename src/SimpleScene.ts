
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
    SceneLoader,
    HDRCubeTexture,
    PointLight,
    DirectionalLight,
} from "@babylonjs/core"
import '@babylonjs/loaders'
import {Border} from './Border'
import { Obstacle } from "./Obstacle"


export class SimpleScene{

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
        this.obstacle = new Obstacle(scene)
        this.scene = scene

        // this.createSkybox()
        
        // Add a ground 
        const ground = MeshBuilder.CreateGround(
            "ground", {width: this.scene_size[0], height: this.scene_size[1], updatable: true}, this.scene);
               
        this.meshes.push(ground)

        ground.material = this.createGroundMaterial()
        
    
        this.createCamera(scene)
        

        // Moving within having pointer down
        scene.onPointerDown = (e) => {
            if(e.button == 0){
                this.engine.enterPointerlock()
            }
            if(e.button == 1){
                this.engine.exitPointerlock()
            }
        }

        // Creates a light, aiming 0,1,0
        const light = new HemisphericLight("pointLight", new V3(0, 1, 0), scene);;
        // Dim the light a small amount 0 - 1
        light.intensity = 1;
        

        const border = new Border(scene, ground)
        let borders = border.createBorder(this.scene_size)
        this.meshes.push(...borders)
        
        this.loadTreasureChest()


        this.meshes.push(...[
            this.obstacle.build("box", "obstacle-1",  new V3(1, 0.75, -2), {height: 1.5, width:1.5}, "wood" ),
            this.obstacle.build("box", "obstacle-2",  new V3(1, 0.75, 2), {height: 1.5, width:1.5}, "bricks"),
            this.obstacle.build("box", "obstacle-3",  new V3(-3, 0.75, -2), {height: 1.5, width:1.5}, "wood"),
            this.obstacle.build("box", "obstacle-3-1",  new V3(-3, 2, -2), {height: 1, width:1}, "bricks"),
        ])


        // // ------- TUBE -----------------------------------
        let path = [
            new V3(0.0, 1, 0.0),
            new V3(0.0, 1, 2.0)
        ];
        let tube_1 = this.obstacle.build("tube", "tube-1", 
             new V3(-5, -1, 3),
            {radius: 1, path: path, sideOrientation: Mesh.DOUBLESIDE, updatable: true}   ,
            "wood" 
        )
        let tube_2 = this.obstacle.build("tube", "tube-1", 
        new V3(5, -1, -3),
            {radius: 1, path: path, sideOrientation: Mesh.DOUBLESIDE, updatable: true}   ,
            "wood" 
        )
        this.meshes.push(...[tube_1, tube_2])
        // // -------------------------------------------------

        this.applyGravityAndCollision(scene)

        this.meshes.forEach((mesh: Mesh) => {
            mesh.checkCollisions = true
        })
        return scene

    }

    public createCamera = (scene: Scene) => {

        // Camera view 
        // new V3 (Vector 3 positions the camera on 3D)
        const camera = new FreeCamera("camera", new V3(0, 2.5, 0), scene);
       // const camera = new FreeCamera("camera", new V3(0, 5, -15), scene);
        
        camera.speed = 0.35

        // Camera control
        camera.setTarget(V3.Zero());
        camera.attachControl(this.canvas, true);


        camera.applyGravity = true 
        camera.checkCollisions = true 
        camera.ellipsoid = new V3(0.6, 0.6, 0.5)
        
        // // Getting closer to object without getting into it
        camera.minZ = 0.25
        camera.angularSensibility = 4000
    }


    public applyGravityAndCollision = (scene: Scene) => {

        let frameRate = 60
        let earthGravity = -9.81
        scene.gravity = new V3(0, earthGravity/frameRate, 0)
        scene.collisionsEnabled = true
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




    public loadTreasureChest = async (): Promise<void> => {

       const {meshes} = await SceneLoader.ImportMeshAsync( "", 
       "assets/models/treasure_chest_1k/", "treasure_chest_1k.gltf", this.scene)

       let root_mesh = meshes[0]
       root_mesh.position = new V3(5, 0, 6)

    }


    public render = () => {

        this.engine.runRenderLoop( () => {
            this.scene.render()
        })
    }


    public createSkybox = () => {

        
        const texture = new HDRCubeTexture('assets/textures/table_mountain_1_puresky_2k.hdr', this.scene, 200);
        this.scene.createDefaultSkybox(texture, false, 1000, 0.0)

    }

}
