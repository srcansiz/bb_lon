import { Mesh, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";

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
            case "capsule":
                obstacle = MeshBuilder.CreateCapsule(name, options)
            case "":
                obstacle = MeshBuilder.CreateTube
            default: 
                return null
        }

    }
}  