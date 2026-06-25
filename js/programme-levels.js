/* ============================================
   JOINT JOURNEY - Programme Levels
   Auto-assigned based on Oxford Score
   Gentle (0-19) | Standard (20-34) | Active (35-48)
   ============================================ */

// ===== LEVEL DEFINITIONS =====
const PROGRAMME_LEVELS = {
  gentle: {
    name: 'Gentle',
    label: 'Gentle Programme',
    icon: '🌿',
    color: '#22c55e',
    description: 'A supportive, chair-based programme designed for people with significant joint pain or limited mobility. Every exercise can be done seated or with full support.',
    scoreRange: '0–19',
    sessionsNote: 'Start with 2–3 sessions per week, resting as needed'
  },
  standard: {
    name: 'Standard',
    label: 'Standard Programme',
    icon: '💪',
    color: '#3b82f6',
    description: 'A progressive strengthening programme that builds from seated exercises to standing and functional movements.',
    scoreRange: '20–34',
    sessionsNote: '3–4 sessions per week'
  },
  active: {
    name: 'Active',
    label: 'Active Programme',
    icon: '🔥',
    color: '#f59e0b',
    description: 'A challenging programme for people who are still relatively active. Higher reps, resistance work, and balance challenges to get you in peak condition for surgery.',
    scoreRange: '35–48',
    sessionsNote: '4–5 sessions per week'
  }
};

// ===== AUTO-ASSIGN LEVEL FROM OXFORD SCORE =====
function getProgrammeLevelFromScore(score) {
  if (score <= 19) return 'gentle';
  if (score <= 34) return 'standard';
  return 'active';
}

function assignProgrammeLevel() {
  if (!currentUser) return;
  
  const joint = currentUser.profile.joint;
  let score = null;
  
  if (joint === 'both') {
    // Use the lower of the two scores (most limiting joint)
    const hipScore = currentUser.progress.oxfordScorePreOpHip ? currentUser.progress.oxfordScorePreOpHip.score : null;
    const kneeScore = currentUser.progress.oxfordScorePreOpKnee ? currentUser.progress.oxfordScorePreOpKnee.score : null;
    if (hipScore !== null && kneeScore !== null) {
      score = Math.min(hipScore, kneeScore);
    } else if (hipScore !== null) {
      score = hipScore;
    } else if (kneeScore !== null) {
      score = kneeScore;
    }
  } else {
    score = currentUser.progress.oxfordScorePreOp ? currentUser.progress.oxfordScorePreOp.score : null;
  }
  
  if (score !== null && !currentUser.profile.programmeLevelManual) {
    currentUser.profile.programmeLevel = getProgrammeLevelFromScore(score);
    saveUser();
  }
}

function changeProgrammeLevel(level) {
  if (!currentUser) return;
  currentUser.profile.programmeLevel = level;
  currentUser.profile.programmeLevelManual = true; // Mark as manually chosen
  saveUser();
  initExercises(); // Re-render exercises
  showToast('Switched to ' + PROGRAMME_LEVELS[level].icon + ' ' + PROGRAMME_LEVELS[level].name + ' programme');
}

// ===== GET EXERCISES FOR CURRENT LEVEL =====
function getExerciseDataForLevel(joint) {
  const level = currentUser.profile.programmeLevel || 'standard';
  
  if (joint === 'hip' || joint === 'both') {
    if (level === 'gentle') return HIP_EXERCISES_GENTLE;
    if (level === 'active') return HIP_EXERCISES_ACTIVE;
    return HIP_EXERCISES;
  } else {
    if (level === 'gentle') return KNEE_EXERCISES_GENTLE;
    if (level === 'active') return KNEE_EXERCISES_ACTIVE;
    return KNEE_EXERCISES;
  }
}

