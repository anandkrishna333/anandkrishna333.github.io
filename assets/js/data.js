// All site content lives here. Edit text, captions and links in this file.

// TODO: replace with your real address and profile links.
export const EMAIL = 'hello@example.com';
export const LINKS = [
  ['Email', `mailto:${EMAIL}`],
  ['LinkedIn', '#'],
  ['Instagram', '#'],
  ['Behance', '#'],
];

// Hero shuffle. Line 01 always shows first; the rest come in random order
// with no repeats until every line has been seen.
export const FACTS = [
  'Has strong opinions about the colour orange. You may have noticed.',
  'Stays for the credits to see who did the colour grade.',
  'Can’t leave a cursor alone. Hover a project and see.',
  'Once spent a whole weekend on a 2 mm fillet. Worth it.',
  'Always asks for one more take. Usually uses the first.',
  'Pet peeve: subtitles that vanish before you finish reading them.',
  'Judges apps by how they say no.',
  'Doesn’t believe in guilty pleasures. What’s the guilt about?',
  'Can’t walk past a good hinge without opening it twice.',
  'Still thinks Rose could have moved over for Jack.',
];

export const FOOTNOTES = {
  1: 'Medieval doctors diagnosed by holding urine up to a colour wheel. Five centuries later, home test strips still ask you to match colours by eye.',
  2: 'Toyota calls it jidoka: a machine stops itself when something goes wrong, so nobody has to stand there watching it. That became the brief for the sensor.',
  3: 'Raymond Loewy’s rule was MAYA: Most Advanced Yet Acceptable. Anything that lives in a bathroom has to sit firmly on the acceptable side.',
  4: '“A great artist can come from anywhere.” Anton Ego, Ratatouille (2007). Loom takes that line literally.',
  5: 'Pull-to-refresh came from one developer, Loren Brichter, in Tweetie 2 (2009). Now it’s in almost every app. Small gestures travel.',
  6: '“The details are not the details. They make the design.” Charles Eames.',
  7: 'Early flat irons were called sad irons, “sad” once meaning heavy. You heated two on the stove and swapped them as one cooled.',
  8: 'Henry Dreyfuss designed around two drawn figures, Joe and Josephine, carrying every measurement of an average body. Foam grips are the low-tech version.',
  9: 'Dieter Rams’ Braun SK 4 radio was nicknamed Snow White’s Coffin. Good industrial design survives a mean nickname.',
  10: 'A panchari melam builds through five stages, each faster than the one before. The film borrows that shape.',
  11: 'Walter Murch ranks emotion above story and rhythm when choosing a cut. Cut 3 won on emotion.',
  12: 'The Kuleshov effect: the same face reads as hungry, grieving or in love, depending on the shot before it.',
  13: 'The mechanical shark in Jaws kept breaking, so Spielberg showed it less, and the film got scarier. We never show where the light comes from.',
  14: 'For Barry Lyndon, Kubrick lit scenes with candles and shot on Zeiss lenses first made for NASA. We had one practical lamp and a lot of patience.',
  15: 'The Xerox Star team tested their icons on real people before it shipped in 1981. Still the best advice I know: show it to someone early.',
};
export const FOOTNOTE_TOTAL = 15;

