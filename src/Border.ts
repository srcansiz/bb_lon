
import { GroundMesh, MeshBuilder, Scene, StandardMaterial, Vector3, Texture, MeshBlock, PBRMaterial} from "@babylonjs/core";

export class Border {

    public scene: Scene
    public ground: GroundMesh
    constructor(scene: Scene, ground: GroundMesh ){

        this.scene = scene
        this.ground = ground
    }


    createBorder = (scene_size: Array<number>) => {
        
        const border = MeshBuilder.CreateBox("border-1", {
            height: scene_size[0]/6,
            width: 0.1,
            depth: scene_size[0], 
        }, this.scene )
        
        let border_pos = scene_size[0] / 2

        border.position = new Vector3(-border_pos, (scene_size[0]/6)/2, 0) 

        const border_2 = border.clone("border-2")
        const border_3 = border.clone("border-3")
        const border_4 = border.clone("border-4")


        border_2.rotation.y = Math.PI / 2;
        border_2.position = new Vector3(0, (scene_size[0]/6)/2, border_pos)

        border_3.position = new Vector3(border_pos, (scene_size[0]/6)/2, 0)

        border_4.rotation.y = Math.PI / 2;
        border_4.position = new Vector3(0, (scene_size[0]/6)/2, -border_pos)
        
        border.material = this.applyMaterial()
        border_2.material = this.applyMaterial()
        border_3.material = this.applyMaterial()
        border_4.material = this.applyMaterial()

        return [border, border_2, border_3, border_4]
    }

    applyMaterial = (): StandardMaterial => {

        let m = new StandardMaterial("border", this.scene)
        
        let diffTexture = new Texture("assets/textures/wall/wall_diff.jpg", this.scene)
        let aoTexture = new Texture("assets/textures/wall/wall_ao.jpg", this.scene)
        let norTexture = new Texture("assets/textures/wall/wall_nor.jpg", this.scene)

        m.diffuseTexture = diffTexture
        m.ambientTexture = aoTexture
        m.bumpTexture = norTexture

        let textures = [diffTexture, aoTexture, norTexture]

        textures.forEach( (t) => {
            t.vScale = 6
            t.uScale = 1
        })

        return m
    }

}