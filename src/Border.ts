
import { GroundMesh, MeshBuilder, Scene, StandardMaterial, Vector3, Texture, MeshBlock, PBRMaterial} from "@babylonjs/core";

export class Border {

    public scene: Scene
    public ground: GroundMesh

    constructor(scene: Scene, ground: GroundMesh ){

        this.scene = scene
        this.ground = ground
    }


    createBorder = () => {
        
        console.log(this.ground)
        const border = MeshBuilder.CreateBox("border-1", {
            height: 1,
            width: 0.1,
            depth: 10, 
        }, this.scene )
        
        border.position = new Vector3(-5, 0.5, 0) 

        const border_2 = border.clone("border-2")
        const border_3 = border.clone("border-3")
        const border_4 = border.clone("border-4")


        border_2.rotation.y = Math.PI / 2;
        border_2.position = new Vector3(0, 0.5, +5)

        border_3.position = new Vector3(5, 0.5, 0)

        border_4.rotation.y = Math.PI / 2;
        border_4.position = new Vector3(0, 0.5, -5)
        
        border.material = this.applyMaterial()
        border_2.material = this.applyMaterial()
        border_3.material = this.applyMaterial()
        border_4.material = this.applyMaterial()
    }

    applyMaterial = (): StandardMaterial => {

        let m = new StandardMaterial("border", this.scene)
        
        let diffTexture = new Texture("assets/textures/wall/wall_diff.jpg", this.scene)
        let aoTexture = new Texture("assets/textures/wall/wall_ao.jpg", this.scene)
        let norTexture = new Texture("assets/textures/wall/wall_nor.jpg", this.scene)

        m.diffuseTexture = diffTexture
        m.ambientTexture = aoTexture
        // m.bumpTexture = norTexture

        let textures = [diffTexture, aoTexture, norTexture]

        textures.forEach( (t) => {
            t.vScale = 6
            t.uScale = 1
        })

        return m
    }

}