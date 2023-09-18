import { Material, Mesh, MeshBuilder, Scene, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";

export class Obstacle {

    private scene: Scene 

    constructor(scene: Scene){
        this.scene = scene
    }

    public build = (
        type: string, 
        name: string, 
        position: Vector3,
        options: any,
        material_type: string,
        ): Mesh => {

        let obstacle

        switch(type) {
            case "box":
                obstacle = MeshBuilder.CreateBox(name, options, this.scene)
                break;
            case "tube":
                const path = [
                    new Vector3(0.0, 1, 0.0),
                    new Vector3(0.0, 1, 2.0)
                 ];
                 obstacle = MeshBuilder.CreateTube("tube", options, this.scene)
                 
                break;
        }

        obstacle.position = position
    
        obstacle.material = this.applyMaterial(material_type)

        return obstacle
    }

    private applyMaterial = (material_type: string) => {

        let mat 
        let diff 
        let ao 
        let spec
        let nor

        mat  = new StandardMaterial("mix-material", this.scene)
            
        if(material_type == "wood"){
            diff = new Texture("assets/textures/wood/wood_diff.jpg", this.scene)
            ao = new Texture("assets/textures/wood/wood_ao.jpg", this.scene)
            spec = new Texture("assets/textures/wood/wood_spec.jpg", this.scene)
        }else{
            diff = new Texture("assets/textures/bricks/patterned_brick_floor_diff_1k.jpg", this.scene)
            ao = new Texture("assets/textures/bricks/patterned_brick_floor_ao_1k.jpg", this.scene)
            nor= new Texture("assets/textures/bricks/patterned_brick_floor_nor_gl_1k.jpg", this.scene)
        }
        

        mat.diffuseTexture = diff
        mat.ambientTexture = ao
        if(spec != undefined) mat.specularTexture = spec
        if(nor != undefined) mat.bumpTexture = nor

        let textures = [diff, ao, spec, nor]

        textures.forEach( (t) => {
            if(t){
                t.uScale = 1
                t.vScale = 1
            }
        })

        return mat
    }


}  