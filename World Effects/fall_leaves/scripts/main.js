//==============================================================================
// The following example demonstrates how to control the rotation and scale of
// an object using face rotation and mouth openness.
//
// Project setup:
// - Insert a plane
//==============================================================================

// Load in the required modules
const FaceTracking = require('FaceTracking');
const Scene = require('Scene');
const Materials = require('Materials');
export const Diagnostics = require('Diagnostics');
const Reactive = require('Reactive');
const Shaders = require('Shaders');




// Locate the plane in the Scene
// Enable async/await in JS [part 1]
(async function() {
  const [plane, leaf_small, leaf_large, leaf_fg, material] = await Promise.all([
    Scene.root.findFirst('plane0'),
    Scene.root.findFirst('emitter0'),
    Scene.root.findFirst('emitter1'),
    Scene.root.findFirst('emitter2'),

    // Scene.root.findFirst('emitter_mouth'),
    Materials.findFirst('mat')

  ]);

  // Store a reference to a detected face
  const face = FaceTracking.face(0);

  //==============================================================================
  // Control the rotation of the plane with the rotation of the face
  //==============================================================================

  // Store references to the transform of the plane and face
  const planeTransform = plane.transform;
  // const mouthTransform = emitter_mouth.transform;

  const faceTransform = face.cameraTransform;
  const eye_l = faceTransform.applyToPoint(face.leftEye.center);

  // Bind the rotation of the face to the rotation of the plane
  planeTransform.rotationX = faceTransform.rotationX;
  planeTransform.rotationY = faceTransform.rotationY;
  planeTransform.rotationZ = faceTransform.rotationZ;


  // Store a reference to the mouth openness with some additional mathematical
  // operations to amplify the signal
  const mouthOpenness = face.mouth.openness;


  // Bind the mouthOpenness signal to the x and y-axis scale signal of the plane
  planeTransform.scaleX = mouthOpenness;
  planeTransform.scaleY = mouthOpenness;

  var rotX = planeTransform.rotationX.abs();
  var rotY = planeTransform.rotationY.abs();
  var rotZ = planeTransform.rotationZ.abs();


  leaf_large.hidden = mouthOpenness.le(0.35);
  leaf_fg.hidden = mouthOpenness.le(0.35);
  leaf_small.hidden = mouthOpenness.ge(0.35);

})();
