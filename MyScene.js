
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { CSG } from '../libs/CSG-v2.js'
import { PointerLockControls } from '../libs/PointerLockControls.js'
import * as KeyCode from '../libs/keycode.esm.js'

// Clases de mi proyecto

import { Llave } from './llave.js'
import { ParedCentral } from './paredCentral.js'
import { Estanteria } from './estanteria.js'
 
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

    this.keys = { W: false, A: false, S: false, D: false };
    this.controls = this.createControls();

    // La habitación 
    this.createRoom ();
    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);
    
    
    // Por último creamos el modelo.
    // El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a 
    // la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.
    this.model = new Estanteria(this.gui, "Nada");
    this.add (this.model);
    
    
    this.model = new Llave(this.gui, "Nada");
    this.add (this.model);
    

    this.reloj = new THREE.Clock();

  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión vértical en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (900, 18, 0);
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
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialGround = new THREE.MeshPhongMaterial ({map: texture});
    
    //CREAR EXTERIOR (CAJA) DE LA HABITACIÓN
    // Geometria del suelo y el techo
    var geometryGroundRoof = new THREE.BoxGeometry (largoHabitacion,0.2,anchoHabitacion);

    // Geometria de las paredes de los lados
    var geometrySideWall = new THREE.BoxGeometry (largoHabitacion,0.2,altoHabitacion);

    //Geometria de las paredes frontales
    var geometryFrontWall = new THREE.BoxGeometry (altoHabitacion,0.2,anchoHabitacion);
    
    // Mesh
    var ground = new THREE.Mesh (geometryGroundRoof, materialGround);
    var roof = new THREE.Mesh (geometryGroundRoof, materialGround);

    var wall1 = new THREE.Mesh (geometrySideWall, materialGround);
    var wall2 = new THREE.Mesh (geometrySideWall, materialGround);

    var wall3 = new THREE.Mesh (geometryFrontWall, materialGround);
    var wall4 = new THREE.Mesh (geometryFrontWall, materialGround);

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

    wall4.rotation.z = Math.PI/2;
    wall4.position.y = altoHabitacion/2;
    wall4.position.x = -largoHabitacion/2;
    
    // Añadir a la escena
    this.add (ground);
    this.add(wall1);
    this.add(wall2);
    this.add(wall3);
    this.add(wall4);
    this.add(roof);

    //CREAR PAREDES CENTRALES HABITACIÓN
    var wallInt1 = new THREE.Mesh (geometryFrontWall, materialGround);
    var wallInt2 = new THREE.Mesh (geometryFrontWall, materialGround);
    var wallInt3 = new THREE.Mesh (geometryFrontWall, materialGround);

    // Hueco puerta paredes interiores
    this.central1 = new ParedCentral(this.gui, "");
    this.central2 = new ParedCentral(this.gui, "");
    this.central3 = new ParedCentral(this.gui, "");

    this.central1.position.x = 800;
    this.central3.position.x = -300;

    this.add(this.central1);
    this.add(this.central2);
    this.add(this.central3);

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
      axisOnOff : true
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

    this.controls.handleResize();
  }

  update () {
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());


    if(this.avanzar) {
      this.controls.moveForward(1.5) ;
    }
    if(this.retroceder) {
      this.controls.moveForward(-1.5) ;
    }
    if(this.derecha) {
      this.controls.moveRight(1.5) ;
    }
    if(this.izquierda) {
      this.controls.moveRight(-1.5) ;
    }
    
    // Se actualiza el resto del modelo
    this.model.update();
    
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

  window.addEventListener('keydown', (event) => scene.onKeyDown(event));
  window.addEventListener('keyup', (event) => scene.onKeyUp(event));
  window.addEventListener('keypress', (event) => scene.onKeyPress(event));
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