// ===== GENTLE HIP EXERCISES =====
const HIP_EXERCISES_GENTLE = {
  phase1: {
    name: "Getting Started",
    description: "Gentle, seated exercises to build confidence and start strengthening",
    sessionsPerWeek: 2,
    exercises: [
      {
        id: "gh1",
        name: "Seated Ankle Pumps",
        video: "KxfFzSOAT7g",
        sets: 2, reps: "10 each foot",
        description: "Sitting comfortably in a chair, pump your feet up and down slowly. This improves circulation, especially important if you spend a lot of time sitting.",
        progression: [
          { week: 1, sets: 1, reps: "8 each foot" },
          { week: 2, sets: 2, reps: "8 each foot" },
          { week: 3, sets: 2, reps: "10 each foot" },
          { week: 4, sets: 2, reps: "12 each foot" }
        ]
      },
      {
        id: "gh2",
        name: "Seated Knee Extension (Gentle)",
        video: "9Du-oWjs_lE",
        sets: 2, reps: "6 each leg",
        description: "Sitting in a sturdy chair, slowly straighten one leg. You don't need to get it fully straight, go as far as is comfortable. Hold briefly, then lower slowly.",
        progression: [
          { week: 1, sets: 1, reps: "4 each leg" },
          { week: 2, sets: 2, reps: "4 each leg" },
          { week: 3, sets: 2, reps: "6 each leg" },
          { week: 4, sets: 2, reps: "8 each leg" }
        ]
      },
      {
        id: "gh3",
        name: "Seated Marching (Gentle)",
        video: "1hAQp7gIK8o",
        sets: 1, reps: "15 seconds",
        description: "Sitting tall, gently lift your knees alternately as if marching. Go at your own pace, there's no rush. Even small lifts count.",
        progression: [
          { week: 1, sets: 1, reps: "10 seconds" },
          { week: 2, sets: 1, reps: "15 seconds" },
          { week: 3, sets: 2, reps: "15 seconds" },
          { week: 4, sets: 2, reps: "20 seconds" }
        ]
      },
      {
        id: "gh4",
        name: "Seated Hip Abduction",
        video: "E36nkfxG15U",
        sets: 2, reps: "6 each leg",
        description: "Sitting in a chair with feet flat, slide one foot out to the side along the floor, then bring it back. This gently works the muscles around your hip without bearing weight.",
        progression: [
          { week: 1, sets: 1, reps: "5 each leg" },
          { week: 2, sets: 2, reps: "5 each leg" },
          { week: 3, sets: 2, reps: "6 each leg" },
          { week: 4, sets: 2, reps: "8 each leg" }
        ]
      },
      {
        id: "gh5",
        name: "Chair Sit-to-Stand (Supported)",
        video: "5yxfzyzEzBY",
        sets: 1, reps: "3",
        description: "Using a sturdy chair with armrests, push up to standing using both arms. Stand for a moment, then slowly sit back down. It's fine to use your arms fully, we'll reduce this over time.",
        progression: [
          { week: 1, sets: 1, reps: "2 (full arm support)" },
          { week: 2, sets: 1, reps: "3 (full arm support)" },
          { week: 3, sets: 2, reps: "3 (full arm support)" },
          { week: 4, sets: 2, reps: "4 (full arm support)" }
        ]
      }
    ]
  },
  phase2: {
    name: "Building Gently",
    description: "Gradually adding standing exercises with full support",
    sessionsPerWeek: 3,
    exercises: [
      {
        id: "gh6",
        name: "Supported Standing Hip Abduction",
        video: "E36nkfxG15U",
        sets: 2, reps: "6 each leg",
        description: "Holding the kitchen worktop firmly with both hands, slowly slide one leg out to the side. Keep the movement small and controlled. Bring it back.",
        progression: [
          { week: 5, sets: 2, reps: "5 each leg" },
          { week: 6, sets: 2, reps: "6 each leg" },
          { week: 7, sets: 2, reps: "8 each leg" },
          { week: 8, sets: 3, reps: "8 each leg" }
        ]
      },
      {
        id: "gh7",
        name: "Supported Standing Hip Extension",
        video: "ysG2GAdq2Uw",
        sets: 2, reps: "6 each leg",
        description: "Holding the worktop with both hands, slowly move one leg backwards a small amount. Squeeze your buttock gently. Return. Keep your back straight.",
        progression: [
          { week: 5, sets: 2, reps: "5 each leg" },
          { week: 6, sets: 2, reps: "6 each leg" },
          { week: 7, sets: 2, reps: "8 each leg" },
          { week: 8, sets: 3, reps: "8 each leg" }
        ]
      },
      {
        id: "gh8",
        name: "Chair Sit-to-Stand (Progressing)",
        video: "5yxfzyzEzBY",
        sets: 2, reps: "5",
        description: "Continue standing from a chair, but try to use your arms a little less each week. A higher chair or cushion makes this easier if needed.",
        progression: [
          { week: 5, sets: 2, reps: "4 (lighter arm use)" },
          { week: 6, sets: 2, reps: "5 (lighter arm use)" },
          { week: 7, sets: 2, reps: "6 (lighter arm use)" },
          { week: 8, sets: 2, reps: "6 (minimal arms)" }
        ]
      },
      {
        id: "gh9",
        name: "Heel Raises (Supported)",
        video: "4Wn5ugI7VU8",
        sets: 2, reps: "6",
        description: "Holding the worktop with both hands, rise gently onto your toes, hold for a moment, then lower. Small movements are fine.",
        progression: [
          { week: 5, sets: 2, reps: "5" },
          { week: 6, sets: 2, reps: "6" },
          { week: 7, sets: 2, reps: "8" },
          { week: 8, sets: 2, reps: "10" }
        ]
      },
      {
        id: "gh10",
        name: "Seated Knee Extension (Progressed)",
        video: "9Du-oWjs_lE",
        sets: 2, reps: "8 each leg",
        description: "As before, but try to hold at the top for 2–3 seconds. You should feel your thigh muscle working. Slow and steady.",
        progression: [
          { week: 5, sets: 2, reps: "6, hold 2 sec" },
          { week: 6, sets: 2, reps: "8, hold 2 sec" },
          { week: 7, sets: 2, reps: "8, hold 3 sec" },
          { week: 8, sets: 3, reps: "8, hold 3 sec" }
        ]
      }
    ]
  },
  phase3: {
    name: "Getting Ready",
    description: "Preparing for surgery with gentle functional movements",
    sessionsPerWeek: 3,
    exercises: [
      {
        id: "gh11",
        name: "Supported Step Ups (Half Step)",
        video: "wfhXnLILqdk",
        sets: 2, reps: "5 each leg",
        description: "Using a low step or thick book (5–10cm high), step up holding the wall or banister firmly. Step down with control. A small step is perfectly fine.",
        progression: [
          { week: 9, sets: 2, reps: "4 each" },
          { week: 10, sets: 2, reps: "5 each" },
          { week: 11, sets: 2, reps: "6 each" },
          { week: 12, sets: 2, reps: "8 each" }
        ]
      },
      {
        id: "gh12",
        name: "Bridging (Gentle)",
        video: "Rq3EXYus03E",
        sets: 2, reps: "6",
        description: "Lying on your back with knees bent, gently lift your hips a small amount off the bed. Hold briefly, lower. Even a small lift works your muscles.",
        progression: [
          { week: 9, sets: 2, reps: "5" },
          { week: 10, sets: 2, reps: "6" },
          { week: 11, sets: 2, reps: "8" },
          { week: 12, sets: 3, reps: "8" }
        ]
      },
      {
        id: "gh13",
        name: "Supported Side Stepping",
        video: "C0kFihNtCtA",
        sets: 2, reps: "6 each direction",
        description: "Holding the worktop firmly, take small sideways steps. Keep your toes forward. This builds hip muscle strength.",
        progression: [
          { week: 9, sets: 2, reps: "5 each way" },
          { week: 10, sets: 2, reps: "6 each way" },
          { week: 11, sets: 2, reps: "8 each way" },
          { week: 12, sets: 2, reps: "10 each way" }
        ]
      },
      {
        id: "gh14",
        name: "Kitchen Worktop Press-Ups (Gentle)",
        video: "57YFsNesJnY",
        sets: 2, reps: "5",
        description: "Standing at arm's length from the worktop, lean in and push back. This builds arm strength for walking aids after surgery. ⚠️ Ensure non-slip footwear.",
        progression: [
          { week: 9, sets: 1, reps: "4" },
          { week: 10, sets: 2, reps: "4" },
          { week: 11, sets: 2, reps: "5" },
          { week: 12, sets: 2, reps: "6" }
        ]
      },
      {
        id: "gh15",
        name: "Standing March (Supported)",
        video: "16oJspYFz7s",
        sets: 2, reps: "30 seconds",
        description: "Holding the worktop, march gently on the spot. Lift your knees only as high as is comfortable. This builds stamina for recovery.",
        progression: [
          { week: 9, sets: 1, reps: "20 seconds" },
          { week: 10, sets: 2, reps: "20 seconds" },
          { week: 11, sets: 2, reps: "30 seconds" },
          { week: 12, sets: 2, reps: "40 seconds" }
        ]
      },
      {
        id: "gh16",
        name: "Chair Sit-to-Stand (Best Effort)",
        video: "5yxfzyzEzBY",
        sets: 2, reps: "6",
        description: "By now you should be using less arm support. Do your best, even a small improvement from week 1 is a win.",
        progression: [
          { week: 9, sets: 2, reps: "5 (minimal arms)" },
          { week: 10, sets: 2, reps: "6 (minimal arms)" },
          { week: 11, sets: 2, reps: "6 (try arms crossed)" },
          { week: 12, sets: 2, reps: "8" }
        ]
      }
    ]
  }
};

