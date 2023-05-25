import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'
import * as TWEEN from '../libs/tween.esm.js'

class Laberinto extends THREE.Object3D {
  constructor(gui, titleGui){
    super();

    //var mat = new THREE.MeshNormalMaterial();
    var mat = new THREE.MeshPhongMaterial({color: 0xFF3333});

    var textureLaberinto = new THREE.TextureLoader().load('./imgs/gotele.jpg');
    textureLaberinto.wrapS = THREE.RepeatWrapping;
    textureLaberinto.wrapT = THREE.RepeatWrapping;
    textureLaberinto.repeat.set(8,8);

    var materialLaberinto = new THREE.MeshPhongMaterial ({bumpMap: textureLaberinto, color: 0xAFFFA4});
    
    var light1 = new THREE.PointLight( 0xffffff, 1, 500 );
    light1.position.set( 180, 199, 0 );

    var light2 = new THREE.PointLight( 0xffffff, 1, 500 );
    light1.position.set( 0, 199, 0 );

    var geometriaMuroGrande = new THREE.BoxGeometry(250,10,199.9);
    geometriaMuroGrande.translate(0,0,-100);
    geometriaMuroGrande.rotateX(Math.PI / 2);

    var geometriaMuroPequeño = new THREE.BoxGeometry(124.9,10,199.9);
    geometriaMuroPequeño.translate(0,0,-100);
    geometriaMuroPequeño.rotateX(Math.PI / 2);

    var muroGrande1 = new THREE.Mesh (geometriaMuroGrande, materialLaberinto);
    //muroGrande1.rotation.x =  (Math.PI / 2);
    muroGrande1.position.x =  272.5;
    muroGrande1.position.z =  15;

    var muroGrande2 = new THREE.Mesh (geometriaMuroGrande, materialLaberinto);
    //muroGrande1.rotation.x =  (Math.PI / 2);
    muroGrande2.position.x =  75;
    muroGrande2.position.z =  124.5;
    muroGrande2.rotation.y =  (Math.PI / 2);

    var muroGrande3 = new THREE.Mesh (geometriaMuroGrande, materialLaberinto);
    //muroGrande1.rotation.x =  (Math.PI / 2);
    muroGrande3.position.x =  272.5;
    muroGrande3.position.z =  -15;

    var muroGrande4 = new THREE.Mesh (geometriaMuroGrande, materialLaberinto);
    //muroGrande1.rotation.x =  (Math.PI / 2);
    muroGrande4.position.x =  15;
    muroGrande4.position.z =  47.5;
    muroGrande4.rotation.y =  (Math.PI / 2);

    var muroGrande5 = new THREE.Mesh (geometriaMuroGrande, materialLaberinto);
    //muroGrande1.rotation.x =  (Math.PI / 2);
    muroGrande5.position.x =  -150;
    muroGrande5.position.z =  140;

    var muroGrande6 = new THREE.Mesh (geometriaMuroGrande, materialLaberinto);
    muroGrande6.position.x =  -150;
    muroGrande6.position.z =  -124.5;
    muroGrande6.rotation.y =  (Math.PI / 2);

    var muroGrande7 = new THREE.Mesh (geometriaMuroGrande, materialLaberinto);
    muroGrande7.position.x =  -85;
    muroGrande7.position.z =  10;
    muroGrande7.rotation.y =  (Math.PI / 2);

    var muroPequeño1 = new THREE.Mesh (geometriaMuroPequeño, materialLaberinto);
    muroPequeño1.position.z =  72.5;
    muroPequeño1.position.x =  150;
    muroPequeño1.rotation.y =  (Math.PI / 2);
    //this.muroPequeño1.scale.set(1.5,0,0);

    var muroPequeño2 = new THREE.Mesh (geometriaMuroPequeño, materialLaberinto);
    muroPequeño2.position.z =  140;
    muroPequeño2.position.x =  207.5;
    //muroPequeño2.rotation.y =  (Math.PI / 2);
    //muroPequeño1.scale.set(0,0,3);

    var muroPequeño3 = new THREE.Mesh (geometriaMuroPequeño, materialLaberinto);
    muroPequeño3.position.z =  187;
    muroPequeño3.position.x =  337,5;
    muroPequeño3.rotation.y =  (Math.PI / 2);
    //this.muroPequeño1.scale.set(1.5,0,0);

    var muroPequeño4 = new THREE.Mesh (geometriaMuroPequeño, materialLaberinto);
    muroPequeño4.position.z =  -72.5;
    muroPequeño4.position.x =  150;
    muroPequeño4.rotation.y =  (Math.PI / 2);
    //this.muroPequeño1.scale.set(1.5,0,0);

    var muroPequeño5 = new THREE.Mesh (geometriaMuroPequeño, materialLaberinto);
    muroPequeño5.position.z =  -187;
    muroPequeño5.position.x =  212.5;
    muroPequeño5.rotation.y =  (Math.PI / 2);

    var muroPequeño6 = new THREE.Mesh (geometriaMuroPequeño, materialLaberinto);
    muroPequeño6.position.z =  -187;
    muroPequeño6.position.x =  337.5;
    muroPequeño6.rotation.y =  (Math.PI / 2);

    var muroPequeño7 = new THREE.Mesh (geometriaMuroPequeño, materialLaberinto);
    muroPequeño7.position.z =  -72.5;
    muroPequeño7.position.x =  275;
    muroPequeño7.rotation.y =  (Math.PI / 2);

    var muroPequeño8 = new THREE.Mesh (geometriaMuroPequeño, materialLaberinto);
    muroPequeño8.position.z =  -72.5;
    muroPequeño8.position.x =  82.5;

    var muroPequeño9 = new THREE.Mesh (geometriaMuroPequeño, materialLaberinto);
    muroPequeño9.position.z =  15;
    muroPequeño9.position.x =  -335;

    var muroPequeño10 = new THREE.Mesh (geometriaMuroPequeño, materialLaberinto);
    muroPequeño10.position.z =  72.5;
    muroPequeño10.position.x =  -270;
    muroPequeño10.rotation.y =  (Math.PI / 2);

    var muroPequeño11 = new THREE.Mesh (geometriaMuroPequeño, materialLaberinto);
    muroPequeño11.position.z =  -52.5;
    muroPequeño11.position.x =  -332.5;
    muroPequeño11.rotation.y =  (Math.PI / 2);

    var muroPequeño12 = new THREE.Mesh (geometriaMuroPequeño, materialLaberinto);
    muroPequeño12.position.z =  -85;
    muroPequeño12.position.x =  -265;

    var muroPequeño13 = new THREE.Mesh (geometriaMuroPequeño, materialLaberinto);
    muroPequeño13.position.z =  -177.5;
    muroPequeño13.position.x =  -212;

    this.laberinto = new THREE.Object3D();

    this.laberinto.add(muroGrande1);
    this.laberinto.add(muroGrande2);
    this.laberinto.add(muroGrande3);
    this.laberinto.add(muroGrande4);
    this.laberinto.add(muroGrande5);
    this.laberinto.add(muroGrande6);
    this.laberinto.add(muroGrande7);

    this.laberinto.add(muroPequeño1);
    this.laberinto.add(muroPequeño2);
    this.laberinto.add(muroPequeño3);
    this.laberinto.add(muroPequeño4);
    this.laberinto.add(muroPequeño5);
    this.laberinto.add(muroPequeño6);
    this.laberinto.add(muroPequeño7);
    this.laberinto.add(muroPequeño8);
    this.laberinto.add(muroPequeño9);
    this.laberinto.add(muroPequeño10);
    this.laberinto.add(muroPequeño11);
    this.laberinto.add(muroPequeño12);
    this.laberinto.add(muroPequeño13);

    this.add(light1);
    this.add(light2);
    this.add(this.laberinto);
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

export { Laberinto };