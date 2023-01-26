// heavily influenced by TraversyMedia
// https://www.youtube.com/watch?v=8jP4xpga6yY

let scene, camera, renderer, football, thrown, x_vel;

function init() {
  scene = new THREE.Scene();
  // camera takes FOV, aspect ratio, near cull, far cull)
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );

  // initialize thrown and x_vel
  thrown = false;
  x_vel = 0;

  // multiple renderers are available.  WebGL uses GPU when possible
  // anti-aliasing looks good but costs performance

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // add results of renderer as an HTML DOM object
  document.body.appendChild(renderer.domElement);

  // load an image texture
  // var texture = new THREE.TextureLoader().load("crate.jpg");
  // note that loading textures on file system will trigger CORS error
  // run from a local web server.

  // a number of basic materials are available Phong, Lambert, and Basic built in
  // each takes a number of parameters
  // material is basically a fragment shader

  // load an image texture
  var texture = new THREE.TextureLoader().load("football.jpg");
  var matTexture = new THREE.MeshPhongMaterial({ map: texture });
  var sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  // matTexture.offset.set(1, 1);
  var sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
  football = new THREE.Mesh(sphereGeometry, matTexture);

  // Scale the sphere to resemble a football
  football.scale.x = 0.9;
  football.scale.y = 0.9;
  football.scale.z = 1.5;

  // Position and rotate the football
  football.position.set(0, 0, 10);
  football.rotation.set(0, 0, 0);

  // Add the football to the scene
  scene.add(football);

  // for any but basic material, lights are necessary
  scene.add(new THREE.DirectionalLight(0xffffff, 0.125));
  scene.add(new THREE.AmbientLight(0x666666));

  // move camera away from object or you'll see a black screen
  camera.position.z = 20;

  // Add listener for keyboard
  document.body.addEventListener("keydown", keyPressed, false);
} // end init

function update() {
  // call at up to 60 fps
  requestAnimationFrame(update);
  // input or animation code can go here
  if (thrown) {
    if (football.position.z <= -25) {
      // Position and rotate the football
      football.position.set(0, 0, 10);
      football.rotation.set(0, 0, 0);
      thrown = false;
      x_vel = 0;
    } else {
      football.rotation.z += 0.08;
      football.position.x += x_vel;
      football.position.z -= 0.1;
    }
  }

  // render the current scene
  renderer.render(scene, camera);
} // end update

function keyPressed(e) {
  if (!thrown) {
    switch (e.key) {
      case "ArrowUp":
        thrown = true;
        break;
      case "ArrowLeft":
        x_vel -= 0.01;
        football.rotateY(0.1);
        break;
      case "ArrowRight":
        x_vel += 0.01;
        football.rotateY(-0.1);
        break;
    }
  }
  e.preventDefault();
  render();
}

init();
update();
