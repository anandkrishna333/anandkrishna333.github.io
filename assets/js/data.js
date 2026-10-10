// All site content lives here. Edit text, captions and links in this file.

export const EMAIL = 'anandkrishna2001@gmail.com';
// "Still being built" note in the nav and footer. Change the date when you publish an update.
export const UPDATED = 'Oct 2026';
// [label, url, icon]. Icons come from the Tabler outline set (see ICONS in common.js).
export const LINKS = [
  ['Email', `mailto:${EMAIL}`, 'mail'],
  ['LinkedIn', 'https://www.linkedin.com/in/anandkrishna16/', 'linkedin'],
  ['Behance', 'https://www.behance.net/anandkrishna16', 'behance'],
];

// Hero shuffle. Line 01 always shows first; the rest come in random order
// with no repeats until every line has been seen.
export const FACTS = [
  'Has strong opinions about the colour orange. You may have noticed.',
  'Stays for the credits to see who did the colour grade.',
  'Once spent a whole weekend on a 2 mm fillet. Worth it.',
  'Always asks for one more take. Usually uses the first.',
  'Pet peeve: subtitles that vanish before you finish reading them.',
  'Can’t book a train ticket without noticing how the app was designed.',
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
  8: 'Henry Dreyfuss designed around two drawn figures, Joe and Josephine, carrying every measurement of an average body. A good handle starts from the hand, not the heater.',
  9: 'Dieter Rams’ Braun SK 4 radio was nicknamed Snow White’s Coffin. Good industrial design survives a mean nickname.',
  10: 'A panchari melam builds through five stages, each faster than the one before. The film borrows that shape.',
  11: 'Walter Murch ranks emotion above story and rhythm when choosing a cut. Cut 3 won on emotion.',
  12: 'The Kuleshov effect: the same face reads as hungry, grieving or in love, depending on the shot before it.',
  13: 'The mechanical shark in Jaws kept breaking, so Spielberg showed it less, and the film got scarier. We never show where the light comes from.',
  14: 'For Barry Lyndon, Kubrick lit scenes with candles and shot on Zeiss lenses first made for NASA. We had one practical lamp and a lot of patience.',
  15: 'Ray Tomlinson picked the @ for the first network email in 1971 because it was the one key nobody used in their name.',
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
    field: 'Connected Healthcare', disc: 'Industrial Design · UI/UX',
    behance: 'https://www.behance.net/gallery/255958821/UroSense-Connected-Healthcare-System',
    summary: 'A discreet wearable and companion app for incontinence monitoring, designed to support timely alerts and more independent care.',
    // Fields set to null are hidden on the site. TODO(Anand): fill in Tools.
    glance: [
      ['Domain', 'Industrial Design · UI/UX · Interaction Design'],
      ['Role', 'Product Designer'],
      ['Timeline', '4 Weeks'],
      ['Tools', null],
    ],
    hero: { src: 'assets/img/urosense/hero.jpg', w: 1616, h: 909, alt: 'The urosense wearable, a soft grey pebble, beside a phone showing the app’s calm home screen.' },
    preview: [
      { src: 'assets/img/urosense/hover-1.jpg', cap: 'The wearable' },
      { src: 'assets/img/urosense/hover-2.jpg', cap: 'The companion app' },
      { src: 'assets/img/urosense/hover-3.jpg', cap: 'Caregiver app and ward board' },
    ],
    sections: [
      {
        id: 'context', label: 'Context', title: 'Making care more discreet and independent.', fn: 1,
        body: ['Managing incontinence can involve frequent checks, uncertainty and dependence on caregivers. UroSense explores how a connected wearable and digital interface can make monitoring more discreet while supporting timely care and personal dignity.'],
      },
      {
        id: 'problem', label: 'Problem', title: 'How might we make monitoring simpler without compromising dignity?',
        body: ['Users and caregivers need a reliable way to understand when attention is needed without constant manual checks. The challenge was to connect physical sensing, timely alerts and clear information into an experience that feels simple, reassuring and respectful.'],
      },
      {
        id: 'process', label: 'Process', title: 'Designing across physical and digital touchpoints.', fn: 3,
        body: ['I explored the product through research, wearable development and interface design, considering the needs of both users and caregivers.'],
        rows: [
          ['Research', 'Understand user needs, care routines and privacy concerns.', { src: 'assets/img/urosense/journey.jpg', w: 1300, h: 700, alt: 'Journey map of a day for Neetha, today and with Sense, from morning to night.' }],
          ['Industrial Design', 'Explore a discreet, wearable form.', { src: 'assets/img/urosense/form-matrix.jpg', w: 1290, h: 720, alt: 'Early sketch of the wearable beside a table comparing four ways to wear it.' }],
          ['UX & Interaction', 'Develop user flows, alerts, logs and caregiver workflows.', { src: 'assets/img/urosense/nudge-flow.jpg', w: 1290, h: 720, alt: 'Flow diagram of the nudge loop, from a gentle buzz through her answer to a caregiver alert.' }],
          ['UI Design', 'Create status indicators, patient dashboards and supporting screens.', { src: 'assets/img/urosense/hierarchy.jpg', w: 520, h: 690, narrow: true, alt: 'The calm home screen with its parts labelled: who and when, how she is at a glance, one optional action, and the same four places.' }],
          ['Prototyping', 'Refine the physical and digital experience through iterative design.', { src: 'assets/img/urosense/core-loop.jpg', w: 1290, h: 720, alt: 'Three home screen states: all calm, break time soon, and a check-in asking if she made it in time.' }],
        ],
      },
      {
        id: 'solution', label: 'Solution', title: 'One connected system. Clearer care.', fn: 2,
        body: ['UroSense brings together a wearable device, companion app and caregiver dashboard to support discreet monitoring and timely responses.'],
        bullets: [
          'A wearable designed around discretion and everyday use.',
          'Clear status indicators and notifications.',
          'Logs to review monitoring history.',
          'A multi-patient dashboard for caregivers.',
          'Privacy, consent and data-transfer considerations.',
        ],
        after: ['The experience connects physical monitoring with accessible information, helping users and caregivers understand what needs attention.'],
        figs: [
          { src: 'assets/img/urosense/three-people.jpg', w: 1600, h: 691, alt: 'The wearable, the wearer’s app, the family caregiver’s app and the care-home ward board, side by side.', cap: 'One system, three people.' },
          { src: 'assets/img/urosense/system-map.jpg', w: 1300, h: 720, alt: 'System map: the wearable, her phone and a consent gate, with the family app, web dashboard, doctor and care-home ward beyond it.', cap: 'How the device, her app and everyone else connect, through a single consent gate.' },
        ],
      },
      {
        id: 'outcome', label: 'Outcome', title: 'A connected healthcare concept built around dignity.',
        body: ['UroSense brought industrial design, UI/UX and interaction design together in a unified product concept. The project explored how thoughtful physical form, clear information and coordinated caregiver workflows could support a more considerate monitoring experience.'],
        takeaway: ['Healthcare technology should do more than collect information. It should make everyday care easier to understand, less intrusive and more respectful.'],
        note: 'UroSense is a design concept. It has not been built, clinically validated or tested with users at home.',
      },
    ],
  },
  {
    slug: 'loom', soon: true, n: '02', title: 'Loom', theme: 'white',
    field: 'Creative Discovery', disc: 'UI/UX',
    summary: 'A discovery app for creative work, where you browse by mood, material and process instead of by follower count.',
    meta: [['Field', 'Creative Discovery'], ['Discipline', 'UI/UX'], ['Role', 'Research · Interaction · UI'], ['Platform', 'iOS · Web']],
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
    field: 'Induction Ironing System', disc: 'Industrial Design',
    behance: 'https://www.behance.net/gallery/255958929/NuoHeat-Induction-Ironing-System',
    summary: 'An induction-based ironing system that explores localized heating to reduce energy use and ironing time.',
    // Fields set to null are hidden on the site. TODO(Anand): fill in Tools.
    glance: [
      ['Domain', 'Industrial Design · Product Engineering'],
      ['Role', 'Product Designer'],
      ['Timeline', '6 Months'],
      ['Tools', null],
    ],
    hero: { src: 'assets/img/nuoheat/hero.jpg', w: 1616, h: 824, alt: 'Render of the 2026 NuoHeat redesign: a slim grey ironing pad with red knobs, and a handle with a red grip.' },
    preview: [
      { src: 'assets/img/nuoheat/hover-1.jpg', cap: 'The pad' },
      { src: 'assets/img/nuoheat/hover-2.jpg', cap: 'The handle' },
      { src: 'assets/img/nuoheat/hover-3.jpg', cap: 'Pad and handle' },
    ],
    sections: [
      {
        id: 'context', label: 'Context', title: 'Rethinking how an everyday appliance generates heat.', fn: 7,
        body: ['Conventional dry irons heat a large soleplate, consuming energy and requiring time to reach the desired temperature. NuoHeat explores localized induction heating as an alternative, delivering heat selectively where it is needed.'],
        note: 'Builds on Meng and Cheng (2019), who showed that induction can heat a plain metal iron through an ironing board.',
      },
      {
        id: 'problem', label: 'Problem', title: 'Why heat the entire surface?',
        quote: 'How might we reduce the energy and time required for ironing by rethinking the heating mechanism itself?',
        body: ['The challenge was to translate localized induction heating into a functional product while balancing thermal performance, component integration, ergonomics and usability.'],
      },
      {
        id: 'process', label: 'Process', title: 'From heating principle to functional prototype.', fn: 8,
        body: ['I explored the relationship between the heating mechanism, product architecture and user interaction.'],
        rows: [
          ['Concept Development', 'Investigated localized induction heating as an alternative to conventional heating.', { src: 'assets/img/nuoheat/reframe.jpg', w: 1600, h: 608, alt: 'Diagram comparing a conventional iron, where heating element, thermostat and wiring are in the hand, with NuoHeat, where only a body and steel soleplate are in the hand.' }],
          ['System Design', 'Explored coil configurations and selective coil activation.', { src: 'assets/img/nuoheat/induction.jpg', w: 1600, h: 643, alt: 'Simplified cross-section: induction coil under the board, padded cover, garment, heated steel soleplate and handle body.' }],
          ['CAD & Product Development', 'Developed the product form and component arrangement.', { src: 'assets/img/nuoheat/studio-pad-dark.jpg', w: 1600, h: 900, alt: 'Studio render of the pad: a slim grey board with the control end and two red knobs at the narrow end.' }],
          ['Material & Thermal Considerations', 'Examined heat transfer and material selection.', { src: 'assets/img/nuoheat/soleplate-layers.jpg', w: 1360, h: 580, alt: 'Close-up render of the handle’s layered body and steel soleplate.' }],
          ['Prototyping & Testing', 'Built and evaluated functional prototypes to assess performance.', { src: 'assets/img/nuoheat/studio-pair-dark.jpg', w: 1600, h: 900, alt: 'Studio render of the pad and handle together on a dark backdrop.' }],
        ],
      },
      {
        id: 'solution', label: 'Solution', title: 'Localized heat. Rethought ironing.', fn: 9,
        body: [
          'NuoHeat is an induction-based ironing system designed around selective heating rather than continuously heating an entire soleplate.',
          'The design integrates a localized heating mechanism, selective coil activation and a passive ironing handle into a cohesive product concept.',
        ],
        figs: [
          { src: 'assets/img/nuoheat/patent-coils.jpg', w: 1600, h: 295, alt: 'Three diagrams of a coil array: coils under the handle switch on, follow it as it moves, and all switch off when it is lifted.', cap: 'Selective coil activation: the heat follows the hand.' },
          { pair: [
            { src: 'assets/img/nuoheat/redesign-pad.jpg', w: 1400, h: 788, alt: 'Render of the pad: grey cushion with a dark control end and two red knobs.' },
            { src: 'assets/img/nuoheat/redesign-handle.jpg', w: 1400, h: 788, alt: 'Render of the passive handle: a red moulded loop grip on a grey body and steel soleplate.' },
          ], cap: 'The pad and the passive handle.' },
        ],
        note: 'The project resulted in a published Indian patent application (202641090848 A, published 31 July 2026, not granted), on which I am a named co-inventor. Selective coil activation is proposed in the application.',
      },
      {
        id: 'outcome', label: 'Outcome', title: 'Testing a different approach to everyday ironing.',
        body: ['Prototype testing recorded approximately:'],
        bigstats: [
          ['75%', 'Lower energy consumption', 'Compared with a conventional dry iron in prototype testing.'],
          ['80%', 'Shorter ironing time', 'Reported comparative prototype result.'],
        ],
        note: 'Test: three cotton shirts per method, ironed by one person, against a 1,100 W dry iron (45 s vs 203 s per shirt). Energy was estimated from rated power × ironing time, not metered.',
        after: ['The project brought industrial design, engineering and functional prototyping together to explore how rethinking a product’s underlying mechanism can improve its performance.'],
        takeaway: [
          'Innovation can begin with questioning the mechanism, not just redesigning the form.',
          'NuoHeat taught me to approach product design as an interconnected system of engineering, materials, ergonomics and user experience.',
        ],
      },
    ],
  },
  {
    slug: 'prakambanam', soon: true, n: '04', title: 'Prakambanam', theme: 'ink',
    field: 'Onam Theme Film', disc: 'Film · Creative Direction · Editing',
    summary: 'A theme film for Onam, built on the sound, colour and rhythm of the festival.',
    meta: [['Format', 'Theme Film'], ['Occasion', 'Onam'], ['Role', 'Creative Director'], ['Also', 'Director · Editor']],
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
        ['list', [['Creative Direction · Direction · Editing', 'Anand Krishna'], ['Cinematography', 'Name'], ['Music', 'Name'], ['Colour', 'Name']]],
      ] },
    ],
  },
  {
    slug: 'the-seek', soon: true, n: '05', title: 'The Seek', theme: 'ink', overlayTitle: true,
    field: 'Ishanya ’26 Theme Film', disc: 'Film · Direction · Editing',
    summary: 'The theme film for Ishanya ’26, about the search that starts before you know what you are looking for.',
    meta: [['Format', 'Theme Film'], ['Event', 'Ishanya ’26'], ['Role', 'Director · Editor'], ['Team', 'Wider Creative Crew, Credited Below']],
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
        ['list', [['Direction · Editing', 'Anand Krishna'], ['Creative Direction', 'Name'], ['Cinematography', 'Name'], ['Sound', 'Name'], ['Grade', 'Name']]],
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
