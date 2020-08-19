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
  // const eye_r = face.rightEye;
  //
  // Diagnostics.log(eye_l.x);
  // Diagnostics.log(faceTransform);
  // Diagnostics.log(eye_l);.x
  // Diagnostics.log(ee_l);

  // Bind the rotation of the face to the rotation of the plane
  planeTransform.rotationX = faceTransform.rotationX;
  planeTransform.rotationY = faceTransform.rotationY;
  planeTransform.rotationZ = faceTransform.rotationZ;

  // mouthTransform.rotationY = faceTransform.rotationY;
  // mouthTransform.rotationZ = faceTransform.rotationZ;

  // mouthTransform.positionX = eye_l.x;
  // mouthTransform.positionY = eye_l.y;
  // mouthTransform.positionZ = eye_l.z;

  //==============================================================================
  // Control the scale of the plane with mouth openness
  //==============================================================================

  // Store a reference to the mouth openness with some additional mathematical
  // operations to amplify the signal
  const mouthOpenness = face.mouth.openness;


  // Bind the mouthOpenness signal to the x and y-axis scale signal of the plane
  planeTransform.scaleX = mouthOpenness;
  planeTransform.scaleY = mouthOpenness;

  var rotX = planeTransform.rotationX.abs();
  var rotY = planeTransform.rotationY.abs();
  var rotZ = planeTransform.rotationZ.abs();


  //emitter change scale on mouthOpenness
  //emitter.scale = mouthOpenness;



 // const color = new Promise(getEmissive(material));

   // const [color] = await Promise.all([
   //   material.getOpacity()
   // ]);

// const textureSlot = Shaders.DefaultMaterialTextures.DIFFUSE;
//
// var R = rotX.mul(Math.random());
// var G = rotX.div(Math.random());
// var B = rotX.add(Math.random());
//
//
// var color = Reactive.pack4(R,G,B,1);
//
//
//
//
// color.mul(mouthOpenness);
//
// material.setTexture(color, {textureSlotName: textureSlot});
// Diagnostics.log(mouthOpenness);

leaf_large.hidden = mouthOpenness.le(0.35);
leaf_fg.hidden = mouthOpenness.le(0.35);
leaf_small.hidden = mouthOpenness.ge(0.35);
// Diagnostics.log(emitter.birthrate);






// Enable async/await in JS [part 2]
})();


//
//
// /**
//  * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
//  */
//
// //==============================================================================
// // Welcome to scripting in Spark AR Studio! Helpful links:
// //
// // Scripting Basics - https://fb.me/spark-scripting-basics
// // Reactive Programming - https://fb.me/spark-reactive-programming
// // Scripting Object Reference - https://fb.me/spark-scripting-reference
// // Changelogs - https://fb.me/spark-changelog
// //
// // For projects created with v87 onwards, JavaScript is always executed in strict mode.
// //==============================================================================
//
//
// //==============================================================================
// // The following example demonstrates how to control the rotation and scale of
// // an object using face rotation and mouth openness.
// //
// // Project setup:
// // - Insert a plane
// //==============================================================================
//
// // Load in the required modules
// const FaceTracking = require('FaceTracking');
// const Scene = require('Scene');
// export const Diagnostics = require('Diagnostics');
//
// // Locate the plane in the Scene
// // Enable async/await in JS [part 1]
// (async function() {
//   const [plane] = await Promise.all([
//     Scene.root.findFirst('plane0')
//   ]);
//
//   // Store a reference to a detected face
//   const face = FaceTracking.face(0);
//
//   //==============================================================================
//   // Control the rotation of the plane with the rotation of the face
//   //==============================================================================
//
//   // Store references to the transform of the plane and face
//   const planeTransform = plane.transform;
//   const faceTransform = face.cameraTransform;
//
//   // Bind the rotation of the face to the rotation of the plane
//   planeTransform.rotationX = faceTransform.rotationX;
//   planeTransform.rotationY = faceTransform.rotationY;
//   planeTransform.rotationZ = faceTransform.rotationZ;
//
//   //==============================================================================
//   // Control the scale of the plane with mouth openness
//   //==============================================================================
//   // Store a reference to the mouth openness with some additional mathematical
//   // operations to amplify the signal
//   const mouthOpenness = face.mouth.openness.mul(4).add(1);
//
//   // Bind the mouthOpenness signal to the x and y-axis scale signal of the plane
//   planeTransform.scaleX = mouthOpenness;
//   planeTransform.scaleY = mouthOpenness;
//
//   const [emitter] = await Promise.all([
//     Scene.root.findFirst('emitter0')
//   ]);
//
//
//   Diagnostics.log(mouthOpenness);
// // Enable async/await in JS [part 2]
// })();