// ===== GENTLE KNEE EXERCISES =====
const KNEE_EXERCISES_GENTLE = {
  phase1: {
    name: "Getting Started",
    description: "Gentle, seated exercises to build confidence and start strengthening",
    sessionsPerWeek: 2,
    exercises: [
      {
        id: "gk1",
        name: "Seated Ankle Pumps",
        video: "KxfFzSOAT7g",
        sets: 2, reps: "10 each foot",
        description: "Sitting comfortably, pump your feet up and down slowly. Improves circulation, especially important before knee surgery.",
        progression: [
          { week: 1, sets: 1, reps: "8 each foot" },
          { week: 2, sets: 2, reps: "8 each foot" },
          { week: 3, sets: 2, reps: "10 each foot" },
          { week: 4, sets: 2, reps: "12 each foot" }
        ]
      },
      {
        id: "gk2",
        name: "Seated Knee Extension (Gentle)",
        video: "9Du-oWjs_lE",
        sets: 2, reps: "6 each leg",
        description: "Sitting in a sturdy chair, slowly straighten one leg. Don't worry about getting it fully straight, go as far as comfortable. Hold briefly, lower slowly. This is THE key exercise for knee replacement prep.",
        progression: [
          { week: 1, sets: 1, reps: "4 each leg" },
          { week: 2, sets: 2, reps: "4 each leg" },
          { week: 3, sets: 2, reps: "6 each leg" },
          { week: 4, sets: 2, reps: "8 each leg" }
        ]
      },
      {
        id: "gk3",
        name: "Seated Heel Slides (Gentle)",
        video: "RSv7E5AJMCg",
        sets: 2, reps: "8 each leg",
        description: "Sitting in a chair, slide your foot back gently under the chair, bending your knee. Go only as far as comfortable. Slide back out. Works on knee range of movement.",
        progression: [
          { week: 1, sets: 1, reps: "6 each leg" },
          { week: 2, sets: 2, reps: "6 each leg" },
          { week: 3, sets: 2, reps: "8 each leg" },
          { week: 4, sets: 2, reps: "10 each leg" }
        ]
      },
      {
        id: "gk4",
        name: "Inner Range Quads (Gentle)",
        video: "8rp5BB3qE6o",
        sets: 2, reps: "6 each leg",
        description: "Place a rolled towel under your knee while sitting. Press the back of your knee into the towel, tightening your thigh. Hold 3 seconds, release. This is the same exercise you'll do in hospital.",
        progression: [
          { week: 1, sets: 1, reps: "5 each, hold 2 sec" },
          { week: 2, sets: 2, reps: "5 each, hold 2 sec" },
          { week: 3, sets: 2, reps: "6 each, hold 3 sec" },
          { week: 4, sets: 2, reps: "8 each, hold 3 sec" }
        ]
      },
      {
        id: "gk5",
        name: "Chair Sit-to-Stand (Supported)",
        video: "5yxfzyzEzBY",
        sets: 1, reps: "3",
        description: "Using a sturdy chair with armrests, push up to standing using both arms. Stand briefly, then slowly sit back down. Use your arms as much as needed.",
        progression: [
          { week: 1, sets: 1, reps: "2 (full arm support)" },
          { week: 2, sets: 1, reps: "3 (full arm support)" },
          { week: 3, sets: 2, reps: "3 (full arm support)" },
          { week: 4, sets: 2, reps: "4 (full arm support)" }
        ]
      }
    ]
  },
  phase2: {
    name: "Building Gently",
    description: "Gradually adding standing exercises with full support",
    sessionsPerWeek: 3,
    exercises: [
      {
        id: "gk6",
        name: "Supported Standing Knee Bend",
        video: "k4TDxANOD4M",
        sets: 2, reps: "6 each leg",
        description: "Holding the worktop firmly with both hands, slowly bend one knee, bringing heel towards buttock. Go only as far as comfortable, even a small bend counts.",
        progression: [
          { week: 5, sets: 2, reps: "5 each leg" },
          { week: 6, sets: 2, reps: "6 each leg" },
          { week: 7, sets: 2, reps: "8 each leg" },
          { week: 8, sets: 3, reps: "8 each leg" }
        ]
      },
      {
        id: "gk7",
        name: "Chair Sit-to-Stand (Progressing)",
        video: "5yxfzyzEzBY",
        sets: 2, reps: "5",
        description: "Continue practising, trying to use your arms a little less each week. A higher seat makes this easier.",
        progression: [
          { week: 5, sets: 2, reps: "4 (lighter arms)" },
          { week: 6, sets: 2, reps: "5 (lighter arms)" },
          { week: 7, sets: 2, reps: "6 (lighter arms)" },
          { week: 8, sets: 2, reps: "6 (minimal arms)" }
        ]
      },
      {
        id: "gk8",
        name: "Heel Raises (Supported)",
        video: "4Wn5ugI7VU8",
        sets: 2, reps: "6",
        description: "Holding worktop with both hands, gently rise onto toes, hold briefly, lower. Small movements are fine.",
        progression: [
          { week: 5, sets: 2, reps: "5" },
          { week: 6, sets: 2, reps: "6" },
          { week: 7, sets: 2, reps: "8" },
          { week: 8, sets: 2, reps: "10" }
        ]
      },
      {
        id: "gk9",
        name: "Seated Knee Extension (Progressed)",
        video: "9Du-oWjs_lE",
        sets: 2, reps: "8 each leg",
        description: "Hold at the top for 2–3 seconds now. Squeeze your thigh. This quad strength is critical for recovery.",
        progression: [
          { week: 5, sets: 2, reps: "6, hold 2 sec" },
          { week: 6, sets: 2, reps: "8, hold 2 sec" },
          { week: 7, sets: 2, reps: "8, hold 3 sec" },
          { week: 8, sets: 3, reps: "8, hold 3 sec" }
        ]
      },
      {
        id: "gk10",
        name: "Seated Marching (Progressed)",
        video: "1hAQp7gIK8o",
        sets: 2, reps: "20 seconds",
        description: "Sitting tall, march with a little more pace and height than before. Building stamina.",
        progression: [
          { week: 5, sets: 2, reps: "15 seconds" },
          { week: 6, sets: 2, reps: "20 seconds" },
          { week: 7, sets: 2, reps: "25 seconds" },
          { week: 8, sets: 3, reps: "25 seconds" }
        ]
      }
    ]
  },
  phase3: {
    name: "Getting Ready",
    description: "Preparing for surgery with gentle functional movements",
    sessionsPerWeek: 3,
    exercises: [
      {
        id: "gk11",
        name: "Supported Step Ups (Half Step)",
        video: "wfhXnLILqdk",
        sets: 2, reps: "5 each leg",
        description: "Using a low step (5–10cm), step up holding wall/banister firmly. Step down with control. Small step is fine.",
        progression: [
          { week: 9, sets: 2, reps: "4 each" },
          { week: 10, sets: 2, reps: "5 each" },
          { week: 11, sets: 2, reps: "6 each" },
          { week: 12, sets: 2, reps: "8 each" }
        ]
      },
      {
        id: "gk12",
        name: "Straight Leg Raise (Gentle)",
        video: "khnALX2LAOs",
        sets: 2, reps: "6 each leg",
        description: "Lying down, bend one knee. Keep the other straight and lift it a small amount. Hold 2 seconds. Lower slowly.",
        progression: [
          { week: 9, sets: 2, reps: "5 each" },
          { week: 10, sets: 2, reps: "6 each" },
          { week: 11, sets: 2, reps: "8 each" },
          { week: 12, sets: 3, reps: "8 each" }
        ]
      },
      {
        id: "gk13",
        name: "Supported Side Stepping",
        video: "C0kFihNtCtA",
        sets: 2, reps: "6 each direction",
        description: "Holding worktop firmly, take small sideways steps. Toes forward.",
        progression: [
          { week: 9, sets: 2, reps: "5 each way" },
          { week: 10, sets: 2, reps: "6 each way" },
          { week: 11, sets: 2, reps: "8 each way" },
          { week: 12, sets: 2, reps: "10 each way" }
        ]
      },
      {
        id: "gk14",
        name: "Kitchen Worktop Press-Ups (Gentle)",
        video: "57YFsNesJnY",
        sets: 2, reps: "5",
        description: "Lean into worktop, push back. Builds arm strength for crutches. ⚠️ Non-slip footwear essential.",
        progression: [
          { week: 9, sets: 1, reps: "4" },
          { week: 10, sets: 2, reps: "4" },
          { week: 11, sets: 2, reps: "5" },
          { week: 12, sets: 2, reps: "6" }
        ]
      },
      {
        id: "gk15",
        name: "Standing March (Supported)",
        video: "16oJspYFz7s",
        sets: 2, reps: "30 seconds",
        description: "Holding worktop, march gently on the spot. Knees only as high as comfortable.",
        progression: [
          { week: 9, sets: 1, reps: "20 seconds" },
          { week: 10, sets: 2, reps: "20 seconds" },
          { week: 11, sets: 2, reps: "30 seconds" },
          { week: 12, sets: 2, reps: "40 seconds" }
        ]
      },
      {
        id: "gk16",
        name: "Chair Sit-to-Stand (Best Effort)",
        video: "5yxfzyzEzBY",
        sets: 2, reps: "6",
        description: "Use as little arm support as you can manage. Any improvement from week 1 is a win.",
        progression: [
          { week: 9, sets: 2, reps: "5 (minimal arms)" },
          { week: 10, sets: 2, reps: "6 (minimal arms)" },
          { week: 11, sets: 2, reps: "6 (try arms crossed)" },
          { week: 12, sets: 2, reps: "8" }
        ]
      }
    ]
  }
};

