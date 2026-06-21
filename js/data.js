/* ============================================
   JOINT JOURNEY - Data
   All exercises, recipes, mindset content, 
   and getting ready content
   ============================================ */

// ===== MOTIVATIONAL QUOTES =====
const MOTIVATIONS = [
  "Every rep is a step closer to getting back to what you love.",
  "You're not just waiting for surgery - you're training for recovery.",
  "Small daily improvements lead to stunning results over time.",
  "Your future self will thank you for every effort you make today.",
  "Consistency beats perfection. Just keep showing up.",
  "You are stronger than you think. And getting stronger every day.",
  "This isn't just exercise - it's an investment in your independence.",
  "Picture yourself 6 months from now, doing what you love. That's why we do this.",
  "The best time to prepare was yesterday. The second best time is right now.",
  "Every healthy meal, every exercise, every positive thought - it all adds up.",
  "You're not alone on this journey. Thousands of people are preparing just like you.",
  "Your body is remarkable. Give it the tools and it will rise to the challenge.",
  "Progress, not perfection. You're doing brilliantly.",
  "The wait is hard. But you're using it wisely, and that makes all the difference.",
  "Believe in your recovery. Your belief is the foundation everything else is built on.",
  "Today's effort is tomorrow's strength.",
  "You've already taken the hardest step - you've started.",
  "A positive outlook is not just nice to have - it's your most powerful tool.",
  "Your garden, your grandchildren, your walks - they're all waiting for you.",
  "Recovery doesn't start after surgery. It starts right now, with you."
];

const MOOD_RESPONSES = {
  5: ["Brilliant! That positive energy is exactly what your body needs. Keep it up! 🌟", "Wonderful to hear! Days like this are fuel for the harder days. 😄", "Amazing! Your positivity is your superpower. 🎉"],
  4: ["Great to hear you're feeling good! Every good day is a building block. 😊", "That's lovely! Keep doing what you're doing. 👍", "Good days like this make all the difference. Well done! 💚"],
  3: ["An okay day is still a day you showed up. That counts for a lot. 🙂", "Some days are just okay, and that's perfectly fine. Tomorrow might surprise you. 💛", "Steady and consistent - that's what gets results. You're doing well. 👍"],
  2: ["Sorry to hear it's a tough day. Be gentle with yourself - tomorrow is a new day. 💙", "Hard days are part of the journey. Remember how far you've already come. 🤗", "It's okay to have a down day. Even doing a little bit today is an achievement. 💛"],
  1: ["I'm sorry you're struggling. Please remember you're not alone, and it's okay to ask for help. 💙", "Tough days don't last, but tough people do. Be kind to yourself today. 🤗", "If you're really struggling, please reach out to someone - your GP, a friend, or the Samaritans (116 123). You matter. 💙"]
};

// ===== EXERCISE PROGRAMMES =====

const HIP_EXERCISES = {
  phase1: { // Weeks 1-4: Foundation
    name: "Foundation Phase",
    description: "Building confidence, establishing the habit, and gently strengthening",
    sessionsPerWeek: 3,
    exercises: [
      {
        id: "h1",
        name: "Ankle Pumps",
        video: "KxfFzSOAT7g",
        sets: 2, reps: "15 each foot",
        description: "Sitting or lying down, pump your feet up and down as if pressing a car pedal. This improves circulation and keeps ankles mobile.",
        progression: [
          { week: 1, sets: 2, reps: "10 each foot" },
          { week: 2, sets: 2, reps: "12 each foot" },
          { week: 3, sets: 2, reps: "15 each foot" },
          { week: 4, sets: 3, reps: "15 each foot" }
        ]
      },
      {
        id: "h2",
        name: "Seated Knee Extension",
        video: "9Du-oWjs_lE",
        sets: 2, reps: "8 each leg",
        description: "Sitting in a chair, slowly straighten one leg out in front of you. Hold for 3 seconds, then slowly lower. This strengthens your thigh muscles (quadriceps).",
        progression: [
          { week: 1, sets: 2, reps: "6 each leg" },
          { week: 2, sets: 2, reps: "8 each leg" },
          { week: 3, sets: 3, reps: "8 each leg" },
          { week: 4, sets: 3, reps: "10 each leg" }
        ]
      },
      {
        id: "h3",
        name: "Seated Marching",
        video: "1hAQp7gIK8o",
        sets: 2, reps: "30 seconds",
        description: "Sitting tall in a chair, march your legs up and down, lifting your knees as high as is comfortable. Keep a steady rhythm.",
        progression: [
          { week: 1, sets: 2, reps: "20 seconds" },
          { week: 2, sets: 2, reps: "30 seconds" },
          { week: 3, sets: 3, reps: "30 seconds" },
          { week: 4, sets: 3, reps: "40 seconds" }
        ]
      },
      {
        id: "h4",
        name: "Chair Sit-to-Stand",
        video: "5yxfzyzEzBY",
        sets: 2, reps: "6",
        description: "From a sturdy chair, stand up using your legs (use armrests if needed), then slowly sit back down with control. This is one of the most important functional exercises.",
        progression: [
          { week: 1, sets: 2, reps: "4 (with arms)" },
          { week: 2, sets: 2, reps: "6 (with arms)" },
          { week: 3, sets: 2, reps: "8 (light arm use)" },
          { week: 4, sets: 3, reps: "8 (light arm use)" }
        ]
      },
      {
        id: "h5",
        name: "Standing Hip Abduction",
        video: "E36nkfxG15U",
        sets: 2, reps: "8 each leg",
        description: "Holding the kitchen worktop, slowly slide one leg out to the side, keeping your body upright. Bring it back. This strengthens the muscles around your hip.",
        progression: [
          { week: 1, sets: 2, reps: "6 each leg" },
          { week: 2, sets: 2, reps: "8 each leg" },
          { week: 3, sets: 3, reps: "8 each leg" },
          { week: 4, sets: 3, reps: "10 each leg" }
        ]
      },
      {
        id: "h6",
        name: "Standing Hip Extension",
        video: "ysG2GAdq2Uw",
        sets: 2, reps: "8 each leg",
        description: "Holding the worktop, slowly move one leg backwards, keeping your knee straight. Squeeze your buttock at the top. Return slowly.",
        progression: [
          { week: 1, sets: 2, reps: "6 each leg" },
          { week: 2, sets: 2, reps: "8 each leg" },
          { week: 3, sets: 3, reps: "8 each leg" },
          { week: 4, sets: 3, reps: "10 each leg" }
        ]
      },
      {
        id: "h7",
        name: "Heel Raises",
        video: "4Wn5ugI7VU8",
        sets: 2, reps: "10",
        description: "Holding the worktop for balance, rise up onto your toes, hold for 2 seconds, then slowly lower back down. Strengthens your calves.",
        progression: [
          { week: 1, sets: 2, reps: "8" },
          { week: 2, sets: 2, reps: "10" },
          { week: 3, sets: 3, reps: "10" },
          { week: 4, sets: 3, reps: "12" }
        ]
      }
    ]
  },
  phase2: { // Weeks 5-8: Building
    name: "Building Phase",
    description: "Increasing challenge, adding functional movements",
    sessionsPerWeek: 4,
    exercises: [
      {
        id: "h8",
        name: "Chair Sit-to-Stand (Progressed)",
        video: "5yxfzyzEzBY",
        sets: 3, reps: "10",
        description: "From a sturdy chair, stand up using mainly your legs (minimal arm use). Sit down slowly, taking 3 seconds to lower yourself. Control is key.",
        progression: [
          { week: 5, sets: 3, reps: "8 (minimal arms)" },
          { week: 6, sets: 3, reps: "10 (minimal arms)" },
          { week: 7, sets: 3, reps: "10 (arms crossed)" },
          { week: 8, sets: 3, reps: "12 (arms crossed)" }
        ]
      },
      {
        id: "h9",
        name: "Step Ups (Bottom Stair)",
        video: "wfhXnLILqdk",
        sets: 2, reps: "8 each leg",
        description: "Using the bottom stair and holding the banister, step up with one foot, bring the other up to join, then step back down. Lead with a different leg each time.",
        progression: [
          { week: 5, sets: 2, reps: "6 each leg" },
          { week: 6, sets: 2, reps: "8 each leg" },
          { week: 7, sets: 3, reps: "8 each leg" },
          { week: 8, sets: 3, reps: "10 each leg" }
        ]
      },
      {
        id: "h11",
        name: "Standing Hip Abduction (Progressed)",
        video: "E36nkfxG15U",
        sets: 3, reps: "12 each leg",
        description: "As before, but slower (3 seconds out, 3 seconds back). Focus on controlling the movement throughout.",
        progression: [
          { week: 5, sets: 3, reps: "10 each leg" },
          { week: 6, sets: 3, reps: "10 each leg (slower)" },
          { week: 7, sets: 3, reps: "12 each leg" },
          { week: 8, sets: 3, reps: "12 each leg (slower)" }
        ]
      },
      {
        id: "h12",
        name: "Tandem Standing (Balance)",
        video: "F3tYhTA_97g",
        sets: 3, reps: "hold 20 seconds each side",
        description: "Stand with one foot directly in front of the other (heel to toe), holding the worktop lightly. Try to reduce hand support over time. This builds balance.",
        progression: [
          { week: 5, sets: 3, reps: "hold 10 sec each" },
          { week: 6, sets: 3, reps: "hold 15 sec each" },
          { week: 7, sets: 3, reps: "hold 20 sec each" },
          { week: 8, sets: 3, reps: "hold 25 sec each" }
        ]
      },
      {
        id: "h13",
        name: "Bridging",
        video: "Rq3EXYus03E",
        sets: 3, reps: "10",
        description: "Lie on your back with knees bent. Squeeze your buttocks and lift your hips off the bed/floor. Hold for 3 seconds, then lower slowly. Strengthens buttocks and core.",
        progression: [
          { week: 5, sets: 2, reps: "8" },
          { week: 6, sets: 3, reps: "8" },
          { week: 7, sets: 3, reps: "10" },
          { week: 8, sets: 3, reps: "12" }
        ]
      },
      {
        id: "h15",
        name: "Seated Knee Extension (Progressed)",
        video: "9Du-oWjs_lE",
        sets: 3, reps: "10 each leg",
        description: "As before, but hold at the top for 5 seconds. Really squeeze your thigh muscle at the top of the movement.",
        progression: [
          { week: 5, sets: 3, reps: "8, hold 3 sec" },
          { week: 6, sets: 3, reps: "10, hold 3 sec" },
          { week: 7, sets: 3, reps: "10, hold 5 sec" },
          { week: 8, sets: 3, reps: "12, hold 5 sec" }
        ]
      }
    ]
  },
  phase3: { // Weeks 9-12: Preparing
    name: "Preparation Phase",
    description: "Functional combinations, building endurance, getting surgery-ready",
    sessionsPerWeek: 4,
    exercises: [
      {
        id: "h16",
        name: "Chair Sit-to-Stand (No Arms)",
        video: "5yxfzyzEzBY",
        sets: 3, reps: "12",
        description: "Stand from a chair with arms crossed on your chest. Sit down slowly taking 4 seconds. If this is too hard, use a higher seat.",
        progression: [
          { week: 9, sets: 3, reps: "10" },
          { week: 10, sets: 3, reps: "12" },
          { week: 11, sets: 3, reps: "12 (lower chair)" },
          { week: 12, sets: 3, reps: "15" }
        ]
      },
      {
        id: "h17",
        name: "Step Ups with Controlled Descent",
        video: "wfhXnLILqdk",
        sets: 3, reps: "10 each leg",
        description: "Step up onto the bottom stair, then step down slowly - taking 3 seconds to lower yourself. This mimics going downstairs, which is important for daily life.",
        progression: [
          { week: 9, sets: 3, reps: "8 each" },
          { week: 10, sets: 3, reps: "10 each" },
          { week: 11, sets: 3, reps: "10 each (slower)" },
          { week: 12, sets: 3, reps: "12 each" }
        ]
      },
      {
        id: "h18",
        name: "Kitchen Worktop Press-Ups",
        video: "57YFsNesJnY",
        sets: 3, reps: "10",
        description: "Stand arm's length from the kitchen worktop. Place hands on the edge and do a press-up movement. Builds upper body strength for using walking aids. ⚠️ Do not do this exercise if your kitchen floor is slippery or if you are not wearing appropriate footwear - there is a risk of slipping.",
        progression: [
          { week: 9, sets: 2, reps: "8" },
          { week: 10, sets: 3, reps: "8" },
          { week: 11, sets: 3, reps: "10" },
          { week: 12, sets: 3, reps: "12" }
        ]
      },
      {
        id: "h19",
        name: "Single Leg Balance",
        video: "Dtgh2_LFkBQ",
        sets: 3, reps: "hold 15 sec each leg",
        description: "Stand near the worktop. Lift one foot slightly off the ground. Try to balance with minimal hand support. This is crucial for walking confidence.",
        progression: [
          { week: 9, sets: 3, reps: "hold 10 sec" },
          { week: 10, sets: 3, reps: "hold 15 sec" },
          { week: 11, sets: 3, reps: "hold 20 sec" },
          { week: 12, sets: 3, reps: "hold 25 sec" }
        ]
      },
      {
        id: "h20",
        name: "Side Stepping",
        video: "C0kFihNtCtA",
        sets: 2, reps: "10 steps each direction",
        description: "Holding the worktop, take sideways steps along its length. Keep your toes pointing forward. Step, bring feet together, step again.",
        progression: [
          { week: 9, sets: 2, reps: "8 each way" },
          { week: 10, sets: 2, reps: "10 each way" },
          { week: 11, sets: 3, reps: "10 each way" },
          { week: 12, sets: 3, reps: "12 each way" }
        ]
      },
      {
        id: "h21",
        name: "Bridging with Hold",
        video: "Rq3EXYus03E",
        sets: 3, reps: "10, hold 5 sec",
        description: "Lie on your back, lift hips, hold for 5 seconds at the top. Squeeze buttocks hard. This builds the gluteal strength essential for walking.",
        progression: [
          { week: 9, sets: 3, reps: "10, hold 3 sec" },
          { week: 10, sets: 3, reps: "10, hold 5 sec" },
          { week: 11, sets: 3, reps: "12, hold 5 sec" },
          { week: 12, sets: 3, reps: "12, hold 7 sec" }
        ]
      },
      {
        id: "h22",
        name: "Standing March",
        video: "16oJspYFz7s",
        sets: 2, reps: "60 seconds",
        description: "March on the spot, lifting knees to hip height if possible. Pump your arms. This builds cardiovascular fitness for recovery.",
        progression: [
          { week: 9, sets: 2, reps: "45 seconds" },
          { week: 10, sets: 2, reps: "60 seconds" },
          { week: 11, sets: 3, reps: "60 seconds" },
          { week: 12, sets: 3, reps: "75 seconds" }
        ]
      },
      {
        id: "h23",
        name: "Floor Transfer Practice",
        video: "ohiJAzQ7VL4",
        sets: 1, reps: "3 each way",
        description: "Practice getting down to the floor and back up again safely. Use a sturdy chair for support. Important safety skill. Only attempt if you feel confident.",
        progression: [
          { week: 9, sets: 1, reps: "2 (with support)" },
          { week: 10, sets: 1, reps: "2 (with support)" },
          { week: 11, sets: 1, reps: "3 (with support)" },
          { week: 12, sets: 1, reps: "3" }
        ]
      },
      {
        id: "h14",
        name: "Heel-to-Toe Walking",
        video: "2UYkGxizSkc",
        sets: 1, reps: "10 steps × 3",
        description: "Walk in a straight line placing your heel directly in front of your toes each step. Use a wall for light support if needed. Builds balance and confidence.",
        progression: [
          { week: 9, sets: 1, reps: "6 steps × 2" },
          { week: 10, sets: 1, reps: "8 steps × 2" },
          { week: 11, sets: 1, reps: "10 steps × 2" },
          { week: 12, sets: 1, reps: "10 steps × 3" }
        ]
      }
    ]
  }
};

