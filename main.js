// initialize variables
let scene,
  camera,
  renderer,
  football,
  thrown,
  x_vel,
  text,
  game,
  target,
  throwtext;

// init that gets called when webpage loads
function init() {
  // start with game 1
  game = 1;
  scene = new THREE.Scene();
  // camera takes FOV, aspect ratio, near cull, far cull)
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );

  // im not a big fan of this
  // scene.background = new THREE.CubeTextureLoader()
  //   .setPath("textures/HeartInTheSand/")
  //   .load([
  //     "posx.jpg",
  //     "negx.jpg",
  //     "posy.jpg",
  //     "negy.jpg",
  //     "posz.jpg",
  //     "negz.jpg",
  //   ]);

  // initialize thrown and x_vel
  thrown = false;
  x_vel = 0;

  // initialize renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // add results of renderer as an HTML DOM object
  document.body.appendChild(renderer.domElement);

  // load an image texture
  let footballtexture = new THREE.TextureLoader().load("football.jpg");
  let matTexture = new THREE.MeshPhongMaterial({ map: footballtexture });
  let sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  football = new THREE.Mesh(sphereGeometry, matTexture);

  // Scale the sphere to resemble a football
  football.scale.x = 0.9;
  football.scale.y = 0.9;
  football.scale.z = 1.5;

  // Position and rotate the football
  football.position.set(0, 0, 11);
  football.rotation.set(0, 0, 0);

  // Add the football to the scene
  scene.add(football);

  // create directional light that points at the footvall
  let light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(
    football.position.x,
    football.position.y,
    football.position.z
  );
  scene.add(light);

  // move camera back
  camera.position.z = 20;

  // the plane will be the field image in the background
  // create the plane geometry
  let planeGeometry = new THREE.PlaneGeometry(120, 120);

  // create the plane material
  let planeMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("textures/field.png"),
    side: THREE.DoubleSide,
  });

  // create the plane mesh
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // add the plane to the scene
  scene.add(plane);
  plane.position.set(0, 0, -30);

  // create the player
  let playertexture = new THREE.TextureLoader().load("textures/player.png");
  let targetGeometry = new THREE.PlaneGeometry(2, 2);
  let targetMaterial = new THREE.MeshLambertMaterial({
    map: playertexture,
  });
  target = new THREE.Mesh(targetGeometry, targetMaterial);
  // set to random x position
  target.position.set(Math.random() * 50 - 25, 0, -25);
  scene.add(target);

  // create font loader
  let loader = new THREE.FontLoader();

  // create text for the WR mode
  loader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    function (font) {
      let textGeometry = new THREE.TextGeometry("Nice catch!", {
        font: font,
        size: 0.5,
        height: 0.01,
      });
      let textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      text = new THREE.Mesh(textGeometry, textMaterial);
      text.rotation.set(0, 0, 0);
      text.visible = false;
      scene.add(text);
    }
  );

  // create text for the QB mode
  loader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    function (font) {
      let textGeometry = new THREE.TextGeometry("Nice throw!", {
        font: font,
        size: 0.5,
        height: 0.01,
      });
      let textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      throwtext = new THREE.Mesh(textGeometry, textMaterial);
      throwtext.position.set(0, 5, 0);
      throwtext.rotation.set(0, 0, 0);
      throwtext.visible = false;
      scene.add(throwtext);
    }
  );

  // Add listener for keyboard
  document.body.addEventListener("keydown", keyPressed, false);
} // end init

// init method for game 1
function init1() {
  // set game to 1
  game = 1;
  // initialize thrown and x_vel
  thrown = false;
  x_vel = 0;

  // position and rotate the football
  football.position.set(0, 0, 11);
  football.rotation.set(0, 0, 0);

  // move camera away from object or you'll see a black screen
  camera.position.x = 0;
  camera.position.z = 20;

  // make target visible
  target.visible = true;
} // end init1

// init method for game 2
function init2() {
  // set game to 2
  game = 2;

  // initialize thrown and x_vel
  thrown = false;
  x_vel = Math.random() * 0.14 - 0.07;

  // position and rotate the football
  football.position.set(0, 0, -50);
  football.rotation.set(0, 0, 0);

  // move camera away from object or you'll see a black screen
  camera.position.z = 20;

  // make target not visible
  target.visible = false;
} // end init2

function update() {
  // call at up to 60 fps
  requestAnimationFrame(update);
  // input or animation code can go here

  // if its game 1
  if (game == 1) {
    if (thrown) {
      // check if football has gone far enough
      if (football.position.z <= -25) {
        // check if football and target are close
        // make text visible for 1 second if they are
        let distance = target.position.x - football.position.x;
        if (distance < 2 && distance > -2) {
          throwtext.visible = true;
          setTimeout(function () {
            throwtext.visible = false;
          }, 1000);
        }

        // position and rotate the football
        football.position.set(0, 0, 11);
        football.rotation.set(0, 0, 0);
        // reset thrown and x_vel
        thrown = false;
        x_vel = 0;
        // set target to random position
        target.position.set(Math.random() * 50 - 25, 0, -25);
      } else {
        // move and spin football if its not too far
        football.rotation.z += 0.15;
        football.position.x += x_vel;
        football.position.z -= 0.25;
      }
    }
  } else {
    // if its game 2

    // if football has come past the camera
    if (football.position.z >= 22) {
      // position and rotate the football
      football.position.set(0, 0, -50);
      football.rotation.set(0, 0, 0);
      // set random x_vel
      x_vel = Math.random() * 0.14 - 0.07;
    } else {
      // move and spin football
      football.rotation.z += 0.15;
      football.position.x += x_vel;
      football.position.z += 1;
    }

    // check if camera and football are close to each other
    let distance = camera.position.x - football.position.x;
    if (football.position.z >= 19 && distance < 2 && distance > -2) {
      text.position.set(camera.position.x - 2, 5, 0);
      text.visible = true;
      setTimeout(function () {
        text.visible = false;
      }, 1000);
    }
  }
  // render the current scene
  renderer.render(scene, camera);
} // end update

// handle key input
function keyPressed(e) {
  // switch game is s is pressed
  if (e.key == "s") {
    if (game == 1) {
      init2();
    } else {
      init1();
    }
  }
  // if its game 1, up throws ball and left and right rotate the ball
  if (game == 1) {
    if (!thrown) {
      switch (e.key) {
        case "ArrowUp":
          thrown = true;
          break;
        case "ArrowLeft":
          x_vel -= 0.025;
          football.rotateY(0.1);
          break;
        case "ArrowRight":
          x_vel += 0.025;
          football.rotateY(-0.1);
          break;
      }
    }
  } else {
    // if its game 2, left and right move camera
    switch (e.key) {
      case "ArrowLeft":
        camera.position.x -= 0.45;
        break;
      case "ArrowRight":
        camera.position.x += 0.45;
        break;
    }
  }
  e.preventDefault();
  render();
}

// start the scene
init();
update();