// ===== ACTIVE HIP EXERCISES =====
const HIP_EXERCISES_ACTIVE = {
  phase1: {
    name: "Strong Start",
    description: "Building a solid base with higher volumes and resistance",
    sessionsPerWeek: 4,
    exercises: [
      {
        id: "ah1",
        name: "Chair Sit-to-Stand (Arms Crossed)",
        video: "5yxfzyzEzBY",
        sets: 3, reps: "10",
        description: "From a standard-height chair with arms crossed on your chest, stand up and sit down with control. Take 3 seconds to lower. You should find this achievable, we'll make it harder.",
        progression: [
          { week: 1, sets: 3, reps: "8" },
          { week: 2, sets: 3, reps: "10" },
          { week: 3, sets: 3, reps: "12" },
          { week: 4, sets: 4, reps: "12" }
        ]
      },
      {
        id: "ah2",
        name: "Standing Hip Abduction (Slow Tempo)",
        video: "E36nkfxG15U",
        sets: 3, reps: "12 each leg",
        description: "Holding worktop with one hand, take 3 seconds to lift your leg out to the side, hold 2 seconds, 3 seconds to lower. Slow tempo builds more strength.",
        progression: [
          { week: 1, sets: 3, reps: "10 each (slow)" },
          { week: 2, sets: 3, reps: "12 each (slow)" },
          { week: 3, sets: 3, reps: "12 each (slower)" },
          { week: 4, sets: 4, reps: "12 each (slow)" }
        ]
      },
      {
        id: "ah3",
        name: "Standing Hip Extension (Slow Tempo)",
        video: "ysG2GAdq2Uw",
        sets: 3, reps: "12 each leg",
        description: "Holding worktop, take 3 seconds to move leg back, squeeze buttock for 2 seconds, 3 seconds to return. Controlled throughout.",
        progression: [
          { week: 1, sets: 3, reps: "10 each (slow)" },
          { week: 2, sets: 3, reps: "12 each (slow)" },
          { week: 3, sets: 3, reps: "12 each (slower)" },
          { week: 4, sets: 4, reps: "12 each (slow)" }
        ]
      },
      {
        id: "ah4",
        name: "Step Ups (Bottom Stair)",
        video: "wfhXnLILqdk",
        sets: 3, reps: "10 each leg",
        description: "Step up onto the bottom stair, step down with control. Use banister lightly for balance only, let your legs do the work.",
        progression: [
          { week: 1, sets: 2, reps: "8 each" },
          { week: 2, sets: 3, reps: "8 each" },
          { week: 3, sets: 3, reps: "10 each" },
          { week: 4, sets: 3, reps: "12 each" }
        ]
      },
      {
        id: "ah5",
        name: "Bridging",
        video: "Rq3EXYus03E",
        sets: 3, reps: "12",
        description: "Lying on your back, knees bent, lift hips fully and squeeze buttocks hard at the top. Hold 3 seconds. Lower with control.",
        progression: [
          { week: 1, sets: 3, reps: "10, hold 2 sec" },
          { week: 2, sets: 3, reps: "12, hold 2 sec" },
          { week: 3, sets: 3, reps: "12, hold 3 sec" },
          { week: 4, sets: 4, reps: "12, hold 3 sec" }
        ]
      },
      {
        id: "ah6",
        name: "Tandem Standing (Balance)",
        video: "F3tYhTA_97g",
        sets: 3, reps: "hold 20 sec each side",
        description: "Stand heel to toe. Try with just fingertips on the worktop, progressing to no hands.",
        progression: [
          { week: 1, sets: 3, reps: "hold 15 sec (fingertips)" },
          { week: 2, sets: 3, reps: "hold 20 sec (fingertips)" },
          { week: 3, sets: 3, reps: "hold 20 sec (try no hands)" },
          { week: 4, sets: 3, reps: "hold 25 sec (no hands)" }
        ]
      },
      {
        id: "ah7",
        name: "Walking Programme",
        video: null,
        sets: 1, reps: "15–20 min walk",
        description: "Walk at a brisk, comfortable pace. Choose a flat route. This builds cardiovascular fitness that will speed your recovery enormously.",
        progression: [
          { week: 1, sets: 1, reps: "10 min walk" },
          { week: 2, sets: 1, reps: "15 min walk" },
          { week: 3, sets: 1, reps: "15 min brisk walk" },
          { week: 4, sets: 1, reps: "20 min brisk walk" }
        ]
      }
    ]
  },
  phase2: {
    name: "Strength & Endurance",
    description: "Challenging exercises, resistance work, and longer cardio",
    sessionsPerWeek: 4,
    exercises: [
      {
        id: "ah8",
        name: "Chair Sit-to-Stand (Low Chair)",
        video: "5yxfzyzEzBY",
        sets: 3, reps: "15",
        description: "Use a lower chair or remove the cushion. Arms crossed. Slow 4-second descent. This significantly builds quad and glute strength.",
        progression: [
          { week: 5, sets: 3, reps: "12" },
          { week: 6, sets: 3, reps: "15" },
          { week: 7, sets: 4, reps: "12 (lower chair)" },
          { week: 8, sets: 4, reps: "15 (lower chair)" }
        ]
      },
      {
        id: "ah9",
        name: "Single Leg Balance",
        video: "Dtgh2_LFkBQ",
        sets: 3, reps: "hold 25 sec each",
        description: "Stand near worktop. Lift one foot off the ground. Aim to reduce hand support to fingertips, then no hands.",
        progression: [
          { week: 5, sets: 3, reps: "hold 15 sec (fingertips)" },
          { week: 6, sets: 3, reps: "hold 20 sec (fingertips)" },
          { week: 7, sets: 3, reps: "hold 25 sec (try no hands)" },
          { week: 8, sets: 3, reps: "hold 30 sec (no hands)" }
        ]
      },
      {
        id: "ah10",
        name: "Step Ups with Controlled Descent",
        video: "wfhXnLILqdk",
        sets: 3, reps: "12 each",
        description: "Step up and take 4 seconds to step back down. The slow descent is where the strength gains come from.",
        progression: [
          { week: 5, sets: 3, reps: "10 each (3 sec down)" },
          { week: 6, sets: 3, reps: "12 each (3 sec down)" },
          { week: 7, sets: 3, reps: "12 each (4 sec down)" },
          { week: 8, sets: 4, reps: "12 each (4 sec down)" }
        ]
      },
      {
        id: "ah11",
        name: "Side Stepping (With Resistance Band)",
        video: "C0kFihNtCtA",
        sets: 3, reps: "12 each direction",
        description: "If you have a resistance band, place it around your ankles. Side step along the worktop. Without a band, just do more reps with slow tempo.",
        progression: [
          { week: 5, sets: 3, reps: "10 each way" },
          { week: 6, sets: 3, reps: "12 each way" },
          { week: 7, sets: 3, reps: "12 each way (band)" },
          { week: 8, sets: 4, reps: "12 each way (band)" }
        ]
      },
      {
        id: "ah12",
        name: "Bridging with Hold",
        video: "Rq3EXYus03E",
        sets: 3, reps: "12, hold 5 sec",
        description: "Lift hips, hold 5 seconds squeezing hard. For extra challenge, try lifting one foot slightly off the ground at the top.",
        progression: [
          { week: 5, sets: 3, reps: "12, hold 3 sec" },
          { week: 6, sets: 3, reps: "12, hold 5 sec" },
          { week: 7, sets: 3, reps: "12, hold 5 sec (try single leg)" },
          { week: 8, sets: 4, reps: "12, hold 5 sec" }
        ]
      },
      {
        id: "ah13",
        name: "Walking Programme",
        video: null,
        sets: 1, reps: "25–30 min brisk walk",
        description: "Increase pace or distance. Add hills if comfortable. Aim for a pace where you can talk but not sing.",
        progression: [
          { week: 5, sets: 1, reps: "20 min brisk" },
          { week: 6, sets: 1, reps: "25 min brisk" },
          { week: 7, sets: 1, reps: "25 min (add hills)" },
          { week: 8, sets: 1, reps: "30 min brisk" }
        ]
      }
    ]
  },
  phase3: {
    name: "Peak Preparation",
    description: "Maximum strength, endurance, and functional readiness",
    sessionsPerWeek: 5,
    exercises: [
      {
        id: "ah14",
        name: "Chair Sit-to-Stand (Single Leg Bias)",
        video: "5yxfzyzEzBY",
        sets: 3, reps: "8 each leg",
        description: "Sit down to a chair predominantly using one leg (other foot stays on the ground for safety). Alternate legs. This builds single-leg strength.",
        progression: [
          { week: 9, sets: 3, reps: "6 each" },
          { week: 10, sets: 3, reps: "8 each" },
          { week: 11, sets: 3, reps: "10 each" },
          { week: 12, sets: 4, reps: "10 each" }
        ]
      },
      {
        id: "ah15",
        name: "Step Ups (Full Stair Height)",
        video: "wfhXnLILqdk",
        sets: 3, reps: "12 each",
        description: "Full stair step, 4-second controlled descent. Minimal hand support on banister.",
        progression: [
          { week: 9, sets: 3, reps: "10 each (4 sec)" },
          { week: 10, sets: 3, reps: "12 each (4 sec)" },
          { week: 11, sets: 4, reps: "12 each (4 sec)" },
          { week: 12, sets: 4, reps: "12 each (no hands)" }
        ]
      },
      {
        id: "ah16",
        name: "Single Leg Balance (Eyes Closed)",
        video: "Dtgh2_LFkBQ",
        sets: 3, reps: "hold 15 sec each",
        description: "Near worktop for safety. Balance on one leg with eyes closed. This dramatically improves proprioception. Touch worktop any time you need to.",
        progression: [
          { week: 9, sets: 3, reps: "hold 10 sec" },
          { week: 10, sets: 3, reps: "hold 15 sec" },
          { week: 11, sets: 3, reps: "hold 20 sec" },
          { week: 12, sets: 3, reps: "hold 25 sec" }
        ]
      },
      {
        id: "ah17",
        name: "Kitchen Worktop Press-Ups (Feet Back)",
        video: "57YFsNesJnY",
        sets: 3, reps: "15",
        description: "Step feet further back to increase difficulty. Full range. Builds upper body for walking aids. ⚠️ Non-slip footwear essential.",
        progression: [
          { week: 9, sets: 3, reps: "12" },
          { week: 10, sets: 3, reps: "15" },
          { week: 11, sets: 4, reps: "12" },
          { week: 12, sets: 4, reps: "15" }
        ]
      },
      {
        id: "ah18",
        name: "Bridging (Single Leg)",
        video: "Rq3EXYus03E",
        sets: 3, reps: "8 each leg",
        description: "Bridge up on both legs, then extend one leg while holding the bridge. Lower on both legs. Excellent glute and core challenge.",
        progression: [
          { week: 9, sets: 3, reps: "6 each" },
          { week: 10, sets: 3, reps: "8 each" },
          { week: 11, sets: 3, reps: "10 each" },
          { week: 12, sets: 4, reps: "10 each" }
        ]
      },
      {
        id: "ah19",
        name: "Floor Transfer Practice",
        video: "ohiJAzQ7VL4",
        sets: 1, reps: "5",
        description: "Get down to the floor and back up confidently. Use a chair if needed. Important safety skill.",
        progression: [
          { week: 9, sets: 1, reps: "3" },
          { week: 10, sets: 1, reps: "4" },
          { week: 11, sets: 1, reps: "5" },
          { week: 12, sets: 1, reps: "5 (no support)" }
        ]
      },
      {
        id: "ah20",
        name: "Walking Programme",
        video: null,
        sets: 1, reps: "30–40 min brisk walk",
        description: "Maintain your fitness peak going into surgery. Include hills. You should feel slightly breathless but able to hold a conversation.",
        progression: [
          { week: 9, sets: 1, reps: "30 min (with hills)" },
          { week: 10, sets: 1, reps: "35 min (with hills)" },
          { week: 11, sets: 1, reps: "35 min brisk" },
          { week: 12, sets: 1, reps: "40 min brisk" }
        ]
      }
    ]
  }
};

