import { Mesh, MeshBuilder, Scene, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";

export class Obstacle {

    private scene: Scene 

    constructor(scene: Scene){
        this.scene = scene
    }

    public build = (
        type: string, 
        name: string, 
        position: Vector3,
        options: any
        ): Mesh => {

        let obstacle

        switch(type) {
            case "box":
                obstacle = MeshBuilder.CreateBox(name, options, this.scene)
                break;
            case "sphere":
                obstacle = MeshBuilder.CreateSphere(name, options, this.scene)
                break;
        }

        obstacle.position = position
        obstacle.material = this.applyMaterial()

        return obstacle
    }

    private applyMaterial = () => {

        const mat  = new StandardMaterial("wood-material", this.scene)
        let diff = new Texture("assets/textures/wood/wood_diff.jpg", this.scene)
        let ao = new Texture("assets/textures/wood/wood_ao.jpg", this.scene)
        let spec = new Texture("assets/textures/wood/wood_spec.jpg", this.scene)

        mat.diffuseTexture = diff
        mat.ambientTexture = ao
        mat.specularTexture = spec

        let textures = [diff, ao, spec]

        textures.forEach( (t) => {
            t.uScale = 2
            t.vScale = 2
        })

        return mat
    }

    
}  