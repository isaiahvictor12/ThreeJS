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

function init() {
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

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // add results of renderer as an HTML DOM object
  document.body.appendChild(renderer.domElement);

  // load an image texture
  let texture = new THREE.TextureLoader().load("football.jpg");
  let matTexture = new THREE.MeshPhongMaterial({ map: texture });
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

  // for any but basic material, lights are necessary
  let light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(
    football.position.x,
    football.position.y,
    football.position.z
  );
  scene.add(light);
  // scene.add(new THREE.AmbientLight(0x222222));

  // move camera away from object or you'll see a black screen
  camera.position.z = 20;

  // Create the plane geometry
  let planeGeometry = new THREE.PlaneGeometry(120, 120);

  // Create the plane material
  let planeMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("textures/field.png"),
    side: THREE.DoubleSide,
  });

  // Create the plane mesh
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // Add the plane to the scene
  scene.add(plane);
  plane.position.set(0, 0, -30);

  let playertexture = new THREE.TextureLoader().load("textures/player.png");
  let targetGeometry = new THREE.PlaneGeometry(2, 2);
  let targetMaterial = new THREE.MeshLambertMaterial({
    map: playertexture,
  });
  target = new THREE.Mesh(targetGeometry, targetMaterial);
  target.position.set(Math.random() * 50 - 25, 0, -25);
  scene.add(target);

  let loader = new THREE.FontLoader();
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

function init1() {
  game = 1;
  // initialize thrown and x_vel
  thrown = false;
  x_vel = 0;

  // Position and rotate the football
  football.position.set(0, 0, 11);
  football.rotation.set(0, 0, 0);

  // move camera away from object or you'll see a black screen
  camera.position.x = 0;
  camera.position.z = 20;

  target.visible = true;
} // end init1

function init2() {
  game = 2;

  // initialize thrown and x_vel
  thrown = false;
  x_vel = Math.random() * 0.14 - 0.07;

  // Position and rotate the football
  football.position.set(0, 0, -50);
  football.rotation.set(0, 0, 0);

  // move camera away from object or you'll see a black screen
  camera.position.z = 20;

  target.visible = false;
} // end init2

function update() {
  // call at up to 60 fps
  requestAnimationFrame(update);
  // input or animation code can go here

  // if its game 1
  if (game == 1) {
    if (thrown) {
      if (football.position.z <= -25) {
        // check if football and target are close
        let distance = target.position.x - football.position.x;
        if (distance < 2 && distance > -2) {
          throwtext.visible = true;
          setTimeout(function () {
            throwtext.visible = false;
          }, 1000);
        }

        // Position and rotate the football
        football.position.set(0, 0, 11);
        football.rotation.set(0, 0, 0);
        thrown = false;
        x_vel = 0;
        target.position.set(Math.random() * 50 - 25, 0, -25);
      } else {
        football.rotation.z += 0.15;
        football.position.x += x_vel;
        football.position.z -= 0.25;
      }
    }
  } else {
    // if its game 2
    if (football.position.z >= 22) {
      // Position and rotate the football
      football.position.set(0, 0, -50);
      football.rotation.set(0, 0, 0);
      x_vel = Math.random() * 0.14 - 0.07;
    } else {
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
  if (e.key == "s") {
    if (game == 1) {
      init2();
    } else {
      init1();
    }
  }
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
    switch (e.key) {
      case "ArrowUp":
        thrown = true;
        break;
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

init();
update();
