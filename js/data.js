/**
 * Persona 5 Authentic Mementos Lore & Tokyo Citizen Chatter Data
 */
const P5_INITIAL_TARGETS = [
  {
    id: 'req-001',
    title: 'The Bark and Bite of a Bully',
    targetName: 'Daisuke Takanashi',
    shadowName: 'Shadow Takanashi',
    location: 'Shujin Academy Courtyard / Aiyatsbus Floor 2',
    sin: 'Pride & Wrath',
    distortionLevel: 78,
    status: 'reformed',
    requestDate: 'MAY 09',
    postsCount: 142,
    excerpt: 'An arrogant senior who violently extorts money from lowerclassmen and forces them to buy his lunch under threat of beatings.',
    fullDossier: 'Target uses his track team reputation to intimidate students in the blind spots of Shujin Academy. Multiple victims reported giving up their allowances out of sheer terror. His Shadow manifests as an aggressive guard hound with studded spikes.',
    witnessQuotes: [
      { user: 'Shujin_Freshman', text: 'Thank you Phantom Thieves!! Takanashi apologized with tears streaming down his face in front of the entire assembly today!' },
      { user: 'Gym_Teacher', text: 'I never expected Takanashi to confess his misconduct voluntarily. Something unbelievable happened.' }
    ]
  },
  {
    id: 'req-002',
    title: "Winners Don't Use Cheats!",
    targetName: 'Yoshikuni Nejima',
    shadowName: 'Shadow Nejima (The Invincible Gunner)',
    location: 'Akihabara Gigolo Arcade / Chemdah Floor 5',
    sin: 'Greed',
    distortionLevel: 85,
    status: 'reformed',
    requestDate: 'SEP 04',
    postsCount: 389,
    excerpt: 'A notorious arcade shooter who hacked the cabinet hardware to make himself completely invincible, humiliating other players and taking their bets.',
    fullDossier: 'Target spent months ruining the competitive arcade scene in Akihabara. Players who confronted him were mocked and banned from the venue through his connections with local shady staff. In Mementos, his Shadow is protected by an impervious barrier.',
    witnessQuotes: [
      { user: 'Gamer_King_Shinya', text: 'Get smoked!! Nejima finally broke down, smashed his cheat flash-cart, and reimbursed everyone he scammed.' },
      { user: 'Arcade_Regular_04', text: 'He confessed everything on Twitter live! The Phantom Thieves are legendary.' }
    ]
  },
  {
    id: 'req-003',
    title: "Who's Muscling in Yongen-Jaya?",
    targetName: 'Shinpei Minamoto',
    shadowName: 'Shadow Minamoto',
    location: 'Yongen-Jaya Backstreets / Kaitul Floor 3',
    sin: 'Greed & Envy',
    distortionLevel: 92,
    status: 'investigating',
    requestDate: 'OCT 14',
    postsCount: 618,
    excerpt: 'A ruthless predatory loan shark shaking down the quiet mom-and-pop shops in Yongen-Jaya with exorbitant illegal interest rates.',
    fullDossier: 'Preying on elderly shop owners who cannot afford legal defense. He has been vandalizing storefronts at midnight and threatening to burn down family businesses. The distortion around Yongen-Jaya back-alleys is reaching dangerous critical mass.',
    witnessQuotes: [
      { user: 'Sojiro_Fan', text: 'Those poor shopkeepers are terrified. Please, Phantom Thieves, if you are real, teach this scum a lesson!' },
      { user: 'Alley_Cat_01', text: 'Saw suspicious black-suited thugs lingering near the public bathhouse yesterday.' }
    ]
  },
  {
    id: 'req-004',
    title: 'Part-Time Job, Full-Time Hell',
    targetName: 'Katsumi Oyamada',
    shadowName: 'Shadow Oyamada',
    location: 'Shibuya Triple Seven Convenience Store / Adyeshach Floor 1',
    sin: 'Sloth & Greed',
    distortionLevel: 68,
    status: 'new',
    requestDate: 'NOV 02',
    postsCount: 88,
    excerpt: 'A store manager who forces part-time student staff to work 16-hour shifts without overtime pay while pocketing their earned wages.',
    fullDossier: 'Threatens foreign exchange students and struggling high schoolers that he will report them for fabricated shoplifting if they quit or complain. Multiple employees have collapsed from exhaustion during graveyard shifts.',
    witnessQuotes: [
      { user: 'NightShift_Worker', text: 'I haven’t slept more than 3 hours a day this week. I can’t quit because he confiscated my student ID card.' },
      { user: 'Phan_Supporter_99', text: 'Phantom Thieves, please steal this manager’s heart before someone ends up hospitalized!' }
    ]
  },
  {
    id: 'req-005',
    title: 'The Shadow Who Was An Idol',
    targetName: 'Asami Nakanohara',
    shadowName: 'Shadow Nakanohara',
    location: 'Shinjuku Entertainment District / Da’at Sector',
    sin: 'Lust & Greed',
    distortionLevel: 81,
    status: 'new',
    requestDate: 'NOV 18',
    postsCount: 204,
    excerpt: 'An unscrupulous talent agency executive forcing young aspiring idols into predatory contracts and compromising personal favors.',
    fullDossier: 'Target lures hopeful performers from provincial towns with promises of TV debuts, then binds them in multimillion yen cancellation penalty clauses. Her heart’s distortion resembles a lavish gilded cage where dreams are consumed.',
    witnessQuotes: [
      { user: 'StarGazer_Tokyo', text: 'My friend auditioned last month and now she won’t even answer her phone. Something is deeply wrong.' },
      { user: 'IdolFan_Akiba', text: 'The industry needs a total cleansing. Phantom Thieves, take her heart!' }
    ]
  }
];

