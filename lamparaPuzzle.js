import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js';
import * as TWEEN from '../libs/tween.esm.js'

 
class LamparaPuzzle extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // instantiate a loader
    const objLoader = new OBJLoader();

    // load a resource
    objLoader.load( './models/lampara.obj',
    ( object ) => {
      object.position.y = 18;
      this.add( object );

    }, null, null);

    this.light = new THREE.PointLight( 0xff0000, 1, 100 );
    this.light.position.set( 0, 50, 0 );
    this.add(this.light);

    this.colorLuz = "rojo";

    var mat = new THREE.MeshPhongMaterial({color: 0x804000});
    var matBoton = new THREE.MeshPhongMaterial({color: "red"});


    var soporteBotonGeo = new THREE.BoxGeometry ( 4, 12, 4);
    var soporteBoton = new THREE.Mesh(soporteBotonGeo, mat);
    
    soporteBoton.position.y = 6;
    soporteBoton.position.x = 20;

    var cableGeo = new THREE.CylinderGeometry(0.5, 0.5, 14, 20);
    var cable = new THREE.Mesh(cableGeo, mat);

    cable.rotation.z = Math.PI/2;
    cable.position.y = 0.5;
    cable.position.x = 12;

    var botonGeo = new THREE.CylinderGeometry(1.5, 1.5, 1, 20);
    var boton = new THREE.Mesh(botonGeo, matBoton);

    boton.position.y = 12.5;
    boton.position.x = 20;

    var origen = { t:12.5};
    var fin = {t:11.8};
    var origen2 = {t:11.8};
    var fin2 = {t: 12.5};
    var tiempoDeRecorrido = 500;

    this.animacion1 = new TWEEN.Tween (origen).to (fin, tiempoDeRecorrido)
    .onUpdate(() => {
      boton.position.y = origen.t;
    }).onComplete(() => {this.animacion2.start()});

    // animacion de cerrar puerta
    // el pomo rota como si se estuviese girando con la mano para cerrar
    this.animacion2 = new TWEEN.Tween (origen2).to (fin2, tiempoDeRecorrido)
    .onUpdate(() => {
      boton.position.y = origen2.t;
    });

    boton.userData = this;

    this.add(boton);
    this.add(cable);
    this.add(soporteBoton);
  }
  
  createGUI (gui,titleGui) {

  }

  recibeClic(meshConcreto) { // si se clicó el pomo si está cerrada se abre y viceversa
      this.animacion1.start();

      if(this.colorLuz == "rojo"){
        this.light.color.setHex( 0x00ff00 );
        this.colorLuz = "verde";
      }else if(this.colorLuz == "verde"){
        this.light.color.setHex( 0xff00ff );
        this.colorLuz = "rosa";
      } else{
        this.light.color.setHex( 0xff0000 );
        this.colorLuz = "rojo";
      }

  }

  getColorLuz(){
    return this.colorLuz;
  }
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    TWEEN.update();

    

    //this.box.rotart += 0.1;
  }
}

export { LamparaPuzzle };