const KNEE_EXERCISES = {
  phase1: {
    name: "Foundation Phase",
    description: "Building confidence, establishing the habit, and gently strengthening",
    sessionsPerWeek: 3,
    exercises: [
      {
        id: "k1",
        name: "Ankle Pumps",
        video: "KxfFzSOAT7g",
        sets: 2, reps: "15 each foot",
        description: "Sitting or lying down, pump your feet up and down. Improves circulation and keeps ankles mobile.",
        progression: [
          { week: 1, sets: 2, reps: "10 each foot" },
          { week: 2, sets: 2, reps: "12 each foot" },
          { week: 3, sets: 2, reps: "15 each foot" },
          { week: 4, sets: 3, reps: "15 each foot" }
        ]
      },
      {
        id: "k2",
        name: "Seated Knee Extension",
        video: "9Du-oWjs_lE",
        sets: 2, reps: "8 each leg",
        description: "Sitting in a chair, slowly straighten one leg out. Hold for 3 seconds at the top, squeezing your thigh. Slowly lower. This is THE most important exercise for knee replacement.",
        progression: [
          { week: 1, sets: 2, reps: "6 each leg" },
          { week: 2, sets: 2, reps: "8 each leg" },
          { week: 3, sets: 3, reps: "8 each leg" },
          { week: 4, sets: 3, reps: "10 each leg" }
        ]
      },
      {
        id: "k3",
        name: "Seated Heel Slides",
        video: "RSv7E5AJMCg",
        sets: 2, reps: "10 each leg",
        description: "Sitting in a chair, slide your foot back under the chair as far as is comfortable, bending your knee. Slide it back out. This works on knee range of movement.",
        progression: [
          { week: 1, sets: 2, reps: "8 each leg" },
          { week: 2, sets: 2, reps: "10 each leg" },
          { week: 3, sets: 3, reps: "10 each leg" },
          { week: 4, sets: 3, reps: "12 each leg" }
        ]
      },
      {
        id: "k4",
        name: "Chair Sit-to-Stand",
        video: "5yxfzyzEzBY",
        sets: 2, reps: "6",
        description: "From a sturdy chair, stand up using your legs (use armrests if needed), then slowly sit back down with control.",
        progression: [
          { week: 1, sets: 2, reps: "4 (with arms)" },
          { week: 2, sets: 2, reps: "6 (with arms)" },
          { week: 3, sets: 2, reps: "8 (light arm use)" },
          { week: 4, sets: 3, reps: "8 (light arm use)" }
        ]
      },
      {
        id: "k5",
        name: "Standing Knee Bend",
        video: "k4TDxANOD4M",
        sets: 2, reps: "8 each leg",
        description: "Holding the worktop, stand on one leg and slowly bend the other knee, bringing your heel towards your buttock. Go only as far as comfortable. Slowly lower.",
        progression: [
          { week: 1, sets: 2, reps: "6 each leg" },
          { week: 2, sets: 2, reps: "8 each leg" },
          { week: 3, sets: 3, reps: "8 each leg" },
          { week: 4, sets: 3, reps: "10 each leg" }
        ]
      },
      {
        id: "k6",
        name: "Heel Raises",
        video: "4Wn5ugI7VU8",
        sets: 2, reps: "10",
        description: "Holding the worktop for balance, rise up onto your toes, hold for 2 seconds, then slowly lower. Strengthens calves.",
        progression: [
          { week: 1, sets: 2, reps: "8" },
          { week: 2, sets: 2, reps: "10" },
          { week: 3, sets: 3, reps: "10" },
          { week: 4, sets: 3, reps: "12" }
        ]
      },
      {
        id: "k7",
        name: "Seated Marching",
        video: "1hAQp7gIK8o",
        sets: 2, reps: "30 seconds",
        description: "Sitting tall, march your legs up and down, lifting knees as high as comfortable.",
        progression: [
          { week: 1, sets: 2, reps: "20 seconds" },
          { week: 2, sets: 2, reps: "30 seconds" },
          { week: 3, sets: 3, reps: "30 seconds" },
          { week: 4, sets: 3, reps: "40 seconds" }
        ]
      },
      {
        id: "k8a",
        name: "Inner Range Quads",
        video: "8rp5BB3qE6o",
        sets: 2, reps: "10 each leg, hold 5 sec",
        description: "Place a rolled-up towel under your knee. Press the back of your knee down into the towel, tightening your thigh muscle. Hold for 5 seconds, then release. This is the same exercise you'll do in hospital after surgery - learning it now means you'll be ahead of the game.",
        progression: [
          { week: 1, sets: 2, reps: "8 each, hold 3 sec" },
          { week: 2, sets: 2, reps: "10 each, hold 3 sec" },
          { week: 3, sets: 2, reps: "10 each, hold 5 sec" },
          { week: 4, sets: 3, reps: "10 each, hold 5 sec" }
        ]
      }
    ]
  },
  phase2: {
    name: "Building Phase",
    description: "Increasing challenge, adding functional movements",
    sessionsPerWeek: 4,
    exercises: [
      {
        id: "k8",
        name: "Chair Sit-to-Stand (Progressed)",
        video: "5yxfzyzEzBY",
        sets: 3, reps: "10",
        description: "Stand from a chair with minimal arm use. Sit down taking 3 seconds to lower. Focus on both legs working equally.",
        progression: [
          { week: 5, sets: 3, reps: "8 (minimal arms)" },
          { week: 6, sets: 3, reps: "10 (minimal arms)" },
          { week: 7, sets: 3, reps: "10 (arms crossed)" },
          { week: 8, sets: 3, reps: "12 (arms crossed)" }
        ]
      },
      {
        id: "k9",
        name: "Step Ups (Bottom Stair)",
        video: "wfhXnLILqdk",
        sets: 2, reps: "8 each leg",
        description: "Using the bottom stair and holding the banister, step up then step down with control.",
        progression: [
          { week: 5, sets: 2, reps: "6 each leg" },
          { week: 6, sets: 2, reps: "8 each leg" },
          { week: 7, sets: 3, reps: "8 each leg" },
          { week: 8, sets: 3, reps: "10 each leg" }
        ]
      },
      {
        id: "k11",
        name: "Standing Knee Bend (Progressed)",
        video: "k4TDxANOD4M",
        sets: 3, reps: "12 each leg",
        description: "As before but going slower (3 seconds to bend, 3 to straighten). Try to bend a little further each week.",
        progression: [
          { week: 5, sets: 3, reps: "10 each (slow)" },
          { week: 6, sets: 3, reps: "10 each (slower)" },
          { week: 7, sets: 3, reps: "12 each" },
          { week: 8, sets: 3, reps: "12 each (slower)" }
        ]
      },
      {
        id: "k12",
        name: "Tandem Standing (Balance)",
        video: "F3tYhTA_97g",
        sets: 3, reps: "hold 20 seconds each side",
        description: "Stand heel to toe, holding worktop lightly. Build balance confidence.",
        progression: [
          { week: 5, sets: 3, reps: "hold 10 sec" },
          { week: 6, sets: 3, reps: "hold 15 sec" },
          { week: 7, sets: 3, reps: "hold 20 sec" },
          { week: 8, sets: 3, reps: "hold 25 sec" }
        ]
      },
      {
        id: "k13",
        name: "Straight Leg Raise",
        video: "khnALX2LAOs",
        sets: 3, reps: "10 each leg",
        description: "Lying on your back, bend one knee. Keep the other leg straight and lift it to the height of the bent knee. Hold 3 seconds. Builds quad strength.",
        progression: [
          { week: 5, sets: 2, reps: "8 each" },
          { week: 6, sets: 3, reps: "8 each" },
          { week: 7, sets: 3, reps: "10 each" },
          { week: 8, sets: 3, reps: "12 each" }
        ]
      },
      {
        id: "k15",
        name: "Seated Knee Extension (Hold)",
        video: "9Du-oWjs_lE",
        sets: 3, reps: "10, hold 5 sec",
        description: "Straighten leg, hold 5 seconds at top, squeezing your thigh hard. This builds the quad strength critical for knee replacement recovery.",
        progression: [
          { week: 5, sets: 3, reps: "8, hold 3 sec" },
          { week: 6, sets: 3, reps: "10, hold 3 sec" },
          { week: 7, sets: 3, reps: "10, hold 5 sec" },
          { week: 8, sets: 3, reps: "12, hold 5 sec" }
        ]
      }
    ]
  },
  phase3: {
    name: "Preparation Phase",
    description: "Functional combinations, building endurance, getting surgery-ready",
    sessionsPerWeek: 4,
    exercises: [
      {
        id: "k16",
        name: "Chair Sit-to-Stand (No Arms)",
        video: "5yxfzyzEzBY",
        sets: 3, reps: "12",
        description: "Arms crossed, stand and sit with full control. Slow descent. Your quads will thank you after surgery.",
        progression: [
          { week: 9, sets: 3, reps: "10" },
          { week: 10, sets: 3, reps: "12" },
          { week: 11, sets: 3, reps: "12 (lower chair)" },
          { week: 12, sets: 3, reps: "15" }
        ]
      },
      {
        id: "k17",
        name: "Step Ups & Downs (Controlled)",
        video: "wfhXnLILqdk",
        sets: 3, reps: "10 each leg",
        description: "Step up onto bottom stair, step down taking 3 seconds. Control on the way down is more important than the way up.",
        progression: [
          { week: 9, sets: 3, reps: "8 each" },
          { week: 10, sets: 3, reps: "10 each" },
          { week: 11, sets: 3, reps: "10 each (slower)" },
          { week: 12, sets: 3, reps: "12 each" }
        ]
      },
      {
        id: "k18",
        name: "Kitchen Worktop Press-Ups",
        video: "57YFsNesJnY",
        sets: 3, reps: "10",
        description: "Arms-length from worktop, do press-ups. Builds arm strength for crutches/walking frame. ⚠️ Do not do this exercise if your kitchen floor is slippery or if you are not wearing appropriate footwear - there is a risk of slipping.",
        progression: [
          { week: 9, sets: 2, reps: "8" },
          { week: 10, sets: 3, reps: "8" },
          { week: 11, sets: 3, reps: "10" },
          { week: 12, sets: 3, reps: "12" }
        ]
      },
      {
        id: "k19",
        name: "Single Leg Balance",
        video: "Dtgh2_LFkBQ",
        sets: 3, reps: "hold 15 sec each",
        description: "Near worktop, lift one foot slightly. Balance with minimal support.",
        progression: [
          { week: 9, sets: 3, reps: "hold 10 sec" },
          { week: 10, sets: 3, reps: "hold 15 sec" },
          { week: 11, sets: 3, reps: "hold 20 sec" },
          { week: 12, sets: 3, reps: "hold 25 sec" }
        ]
      },
      {
        id: "k21",
        name: "Side Stepping",
        video: "C0kFihNtCtA",
        sets: 2, reps: "10 each direction",
        description: "Sideways steps along the worktop. Toes forward. Step, together, step.",
        progression: [
          { week: 9, sets: 2, reps: "8 each way" },
          { week: 10, sets: 2, reps: "10 each way" },
          { week: 11, sets: 3, reps: "10 each way" },
          { week: 12, sets: 3, reps: "12 each way" }
        ]
      },
      {
        id: "k22",
        name: "Standing March",
        video: "16oJspYFz7s",
        sets: 2, reps: "60 seconds",
        description: "March on the spot, knees up. Pump arms. Builds cardiovascular fitness.",
        progression: [
          { week: 9, sets: 2, reps: "45 seconds" },
          { week: 10, sets: 2, reps: "60 seconds" },
          { week: 11, sets: 3, reps: "60 seconds" },
          { week: 12, sets: 3, reps: "75 seconds" }
        ]
      },
      {
        id: "k23",
        name: "Floor Transfer Practice",
        video: "ohiJAzQ7VL4",
        sets: 1, reps: "3 each way",
        description: "Practice getting down to the floor and back up using a chair. Important safety skill.",
        progression: [
          { week: 9, sets: 1, reps: "2 (with support)" },
          { week: 10, sets: 1, reps: "2 (with support)" },
          { week: 11, sets: 1, reps: "3 (with support)" },
          { week: 12, sets: 1, reps: "3" }
        ]
      },
      {
        id: "k14",
        name: "Heel-to-Toe Walking",
        video: "2UYkGxizSkc",
        sets: 1, reps: "10 steps × 3",
        description: "Walk in a line, heel touching toes. Wall nearby for safety.",
        progression: [
          { week: 9, sets: 1, reps: "6 steps × 2" },
          { week: 10, sets: 1, reps: "8 steps × 2" },
          { week: 11, sets: 1, reps: "10 steps × 2" },
          { week: 12, sets: 1, reps: "10 steps × 3" }
        ]
      }
    ]
  }
};


