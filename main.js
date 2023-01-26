// heavily influenced by TraversyMedia
// https://www.youtube.com/watch?v=8jP4xpga6yY

let scene, camera, renderer, cube;

function init() {
  scene = new THREE.Scene();
  // camera takes FOV, aspect ratio, near cull, far cull)
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );

  // multiple renderers are available.  WebGL uses GPU when possible
  // anti-aliasing looks good but costs performance

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // add results of renderer as an HTML DOM object
  document.body.appendChild(renderer.domElement);

  // create or load in geometries - geometry is a meshInstance or mesh in other languages
  var geometry = new THREE.BoxGeometry(1, 1, 1);

  // load an image texture
  var texture = new THREE.TextureLoader().load("crate.jpg");
  // note that loading textures on file system will trigger CORS error
  // run from a local web server.

  // a number of basic materials are available Phong, Lambert, and Basic built in
  // each takes a number of parameters
  // material is basically a fragment shader

  var matBasic = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  var matPhong = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  var matTexture = new THREE.MeshBasicMaterial({ map: texture });
  var matTextureColor = new THREE.MeshBasicMaterial({
    map: texture,
    color: 0x00cc00,
  });

  // what THREE calls a mesh we would normally call an object
  cube = new THREE.Mesh(geometry, matTextureColor);

  // add object to screen
  scene.add(cube);

  // for any but basic material, lights are necessary
  scene.add(new THREE.DirectionalLight(0xffffff, 0.125));
  scene.add(new THREE.AmbientLight(0x666666));

  // move camera away from object or you'll see a black screen
  camera.position.z = 5;
} // end init

function update() {
  // call at up to 60 fps
  requestAnimationFrame(update);

  // input or animation code can go here
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // render the current scene
  renderer.render(scene, camera);
} // end update

init();
update();
