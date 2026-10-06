/* ============================================================================
   JOINT JOURNEY - Illustrated older-adult character: colours and body shapes
   Original artwork for Joint Journey (Elan Health Ltd).
   Each limb shape hangs "down" (+y) from its joint at (0,0); the shoe and the
   head face +x. Units match JJAnim.L (thigh 44, shin 42, upper arm 29,
   forearm 27, torso 52).
   ============================================================================ */
(function (A) {
  'use strict';

  A.CHAR_COL = {
    skin: '#E9B99A', skinShade: '#D29E80',
    hair: '#D9DCDE', hairShade: '#AEB4B9',
    top: '#5E8C87', topFar: '#4A706C', topFold: '#4A706C',
    trouser: '#3F4C5E', trouserFar: '#2F3A4A',
    shoe: '#F4F6F7', shoeFar: '#D5DBDF', sole: '#8A949E',
    outline: 'rgba(30,40,40,0.22)',
    glow: '#FF8F00',
    shadow: 'rgba(40,60,55,0.16)',
    eye: '#2E2622', cheek: '#E39C86'
  };

  A.CHAR_SHAPES = {
    // Legs and arms are not fixed shapes: jj-anim-character.js draws each limb
    // as one smooth outline through hip-knee-ankle / shoulder-elbow-wrist every frame.
    hand: 'M-4.2,0 C-5,4 -4,9 0,10 C4,9 5,4 4.2,0 C2,-1.6 -2,-1.6 -4.2,0 Z',
    // Trainer along +x from the ankle: heel at -x, toe at +x, sole underneath
    shoe: 'M-7,-4 C-8,-1 -7.5,3 -6,4.5 L17,4.5 C20.5,4.5 21.5,1 19.5,-1.5 C16,-4.5 9,-6.5 4,-7.5 ' +
          'C0,-8.5 -5,-7 -7,-4 Z',
    sole: 'M-6.5,3 L18.5,3 C20.5,3 21,4.5 19.5,5.5 L-5.5,5.5 C-7,5.5 -7.5,4 -6.5,3 Z',
    lace: 'M3,-6.3 L11,-4.2',
    // Torso (shirt) in side profile from the hip (0,0) up to the neck (0,-52); front = +x.
    // Only the upper body is fixed; jj-anim-character.js adds the hem each frame
    // (straight when standing or lying, slanted when seated).
    torsoUpper: 'C-14.5,-8 -14,-22 -12.5,-34 C-11.5,-44 -8,-50 -2,-53 L3,-53 C9,-51 12,-45 13,-38 ' +
                'C14,-30 13,-22 14,-14',
    hemFlat: { front: 3.5, back: 3.5, frontX: 14 },
    hemSeated: { front: -7.5, back: 7.5, frontX: 17 },   // on top of the thighs in front, low over the seat behind
    // Pelvis in trouser colour: sits under the straight shirt hem and hides the tops of both thighs
    pelvis: 'M-12.5,-4 L14,-4 L14,4 C14,6.5 12,8 9.5,8 L-9,8 C-11.5,8 -12.5,6.5 -12.5,4 Z',
    neck: 'M-4,-1 L-4.5,-11 C-2,-13 2,-13 4,-11 L4,-1 Z',
    // Head facing +x: back of skull at -x, profile (nose, lips, chin) at +x
    head: 'M-9.5,-1 C-11,-8 -8,-15 -1,-15.5 C5,-15.5 8.5,-12 9,-7 L9.2,-4.5 L12,-2 ' +
          'C12.3,-1.3 11.8,-0.7 11,-0.6 L9.8,-0.4 L10.2,1.3 L9.6,2.2 L10,3.4 C9.6,5.6 8,6.8 5.5,7 ' +
          'C3,7.2 0,7 -2,8.5 L-6,8 C-8.5,6 -10,3 -9.5,-1 Z',
    // Short grey hair, receding slightly at the front
    hair: 'M-10,1 C-12,-8 -8.5,-16.5 -0.5,-16.8 C6.5,-17 9.8,-12.5 9.6,-7.5 C7,-9.5 3,-10.4 -0.5,-9.6 ' +
          'C-2.5,-7 -3.6,-4 -4.2,-0.5 C-6.5,0.8 -8.3,1.6 -10,1 Z',
    ear: 'M-2.2,-3.6 C-0.5,-4.4 1,-3 0.6,-1.2 C0.3,0.6 -1.5,1.4 -2.6,0.4 Z',
    // Friendly open eye: small dark oval with a catchlight, brow sitting just above
    eye: { cx: 6.1, cy: -4.4, rx: 1.15, ry: 1.45 },
    eyeLight: { cx: 6.45, cy: -4.9, r: 0.4 },
    brow: 'M4.7,-7.5 C5.5,-8.15 6.8,-8.2 7.6,-7.6',
    cheek: { cx: 5, cy: 0.6, r: 2 },
    smile: 'M7.4,3.1 C8.2,3.8 9.1,3.7 9.7,3.1'
  };
})(window.JJAnim);
