import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js';
 
class Fence extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // instantiate a loader
    var materialLoader = new MTLLoader();
    var objectLoader = new OBJLoader();

    // load a resource
    materialLoader.load ('./models/911.mtl' , 
    (materials) => {
      objectLoader.setMaterials (materials);
      objectLoader.load( './models/fence.obj',  //Mide 15,7 aproximadamente
      ( object ) => {
        this.add( object );
      }, null, null);
    });
    

  }
  
  createGUI (gui,titleGui) {

  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
   
    
    this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
    

    //this.box.rotart += 0.1;
  }
}

export { Fence };
