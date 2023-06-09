
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { PointerLockControls } from '../libs/PointerLockControls.js'

// Clases de mi proyecto

import { Llave } from './llave.js'
import { ParedCentral } from './paredCentral.js'
import { BolaDemolicion } from './bolaDemolicion.js'
import { Laberinto } from './laberinto.js'
import { Mesa } from './mesa.js'
import { Silla } from './silla.js'
import { Estanteria } from './estanteria.js'
import { Cama } from './cama.js'
import { Planta } from './planta.js'
import { Lampara } from './lampara.js'
import { Puerta } from './puerta.js'
import { LamparaPuzzle } from './lamparaPuzzle.js'
import { Valla } from './valla.js'


 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  // Recibe el  div  que se ha creado en el  html  que va a ser el lienzo en el que mostrar
  // la visualización de la escena
  constructor (myCanvas) { 
    super();

    this.avanzar = false;
    this.retroceder = false;
    this.izquierda = false;
    this.derecha = false;
    this.bloquear = false;
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se crea la interfaz gráfica de usuario
    this.gui = this.createGUI ();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();

    this.controls = this.createControls();

    // PICKING
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = 150;

    // COLLISION
    this.colision = new THREE.Raycaster();
    this.colision.far = 15;
    this.posicion = new THREE.Vector3();
    this.direccion = new THREE.Vector3();
    this.impactados = null;

    // La habitación 
    this.createRoom ();  
    
    /*
      ULTIMA SALA
    */
    this.bolaDemolicion1 = new BolaDemolicion(this.gui, "");
    this.add (this.bolaDemolicion1);

    this.bolaDemolicion1.position.set(-450, 199.9, 119);

    this.bolaDemolicion2 = new BolaDemolicion(this.gui, "");
    this.add (this.bolaDemolicion2);

    this.bolaDemolicion2.position.set(-650, 199.9, 0);

    this.bolaDemolicion3 = new BolaDemolicion(this.gui, "");
    this.add (this.bolaDemolicion3);

    this.bolaDemolicion3.position.set(-850, 199.9, -119);

    
    /*Primera linea de vallas */
    this.valla1_1 = new Valla(this.gui, "");
    this.valla1_1.position.set(-420,0,-218);
    this.add(this.valla1_1);
    this.valla1_2 = new Valla(this.gui, "");
    this.valla1_2.position.set(-420,0,-150);
    this.add(this.valla1_2);
    this.valla1_3 = new Valla(this.gui, "");
    this.valla1_3.position.set(-420,0,-82);
    this.add(this.valla1_3);
    this.valla1_4 = new Valla(this.gui, "");
    this.valla1_4.position.set(-420,0,-14);
    this.add(this.valla1_4);
    this.valla1_5 = new Valla(this.gui, "");
    this.valla1_5.position.set(-420,0,54);
    this.add(this.valla1_5);
    this.valla1_6 = new Valla(this.gui, "");
    this.valla1_6.position.set(-420,0,218);
    this.add(this.valla1_6);

    /*Segunda linea de vallas */
    this.valla2_1 = new Valla(this.gui, "");
    this.valla2_1.position.set(-620,0,-218);
    this.add(this.valla2_1);
    this.valla2_2 = new Valla(this.gui, "");
    this.valla2_2.position.set(-620,0,-150);
    this.add(this.valla2_2);
    this.valla2_3 = new Valla(this.gui, "");
    this.valla2_3.position.set(-620,0,-82);
    this.add(this.valla2_3);
    this.valla2_4 = new Valla(this.gui, "");
    this.valla2_4.position.set(-620,0,82);
    this.add(this.valla2_4);
    this.valla2_5 = new Valla(this.gui, "");
    this.valla2_5.position.set(-620,0,150);
    this.add(this.valla2_5);
    this.valla2_6 = new Valla(this.gui, "");
    this.valla2_6.position.set(-620,0,218);
    this.add(this.valla2_6);

     /*Tercera linea de vallas */
     this.valla3_1 = new Valla(this.gui, "");
     this.valla3_1.position.set(-820,0,-218);
     this.add(this.valla3_1);
     this.valla3_2 = new Valla(this.gui, "");
     this.valla3_2.position.set(-820,0,-54);
     this.add(this.valla3_2);
     this.valla3_3 = new Valla(this.gui, "");
     this.valla3_3.position.set(-820,0,14);
     this.add(this.valla3_3);
     this.valla3_4 = new Valla(this.gui, "");
     this.valla3_4.position.set(-820,0,82);
     this.add(this.valla3_4);
     this.valla3_5 = new Valla(this.gui, "");
     this.valla3_5.position.set(-820,0,150);
     this.add(this.valla3_5);
     this.valla3_6 = new Valla(this.gui, "");
     this.valla3_6.position.set(-820,0,218);
     this.add(this.valla3_6);

    /*
      PRIMERA SALA: LABERINTO
    */
    this.laberinto = new Laberinto(this.gui, "");
    this.laberinto.position.set(400,0,0);
    this.add (this.laberinto);

     /*
      SALA INICIAL
    */
    this.mesa = new Mesa(this.gui, "");
    this.mesa.position.set(975,0,50);
    this.mesa.rotation.y = (Math.PI / 2);
    this.mesa.scale.set(2,2,2);
    this.add (this.mesa);

    this.silla = new Silla(this.gui, "");
    this.silla.position.set(975,0,50);
    this.silla.rotation.y = (Math.PI / 2);
    this.silla.scale.set(2,2,2);
    this.add (this.silla);

    this.estanteria = new Estanteria(this.gui, "");
    this.estanteria.position.set(745,0,50);
    this.estanteria.rotation.y = (Math.PI / 2);
    //this.estanteria.scale.set(2.5,2.5,2.5);
    this.add (this.estanteria);

    this.cama = new Cama(this.gui, "");
    this.cama.position.set(980,0,120);
    this.cama.rotation.y = (Math.PI);
    this.cama.scale.set(2,2,2);
    this.add (this.cama);

    this.planta = new Planta(this.gui, "");
    this.planta.position.set(980,0,80);
    //this.planta.rotation.y = (Math.PI);
    this.planta.scale.set(2,2,2);
    this.add (this.planta);

    this.lampara = new Lampara(this.gui, "");
    this.lampara.position.set(985,13.75,60);
    this.lampara.rotation.y = (-Math.PI/2);
    //this.lampara.scale.set(2,2,2);
    this.add (this.lampara);

    var geometriaCartel = new THREE.BoxGeometry (70,0.2,50);
    var textureCartel1 = new THREE.TextureLoader().load('./imgs/cartel1.jpg');
    var materialCartel1 = new THREE.MeshPhongMaterial ({map: textureCartel1});
    this.cartel1 = new THREE.Mesh (geometriaCartel, materialCartel1);
    this.cartel1.position.set(803,70,0);
    this.cartel1.rotation.x = (3*Math.PI/2);
    this.cartel1.rotation.z = (Math.PI/2);

    //cartel1.position.y = 30;
    //cartel1.position.z = 30;

    this.add(this.cartel1);

    /*
      SEGUNDA SALA
    */

    this.lampPuzzle = new LamparaPuzzle(this);
    this.lampPuzzle.position.set(-150, 0, 80);
    this.add(this.lampPuzzle);

    this.lampPuzzle2 = new LamparaPuzzle(this);
    this.lampPuzzle2.position.set(-150, 0, 0);
    this.add(this.lampPuzzle2);

    this.lampPuzzle3 = new LamparaPuzzle(this);
    this.lampPuzzle3.position.set(-150, 0, -80);
    this.add(this.lampPuzzle3);

    this.puertaPuzzle = new Puerta(this);
    this.puertaPuzzle.position.set(-300, 0, 0);
    this.add(this.puertaPuzzle);
    this.puertaPuzzle.setEsAutomatica(true);

    var textureCartel2 = new THREE.TextureLoader().load('./imgs/cartel2.jpg');
    var materialCartel2 = new THREE.MeshPhongMaterial ({map: textureCartel2});
    this.cartel2 = new THREE.Mesh (geometriaCartel, materialCartel2);
    this.cartel2.position.set(-297,120,0);
    this.cartel2.rotation.x = (3*Math.PI/2);
    this.cartel2.rotation.z = (Math.PI/2);
    this.add(this.cartel2);

    var textureCartelAdivinanza1 = new THREE.TextureLoader().load('./imgs/adivinanza1.jpg');
    var materialCarteldivinanza1 = new THREE.MeshPhongMaterial ({map: textureCartelAdivinanza1});
    this.cartelAdivinanza1 = new THREE.Mesh (geometriaCartel, materialCarteldivinanza1);
    this.cartelAdivinanza1.position.set(-297,60,80);
    this.cartelAdivinanza1.rotation.x = (3*Math.PI/2);
    this.cartelAdivinanza1.rotation.z = (Math.PI/2);
    this.add(this.cartelAdivinanza1);
    
    var textureCartelAdivinanza2 = new THREE.TextureLoader().load('./imgs/adivinanza2.jpg');
    var materialCarteldivinanza2 = new THREE.MeshPhongMaterial ({map: textureCartelAdivinanza2});
    this.cartelAdivinanza2 = new THREE.Mesh (geometriaCartel, materialCarteldivinanza2);
    this.cartelAdivinanza2.position.set(-297,60,0);
    this.cartelAdivinanza2.rotation.x = (3*Math.PI/2);
    this.cartelAdivinanza2.rotation.z = (Math.PI/2);
    this.add(this.cartelAdivinanza2);

    var textureCartelAdivinanza3 = new THREE.TextureLoader().load('./imgs/adivinanza3.jpg');
    var materialCarteldivinanza3 = new THREE.MeshPhongMaterial ({map: textureCartelAdivinanza3});
    this.cartelAdivinanza3 = new THREE.Mesh (geometriaCartel, materialCarteldivinanza3);
    this.cartelAdivinanza3.position.set(-297,60,-80);
    this.cartelAdivinanza3.rotation.x = (3*Math.PI/2);
    this.cartelAdivinanza3.rotation.z = (Math.PI/2);
    this.add(this.cartelAdivinanza3);

    /*
      Cartel de la ultima sala
    */
    var textureCartel3 = new THREE.TextureLoader().load('./imgs/cartel3.jpg');
    var materialCartel3 = new THREE.MeshPhongMaterial ({map: textureCartel3});
    this.cartel3 = new THREE.Mesh (geometriaCartel, materialCartel3);
    this.cartel3.position.set(-417,27,0);
    this.cartel3.rotation.x = (3*Math.PI/2);
    this.cartel3.rotation.z = (Math.PI/2);
    this.add(this.cartel3);

     /*
      Cartel final
    */
    var textureCartelFinal = new THREE.TextureLoader().load('./imgs/cartelFinal.jpg');
    var materialCartelFinal = new THREE.MeshPhongMaterial ({map: textureCartelFinal});
    this.cartelFinal = new THREE.Mesh (geometriaCartel, materialCartelFinal);
    this.cartelFinal.position.set(-1200,27,0);
    this.cartelFinal.rotation.x = (3*Math.PI/2);
    this.cartelFinal.rotation.z = (Math.PI/2);
    this.cartelFinal.scale.set(3,3,3);
    this.add(this.cartelFinal);

    /*
      LLAVE
    */

    this.llave = new Llave(this.gui, "");
    this.add (this.llave);

    this.llave.position.set(-950, 3, 0);

    this.reloj = new THREE.Clock();


    // Objetos pickables
    this.pickables = [this.puerta, this.llave, this.lampPuzzle, this.lampPuzzle2, this.lampPuzzle3];

  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión vértical en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    //this.camera.position.set (-900, 18, 0);
    this.camera.position.set (950, 18, 100);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,18,0);
    this.camera.lookAt(look);
    
  }

  // Métodos de manejo de eventos de teclado
  onKeyDown = function (event) {
  switch (event.code) {
      case 'KeyW':
          this.avanzar = true;
          break;
      case 'KeyA':
          this.izquierda = true;
          break;
      case 'KeyS':
          this.retroceder = true;
          break;
      case 'KeyD':
          this.derecha = true;
          break;
  }
}

