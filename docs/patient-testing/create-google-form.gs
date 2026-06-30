/**
 * ============================================================
 * JOINT JOURNEY — Patient Testing Feedback Form Generator
 * ============================================================
 *
 * WHAT THIS DOES
 *   Running this script creates a complete Google Form in YOUR Google Drive
 *   for the 5–10 person discovery test. It builds the intro/consent, screener,
 *   the 5-minute task instructions, your 9 feedback questions, and all 10
 *   standard System Usability Scale (SUS) items. Responses collect to the form
 *   automatically (then click "Link to Sheets" inside the form to get a sheet).
 *
 * HOW TO RUN (about 2 minutes — full steps in README.md)
 *   1. Go to https://script.google.com  →  New project
 *   2. Delete the sample code, paste THIS whole file in.
 *   3. Press Run (▶). Choose the function createJointJourneyForm.
 *   4. Authorise it when Google asks (it's your own script acting on your Drive).
 *   5. Open the Execution log — it prints the EDIT and SHARE links to the form.
 *
 * NOTE ON SUS: the 10 SUS items are kept verbatim and in order so the score
 * stays valid and comparable. Scoring formula is in README.md.
 * ============================================================
 */

function createJointJourneyForm() {
  var form = FormApp.create('Joint Journey — Tester Feedback')
    .setTitle('Joint Journey — Tester Feedback')
    .setDescription(
      'Thank you for helping us test Joint Journey, a programme designed to help people stay ' +
      'as strong and prepared as possible while waiting for hip or knee replacement surgery.\n\n' +
      'This takes about 10 minutes after you have had a look around the app. There are no right ' +
      'or wrong answers — we want your honest opinion so we can make it better.'
    )
    .setProgressBar(true)
    .setCollectEmail(false)
    .setAllowResponseEdits(false)
    .setShowLinkToRespondAgain(false);

  // 5-point Likert anchors used for most questions
  var AGREE = ['Strongly disagree', 'Disagree', 'Neither agree nor disagree', 'Agree', 'Strongly agree'];

  // ---------- CONSENT ----------
  form.addSectionHeaderItem()
    .setTitle('Before we start — your consent')
    .setHelpText(
      'This is feedback on a product, not medical advice, and nothing here changes your care.\n' +
      '• Your answers are anonymous unless you choose to leave a contact detail.\n' +
      '• We only use your feedback to improve Joint Journey.\n' +
      '• You can stop at any time and ask us to delete your answers.\n' +
      '• We will not share your responses outside our small team.'
    );

  form.addMultipleChoiceItem()
    .setTitle('Do you agree to take part on this basis?')
    .setChoiceValues(['Yes, I agree', 'No'])
    .setRequired(true);

  // ---------- SCREENER ----------
  form.addSectionHeaderItem()
    .setTitle('A few quick details about you')
    .setHelpText('This helps us understand who tested the app. None of it identifies you.');

  form.addMultipleChoiceItem()
    .setTitle('Which joint is most relevant to you?')
    .setChoiceValues(['Hip', 'Knee', 'Both', 'Neither / just interested'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Where are you in the process?')
    .setChoiceValues([
      'On the waiting list now',
      'Expecting to be listed soon',
      'Already had surgery',
      'Not personally awaiting surgery'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Your age range')
    .setChoiceValues(['Under 45', '45–54', '55–64', '65–74', '75 or over', 'Prefer not to say'])
    .setRequired(false);

  form.addScaleItem()
    .setTitle('How confident are you generally with using phones, tablets or websites?')
    .setBounds(1, 5)
    .setLabels('Not at all confident', 'Very confident')
    .setRequired(true);

  // ---------- THE TASK ----------
  form.addSectionHeaderItem()
    .setTitle('Please try the app first')
    .setHelpText(
      'Before answering the rest:\n\n' +
      '1. Go to https://jointjourney.org and create an account.\n' +
      '2. Have a look around for about 5 minutes — try the exercise programme, the ' +
      'nutrition/weight section, and the getting-ready / mindset pages.\n\n' +
      'Then come back and answer the questions below based on what you experienced.'
    );

  form.addMultipleChoiceItem()
    .setTitle('Were you able to create an account and look around?')
    .setChoiceValues(['Yes', 'Partly', 'No'])
    .setRequired(true);

  // ---------- YOUR 9 QUESTIONS ----------
  form.addSectionHeaderItem()
    .setTitle('Your experience')
    .setHelpText('For each statement, choose how much you agree (1 = Strongly disagree, 5 = Strongly agree).');

  form.addScaleItem()
    .setTitle('Creating an account was easy.')
    .setBounds(1, 5).setLabels('Strongly disagree', 'Strongly agree').setRequired(true);

  form.addScaleItem()
    .setTitle('The app was easy to use.')
    .setBounds(1, 5).setLabels('Strongly disagree', 'Strongly agree').setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('The programme felt pitched at the right level for me.')
    .setChoiceValues([
      'Far too easy',
      'A bit too easy',
      'About right',
      'A bit too hard',
      'Far too hard'
    ])
    .setRequired(true);

  form.addScaleItem()
    .setTitle('I understood how following this programme would benefit me.')
    .setBounds(1, 5).setLabels('Not at all', 'Completely').setRequired(true);

  form.addScaleItem()
    .setTitle('If I were waiting for surgery, I would have been likely to follow this programme.')
    .setBounds(1, 5).setLabels('Very unlikely', 'Very likely').setRequired(true);

  form.addScaleItem()
    .setTitle('The programme felt credible and trustworthy.')
    .setBounds(1, 5).setLabels('Not at all', 'Completely').setRequired(true);

  form.addScaleItem()
    .setTitle('I would have been willing to pay for access to this.')
    .setBounds(1, 5).setLabels('Definitely not', 'Definitely yes').setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('If you would consider paying, what would feel fair?')
    .setChoiceValues([
      'I would only use it if it were free',
      'A small one-off fee',
      'A monthly subscription'
    ])
    .showOtherOption(false)
    .setRequired(false);

  form.addTextItem()
    .setTitle('What price would feel fair to you?')
    .setHelpText('e.g. "£20 one-off" or "£5 per month" or "would only use if free". Rough numbers are fine.')
    .setRequired(false);

  // ---------- TESTIMONIAL ----------
  form.addSectionHeaderItem().setTitle('In your own words');

  form.addParagraphTextItem()
    .setTitle('In a sentence or two, what would you tell a friend who was awaiting joint surgery about this app?')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Are you happy for us to quote the comment above (anonymously) to describe the app?')
    .setChoiceValues(['Yes, you may quote it', 'No, please keep it private'])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Was anything confusing, frustrating, or missing? What would you change?')
    .setRequired(false);

  // ---------- SUS (10 standard items, verbatim, in order) ----------
  form.addSectionHeaderItem()
    .setTitle('A few final questions about ease of use')
    .setHelpText('Please rate each statement from 1 (Strongly disagree) to 5 (Strongly agree). ' +
      'Some are worded positively and some negatively — that is intentional, so please read each one.');

  var SUS = [
    'I think that I would like to use this app frequently.',
    'I found the app unnecessarily complex.',
    'I thought the app was easy to use.',
    'I think that I would need the support of a technical person to be able to use this app.',
    'I found the various functions in this app were well integrated.',
    'I thought there was too much inconsistency in this app.',
    'I would imagine that most people would learn to use this app very quickly.',
    'I found the app very cumbersome to use.',
    'I felt very confident using the app.',
    'I needed to learn a lot of things before I could get going with this app.'
  ];

  for (var i = 0; i < SUS.length; i++) {
    form.addScaleItem()
      .setTitle((i + 1) + '. ' + SUS[i])
      .setBounds(1, 5)
      .setLabels('Strongly disagree', 'Strongly agree')
      .setRequired(true);
  }

  // ---------- THANK YOU ----------
  form.setConfirmationMessage(
    'Thank you so much — your feedback genuinely helps us build something better for ' +
    'people waiting for surgery. You can close this page now.'
  );

  // Print the links so you can find and share the form
  Logger.log('✅ Form created.');
  Logger.log('EDIT (you):   ' + form.getEditUrl());
  Logger.log('SHARE (testers): ' + form.getPublishedUrl());
}
