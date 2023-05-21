import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class Planta extends THREE.Object3D {
  constructor(gui, titleGui){
    super();

    var points = [];

    points.push (new THREE.Vector2 (0,0));
    points.push (new THREE.Vector2 (2,0));
    points.push (new THREE.Vector2 (2.5,4));
    points.push (new THREE.Vector2 (3,4));
    points.push (new THREE.Vector2 (3,5));
    points.push (new THREE.Vector2 (2.5,5));
    points.push (new THREE.Vector2 (2.5,4));
    points.push (new THREE.Vector2 (0,4));

    var textureArcilla = new THREE.TextureLoader().load('../imgs/arcilla.jpg');
    var matMaceta = new THREE.MeshPhongMaterial ({map: textureArcilla});
 
    var textureTierra = new THREE.TextureLoader().load('../imgs/tierra.jpg');
    var matTierra = new THREE.MeshPhongMaterial({map: textureTierra});

    var geometriaMaceta = new THREE.LatheGeometry (points , 100 , 0 , Math.PI * 2);
    var maceta = new THREE.Mesh(geometriaMaceta, matMaceta);

    var geometriaTierra = new THREE.CylinderGeometry(2.49,2.49,0.99,100);
    geometriaTierra.translate(0,4.5,0);
    var tierra = new THREE.Mesh(geometriaTierra, matTierra);

    points = [];
    points.push (new THREE.Vector2 (0,0));
    points.push (new THREE.Vector2 (1,0));
    points.push (new THREE.Vector2 (1.25,0.5));
    points.push (new THREE.Vector2 (1.5,1.5));
    points.push (new THREE.Vector2 (1.75,3.5));
    points.push (new THREE.Vector2 (1.75,4));
    points.push (new THREE.Vector2 (1.5,4.75));
    points.push (new THREE.Vector2 (1.4,5.25));
    points.push (new THREE.Vector2 (1.3,5.75));
    points.push (new THREE.Vector2 (1,6.25));
    points.push (new THREE.Vector2 (0.75,6.5));
    points.push (new THREE.Vector2 (0,7));
  
    var geometriaPlanta= new THREE.LatheGeometry (points , 100 , 0 , Math.PI * 2);
    geometriaPlanta.translate(0,3,0);
    geometriaPlanta.scale(1.5,1.5,1.5);
    var textureCesped = new THREE.TextureLoader().load('../imgs/cesped.jpg');
    var matPlanta =  new THREE.MeshPhongMaterial ({map: textureCesped});
    var planta = new THREE.Mesh(geometriaPlanta, matPlanta);

    this.planta = new THREE.Object3D();
    this.planta.add(maceta);
    this.planta.add(tierra);
    this.planta.add(planta);
    this.add(this.planta);
}



createGUI(gui, titleGui){

}

update(){
    //  Con independencia de cómo se escriban las 3 lineas siguientes, el orden en el que se aplican las transformaciones es:
    //  1º. Escalado
    //  2º. Rotación en Z
    //  3º. Rotación en Y
    //  4º. Rotación en X
    //  5º. Traslaciones

    //-= así va en el sentido de las agujas del reloj
    //espacio = velocidad x tiempo

}
}

export { Planta };