onKeyUp = function (event) {
  switch (event.code) {
      case 'KeyW':
          this.avanzar = false;
          break;
      case 'KeyA':
          this.izquierda = false;
          break;
      case 'KeyS':
          this.retroceder = false;
          break;
      case 'KeyD':
          this.derecha = false;
          break;
  }
}

onKeyPress = function (event) {
  switch (event.code) {
      case 'KeyE':
        if(this.bloquear){
          this.controls.unlock();
          this.bloquear = false;
        }
        else{
          this.controls.lock();
          this.bloquear = true;
        }
        break;
  }
}

  /*onMouseDown(event){
    if (event.button === 0 || event.button === 2) {
      event.preventDefault();
    }
  }*/
  
  createRoom () {

    let largoHabitacion = 2000;
    let anchoHabitacion = 500;
    let altoHabitacion = 200;

    // Material
    var textureBit = new THREE.TextureLoader().load('./imgs/placaBase.jpg');
    textureBit.wrapS = THREE.RepeatWrapping;
    textureBit.wrapT = THREE.RepeatWrapping;
    textureBit.repeat.set(32,6);

    var textureBit2 = new THREE.TextureLoader().load('./imgs/placaBase.jpg');
    textureBit2.wrapS = THREE.RepeatWrapping;
    textureBit2.wrapT = THREE.RepeatWrapping;
    textureBit2.repeat.set(6,6);


    //var texture = new THREE.TextureLoader().load('./imgs/wood.jpg');
    var textureSuelo = new THREE.TextureLoader().load('./imgs/suelo.jpg');
    textureSuelo.wrapS = THREE.RepeatWrapping;
    textureSuelo.wrapT = THREE.RepeatWrapping;
    textureSuelo.repeat.set(32,8);

    var materialBit = new THREE.MeshPhongMaterial ({map: textureBit});
    var materialBit2 = new THREE.MeshPhongMaterial ({map: textureBit2});
    var materialSuelo = new THREE.MeshPhongMaterial ({map: textureSuelo});
    //var materialGround = new THREE.MeshPhongMaterial ({map: texture});
    
    //CREAR EXTERIOR (CAJA) DE LA HABITACIÓN
    // Geometria del suelo y el techo
    var geometryGroundRoof = new THREE.BoxGeometry (largoHabitacion,0.2,anchoHabitacion);

    // Geometria de las paredes de los lados
    var geometrySideWall = new THREE.BoxGeometry (largoHabitacion,0.2,altoHabitacion);

    //Geometria de las paredes frontales
    var geometryFrontWall = new THREE.BoxGeometry (altoHabitacion,0.2,anchoHabitacion);
    
    // Mesh
    var ground = new THREE.Mesh (geometryGroundRoof, materialSuelo);
    var roof = new THREE.Mesh (geometryGroundRoof, materialBit);

    var wall1 = new THREE.Mesh (geometrySideWall, materialBit);
    var wall2 = new THREE.Mesh (geometrySideWall, materialBit);

    var wall3 = new THREE.Mesh (geometryFrontWall, materialBit2);

    // Colocar las paredes, suelo y techo donde correspone
    roof.position.y = altoHabitacion;

    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -0.1;

    wall1.rotation.x = Math.PI/2;
    wall1.position.y = altoHabitacion/2;
    wall1.position.z = anchoHabitacion/2;

    wall2.rotation.x = Math.PI/2;
    wall2.position.y = altoHabitacion/2;
    wall2.position.z = -anchoHabitacion/2;

    wall3.rotation.z = Math.PI/2;
    wall3.position.y = altoHabitacion/2;
    wall3.position.x = largoHabitacion/2;
    
    // Añadir a la escena
    this.add (ground);
    this.add(wall1);
    this.add(wall2);
    this.add(wall3);
    this.add(roof);

    // Hueco puerta paredes interiores
    this.central1 = new ParedCentral(this.gui, "");
    this.central2 = new ParedCentral(this.gui, "");
    this.central3 = new ParedCentral(this.gui, "");

    this.central1.position.x = 800;
    this.central3.position.x = -300;

    // ultima pared de la habitacion
    var final = new ParedCentral(this.gui, "");
    final.position.x = -largoHabitacion/2;

    // la ultima pared tiene una puerta
    this.puerta = new Puerta(this.gui, "");
    this.puerta.position.x = -largoHabitacion/2;

    this.add(this.central1);
    this.add(this.central2);
    this.add(this.central3);
    this.add(final);
    this.add(this.puerta);

  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = {
      // En el contexto de una función   this   alude a la función
      lightIntensity : 0.5,
      axisOnOff : false
    }
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }
  
  setLightIntensity (valor) {
    this.spotLight.intensity = valor;
  }
  
  setAxisVisible (valor) {
    this.axis.visible = valor;
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }

  createControls () {
    var controls;
    controls = new PointerLockControls( this.camera, this.renderer.domElement );
    return controls;
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
    
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  onDocumentMouseDown(event) {

    // Obtener posicion del click en coordenadas normalizadas
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = 1- 2 * (event.clientY / window.innerHeight);

    // Rayo de la camara que pasa por donde se hizo click
    this.raycaster.setFromCamera(this.mouse, this.camera);

    var pickedObjects = this.raycaster.intersectObjects(this.pickables, true);

    if (pickedObjects.length > 0) {
        var selectedObject = pickedObjects[0].object;
        console.log("picked object");
        if(selectedObject.userData){ 
          selectedObject.userData.recibeClic(selectedObject);

          if(selectedObject.userData == this.llave){
            this.puerta.setSePuedeAbrir(true);
          }
        }
      }

}

testColision(dondeEstoy, aDondeMiro){
  this.colision.set(dondeEstoy, aDondeMiro);

  this.impactados = this.colision.intersectObjects(this.children, true);

  var distanciaMasCercano = null;
  if (this.impactados.length > 0) {
    distanciaMasCercano = this.impactados[0].distance;
    if(distanciaMasCercano < 10){
      console.log("estas mu cerca");
      return true;
    }
  }
  return false;
}

  update () {
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());


    var eje = new THREE.Vector3(0,1,0);
    if(this.avanzar) {
      this.posicion.copy(this.camera.position);
      this.controls.getDirection(this.direccion);

      this.direccion.y = 0;
      this.direccion.normalize();
      if (!this.testColision(this.posicion, this.direccion))
        this.controls.moveForward(1.5) ;
    }
    if(this.retroceder) {
      this.posicion.copy(this.camera.position);
      this.controls.getDirection(this.direccion);

      this.direccion.y = 0;
      this.direccion.applyAxisAngle(eje, Math.PI);
      this.direccion.normalize();
      if (!this.testColision(this.posicion, this.direccion))
        this.controls.moveForward(-1.5) ;
    }
    if(this.derecha) {
      this.posicion.copy(this.camera.position);
      this.controls.getDirection(this.direccion);

      this.direccion.y = 1;
      this.direccion.applyAxisAngle(eje, -Math.PI/2);
      this.direccion.normalize();
      if (!this.testColision(this.posicion, this.direccion))
        this.controls.moveRight(1.5) ;
    }
    if(this.izquierda) {
      this.posicion.copy(this.camera.position);
      this.controls.getDirection(this.direccion);

      this.direccion.y = 1;
      this.direccion.applyAxisAngle(eje, Math.PI/2);
      this.direccion.normalize();
      if (!this.testColision(this.posicion, this.direccion))
        this.controls.moveRight(-1.5) ;
    }

    if(this.lampPuzzle.getColorLuz() == "verde" && this.lampPuzzle2.getColorLuz() == "rosa" && this.lampPuzzle3.getColorLuz() == "verde"){
      this.puertaPuzzle.recibeClic("");
    }
    
    // Se actualiza el resto del modelo
    this.llave.update();
    this.bolaDemolicion1.update();
    this.bolaDemolicion2.update();
    this.bolaDemolicion3.update();

    // COLISION CON BOLAS
    var bola1Pos = new THREE.Vector3();
    bola1Pos = this.bolaDemolicion1.getBolaPosition();
    bola1Pos.y = 18;

    var bola3Pos = new THREE.Vector3();
    bola3Pos = this.bolaDemolicion3.getBolaPosition();
    bola3Pos.y = 18;

    var bola2Pos = new THREE.Vector3();
    bola2Pos = this.bolaDemolicion2.getBolaPosition();
    bola2Pos.y = 18;

    if(this.camera.position.distanceTo(bola1Pos) < 20 || this.camera.position.distanceTo(bola2Pos) < 20 || this.camera.position.distanceTo(bola3Pos) < 20 ){
      console.log("pum muerto");
      this.camera.position.set (-300, 18, 0);
    }


    
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }
}


/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());

  // CONTROLES DE TECLADO
  window.addEventListener('keydown', (event) => scene.onKeyDown(event));
  window.addEventListener('keyup', (event) => scene.onKeyUp(event));
  window.addEventListener('keypress', (event) => scene.onKeyPress(event));

  // PICKING
  window.addEventListener('click', (event) => scene.onDocumentMouseDown(event));

  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