/*
  Case-study blocks. Column numbers use a 12-column grid, counted from 0.
  ['statement', text, size=40, col=3, span=8]
  ['para', text, col=3, span=5]
  ['row', [[col, span, heightAt1440, imageCaption, captionBelow, offsetY], ...]]
  ['full', heightAt1440, imageCaption, captionBelow]
  ['cols', [[col, span, heading, body], ...]]
  ['list', [[label, text], ...]]
  ['swatches', [[hex, label], ...], col]
*/
export const PROJECTS = [
  {
    slug: 'urosense', n: '01', title: 'UroSense', theme: 'paper',
    field: 'Connected healthcare', disc: 'Product + UI/UX',
    summary: 'A home urine-sensing device and companion app that turns an everyday routine into an early signal for kidney and urinary health.',
    meta: [['Field', 'Connected healthcare'], ['Discipline', 'Product + UI/UX'], ['Role', 'Product design, interaction, UI'], ['Deliverables', 'Device, mobile app, clinician view']],
    preview: ['UroSense: device on the rim', 'UroSense: app, today', 'UroSense: clinician view'],
    hero: { ops: [['full', 860, 'Hero: device mounted on a toilet rim, soft morning light']] },
    chapters: [
      { n: '01', label: 'Problem', fn: 1, ops: [
        ['statement', 'Urinary and kidney problems are often caught late. Testing means a clinic visit, a sample cup and days of waiting, so most people simply don’t.'],
        ['para', 'People only test when something already feels wrong. The goal was to make monitoring passive: no strips, no cups, no reading colour charts in a bathroom.', 3, 4],
        ['row', [[3, 4, 520, 'Context: current at-home test strips', 'What people use today. Twelve colours, read by eye, under bathroom lighting.'], [8, 4, 360, 'Interview photo, anonymised', 'Conversations with patients and two nephrologists.', 160]]],
      ] },
      { n: '02', label: 'Thinking', fn: 2, ops: [
        ['statement', 'Three things I kept coming back to.', 40, 3, 6],
        ['cols', [[3, 3, 'Nobody wants to look at it', 'The device has to disappear. No screens, no lights that ask for attention.'], [6, 3, 'A number is not an answer', 'Every result needs a next step a person can act on today.'], [9, 3, 'Two users, not one', 'The patient lives with it; the clinician needs a trend, not a stream.']]],
        ['row', [[0, 7, 480, 'Sketchbook: placement and grip studies'], [7, 5, 480, 'Journey map, patient and clinician']]],
      ] },
      { n: '03', label: 'Process', ops: [
        ['para', 'Physical and digital ran in parallel. Foam and 3D prints answered where the device lives; flows and wireframes answered what it says.', 3, 5],
        ['row', [[0, 3, 300, 'Foam models', 'Foam models'], [3, 3, 300, 'Sensor bench test', 'Sensor bench test'], [6, 3, 300, 'User flows', 'User flows'], [9, 3, 300, 'Wireframes', 'Wireframes']]],
      ] },
      { n: '04', label: 'Iteration', fn: 3, ops: [
        ['statement', 'Three housings before one felt right.', 40, 3, 6],
        ['row', [[0, 4, 400, 'v1 render', 'v1  Clip-on. Easy to fit, too visible.'], [4, 4, 400, 'v2 render', 'v2  Under-seat. Hidden, but needed tools to install.'], [8, 4, 400, 'v3 render', 'v3  Rim-mounted. One hand, no tools, out of sight.']]],
      ] },
      { n: '05', label: 'Design', fill: 'ink', ops: [
        ['row', [[0, 6, 680, 'Device render, three-quarter view'], [6, 2, 560, 'App: today', null, 120], [8, 2, 560, 'App: trend', null, 60], [10, 2, 560, 'App: next step', null, 0]]],
        ['para', 'A quiet weekly summary replaces daily alerts. When something changes, the app explains it in plain words and suggests one action.', 6, 5],
        ['full', 760, 'Clinician view, patient trends over 90 days'],
      ] },
      { n: '06', label: 'Outcome', ops: [
        ['statement', 'A working prototype of the device and app, tested with patients at home.'],
        ['list', [['What worked', 'Passive sensing removed the moment of friction people described most.'], ['What didn’t', 'Early alert copy felt alarming. Rewritten with clinicians in a second round.'], ['Next', 'Longer home trial and a pharmacy-facing version of the clinician view.']]],
      ] },
    ],
  },
  {
    slug: 'loom', n: '02', title: 'Loom', theme: 'white',
    field: 'Creative discovery', disc: 'UI/UX',
    summary: 'A discovery app for creative work, where you browse by mood, material and process instead of by follower count.',
    meta: [['Field', 'Creative discovery'], ['Discipline', 'UI/UX'], ['Role', 'Research, interaction, UI'], ['Platform', 'iOS and web']],
    preview: ['Loom: home feed', 'Loom: material filter', 'Loom: board'],
    hero: { fill: 'paper', ops: [['row', [[0, 2, 470, 'Screen: onboarding', null, 160], [2, 3, 640, 'Screen: home feed', null, 0], [5, 2, 470, 'Screen: board', null, 90], [7, 3, 640, 'Screen: search by material', null, 40], [10, 2, 470, 'Screen: profile', null, 200]]]] },
    chapters: [
      { n: '01', label: 'Problem', fn: 4, ops: [
        ['statement', 'Creative platforms reward reach, not work. Good projects by unknown people sink under whatever is already popular.'],
        ['para', 'I wanted to find out what discovery could feel like if the work led and the numbers stayed out of the way.', 3, 4],
      ] },
      { n: '02', label: 'Thinking', ops: [
        ['cols', [[3, 3, 'Browse like a library', 'Mood, material and process as ways in, not just tags.'], [6, 3, 'Save is the real like', 'Collecting into boards says more than a tap on a heart.'], [9, 3, 'Show the making', 'Process images get the same space as final shots.']]],
        ['row', [[0, 5, 420, 'Moodboard: reference apps and archives'], [5, 7, 420, 'Card sort with 8 participants, photo']]],
      ] },
      { n: '03', label: 'Process', ops: [
        ['full', 620, 'Information architecture and core flows'],
        ['para', 'Five rounds of paper and clickable prototypes. Each round dropped a feature people didn’t miss.', 3, 5],
      ] },
      { n: '04', label: 'Iteration', fn: 5, ops: [
        ['statement', 'Navigation, three ways.', 40, 3, 6],
        ['row', [[0, 4, 560, 'Tab bar version', 'A  Tab bar. Familiar, but felt like every other app.'], [4, 4, 560, 'Gesture version', 'B  Gestures only. Loved in demos, lost in testing.'], [8, 4, 560, 'Canvas version', 'C  One canvas with a filter drawer. Kept.']]],
      ] },
      { n: '05', label: 'Design', fill: 'accent', ops: [
        ['row', [[0, 3, 640, 'Final: home feed', null, 0], [3, 3, 640, 'Final: material filter', null, 120], [6, 3, 640, 'Final: board', null, 40], [9, 3, 640, 'Final: project detail', null, 160]]],
        ['para', 'Type and grid step back so the work is the loudest thing on screen. Colour only comes from the projects themselves.', 3, 5],
      ] },
      { n: '06', label: 'Details', fn: 6, ops: [
        ['row', [[0, 4, 300, 'Loop', 'Long-press any image to save it to a board.'], [4, 4, 300, 'Loop', 'Pull down to shuffle the feed by mood.'], [8, 4, 300, 'Loop', 'Filters slide in from the edge you swiped.']]],
        ['row', [[0, 4, 300, 'Loop', 'Empty board invites you to save your first find.'], [4, 4, 300, 'Loop', 'Process images stack behind the final shot.'], [8, 4, 300, 'Loop', 'Dark mode follows the work, not the clock.']]],
      ] },
      { n: '07', label: 'Outcome', ops: [
        ['statement', 'A tested, high-fidelity prototype and a design system small enough to hold in your head.'],
        ['list', [['What worked', 'People spent longer on projects and saved more of them than in the apps they normally use.'], ['What I’d change', 'Search still leans on keywords. Next step is search by image.']]],
      ] },
    ],
  },
  {
    slug: 'nuoheat', n: '03', title: 'NuoHeat', theme: 'paper',
    field: 'Localized induction ironing', disc: 'Industrial design',
    summary: 'An induction iron that heats only the part of the soleplate touching fabric, so it is ready almost instantly and wastes less energy.',
    meta: [['Field', 'Localized induction ironing'], ['Discipline', 'Industrial design'], ['Role', 'Research, form, engineering, CMF'], ['Output', 'Working prototype, CAD, renders']],
    preview: ['NuoHeat: side profile', 'NuoHeat: exploded view', 'NuoHeat: foam models'],
    hero: { ops: [['row', [[0, 8, 820, 'Hero: NuoHeat on black, side profile', null, 0], [8, 4, 520, 'Detail: soleplate coil zones', null, 300]]]] },
    chapters: [
      { n: '01', label: 'Problem', fn: 7, ops: [
        ['statement', 'A conventional iron heats its whole soleplate and keeps it hot, even when it is standing still. Most of that energy never touches a shirt.'],
        ['row', [[3, 3, 360, 'Observation: ironing at home', 'Ironing at home, three households.'], [6, 3, 360, 'Observation: thermal camera', 'Thermal image of a standing iron.'], [9, 3, 360, 'Observation: hand posture', 'Grip and wrist angle over 20 minutes.']]],
      ] },
      { n: '02', label: 'Thinking', ops: [
        ['full', 560, 'Diagram: how localized induction heats only the contact zone'],
        ['cols', [[3, 3, 'Heat where it touches', 'Coil zones switch on only under fabric contact.'], [6, 3, 'Ready in seconds', 'No waiting for a full plate to warm up.'], [9, 3, 'Safe when set down', 'Lift or rest it and the heat stops.']]],
      ] },
      { n: '03', label: 'Process', fn: 8, ops: [
        ['row', [[0, 2, 220, 'Sketch'], [2, 2, 220, 'Sketch'], [4, 2, 220, 'Sketch'], [6, 2, 220, 'Sketch'], [8, 2, 220, 'Sketch'], [10, 2, 220, 'Sketch']]],
        ['row', [[0, 6, 480, 'Foam models, grip variations', 'Twelve foam models to find the grip before any electronics.'], [6, 6, 480, 'Coil test rig', 'Coil test rig on the bench.']]],
      ] },
      { n: '04', label: 'Iteration', ops: [
        ['statement', 'Each prototype answered one question.', 40, 3, 6],
        ['row', [[0, 4, 420, 'P1', 'P1  Does local induction heat fabric evenly?'], [4, 4, 420, 'P2', 'P2  Can the coils fit in a body people want to hold?'], [8, 4, 420, 'P3', 'P3  Does it feel finished enough to trust?']]],
      ] },
      { n: '05', label: 'Design', fn: 9, ops: [
        ['full', 900, 'Exploded view: shell, coil array, sensor layer, soleplate'],
        ['swatches', [['#E9E7E1', 'Shell, matte warm white'], ['#2E2E2C', 'Grip, soft-touch graphite'], ['#B8BCC2', 'Soleplate, brushed steel'], ['#2B2BFF', 'Indicator, ultramarine']], 3],
        ['list', [['Soleplate', 'Segmented coil array, only the contact zone heats.'], ['Sensing', 'Contact and motion sensing cut power when the iron is lifted or still.'], ['Form', 'Upright stance with a recessed grip that keeps the wrist neutral.']]],
      ] },
      { n: '06', label: 'Outcome', ops: [
        ['statement', 'A working prototype that heats only where it touches fabric, plus production-intent CAD.'],
        ['para', 'Next: thermal testing across fabrics and a slimmer coil array.', 3, 5],
      ] },
    ],
  },
  {
    slug: 'prakambanam', n: '04', title: 'Prakambanam', theme: 'ink',
    field: 'Onam theme film', disc: 'Creative direction',
    summary: 'A theme film for Onam, built on the sound, colour and rhythm of the festival.',
    meta: [['Format', 'Theme film'], ['Occasion', 'Onam'], ['Role', 'Creative direction'], ['Also', 'Concept, script, edit']],
    preview: ['Prakambanam: opening frame', 'Prakambanam: the drums', 'Prakambanam: final frame'],
    hero: { ops: [['full', 602, 'Film: 2.39:1 player, poster frame', 'Click the frame to play. Sound on.']] },
    chapters: [
      { n: '01', label: 'Brief', ops: [
        ['statement', 'Make Onam feel new to people who have celebrated it every year of their lives.'],
        ['para', 'The film had to work on a big screen at the event and as a vertical cut on phones the same week.', 3, 5],
      ] },
      { n: '02', label: 'Idea', fn: 10, ops: [
        ['statement', 'Prakambanam means a tremor. The film builds from a single drumbeat to a whole town moving together.', 40, 3, 8],
        ['row', [[0, 4, 500, 'Moodboard: colour'], [4, 4, 500, 'Moodboard: texture and light', null, 80], [8, 4, 500, 'Moodboard: movement', null, 20]]],
      ] },
      { n: '03', label: 'Process', ops: [
        ['row', [[0, 2, 130, 'Shot 01', '01'], [2, 2, 130, 'Shot 02', '02'], [4, 2, 130, 'Shot 03', '03'], [6, 2, 130, 'Shot 04', '04'], [8, 2, 130, 'Shot 05', '05'], [10, 2, 130, 'Shot 06', '06']]],
        ['row', [[0, 2, 130, 'Shot 07', '07'], [2, 2, 130, 'Shot 08', '08'], [4, 2, 130, 'Shot 09', '09'], [6, 2, 130, 'Shot 10', '10'], [8, 2, 130, 'Shot 11', '11'], [10, 2, 130, 'Shot 12', '12']]],
        ['row', [[0, 7, 460, 'Behind the scenes: rehearsal', 'Rehearsing the drum sequence.'], [7, 5, 460, 'Behind the scenes: lighting', 'Lighting the final shot.']]],
      ] },
      { n: '04', label: 'Cuts', fn: 11, ops: [
        ['statement', 'Three edits, each shorter and louder than the last.', 40, 3, 6],
        ['row', [[0, 4, 226, 'Cut 1 timeline', 'Cut 1  Chronological. Clear, but flat.'], [4, 4, 226, 'Cut 2 timeline', 'Cut 2  Cut to the drums. Better pace.'], [8, 4, 226, 'Cut 3 timeline', 'Cut 3  Silence before the drop. Final.']]],
      ] },
      { n: '05', label: 'Stills', fn: 12, ops: [
        ['full', 602, 'Still: opening frame'],
        ['row', [[0, 6, 326, 'Still'], [6, 6, 326, 'Still']]],
        ['full', 602, 'Still: final frame'],
      ] },
      { n: '06', label: 'Credits', ops: [
        ['list', [['Creative direction', 'Anand Krishna'], ['Direction', 'Name'], ['Cinematography', 'Name'], ['Music', 'Name'], ['Edit and colour', 'Name']]],
      ] },
    ],
  },
  {
    slug: 'the-seek', n: '05', title: 'The Seek', theme: 'ink', overlayTitle: true,
    field: 'Ishanya ’26 theme film', disc: 'Creative direction',
    summary: 'The theme film for Ishanya ’26, about the search that starts before you know what you are looking for.',
    meta: [['Format', 'Theme film'], ['Event', 'Ishanya ’26'], ['Role', 'Creative direction'], ['Also', 'Concept, storyboard, grade']],
    preview: ['The Seek: the corridor', 'The Seek: the light', 'The Seek: night shoot'],
    heroCaption: 'Hero: full-bleed still, darkest frame of the film',
    chapters: [
      { n: '01', label: 'Brief', ops: [
        ['statement', 'Open the festival with a film that sets a mood instead of listing events.'],
        ['para', 'One film for the opening night screen, plus teasers for the weeks before.', 3, 5],
      ] },
      { n: '02', label: 'Concept', fn: 13, ops: [
        ['row', [[3, 5, 640, 'Concept sketch: the figure and the light'], [8, 4, 400, 'Script page, annotated', null, 180]]],
        ['statement', 'A figure follows a light through the campus at night. We never see what it is.', 40, 3, 7],
      ] },
      { n: '03', label: 'Look', fn: 14, ops: [
        ['swatches', [['#0B1A2B', 'Night blue'], ['#1E3B4F', 'Shadow teal'], ['#C9A15A', 'Lamp amber'], ['#E8E2D4', 'Highlight']], 3],
        ['row', [[0, 6, 326, 'Grade: before'], [6, 6, 326, 'Grade: after']]],
      ] },
      { n: '04', label: 'Storyboard', ops: [
        ['row', [[0, 3, 200, 'Board 1', '1  Wide. Empty corridor.'], [3, 3, 200, 'Board 2', '2  The light appears.'], [6, 3, 200, 'Board 3', '3  Follow, handheld.'], [9, 3, 200, 'Board 4', '4  Reveal, then cut to black.']]],
        ['row', [[0, 8, 520, 'Behind the scenes: night shoot', 'Night shoot, one camera, practical light only.'], [8, 4, 520, 'Behind the scenes: blocking']]],
      ] },
      { n: '05', label: 'Stills', ops: [
        ['row', [[0, 12, 560, 'Still: the corridor']]],
        ['row', [[0, 4, 240, 'Still'], [4, 4, 240, 'Still', null, 120], [8, 4, 240, 'Still', null, 40]]],
      ] },
      { n: '06', label: 'Credits', ops: [
        ['list', [['Creative direction', 'Anand Krishna'], ['Direction', 'Name'], ['Cinematography', 'Name'], ['Sound', 'Name'], ['Grade', 'Name']]],
      ] },
    ],
  },
];