const P5_INITIAL_MURMURS = [
  { id: 'm-1', author: 'PhanSite_Admin (Mishima)', role: 'admin', text: 'Remember everyone: we do not accept requests born out of petty grudges. Only true distortions of malice.', time: '2m ago' },
  { id: 'm-2', author: 'Shujin_Student_B', role: 'fan', text: 'Did you see Kamoshida crying on his knees during the morning assembly? The Phantom Thieves are REAL!!', time: '5m ago' },
  { id: 'm-3', author: 'Akechi_Follower', role: 'skeptic', text: 'Vigilante justice is still a crime. What happens if they target the wrong person? Detective Akechi will expose them.', time: '9m ago' },
  { id: 'm-4', author: 'Ryuji_No1_Fan', role: 'fan', text: 'FOR REAL?! Look at the approval rating climbing up! Let’s keep voting YES!', time: '14m ago' },
  { id: 'm-5', author: 'Akiba_Techie', role: 'neutral', text: 'Checked the site code. Hacked routing? No IP traces? Who built this meta-channel?!', time: '18m ago' },
  { id: 'm-6', author: 'Salaryman_Sato', role: 'fan', text: 'Please come to our company next. My department chief takes all our credit and screams daily.', time: '22m ago' }
];

const P5_MURMURS_POOL = [
  { author: 'Yongen_Resident', role: 'fan', text: 'Saw a black cat wandering the alleys today... Felt like it was watching over us.' },
  { author: 'Police_Informant_Anon', role: 'neutral', text: 'The Special Investigation Unit is having emergency meetings every single morning.' },
  { author: 'Diet_Member_Staff', role: 'skeptic', text: 'This is mass hysteria. Hearts cannot be stolen, medical science confirms it.' },
  { author: 'Tokyo_Highschooler', role: 'fan', text: 'Just submitted a request for our abusive tutor. Phantom Thieves please help us!!' },
  { author: 'PhanSite_Admin (Mishima)', role: 'admin', text: 'New target reports are being analyzed. Keep your eyes on the Tokyo headlines tonight.' },
  { author: 'Shibuya_Night_Owl', role: 'fan', text: 'The giant screen at the crossing just flickered with the red logo for 2 seconds!! Did anyone else see that?!' }
];