// ===== ACTIVE KNEE EXERCISES =====
const KNEE_EXERCISES_ACTIVE = {
  phase1: {
    name: "Strong Start",
    description: "Building a solid base with higher volumes and resistance",
    sessionsPerWeek: 4,
    exercises: [
      {
        id: "ak1",
        name: "Chair Sit-to-Stand (Arms Crossed)",
        video: "5yxfzyzEzBY",
        sets: 3, reps: "10",
        description: "Arms crossed, stand and sit with full control. 3-second descent. Focus on both legs working equally.",
        progression: [
          { week: 1, sets: 3, reps: "8" },
          { week: 2, sets: 3, reps: "10" },
          { week: 3, sets: 3, reps: "12" },
          { week: 4, sets: 4, reps: "12" }
        ]
      },
      {
        id: "ak2",
        name: "Seated Knee Extension (Slow Tempo)",
        video: "9Du-oWjs_lE",
        sets: 3, reps: "12 each leg",
        description: "Straighten leg taking 3 seconds up, hold 3 seconds at top, 3 seconds down. Squeeze your quad hard at the top. This tempo builds serious strength.",
        progression: [
          { week: 1, sets: 3, reps: "10 each (3 sec hold)" },
          { week: 2, sets: 3, reps: "12 each (3 sec hold)" },
          { week: 3, sets: 3, reps: "12 each (5 sec hold)" },
          { week: 4, sets: 4, reps: "12 each (5 sec hold)" }
        ]
      },
      {
        id: "ak3",
        name: "Step Ups (Bottom Stair)",
        video: "wfhXnLILqdk",
        sets: 3, reps: "10 each leg",
        description: "Step up, step down with control. Light banister touch for balance only.",
        progression: [
          { week: 1, sets: 2, reps: "8 each" },
          { week: 2, sets: 3, reps: "8 each" },
          { week: 3, sets: 3, reps: "10 each" },
          { week: 4, sets: 3, reps: "12 each" }
        ]
      },
      {
        id: "ak4",
        name: "Standing Knee Bend (Deep)",
        video: "k4TDxANOD4M",
        sets: 3, reps: "12 each",
        description: "Holding worktop with one hand, bend knee bringing heel as close to buttock as you can. Slow 3 seconds each way.",
        progression: [
          { week: 1, sets: 3, reps: "10 each (slow)" },
          { week: 2, sets: 3, reps: "12 each (slow)" },
          { week: 3, sets: 3, reps: "12 each (slower)" },
          { week: 4, sets: 4, reps: "12 each (slow)" }
        ]
      },
      {
        id: "ak5",
        name: "Straight Leg Raise",
        video: "khnALX2LAOs",
        sets: 3, reps: "12 each",
        description: "Lying down, one knee bent, lift the straight leg. Hold 3 seconds. Lower with control. Really squeeze the quad.",
        progression: [
          { week: 1, sets: 3, reps: "10 each, hold 2 sec" },
          { week: 2, sets: 3, reps: "12 each, hold 2 sec" },
          { week: 3, sets: 3, reps: "12 each, hold 3 sec" },
          { week: 4, sets: 4, reps: "12 each, hold 3 sec" }
        ]
      },
      {
        id: "ak6",
        name: "Tandem Standing (Balance)",
        video: "F3tYhTA_97g",
        sets: 3, reps: "hold 20 sec each",
        description: "Heel to toe, fingertips on worktop progressing to no hands.",
        progression: [
          { week: 1, sets: 3, reps: "hold 15 sec (fingertips)" },
          { week: 2, sets: 3, reps: "hold 20 sec (fingertips)" },
          { week: 3, sets: 3, reps: "hold 20 sec (no hands)" },
          { week: 4, sets: 3, reps: "hold 25 sec (no hands)" }
        ]
      },
      {
        id: "ak7",
        name: "Walking Programme",
        video: null,
        sets: 1, reps: "15–20 min walk",
        description: "Brisk walking on flat ground. Builds cardiovascular fitness crucial for recovery.",
        progression: [
          { week: 1, sets: 1, reps: "10 min walk" },
          { week: 2, sets: 1, reps: "15 min walk" },
          { week: 3, sets: 1, reps: "15 min brisk" },
          { week: 4, sets: 1, reps: "20 min brisk" }
        ]
      }
    ]
  },
  phase2: {
    name: "Strength & Endurance",
    description: "Challenging exercises, resistance work, and longer cardio",
    sessionsPerWeek: 4,
    exercises: [
      {
        id: "ak8",
        name: "Chair Sit-to-Stand (Low Chair)",
        video: "5yxfzyzEzBY",
        sets: 3, reps: "15",
        description: "Lower chair, arms crossed, 4-second descent. Builds serious quad strength.",
        progression: [
          { week: 5, sets: 3, reps: "12" },
          { week: 6, sets: 3, reps: "15" },
          { week: 7, sets: 4, reps: "12 (lower chair)" },
          { week: 8, sets: 4, reps: "15 (lower chair)" }
        ]
      },
      {
        id: "ak9",
        name: "Single Leg Balance",
        video: "Dtgh2_LFkBQ",
        sets: 3, reps: "hold 25 sec each",
        description: "Reduce hand support to fingertips, then no hands.",
        progression: [
          { week: 5, sets: 3, reps: "hold 15 sec (fingertips)" },
          { week: 6, sets: 3, reps: "hold 20 sec (fingertips)" },
          { week: 7, sets: 3, reps: "hold 25 sec (no hands)" },
          { week: 8, sets: 3, reps: "hold 30 sec (no hands)" }
        ]
      },
      {
        id: "ak10",
        name: "Step Ups with Slow Descent",
        video: "wfhXnLILqdk",
        sets: 3, reps: "12 each",
        description: "Step up, 4-second controlled step down. The eccentric phase builds the most strength.",
        progression: [
          { week: 5, sets: 3, reps: "10 each (3 sec)" },
          { week: 6, sets: 3, reps: "12 each (3 sec)" },
          { week: 7, sets: 3, reps: "12 each (4 sec)" },
          { week: 8, sets: 4, reps: "12 each (4 sec)" }
        ]
      },
      {
        id: "ak11",
        name: "Side Stepping (With Resistance Band)",
        video: "C0kFihNtCtA",
        sets: 3, reps: "12 each direction",
        description: "Band around ankles if available. Slow, controlled side steps. Without band, do more reps slowly.",
        progression: [
          { week: 5, sets: 3, reps: "10 each way" },
          { week: 6, sets: 3, reps: "12 each way" },
          { week: 7, sets: 3, reps: "12 each way (band)" },
          { week: 8, sets: 4, reps: "12 each way (band)" }
        ]
      },
      {
        id: "ak12",
        name: "Straight Leg Raise (Weighted)",
        video: "khnALX2LAOs",
        sets: 3, reps: "12 each",
        description: "Add an ankle weight (0.5–1kg) or heavy shoe. Hold 3 seconds at top. Builds quad strength fast.",
        progression: [
          { week: 5, sets: 3, reps: "10 each, hold 3 sec" },
          { week: 6, sets: 3, reps: "12 each, hold 3 sec" },
          { week: 7, sets: 3, reps: "12 each, hold 5 sec" },
          { week: 8, sets: 4, reps: "12 each, hold 5 sec" }
        ]
      },
      {
        id: "ak13",
        name: "Walking Programme",
        video: null,
        sets: 1, reps: "25–30 min brisk",
        description: "Add hills or increase pace. Aim for slight breathlessness.",
        progression: [
          { week: 5, sets: 1, reps: "20 min brisk" },
          { week: 6, sets: 1, reps: "25 min brisk" },
          { week: 7, sets: 1, reps: "25 min (hills)" },
          { week: 8, sets: 1, reps: "30 min brisk" }
        ]
      }
    ]
  },
  phase3: {
    name: "Peak Preparation",
    description: "Maximum strength, endurance, and functional readiness",
    sessionsPerWeek: 5,
    exercises: [
      {
        id: "ak14",
        name: "Chair Sit-to-Stand (Single Leg Bias)",
        video: "5yxfzyzEzBY",
        sets: 3, reps: "8 each leg",
        description: "Lower onto the chair predominantly using one leg. Other foot stays on ground for safety. Alternate.",
        progression: [
          { week: 9, sets: 3, reps: "6 each" },
          { week: 10, sets: 3, reps: "8 each" },
          { week: 11, sets: 3, reps: "10 each" },
          { week: 12, sets: 4, reps: "10 each" }
        ]
      },
      {
        id: "ak15",
        name: "Step Ups (Full Stair, No Hands)",
        video: "wfhXnLILqdk",
        sets: 3, reps: "12 each",
        description: "Full stair height, minimal to no hand support. 4-second descent.",
        progression: [
          { week: 9, sets: 3, reps: "10 each (4 sec)" },
          { week: 10, sets: 3, reps: "12 each (4 sec)" },
          { week: 11, sets: 4, reps: "12 each (4 sec)" },
          { week: 12, sets: 4, reps: "12 each (no hands)" }
        ]
      },
      {
        id: "ak16",
        name: "Single Leg Balance (Eyes Closed)",
        video: "Dtgh2_LFkBQ",
        sets: 3, reps: "hold 15 sec each",
        description: "Near worktop for safety. Eyes closed. Dramatically improves proprioception.",
        progression: [
          { week: 9, sets: 3, reps: "hold 10 sec" },
          { week: 10, sets: 3, reps: "hold 15 sec" },
          { week: 11, sets: 3, reps: "hold 20 sec" },
          { week: 12, sets: 3, reps: "hold 25 sec" }
        ]
      },
      {
        id: "ak17",
        name: "Kitchen Worktop Press-Ups (Feet Back)",
        video: "57YFsNesJnY",
        sets: 3, reps: "15",
        description: "Feet further back for more challenge. Full range. ⚠️ Non-slip footwear.",
        progression: [
          { week: 9, sets: 3, reps: "12" },
          { week: 10, sets: 3, reps: "15" },
          { week: 11, sets: 4, reps: "12" },
          { week: 12, sets: 4, reps: "15" }
        ]
      },
      {
        id: "ak18",
        name: "Heel-to-Toe Walking",
        video: "2UYkGxizSkc",
        sets: 1, reps: "15 steps × 3",
        description: "Walk heel to toe in a line. Try without wall support. Builds balance and confidence.",
        progression: [
          { week: 9, sets: 1, reps: "10 steps × 3" },
          { week: 10, sets: 1, reps: "12 steps × 3" },
          { week: 11, sets: 1, reps: "15 steps × 3" },
          { week: 12, sets: 1, reps: "15 steps × 4" }
        ]
      },
      {
        id: "ak19",
        name: "Floor Transfer Practice",
        video: "ohiJAzQ7VL4",
        sets: 1, reps: "5",
        description: "Get down to the floor and back up confidently.",
        progression: [
          { week: 9, sets: 1, reps: "3" },
          { week: 10, sets: 1, reps: "4" },
          { week: 11, sets: 1, reps: "5" },
          { week: 12, sets: 1, reps: "5 (no support)" }
        ]
      },
      {
        id: "ak20",
        name: "Walking Programme",
        video: null,
        sets: 1, reps: "30–40 min brisk",
        description: "Maintain peak fitness. Include hills. Slightly breathless but conversational.",
        progression: [
          { week: 9, sets: 1, reps: "30 min (hills)" },
          { week: 10, sets: 1, reps: "35 min (hills)" },
          { week: 11, sets: 1, reps: "35 min brisk" },
          { week: 12, sets: 1, reps: "40 min brisk" }
        ]
      }
    ]
  }
};