// Sidequests. span = columns out of 12 on desktop, h = image height at 1440px wide.
export const SIDEQUESTS = [
  { title: 'Identity system', cat: 'Branding', made: 'Freelance client', span: 6, h: 520 },
  { title: 'Poster series', cat: 'Branding', made: 'Self-initiated', span: 3, h: 400 },
  { title: 'Form study', cat: 'Coursework', made: 'College', span: 3, h: 520 },
  { title: 'Packaging', cat: 'Branding', made: 'Freelance client', span: 3, h: 360 },
  { title: 'Generative posters', cat: 'Explorations', made: 'Self-initiated', span: 3, h: 460 },
  { title: 'Camera tests', cat: 'Explorations', made: 'Self-initiated', span: 6, h: 460 },
  { title: 'Typography project', cat: 'Coursework', made: 'College', span: 4, h: 500 },
  { title: 'Material exploration', cat: 'Coursework', made: 'College', span: 4, h: 380 },
  { title: '3D type experiments', cat: 'Explorations', made: 'Self-initiated', span: 4, h: 500 },
  { title: 'Wordmark', cat: 'Branding', made: 'Freelance client', span: 3, h: 300 },
  { title: 'Interaction prototype', cat: 'Coursework', made: 'College', span: 6, h: 420 },
  { title: 'Daily UI', cat: 'Explorations', made: 'Self-initiated', span: 3, h: 300 },
];