// ===== RECIPES =====
const RECIPES = {
  breakfast: [
    {
      id: "b1", emoji: "🍳", name: "Shakshuka with Pitta Bread",
      calories: 380, protein: 18, prepTime: 10, cookTime: 15, serves: 2, difficulty: "Easy",
      ingredients: [
        { item: "Eggs", qty: "4", aisle: "Fresh" },
        { item: "Tinned chopped tomatoes", qty: "1 tin (400g)", aisle: "Cupboard" },
        { item: "Onion", qty: "1 medium", aisle: "Fresh" },
        { item: "Garlic cloves", qty: "2", aisle: "Fresh" },
        { item: "Paprika", qty: "1 tsp", aisle: "Cupboard" },
        { item: "Cumin", qty: "1 tsp", aisle: "Cupboard" },
        { item: "Pitta breads", qty: "4", aisle: "Bakery" },
        { item: "Olive oil", qty: "1 tbsp", aisle: "Cupboard" },
        { item: "Salt & pepper", qty: "to taste", aisle: "Cupboard" }
      ],
      method: [
        "Heat oil in a frying pan over medium heat. Dice the onion and cook for 3-4 minutes until soft.",
        "Add crushed garlic, paprika, and cumin. Stir for 30 seconds until fragrant.",
        "Pour in the tinned tomatoes. Season with salt and pepper. Simmer for 5 minutes until slightly thickened.",
        "Make 4 wells in the sauce and crack an egg into each one.",
        "Cover with a lid and cook for 5-6 minutes until the egg whites are set but yolks are still runny.",
        "Warm the pitta breads. Serve the shakshuka straight from the pan with pitta for dipping."
      ],
      tip: "Add a crumble of feta cheese on top if you have some - it's delicious but not essential."
    },
    {
      id: "b2", emoji: "🧀", name: "Cheese & Mushroom Omelette",
      calories: 370, protein: 28, prepTime: 5, cookTime: 8, serves: 1, difficulty: "Easy",
      ingredients: [
        { item: "Eggs", qty: "3", aisle: "Fresh" },
        { item: "Mushrooms", qty: "4-5", aisle: "Fresh" },
        { item: "Cheddar cheese", qty: "30g, grated", aisle: "Fridge" },
        { item: "Butter", qty: "small knob", aisle: "Fridge" },
        { item: "Wholemeal toast", qty: "1 slice", aisle: "Bakery" },
        { item: "Salt & pepper", qty: "to taste", aisle: "Cupboard" }
      ],
      method: [
        "Slice the mushrooms. Melt butter in a non-stick frying pan and cook mushrooms for 3-4 minutes until golden.",
        "Beat the eggs with a splash of water, salt and pepper.",
        "Push mushrooms to one side, pour in the eggs. Swirl to cover the pan.",
        "Cook for 2-3 minutes until mostly set. Sprinkle cheese and mushrooms over one half.",
        "Fold the other half over. Slide onto a plate.",
        "Serve with toast."
      ],
      tip: "Add a handful of spinach with the mushrooms for extra iron."
    },
    {
      id: "b3", emoji: "🥣", name: "Porridge with Banana, Honey & Cinnamon",
      calories: 360, protein: 14, prepTime: 2, cookTime: 5, serves: 1, difficulty: "Very Easy",
      ingredients: [
        { item: "Porridge oats", qty: "50g", aisle: "Cupboard" },
        { item: "Milk (any)", qty: "250ml", aisle: "Fridge" },
        { item: "Banana", qty: "1", aisle: "Fresh" },
        { item: "Honey", qty: "1 tsp", aisle: "Cupboard" },
        { item: "Cinnamon", qty: "pinch", aisle: "Cupboard" }
      ],
      method: [
        "Put oats and milk in a saucepan. Cook over medium heat, stirring frequently, for 4-5 minutes until thick and creamy.",
        "Pour into a bowl. Slice the banana on top.",
        "Drizzle with honey and sprinkle with cinnamon.",
        "Eat while warm."
      ],
      tip: "Make it in the microwave: combine oats and milk in a bowl, microwave 2-3 minutes, stir halfway."
    },
    {
      id: "b4", emoji: "🐟", name: "Smoked Salmon & Scrambled Eggs on Toast",
      calories: 400, protein: 28, prepTime: 3, cookTime: 5, serves: 1, difficulty: "Easy",
      ingredients: [
        { item: "Eggs", qty: "2", aisle: "Fresh" },
        { item: "Smoked salmon", qty: "50g (2 slices)", aisle: "Fridge" },
        { item: "Wholemeal bread", qty: "2 slices", aisle: "Bakery" },
        { item: "Butter", qty: "small knob", aisle: "Fridge" },
        { item: "Black pepper", qty: "to taste", aisle: "Cupboard" }
      ],
      method: [
        "Toast the bread.",
        "Beat the eggs with a little black pepper (no salt - the salmon is salty).",
        "Melt butter in a non-stick pan over low heat. Add eggs and stir gently with a spatula.",
        "Remove from heat while still slightly wet - they'll continue cooking from the heat of the pan.",
        "Lay smoked salmon on the toast, spoon scrambled eggs on top.",
        "Grind over some black pepper."
      ],
      tip: "This is a great weekend treat. The smoked salmon is available in all supermarkets in the chilled section."
    },
    {
      id: "b5", emoji: "🫐", name: "Greek Yoghurt with Berries, Granola & Honey",
      calories: 320, protein: 18, prepTime: 3, cookTime: 0, serves: 1, difficulty: "Very Easy",
      ingredients: [
        { item: "Greek yoghurt", qty: "150g", aisle: "Fridge" },
        { item: "Frozen mixed berries", qty: "80g", aisle: "Freezer" },
        { item: "Granola", qty: "30g", aisle: "Cupboard" },
        { item: "Honey", qty: "1 tsp", aisle: "Cupboard" }
      ],
      method: [
        "Defrost berries in the microwave for 30 seconds, or take them out the night before.",
        "Spoon yoghurt into a bowl. Top with berries and granola.",
        "Drizzle with honey.",
        "Eat immediately so the granola stays crunchy."
      ],
      tip: "High in protein from the Greek yoghurt - great for muscle recovery. Frozen berries are cheaper than fresh and just as nutritious."
    },
    {
      id: "b6", emoji: "🫘", name: "Beans on Toast with Cheese & Worcester Sauce",
      calories: 420, protein: 22, prepTime: 2, cookTime: 5, serves: 1, difficulty: "Very Easy",
      ingredients: [
        { item: "Baked beans", qty: "half tin (200g)", aisle: "Cupboard" },
        { item: "Wholemeal bread", qty: "2 slices", aisle: "Bakery" },
        { item: "Cheddar cheese", qty: "30g, grated", aisle: "Fridge" },
        { item: "Worcestershire sauce", qty: "few shakes", aisle: "Cupboard" }
      ],
      method: [
        "Toast the bread. Heat the beans in a saucepan or microwave.",
        "Add a few shakes of Worcestershire sauce to the beans - trust me, it makes them.",
        "Pour beans over toast. Sprinkle with grated cheese.",
        "The cheese will melt from the heat of the beans."
      ],
      tip: "A British classic elevated slightly. Cheap, filling, and surprisingly good protein."
    },
    {
      id: "b7", emoji: "🍌", name: "Banana & Peanut Butter Smoothie",
      calories: 300, protein: 18, prepTime: 3, cookTime: 0, serves: 1, difficulty: "Very Easy",
      ingredients: [
        { item: "Banana", qty: "1 (frozen is even better)", aisle: "Fresh" },
        { item: "Peanut butter", qty: "1 tbsp", aisle: "Cupboard" },
        { item: "Milk", qty: "200ml", aisle: "Fridge" },
        { item: "Greek yoghurt", qty: "2 tbsp", aisle: "Fridge" },
        { item: "Porridge oats", qty: "1 tbsp", aisle: "Cupboard" }
      ],
      method: [
        "Put everything in a blender or use a hand blender in a tall jug.",
        "Blend until smooth.",
        "Pour into a glass. Drink immediately."
      ],
      tip: "Freeze overripe bananas for smoothies - they make it thicker and creamier. Great for when you don't feel like cooking."
    },
    {
      id: "b8", emoji: "🍞", name: "Eggy Bread with Berries & Cinnamon",
      calories: 350, protein: 16, prepTime: 3, cookTime: 5, serves: 1, difficulty: "Easy",
      ingredients: [
        { item: "Bread", qty: "2 thick slices", aisle: "Bakery" },
        { item: "Eggs", qty: "2", aisle: "Fresh" },
        { item: "Milk", qty: "splash", aisle: "Fridge" },
        { item: "Cinnamon", qty: "½ tsp", aisle: "Cupboard" },
        { item: "Butter", qty: "small knob", aisle: "Fridge" },
        { item: "Frozen berries", qty: "handful", aisle: "Freezer" }
      ],
      method: [
        "Beat eggs with milk and cinnamon in a shallow dish.",
        "Soak each slice of bread in the egg mixture for 10 seconds each side.",
        "Melt butter in a frying pan over medium heat.",
        "Fry the soaked bread for 2-3 minutes each side until golden.",
        "Serve topped with warmed berries."
      ],
      tip: "A treat breakfast that feels indulgent but is actually quite nutritious."
    },
    {
      id: "b9", emoji: "🥑", name: "Avocado on Toast with Poached Egg",
      calories: 380, protein: 16, prepTime: 5, cookTime: 5, serves: 1, difficulty: "Easy",
      ingredients: [
        { item: "Avocado", qty: "½", aisle: "Fresh" },
        { item: "Eggs", qty: "1", aisle: "Fresh" },
        { item: "Wholemeal bread", qty: "2 slices", aisle: "Bakery" },
        { item: "Lemon juice", qty: "squeeze", aisle: "Fresh" },
        { item: "Chilli flakes", qty: "pinch (optional)", aisle: "Cupboard" },
        { item: "Salt & pepper", qty: "to taste", aisle: "Cupboard" }
      ],
      method: [
        "Toast the bread.",
        "Mash the avocado with lemon juice, salt and pepper.",
        "Bring a small pan of water to a gentle simmer. Crack the egg into the water. Cook 3-4 minutes for runny yolk.",
        "Spread avocado on toast. Top with poached egg.",
        "Sprinkle with chilli flakes if you like."
      ],
      tip: "If poaching eggs seems tricky, a fried egg works just as well."
    },
    {
      id: "b10", emoji: "🍎", name: "Overnight Oats with Apple & Cinnamon",
      calories: 340, protein: 14, prepTime: 5, cookTime: 0, serves: 1, difficulty: "Very Easy",
      ingredients: [
        { item: "Porridge oats", qty: "50g", aisle: "Cupboard" },
        { item: "Milk", qty: "150ml", aisle: "Fridge" },
        { item: "Greek yoghurt", qty: "2 tbsp", aisle: "Fridge" },
        { item: "Apple", qty: "1, grated", aisle: "Fresh" },
        { item: "Cinnamon", qty: "½ tsp", aisle: "Cupboard" },
        { item: "Honey", qty: "1 tsp", aisle: "Cupboard" }
      ],
      method: [
        "The night before: mix oats, milk, yoghurt, grated apple and cinnamon in a jar or bowl.",
        "Cover and put in the fridge overnight.",
        "In the morning, stir and drizzle with honey.",
        "Eat cold straight from the fridge - it's ready to go."
      ],
      tip: "Perfect for mornings when you're in a rush or don't feel like cooking. Prep the night before and it's waiting for you."
    }
  ],

  "lunch-dinner": [
    {
      id: "ld1", emoji: "🍗", name: "Chicken & Vegetable Stir Fry with Rice",
      calories: 450, protein: 36, prepTime: 10, cookTime: 15, serves: 2, difficulty: "Easy",
      ingredients: [
        { item: "Chicken breast", qty: "2", aisle: "Fresh" },
        { item: "Frozen stir fry vegetables", qty: "300g bag", aisle: "Freezer" },
        { item: "Soy sauce", qty: "2 tbsp", aisle: "Cupboard" },
        { item: "Garlic cloves", qty: "2", aisle: "Fresh" },
        { item: "Ginger paste (jar)", qty: "1 tsp", aisle: "Cupboard" },
        { item: "Rice", qty: "150g (dry)", aisle: "Cupboard" },
        { item: "Vegetable oil", qty: "1 tbsp", aisle: "Cupboard" }
      ],
      method: [
        "Cook rice according to packet instructions.",
        "Slice chicken into thin strips. Heat oil in a large frying pan or wok over high heat.",
        "Cook chicken for 5-6 minutes until golden and cooked through.",
        "Add garlic and ginger, stir for 30 seconds.",
        "Add frozen vegetables. Cook for 3-4 minutes until hot through.",
        "Add soy sauce, toss everything together. Serve over rice."
      ],
      tip: "Frozen stir fry veg saves all the chopping and is just as nutritious. Keep a bag in the freezer."
    },
    {
      id: "ld2", emoji: "🍝", name: "Spaghetti Bolognese",
      calories: 480, protein: 32, prepTime: 10, cookTime: 25, serves: 4, difficulty: "Easy",
      ingredients: [
        { item: "Beef mince (lean)", qty: "500g", aisle: "Fresh" },
        { item: "Tinned chopped tomatoes", qty: "2 tins (800g)", aisle: "Cupboard" },
        { item: "Onion", qty: "1 large", aisle: "Fresh" },
        { item: "Carrot", qty: "1, grated", aisle: "Fresh" },
        { item: "Celery stick", qty: "1, diced", aisle: "Fresh" },
        { item: "Garlic cloves", qty: "2", aisle: "Fresh" },
        { item: "Mixed herbs", qty: "1 tsp", aisle: "Cupboard" },
        { item: "Spaghetti", qty: "320g", aisle: "Cupboard" },
        { item: "Olive oil", qty: "1 tbsp", aisle: "Cupboard" }
      ],
      method: [
        "Dice the onion and celery. Grate the carrot. Heat oil in a large saucepan.",
        "Cook onion, carrot and celery for 5 minutes until softened.",
        "Add garlic, cook 30 seconds. Add mince, break it up, cook until browned.",
        "Add tinned tomatoes and herbs. Season well. Simmer for 20 minutes.",
        "Cook spaghetti according to packet. Drain.",
        "Serve sauce over spaghetti."
      ],
      tip: "Make double and freeze portions. Having ready meals in the freezer is great for after surgery too."
    },
    {
      id: "ld3", emoji: "🐟", name: "Tuna Pasta Bake",
      calories: 450, protein: 30, prepTime: 10, cookTime: 20, serves: 4, difficulty: "Easy",
      ingredients: [
        { item: "Pasta (penne or similar)", qty: "300g", aisle: "Cupboard" },
        { item: "Tinned tuna (in spring water)", qty: "2 tins", aisle: "Cupboard" },
        { item: "Tinned sweetcorn", qty: "1 tin", aisle: "Cupboard" },
        { item: "Passata", qty: "500g", aisle: "Cupboard" },
        { item: "Cheddar cheese", qty: "80g, grated", aisle: "Fridge" },
        { item: "Mixed herbs", qty: "1 tsp", aisle: "Cupboard" }
      ],
      method: [
        "Preheat oven to 190°C. Cook pasta until just underdone (it'll finish in the oven).",
        "Drain tuna and sweetcorn. Mix with passata and herbs.",
        "Drain pasta and add to the tuna mixture. Stir well.",
        "Pour into an oven dish. Top with grated cheese.",
        "Bake for 15-20 minutes until cheese is golden and bubbling."
      ],
      tip: "Everything from the cupboard except the cheese - perfect for when you haven't been shopping."
    },
    {
      id: "ld4", emoji: "🌮", name: "Chicken Fajita Wraps",
      calories: 460, protein: 34, prepTime: 10, cookTime: 12, serves: 2, difficulty: "Easy",
      ingredients: [
        { item: "Chicken breast", qty: "2", aisle: "Fresh" },
        { item: "Peppers (any colour)", qty: "2", aisle: "Fresh" },
        { item: "Onion", qty: "1", aisle: "Fresh" },
        { item: "Tortilla wraps", qty: "4", aisle: "Bakery" },
        { item: "Paprika", qty: "1 tsp", aisle: "Cupboard" },
        { item: "Cumin", qty: "½ tsp", aisle: "Cupboard" },
        { item: "Lime", qty: "1", aisle: "Fresh" },
        { item: "Sour cream", qty: "2 tbsp", aisle: "Fridge" },
        { item: "Vegetable oil", qty: "1 tbsp", aisle: "Cupboard" }
      ],
      method: [
        "Slice chicken, peppers and onion into strips.",
        "Mix chicken with paprika, cumin and a squeeze of lime.",
        "Heat oil in a large frying pan. Cook chicken for 5-6 minutes.",
        "Add peppers and onion. Cook another 4-5 minutes until softened.",
        "Warm tortillas in the microwave for 20 seconds.",
        "Fill wraps with chicken mixture. Top with sour cream and lime juice."
      ],
      tip: "Great fun to eat and easy to customise. Add grated cheese, lettuce, or salsa."
    },
    {
      id: "ld5", emoji: "🥘", name: "Cottage Pie",
      calories: 430, protein: 28, prepTime: 15, cookTime: 30, serves: 4, difficulty: "Medium",
      ingredients: [
        { item: "Beef mince", qty: "500g", aisle: "Fresh" },
        { item: "Potatoes", qty: "800g", aisle: "Fresh" },
        { item: "Onion", qty: "1", aisle: "Fresh" },
        { item: "Carrots", qty: "2", aisle: "Fresh" },
        { item: "Frozen peas", qty: "100g", aisle: "Freezer" },
        { item: "Beef gravy granules", qty: "2 tbsp", aisle: "Cupboard" },
        { item: "Butter", qty: "knob", aisle: "Fridge" },
        { item: "Milk", qty: "splash", aisle: "Fridge" },
        { item: "Cheddar cheese", qty: "40g", aisle: "Fridge" }
      ],
      method: [
        "Peel and chop potatoes. Boil for 15 minutes until tender.",
        "Meanwhile, brown the mince in a large pan. Drain excess fat. Add diced onion and carrot, cook 5 mins.",
        "Add 300ml water and gravy granules. Simmer 10 mins. Add peas.",
        "Drain potatoes. Mash with butter and milk. Season well.",
        "Pour mince into an oven dish. Top with mash. Sprinkle with cheese.",
        "Grill for 5-10 minutes until golden on top."
      ],
      tip: "Make double and freeze the second one. Pure comfort food that freezes brilliantly."
    },
    {
      id: "ld6", emoji: "🐠", name: "Salmon with Lemon, New Potatoes & Green Beans",
      calories: 450, protein: 34, prepTime: 5, cookTime: 20, serves: 2, difficulty: "Easy",
      ingredients: [
        { item: "Salmon fillets", qty: "2", aisle: "Fresh" },
        { item: "New potatoes", qty: "400g", aisle: "Fresh" },
        { item: "Green beans", qty: "200g", aisle: "Fresh" },
        { item: "Lemon", qty: "1", aisle: "Fresh" },
        { item: "Mixed herbs", qty: "1 tsp", aisle: "Cupboard" },
        { item: "Olive oil", qty: "1 tbsp", aisle: "Cupboard" }
      ],
      method: [
        "Preheat oven to 200°C. Halve the new potatoes and boil for 12-15 minutes.",
        "Place salmon on a baking tray. Drizzle with olive oil, squeeze lemon, sprinkle herbs. Season.",
        "Bake salmon for 12-15 minutes.",
        "Boil green beans for 3-4 minutes. Drain.",
        "Serve salmon with potatoes and beans. Extra lemon wedge on the side."
      ],
      tip: "Salmon is rich in omega-3 which has anti-inflammatory properties - great for your joints."
    },
    {
      id: "ld7", emoji: "🍛", name: "Chicken Tikka with Rice & Naan",
      calories: 500, protein: 38, prepTime: 10, cookTime: 20, serves: 2, difficulty: "Easy",
      ingredients: [
        { item: "Chicken breast", qty: "2, cubed", aisle: "Fresh" },
        { item: "Natural yoghurt", qty: "3 tbsp", aisle: "Fridge" },
        { item: "Curry powder", qty: "2 tsp", aisle: "Cupboard" },
        { item: "Paprika", qty: "1 tsp", aisle: "Cupboard" },
        { item: "Garlic cloves", qty: "2", aisle: "Fresh" },
        { item: "Rice", qty: "150g (dry)", aisle: "Cupboard" },
        { item: "Naan breads", qty: "2 (shop-bought)", aisle: "Bakery" },
        { item: "Lemon", qty: "½", aisle: "Fresh" }
      ],
      method: [
        "Mix yoghurt, curry powder, paprika, crushed garlic and lemon juice.",
        "Add cubed chicken. Marinate for at least 10 mins (or overnight if you can).",
        "Cook rice. Heat a frying pan to high. Cook chicken pieces for 8-10 mins, turning, until charred and cooked through.",
        "Warm naan breads. Serve chicken over rice with naan on the side."
      ],
      tip: "Marinate overnight for the best flavour. The yoghurt tenderises the chicken beautifully."
    },
    {
      id: "ld8", emoji: "🥔", name: "Jacket Potato with Chilli",
      calories: 500, protein: 28, prepTime: 5, cookTime: 60, serves: 2, difficulty: "Easy",
      ingredients: [
        { item: "Baking potatoes", qty: "2 large", aisle: "Fresh" },
        { item: "Beef mince", qty: "250g", aisle: "Fresh" },
        { item: "Tinned kidney beans", qty: "1 tin", aisle: "Cupboard" },
        { item: "Tinned chopped tomatoes", qty: "1 tin", aisle: "Cupboard" },
        { item: "Onion", qty: "1", aisle: "Fresh" },
        { item: "Paprika", qty: "1 tsp", aisle: "Cupboard" },
        { item: "Cumin", qty: "1 tsp", aisle: "Cupboard" },
        { item: "Cheddar cheese", qty: "40g", aisle: "Fridge" },
        { item: "Sour cream", qty: "2 tbsp", aisle: "Fridge" }
      ],
      method: [
        "Preheat oven to 200°C. Prick potatoes, bake for 60 minutes (or microwave 10 mins then oven 20 mins).",
        "Brown mince in a pan. Add diced onion, cook 3 mins. Add paprika and cumin.",
        "Add tomatoes and drained kidney beans. Simmer 20 mins.",
        "Split potatoes open. Fill with chilli. Top with cheese and sour cream."
      ],
      tip: "The chilli freezes well - make a big batch. Microwave + oven combo for the potatoes saves time."
    },
    {
      id: "ld9", emoji: "🍖", name: "Sausage & Bean Casserole with Crusty Bread",
      calories: 480, protein: 24, prepTime: 5, cookTime: 25, serves: 3, difficulty: "Easy",
      ingredients: [
        { item: "Pork sausages", qty: "6", aisle: "Fresh" },
        { item: "Baked beans", qty: "1 tin (400g)", aisle: "Cupboard" },
        { item: "Tinned chopped tomatoes", qty: "1 tin", aisle: "Cupboard" },
        { item: "Onion", qty: "1", aisle: "Fresh" },
        { item: "Mixed herbs", qty: "1 tsp", aisle: "Cupboard" },
        { item: "Mustard", qty: "1 tsp", aisle: "Fridge" },
        { item: "Crusty bread", qty: "to serve", aisle: "Bakery" }
      ],
      method: [
        "Brown sausages in a large pan for 5 minutes, turning regularly.",
        "Add sliced onion, cook 3 minutes. Add tomatoes, beans, herbs and mustard.",
        "Simmer for 15-20 minutes until sausages are cooked through and sauce thickens.",
        "Serve with crusty bread to mop up the sauce."
      ],
      tip: "Comfort food at its finest. Add a handful of spinach at the end if you want some extra greens."
    },
    {
      id: "ld10", emoji: "🦐", name: "Prawn Stir Fry with Noodles",
      calories: 400, protein: 26, prepTime: 5, cookTime: 10, serves: 2, difficulty: "Easy",
      ingredients: [
        { item: "Frozen prawns", qty: "200g", aisle: "Freezer" },
        { item: "Egg noodles", qty: "2 nests", aisle: "Cupboard" },
        { item: "Frozen stir fry vegetables", qty: "200g", aisle: "Freezer" },
        { item: "Soy sauce", qty: "2 tbsp", aisle: "Cupboard" },
        { item: "Garlic cloves", qty: "2", aisle: "Fresh" },
        { item: "Vegetable oil", qty: "1 tbsp", aisle: "Cupboard" }
      ],
      method: [
        "Cook noodles according to packet. Drain.",
        "Heat oil in a wok or large frying pan. Add garlic, cook 30 seconds.",
        "Add prawns (defrosted) and vegetables. Cook on high heat for 4-5 minutes.",
        "Add noodles and soy sauce. Toss everything together for 1-2 minutes.",
        "Serve immediately."
      ],
      tip: "Ready in 15 minutes start to finish. Keep prawns and stir fry veg in the freezer for quick meals."
    },
    {
      id: "ld11", emoji: "🥣", name: "Lentil & Tomato Soup with Cheesy Toast",
      calories: 400, protein: 20, prepTime: 5, cookTime: 25, serves: 4, difficulty: "Easy",
      ingredients: [
        { item: "Red lentils", qty: "200g", aisle: "Cupboard" },
        { item: "Tinned chopped tomatoes", qty: "1 tin", aisle: "Cupboard" },
        { item: "Onion", qty: "1", aisle: "Fresh" },
        { item: "Carrot", qty: "1", aisle: "Fresh" },
        { item: "Vegetable stock cube", qty: "1", aisle: "Cupboard" },
        { item: "Cumin", qty: "1 tsp", aisle: "Cupboard" },
        { item: "Lemon juice", qty: "squeeze", aisle: "Fresh" },
        { item: "Bread", qty: "2 slices per person", aisle: "Bakery" },
        { item: "Cheddar cheese", qty: "for topping", aisle: "Fridge" }
      ],
      method: [
        "Dice onion and carrot. Cook in a little oil for 3-4 minutes.",
        "Add lentils, tomatoes, cumin and 600ml water with crumbled stock cube.",
        "Simmer for 20 minutes until lentils are soft.",
        "Blend if you like (or leave chunky). Add lemon juice and season.",
        "Toast bread, top with grated cheese and grill until melted.",
        "Serve soup with cheesy toast for dipping."
      ],
      tip: "Red lentils are incredibly cheap and packed with protein and fibre. This soup freezes perfectly."
    },
    {
      id: "ld12", emoji: "🍝", name: "Ham & Leek Pasta",
      calories: 460, protein: 26, prepTime: 5, cookTime: 15, serves: 2, difficulty: "Easy",
      ingredients: [
        { item: "Pasta", qty: "200g", aisle: "Cupboard" },
        { item: "Ham (thick sliced)", qty: "150g, chopped", aisle: "Fridge" },
        { item: "Leek", qty: "1 large", aisle: "Fresh" },
        { item: "Crème fraîche", qty: "3 tbsp", aisle: "Fridge" },
        { item: "Black pepper", qty: "plenty", aisle: "Cupboard" },
        { item: "Parmesan or cheddar", qty: "20g, grated", aisle: "Fridge" }
      ],
      method: [
        "Cook pasta. Slice leek into rounds, wash well.",
        "Fry leek in a knob of butter for 5 minutes until soft.",
        "Add chopped ham, cook 2 minutes. Add crème fraîche and 2 tbsp pasta water.",
        "Drain pasta and add to the sauce. Toss together.",
        "Serve with grated cheese and plenty of black pepper."
      ],
      tip: "Simple, creamy, satisfying. Leeks are underrated - gentle and sweet when cooked."
    },
    {
      id: "ld13", emoji: "🥧", name: "Fish Pie",
      calories: 470, protein: 32, prepTime: 15, cookTime: 25, serves: 4, difficulty: "Medium",
      ingredients: [
        { item: "Fish pie mix (cod, salmon, smoked haddock)", qty: "400g", aisle: "Fresh" },
        { item: "Frozen prawns", qty: "100g", aisle: "Freezer" },
        { item: "Potatoes", qty: "600g", aisle: "Fresh" },
        { item: "Milk", qty: "200ml", aisle: "Fridge" },
        { item: "Butter", qty: "knob", aisle: "Fridge" },
        { item: "Plain flour", qty: "1 tbsp", aisle: "Cupboard" },
        { item: "Cheddar cheese", qty: "50g", aisle: "Fridge" }
      ],
      method: [
        "Boil potatoes until tender. Mash with butter and a splash of milk.",
        "Put fish in a saucepan with the rest of the milk. Simmer gently for 5 minutes.",
        "Remove fish. Stir flour into the milk to thicken. Add prawns.",
        "Flake fish into an oven dish. Pour sauce over. Top with mash and cheese.",
        "Bake at 200°C for 20 minutes until golden."
      ],
      tip: "A real crowd-pleaser. Fish pie mix is available in most supermarket fish counters and is great value."
    },
    {
      id: "ld14", emoji: "🥗", name: "Chicken Caesar Salad",
      calories: 420, protein: 36, prepTime: 10, cookTime: 10, serves: 2, difficulty: "Easy",
      ingredients: [
        { item: "Chicken breast", qty: "2", aisle: "Fresh" },
        { item: "Romaine lettuce", qty: "1", aisle: "Fresh" },
        { item: "Bread", qty: "2 slices (for croutons)", aisle: "Bakery" },
        { item: "Parmesan", qty: "20g, shaved/grated", aisle: "Fridge" },
        { item: "Mayonnaise", qty: "2 tbsp", aisle: "Fridge" },
        { item: "Lemon juice", qty: "1 tbsp", aisle: "Fresh" },
        { item: "Olive oil", qty: "1 tbsp", aisle: "Cupboard" }
      ],
      method: [
        "Season and pan-fry chicken for 6-7 minutes each side until cooked. Slice.",
        "Cube bread, toss in a little oil and toast in oven/pan until crunchy.",
        "Mix mayo with lemon juice and a splash of water for the dressing.",
        "Chop lettuce. Toss with dressing. Top with chicken, croutons and parmesan."
      ],
      tip: "A proper homemade Caesar beats any shop-bought one. High in protein for muscle building."
    },
    {
      id: "ld15", emoji: "🌶️", name: "Chilli Con Carne with Rice",
      calories: 500, protein: 30, prepTime: 10, cookTime: 25, serves: 4, difficulty: "Easy",
      ingredients: [
        { item: "Beef mince", qty: "500g", aisle: "Fresh" },
        { item: "Tinned kidney beans", qty: "1 tin", aisle: "Cupboard" },
        { item: "Tinned chopped tomatoes", qty: "1 tin", aisle: "Cupboard" },
        { item: "Onion", qty: "1", aisle: "Fresh" },
        { item: "Garlic cloves", qty: "2", aisle: "Fresh" },
        { item: "Cumin", qty: "1 tsp", aisle: "Cupboard" },
        { item: "Paprika", qty: "1 tsp", aisle: "Cupboard" },
        { item: "Rice", qty: "200g (dry)", aisle: "Cupboard" }
      ],
      method: [
        "Brown mince in a large pan. Add diced onion and garlic, cook 3 mins.",
        "Add cumin and paprika, stir 30 seconds.",
        "Add tomatoes and drained kidney beans. Season well. Simmer 20 minutes.",
        "Cook rice. Serve chilli over rice."
      ],
      tip: "Batch cook and freeze - this is one of the best freezer meals going."
    },
    {
      id: "ld16", emoji: "🍗", name: "One-Pot Chicken & Rice",
      calories: 480, protein: 35, prepTime: 10, cookTime: 30, serves: 4, difficulty: "Easy",
      ingredients: [
        { item: "Chicken thighs (boneless)", qty: "6", aisle: "Fresh" },
        { item: "Rice", qty: "250g (dry)", aisle: "Cupboard" },
        { item: "Chicken stock cube", qty: "1", aisle: "Cupboard" },
        { item: "Frozen peas", qty: "100g", aisle: "Freezer" },
        { item: "Onion", qty: "1", aisle: "Fresh" },
        { item: "Garlic cloves", qty: "2", aisle: "Fresh" },
        { item: "Lemon", qty: "1", aisle: "Fresh" },
        { item: "Olive oil", qty: "1 tbsp", aisle: "Cupboard" }
      ],
      method: [
        "Season chicken. Heat oil in a large pan and brown chicken on both sides (5 mins). Remove.",
        "Cook diced onion for 3 mins. Add garlic. Add rice and stir to coat in oil.",
        "Add 500ml water and crumbled stock cube. Place chicken on top.",
        "Cover and simmer for 20 minutes until rice is cooked and chicken is done.",
        "Add frozen peas for the last 3 minutes. Squeeze lemon over to serve."
      ],
      tip: "One pot = one pan to wash up. The chicken juices flavour the rice beautifully."
    },
    {
      id: "ld17", emoji: "🍳", name: "Egg Fried Rice",
      calories: 400, protein: 16, prepTime: 5, cookTime: 10, serves: 2, difficulty: "Easy",
      ingredients: [
        { item: "Cooked rice (leftover or microwave)", qty: "300g", aisle: "Cupboard" },
        { item: "Eggs", qty: "2", aisle: "Fresh" },
        { item: "Frozen peas", qty: "80g", aisle: "Freezer" },
        { item: "Soy sauce", qty: "2 tbsp", aisle: "Cupboard" },
        { item: "Spring onions", qty: "2 (optional)", aisle: "Fresh" },
        { item: "Vegetable oil", qty: "1 tbsp", aisle: "Cupboard" }
      ],
      method: [
        "Heat oil in a wok or large frying pan over high heat.",
        "Add peas, cook 2 mins. Push to one side.",
        "Beat eggs and pour into the pan. Scramble lightly.",
        "Add rice. Toss everything together over high heat for 2-3 minutes.",
        "Add soy sauce. Scatter with sliced spring onions if using."
      ],
      tip: "The secret is leftover cold rice and high heat. Great way to use up leftovers."
    },
    {
      id: "ld18", emoji: "🧀", name: "Macaroni Cheese with Tomato Salad",
      calories: 500, protein: 22, prepTime: 5, cookTime: 20, serves: 3, difficulty: "Easy",
      ingredients: [
        { item: "Macaroni pasta", qty: "250g", aisle: "Cupboard" },
        { item: "Cheddar cheese", qty: "120g, grated", aisle: "Fridge" },
        { item: "Milk", qty: "400ml", aisle: "Fridge" },
        { item: "Butter", qty: "30g", aisle: "Fridge" },
        { item: "Plain flour", qty: "2 tbsp", aisle: "Cupboard" },
        { item: "Mustard", qty: "1 tsp", aisle: "Fridge" },
        { item: "Tomatoes", qty: "2, sliced", aisle: "Fresh" }
      ],
      method: [
        "Cook macaroni. Melt butter in a saucepan, stir in flour, cook 1 min.",
        "Gradually add milk, stirring continuously until smooth and thick.",
        "Remove from heat. Stir in most of the cheese and mustard. Season.",
        "Add drained pasta. Pour into a dish, top with remaining cheese.",
        "Grill until golden and bubbling. Serve with sliced tomatoes."
      ],
      tip: "The mustard in the cheese sauce is the secret ingredient - adds a kick without tasting of mustard."
    },
    {
      id: "ld19", emoji: "🍋", name: "Greek-Style Chicken with Roast Potatoes",
      calories: 480, protein: 38, prepTime: 10, cookTime: 40, serves: 2, difficulty: "Easy",
      ingredients: [
        { item: "Chicken thighs (bone-in)", qty: "4", aisle: "Fresh" },
        { item: "Potatoes", qty: "400g", aisle: "Fresh" },
        { item: "Lemon", qty: "1", aisle: "Fresh" },
        { item: "Garlic cloves", qty: "3", aisle: "Fresh" },
        { item: "Dried oregano", qty: "2 tsp", aisle: "Cupboard" },
        { item: "Olive oil", qty: "2 tbsp", aisle: "Cupboard" }
      ],
      method: [
        "Preheat oven to 200°C. Cut potatoes into chunks.",
        "Put chicken and potatoes in a roasting tin. Drizzle with oil and lemon juice.",
        "Scatter with crushed garlic and oregano. Season generously.",
        "Roast for 35-40 minutes until chicken is golden and cooked through.",
        "Serve straight from the tin."
      ],
      tip: "One-tin dinner - minimal prep, maximum flavour. The lemon and garlic juices make the potatoes amazing."
    },
    {
      id: "ld20", emoji: "🍅", name: "Tomato & Mozzarella Pasta",
      calories: 440, protein: 20, prepTime: 5, cookTime: 15, serves: 2, difficulty: "Very Easy",
      ingredients: [
        { item: "Pasta", qty: "200g", aisle: "Cupboard" },
        { item: "Cherry tomatoes", qty: "250g", aisle: "Fresh" },
        { item: "Mozzarella", qty: "1 ball (125g)", aisle: "Fridge" },
        { item: "Garlic cloves", qty: "2", aisle: "Fresh" },
        { item: "Olive oil", qty: "2 tbsp", aisle: "Cupboard" },
        { item: "Fresh basil", qty: "few leaves (optional)", aisle: "Fresh" }
      ],
      method: [
        "Cook pasta. Meanwhile, halve the cherry tomatoes.",
        "Heat oil, add garlic for 30 seconds, add tomatoes. Cook 5 mins until they burst and soften.",
        "Drain pasta, add to the tomatoes. Tear mozzarella over the top.",
        "Toss gently - the mozzarella will go deliciously stringy.",
        "Add basil if you have it. Season with salt and pepper."
      ],
      tip: "Simple Italian cooking at its best. The hot pasta melts the mozzarella perfectly."
    }
  ],

  snacks: [
    { id: "s1", emoji: "🍎", name: "Apple with Peanut Butter", calories: 180, protein: 6, prepTime: 2, cookTime: 0, serves: 1, difficulty: "Very Easy",
      ingredients: [{ item: "Apple", qty: "1", aisle: "Fresh" }, { item: "Peanut butter", qty: "1 tbsp", aisle: "Cupboard" }],
      method: ["Slice apple. Dip in peanut butter. Simple and satisfying."], tip: "The protein in peanut butter keeps you full longer than fruit alone." },
    { id: "s2", emoji: "🧀", name: "Cheese & Crackers", calories: 200, protein: 10, prepTime: 2, cookTime: 0, serves: 1, difficulty: "Very Easy",
      ingredients: [{ item: "Cheddar cheese", qty: "30g", aisle: "Fridge" }, { item: "Crackers", qty: "3-4", aisle: "Cupboard" }],
      method: ["Slice cheese. Place on crackers. Done!"], tip: "A portion of cheese is about the size of a small matchbox." },
    { id: "s3", emoji: "🫐", name: "Greek Yoghurt Pot", calories: 130, protein: 12, prepTime: 1, cookTime: 0, serves: 1, difficulty: "Very Easy",
      ingredients: [{ item: "Greek yoghurt", qty: "150g", aisle: "Fridge" }],
      method: ["Spoon into a bowl. Add a drizzle of honey if you like."], tip: "One of the highest protein snacks going. Great between meals." },
    { id: "s4", emoji: "🥜", name: "Handful of Mixed Nuts", calories: 180, protein: 6, prepTime: 0, cookTime: 0, serves: 1, difficulty: "Very Easy",
      ingredients: [{ item: "Mixed nuts", qty: "30g (small handful)", aisle: "Cupboard" }],
      method: ["Grab a small handful. That's it!"], tip: "Measure out 30g so you know what a portion looks like - they're calorie-dense." },
    { id: "s5", emoji: "🥚", name: "Boiled Egg", calories: 70, protein: 6, prepTime: 1, cookTime: 10, serves: 1, difficulty: "Very Easy",
      ingredients: [{ item: "Egg", qty: "1", aisle: "Fresh" }],
      method: ["Boil for 8-10 minutes for hard-boiled. Pinch of salt."], tip: "Boil a few at the start of the week and keep in the fridge for quick snacks." },
    { id: "s6", emoji: "🍌", name: "Banana", calories: 100, protein: 1, prepTime: 0, cookTime: 0, serves: 1, difficulty: "Very Easy",
      ingredients: [{ item: "Banana", qty: "1", aisle: "Fresh" }],
      method: ["Peel and eat!"], tip: "Nature's perfect snack. Good source of potassium." },
    { id: "s7", emoji: "🍞", name: "Toast with Marmite", calories: 120, protein: 5, prepTime: 2, cookTime: 2, serves: 1, difficulty: "Very Easy",
      ingredients: [{ item: "Bread", qty: "1 slice", aisle: "Bakery" }, { item: "Marmite", qty: "thin scrape", aisle: "Cupboard" }, { item: "Butter", qty: "thin scrape", aisle: "Fridge" }],
      method: ["Toast bread. Butter. Marmite. You either love it or you don't."], tip: "Rich in B vitamins. The thin-scrape approach is key." },
    { id: "s8", emoji: "🥕", name: "Hummus & Carrot Sticks", calories: 150, protein: 5, prepTime: 3, cookTime: 0, serves: 1, difficulty: "Very Easy",
      ingredients: [{ item: "Hummus", qty: "2 tbsp", aisle: "Fridge" }, { item: "Carrots", qty: "2, cut into sticks", aisle: "Fresh" }],
      method: ["Cut carrots into sticks. Dip in hummus."], tip: "Cucumber and pepper sticks work too. Keep hummus in the fridge for quick snacking." },
    { id: "s9", emoji: "🧀", name: "Cottage Cheese & Crackers", calories: 150, protein: 12, prepTime: 2, cookTime: 0, serves: 1, difficulty: "Very Easy",
      ingredients: [{ item: "Cottage cheese", qty: "80g", aisle: "Fridge" }, { item: "Crackers", qty: "3", aisle: "Cupboard" }],
      method: ["Spoon cottage cheese onto crackers."], tip: "Very high protein, low calorie. A dieter's best friend." },
    { id: "s10", emoji: "🍘", name: "Oatcakes with Cream Cheese", calories: 160, protein: 5, prepTime: 2, cookTime: 0, serves: 1, difficulty: "Very Easy",
      ingredients: [{ item: "Oatcakes", qty: "3", aisle: "Cupboard" }, { item: "Cream cheese", qty: "1 tbsp", aisle: "Fridge" }],
      method: ["Spread cream cheese on oatcakes."], tip: "Oatcakes are slow-release energy - they keep you going." }
  ],

  special: [
    {
      id: "sp1", emoji: "🍛", name: "Homemade Chicken Curry with Pilau Rice",
      calories: 520, protein: 36, prepTime: 15, cookTime: 30, serves: 4, difficulty: "Medium",
      ingredients: [
        { item: "Chicken thighs (boneless)", qty: "600g, cubed", aisle: "Fresh" },
        { item: "Onions", qty: "2", aisle: "Fresh" },
        { item: "Tinned chopped tomatoes", qty: "1 tin", aisle: "Cupboard" },
        { item: "Coconut milk", qty: "1 tin", aisle: "Cupboard" },
        { item: "Garlic cloves", qty: "3", aisle: "Fresh" },
        { item: "Ginger paste", qty: "1 tbsp", aisle: "Cupboard" },
        { item: "Curry powder", qty: "2 tbsp", aisle: "Cupboard" },
        { item: "Rice", qty: "250g", aisle: "Cupboard" },
        { item: "Butter", qty: "knob", aisle: "Fridge" },
        { item: "Cardamom pods or pilau rice seasoning", qty: "optional", aisle: "Cupboard" }
      ],
      method: [
        "Dice onions. Fry in oil until golden (8-10 minutes - don't rush this step, it's worth it).",
        "Add garlic, ginger and curry powder. Cook 1 minute until fragrant.",
        "Add chicken. Cook 3-4 minutes until sealed.",
        "Add tomatoes and coconut milk. Simmer for 20-25 minutes until chicken is tender.",
        "Cook rice (add a pinch of turmeric or pilau seasoning for pilau style).",
        "Serve curry over rice. Naan bread on the side if you want."
      ],
      tip: "Friday night fakeaway - better and cheaper than a takeaway. Leftovers taste even better the next day."
    },
    {
      id: "sp2", emoji: "🥩", name: "Pan-Fried Steak with Chips & Peppercorn Sauce",
      calories: 600, protein: 42, prepTime: 10, cookTime: 25, serves: 2, difficulty: "Medium",
      ingredients: [
        { item: "Sirloin or rump steak", qty: "2", aisle: "Fresh" },
        { item: "Potatoes", qty: "400g (for chips)", aisle: "Fresh" },
        { item: "Crème fraîche", qty: "3 tbsp", aisle: "Fridge" },
        { item: "Black peppercorns (or cracked pepper)", qty: "1 tbsp", aisle: "Cupboard" },
        { item: "Beef stock cube", qty: "½", aisle: "Cupboard" },
        { item: "Mustard", qty: "½ tsp", aisle: "Fridge" },
        { item: "Olive oil", qty: "2 tbsp", aisle: "Cupboard" },
        { item: "Frozen peas", qty: "to serve", aisle: "Freezer" }
      ],
      method: [
        "Cut potatoes into chips. Toss in oil, season. Bake at 220°C for 25-30 minutes, turning once.",
        "Take steaks out of the fridge 20 mins before cooking. Season generously with salt.",
        "Get a frying pan smoking hot. Add a little oil. Cook steaks: 2-3 mins each side for medium-rare.",
        "Remove steaks to rest. In the same pan, add peppercorns, crumbled stock cube, mustard and crème fraîche.",
        "Stir sauce for 2 minutes until bubbling. Add any steak resting juices.",
        "Serve with chips, peas and sauce."
      ],
      tip: "Treat yourself! Letting the steak rest for 5 minutes before cutting is crucial - it stays juicy."
    },
    {
      id: "sp3", emoji: "🦐", name: "Prawn & Chorizo Risotto",
      calories: 500, protein: 28, prepTime: 5, cookTime: 30, serves: 3, difficulty: "Medium",
      ingredients: [
        { item: "Arborio/risotto rice", qty: "250g", aisle: "Cupboard" },
        { item: "Frozen prawns", qty: "200g", aisle: "Freezer" },
        { item: "Chorizo ring", qty: "80g, diced", aisle: "Fridge" },
        { item: "Chicken stock cubes", qty: "2", aisle: "Cupboard" },
        { item: "Onion", qty: "1", aisle: "Fresh" },
        { item: "Garlic cloves", qty: "2", aisle: "Fresh" },
        { item: "Parmesan", qty: "30g, grated", aisle: "Fridge" }
      ],
      method: [
        "Make 800ml stock. Dice onion and chorizo.",
        "Fry chorizo for 2 mins until oils release. Add onion, cook 3 mins. Add garlic.",
        "Add rice, stir 1 minute to toast it. Add stock a ladleful at a time, stirring frequently.",
        "Continue for 18-20 minutes until rice is creamy but still has bite.",
        "Add defrosted prawns for the last 3 minutes.",
        "Stir in parmesan. Season. Serve immediately."
      ],
      tip: "Risotto is easier than people think. The secret is patience - add the stock gradually and keep stirring."
    },
    {
      id: "sp4", emoji: "🍕", name: "Homemade Pizza",
      calories: 550, protein: 26, prepTime: 20, cookTime: 12, serves: 2, difficulty: "Medium",
      ingredients: [
        { item: "Strong white flour", qty: "300g", aisle: "Cupboard" },
        { item: "Fast-action yeast", qty: "7g sachet", aisle: "Cupboard" },
        { item: "Passata", qty: "150g", aisle: "Cupboard" },
        { item: "Mozzarella", qty: "1 ball (125g)", aisle: "Fridge" },
        { item: "Your toppings: ham, peppers, mushrooms, etc.", qty: "whatever you fancy", aisle: "Fresh" },
        { item: "Olive oil", qty: "1 tbsp", aisle: "Cupboard" }
      ],
      method: [
        "Mix flour, yeast, oil, pinch of salt and 180ml warm water. Knead for 5 mins until smooth.",
        "Leave to rise in a warm place for 30 mins (or skip if you're impatient - still good).",
        "Preheat oven to 240°C (as hot as it goes). Put a baking tray in to heat up.",
        "Roll dough into 2 circles on a floured surface.",
        "Spread with passata. Add toppings. Tear over mozzarella.",
        "Slide onto hot baking tray. Bake 10-12 minutes until bubbly and golden."
      ],
      tip: "Making pizza from scratch is genuinely fun. The dough takes 5 minutes and you can add whatever you like."
    },
    {
      id: "sp5", emoji: "🥥", name: "Thai-Style Coconut Chicken Soup",
      calories: 420, protein: 30, prepTime: 10, cookTime: 20, serves: 3, difficulty: "Easy",
      ingredients: [
        { item: "Chicken breast", qty: "2, sliced thin", aisle: "Fresh" },
        { item: "Coconut milk", qty: "1 tin", aisle: "Cupboard" },
        { item: "Chicken stock cube", qty: "1", aisle: "Cupboard" },
        { item: "Soy sauce", qty: "1 tbsp", aisle: "Cupboard" },
        { item: "Lime", qty: "1", aisle: "Fresh" },
        { item: "Chilli flakes", qty: "pinch", aisle: "Cupboard" },
        { item: "Mushrooms", qty: "100g, sliced", aisle: "Fresh" },
        { item: "Spring onions", qty: "2, sliced", aisle: "Fresh" }
      ],
      method: [
        "Pour coconut milk and 300ml water into a saucepan. Crumble in stock cube.",
        "Bring to a gentle simmer. Add sliced chicken and mushrooms.",
        "Cook for 10-12 minutes until chicken is cooked through.",
        "Add soy sauce, lime juice and chilli flakes.",
        "Ladle into bowls. Scatter with spring onions.",
        "Serve with rice or crusty bread."
      ],
      tip: "Tastes incredibly restaurant-quality for something so simple. Adjust chilli to your preference."
    },
    {
      id: "sp6", emoji: "🐑", name: "Lamb Kofta with Flatbread & Yoghurt",
      calories: 500, protein: 32, prepTime: 15, cookTime: 12, serves: 2, difficulty: "Medium",
      ingredients: [
        { item: "Lamb mince", qty: "300g", aisle: "Fresh" },
        { item: "Cumin", qty: "1 tsp", aisle: "Cupboard" },
        { item: "Garlic cloves", qty: "2", aisle: "Fresh" },
        { item: "Flatbreads", qty: "4 (shop-bought)", aisle: "Bakery" },
        { item: "Natural yoghurt", qty: "3 tbsp", aisle: "Fridge" },
        { item: "Lettuce", qty: "handful", aisle: "Fresh" },
        { item: "Tomato", qty: "1, diced", aisle: "Fresh" },
        { item: "Lemon", qty: "½", aisle: "Fresh" }
      ],
      method: [
        "Mix lamb mince with cumin, crushed garlic, salt and pepper.",
        "Shape into 8 small sausage shapes (koftas).",
        "Fry or grill for 10-12 minutes, turning, until cooked through.",
        "Warm flatbreads. Fill with koftas, lettuce, tomato, a squeeze of lemon and yoghurt."
      ],
      tip: "Mix up the yoghurt with a pinch of cumin and lemon juice for a simple raita."
    }
  ]
};
