import { CONTACT_BOOKING_HREF } from '@/lib/contact/offerings'

/** CTAs scroll to the on-page application form; email stays as the fallback. */
export const ARTISTS_BOOKING_HREF = '#apply'
export const ARTISTS_EMAIL_HREF = CONTACT_BOOKING_HREF
export const ARTISTS_HERO_CTA_LABEL = 'Book your Artist Business Audit'
export const ARTISTS_APPLY_LABEL = 'Apply for an Artist Business Audit'

export const ARTISTS_COPY = {
  hero: {
    eyebrow: 'The Artist Business System',
    title: 'Your music career deserves a business behind it.',
    lede: [
      'Turn your music, audience, skills and creative assets into a connected business with products, automated customer journeys and multiple revenue streams.',
      'We build the brand, digital storefront, product ecosystem and launch infrastructure that helps independent artists generate revenue beyond performing, producing and teaching.',
    ],
    tagline: 'Your artist business. Designed, built and launch-ready in 30 days, then optimized for 30 more.',
  },
  problem: {
    eyebrow: '01. The problem',
    title: "You're building a music career. But are you building a business?",
    intro:
      'You release music. You perform. You produce for clients. You teach lessons. You create content. You build an audience.',
    question: "But what happens when you're not actively working?",
    body: [
      'For many independent artists, income is still tied directly to their time.',
      "Their music is scattered across streaming platforms. Their products are underdeveloped or nonexistent. Their website doesn't sell anything meaningful. And there's no connected system bringing everything together.",
    ],
    ownership: {
      title: "Your audience lives on platforms you don't own.",
      body: 'If TikTok, Instagram or Spotify went down tomorrow, how many of your fans could you still reach?',
      hint: 'Switch a platform off to see what happens to your reach.',
    },
    resultLabel: 'The result?',
    result:
      "You're constantly creating opportunities, but not building enough infrastructure to capture them.",
    punch: 'Your creative output has commercial value. It needs a business capable of capturing that value.',
  },
  opportunity: {
    eyebrow: '02. The opportunity',
    title: 'Your music career contains more business opportunities than you think.',
    lead: 'Consider everything you already have:',
    items: [
      'Music that can be licensed, sold or distributed.',
      'Beats, samples and instrumentals that can become digital products.',
      'Knowledge that can become courses, guides and educational products.',
      'An audience that can become an owned customer base.',
      'A personal brand that can attract premium clients.',
      'Creative services that can become structured offers.',
      'Merchandise and experiences that can extend your brand.',
    ],
    punch: [
      "The opportunity isn't necessarily to create more.",
      "It's to package what already exists, connect the pieces and make it easier for people to buy.",
    ],
  },
  solution: {
    eyebrow: '03. The solution',
    title: 'Introducing The Artist Business System.',
    body: [
      'A done-for-you business infrastructure built for independent artists, producers and music creatives.',
      'We bring your brand, products, storefront, audience capture and marketing infrastructure into one connected ecosystem.',
      'Instead of hiring a designer, web developer, copywriter, automation specialist and marketing consultant separately, you get one integrated implementation.',
    ],
    split: [
      'We build it remotely.',
      'You provide your creative assets, direction and approvals.',
      'We handle the implementation.',
    ],
  },
  build: {
    eyebrow: '04. What we build',
    title: 'Ten components. One connected business.',
    components: [
      {
        id: 'brand',
        title: 'Brand Identity & Brand System',
        tagline: 'A recognizable creative identity built around your artistic direction.',
        body: 'Includes brand positioning, visual identity, typography, palette, textures, logo guidelines, photography direction and sonic principles.',
      },
      {
        id: 'lookbook',
        title: 'Interactive Digital Lookbook',
        tagline: 'A premium digital presentation of your artist brand.',
        body: 'Use it as a press kit, booking presentation, collaboration pitch deck or professional introduction.',
      },
      {
        id: 'storefront',
        title: 'Website & Digital Storefront',
        tagline: 'Your own commercial home online.',
        body: 'A branded website and store designed to showcase your work, sell products, present services and direct visitors to your streaming platforms.',
      },
      {
        id: 'email',
        title: 'Email & Fan Capture Infrastructure',
        tagline: 'Turn social media visitors into an audience you can reach directly.',
        body: 'Includes email opt-in forms, welcome sequences, release announcements and automated customer communication.',
      },
      {
        id: 'ecosystem',
        title: 'Product & Offer Ecosystem',
        tagline: 'Turn your creative assets and expertise into structured offers.',
        body: 'We develop a low-ticket, mid-ticket and premium product ladder with pricing, positioning and checkout infrastructure.',
      },
      {
        id: 'product',
        title: 'First Digital Product',
        tagline: 'We build and launch one digital product using your existing creative material.',
        body: '',
        examplesLabel: 'Examples include:',
        examples: [
          'Sample packs.',
          'Preset collections.',
          'Beat collections.',
          'Production guides.',
          'Lesson resources.',
        ],
      },
      {
        id: 'copy',
        title: 'Sales & Website Copywriting',
        tagline: 'Professional messaging across your website, storefront and email sequences.',
        body: 'Designed to communicate your value, explain your offers and guide potential customers toward purchasing.',
      },
      {
        id: 'content',
        title: 'Content & Launch System',
        tagline: 'A practical 90-day content and marketing framework.',
        body: 'Includes content direction, reusable templates, release rollout planning and promotional structure.',
      },
      {
        id: 'launch',
        title: 'Done-for-You Launch Month',
        tagline: 'We prepare your initial launch campaign.',
        body: 'Includes launch emails, scheduled communications and 30 days of promotional content scripts.',
      },
      {
        id: 'audit',
        title: 'Revenue Opportunity Audit & Roadmap',
        tagline: 'We identify opportunities within your existing music business.',
        body: 'Includes an initial 60-minute strategy session and a written 90-day implementation roadmap.',
      },
    ],
  },
  experience: {
    eyebrow: '05. The experience',
    title: 'See what your artist business could look like.',
    videoPlaceholder: 'Demonstration video coming soon',
    intro: 'A walkthrough of a demonstration artist business, showing:',
    items: [
      "The artist's branded website.",
      'The digital storefront.',
      'A live digital product.',
      'Email capture and automated delivery.',
      'The customer journey from discovery to purchase.',
    ],
    disclaimer:
      "This is a demonstration of the system's capabilities, not a representation of a completed client result.",
  },
  additional: {
    eyebrow: '06. Additional value',
    title: 'Three additions to help you launch stronger.',
    items: [
      {
        id: 'support',
        title: '30-Day Post-Launch Optimization',
        body: 'We review the system weekly and make reasonable adjustments to existing pages, emails and workflows.',
      },
      {
        id: 'lead-magnet',
        title: 'Lead Magnet Development',
        body: 'We create one free downloadable resource, with its opt-in page and automated delivery.',
      },
      {
        id: 'social-audit',
        title: 'Social Media Audit',
        body: "A direct audit of your content to make sure it points toward your business and offers. If you're selling a sample pack but posting guitar videos, we'll show you what to change.",
      },
    ],
  },
  implementation: {
    eyebrow: '07. Implementation',
    title: 'From scattered creative assets to a functioning business in 30 days.',
    subtitle: 'Then 30 more days of optimization while it runs. Sixty days from kickoff to fully tuned.',
    weeks: [
      {
        id: 'w1',
        label: 'Week 1',
        title: 'Strategy & Identity',
        body: 'We establish your positioning, brand direction, commercial opportunities and visual identity.',
      },
      {
        id: 'w2',
        label: 'Week 2',
        title: 'Infrastructure & Storefront',
        body: 'We build your website, store, email capture and customer journey.',
      },
      {
        id: 'w3',
        label: 'Week 3',
        title: 'Products & Offers',
        body: 'We package your first digital product, develop your product ladder and complete your sales messaging.',
      },
      {
        id: 'w4',
        label: 'Week 4',
        title: 'Launch Preparation',
        body: 'We test the infrastructure, prepare launch communications, finalize the content system and bring everything live.',
      },
      {
        id: 'optimize',
        label: 'Days 31–60',
        title: 'Post-Launch Optimization',
        body: 'Your business is live. We review it weekly and refine pages, emails and workflows based on how real customers move through it.',
      },
    ],
    note: 'The timeline begins once onboarding materials, required access and initial payment have been received.',
  },
  bonuses: {
    eyebrow: '08. The bonuses',
    title: 'Included in your implementation:',
    items: [
      '30 days of post-launch optimization.',
      'One lead magnet with automated delivery.',
      'A social media audit aligned to your offers.',
    ],
    note: 'Everything is designed to work together as part of the same business ecosystem.',
  },
  investment: {
    eyebrow: '10. The investment',
    title: 'Stop building disconnected pieces. Build the business behind your music.',
    name: 'The Artist Business System',
    price: '$13,982 USD',
    optionsLabel: 'Payment options:',
    options: ['Two payments of $6,991.', '$12,982 paid in full, saving $1,000.'],
    capacity:
      'We accept three new implementation projects per quarter to maintain the quality and attention required for each build.',
    secured: 'Your implementation slot is secured once the initial payment is received.',
  },
  fit: {
    eyebrow: '09. Who this is for',
    title: 'This is for artists who are ready to operate differently.',
    lead: 'The Artist Business System is designed for:',
    for: [
      'Independent recording artists.',
      'Music producers and beatmakers.',
      'Musicians with existing audiences.',
      'Music educators and creative entrepreneurs.',
      'Artists already earning from their creative work.',
      'Labels with artists who want their system built for them.',
    ],
    requirements:
      'You should also have the creative assets, willingness to participate in onboarding and budget available to begin.',
    notFor: 'This is not designed for someone starting their music career from zero.',
  },
  closing: {
    eyebrow: 'Your next move',
    title: 'Your music career has already created the raw material.',
    subtitle: "Let's build the business that brings it together.",
    heading: 'Book an Artist Business Audit.',
    body: "We'll review your current brand, audience, products and revenue opportunities, then determine whether The Artist Business System is the right implementation for you.",
    capacity: 'Three implementation slots available per quarter.',
    disclaimer:
      'The Artist Business System provides business infrastructure, product development and launch implementation. Revenue, customer acquisition and audience growth depend on market conditions and client participation and are not guaranteed.',
  },
}

export const ARTIST_BUSINESS_INVESTMENT = 13982
export const ARTIST_BUSINESS_PAID_IN_FULL = 12982

/** Hero flow: how scattered assets become one connected business. */
export const HERO_FLOW = [
  { id: 'assets', label: 'Your music & assets', short: 'Assets', icon: 'solar:music-notes-linear' },
  { id: 'brand', label: 'Brand', short: 'Brand', icon: 'solar:palette-linear' },
  { id: 'store', label: 'Storefront', short: 'Store', icon: 'solar:shop-2-linear' },
  { id: 'audience', label: 'Owned audience', short: 'Audience', icon: 'solar:users-group-rounded-linear' },
  { id: 'revenue', label: 'Revenue streams', short: 'Revenue', icon: 'solar:graph-up-linear' },
]

export const HERO_FACTS = ['10 components', 'Live in 30 days', '+30 days optimization', '3 builds per quarter']

/** Illustrative share of an artist's reach on each platform, for the outage demo. */
export const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: 'mdi:instagram', share: 35 },
  { id: 'tiktok', name: 'TikTok', icon: 'ic:baseline-tiktok', share: 30 },
  { id: 'spotify', name: 'Spotify', icon: 'mdi:spotify', share: 20 },
  { id: 'youtube', name: 'YouTube', icon: 'mdi:youtube', share: 15 },
]

/** Short labels and icons for the ten-component explorer, keyed by component id. */
export const COMPONENT_META: Record<string, { short: string; icon: string; layer: string }> = {
  brand: { short: 'Brand', icon: 'solar:palette-linear', layer: 'Identity' },
  lookbook: { short: 'Lookbook', icon: 'solar:book-2-linear', layer: 'Identity' },
  storefront: { short: 'Storefront', icon: 'solar:shop-2-linear', layer: 'Storefront' },
  email: { short: 'Email', icon: 'solar:letter-linear', layer: 'Audience' },
  ecosystem: { short: 'Offers', icon: 'solar:layers-linear', layer: 'Products' },
  product: { short: 'Product', icon: 'solar:box-linear', layer: 'Products' },
  copy: { short: 'Copy', icon: 'solar:pen-new-square-linear', layer: 'Storefront' },
  content: { short: 'Content', icon: 'solar:calendar-linear', layer: 'Launch' },
  launch: { short: 'Launch', icon: 'solar:rocket-2-linear', layer: 'Launch' },
  audit: { short: 'Roadmap', icon: 'solar:map-arrow-up-linear', layer: 'Strategy' },
}

/** Opportunity checklist: each existing asset and the revenue stream it can become. */
export const ASSET_STREAMS = [
  { id: 'music', group: 'Artist', asset: 'Released or unreleased music', stream: 'Direct sales and distribution' },
  { id: 'sync', group: 'Artist', asset: 'A catalog with sync potential', stream: 'Sync and licensing deals' },
  { id: 'shows', group: 'Artist', asset: 'Live shows or a touring history', stream: 'Tickets, VIP and experiences' },
  { id: 'merch', group: 'Artist', asset: 'Merch, or a brand people would wear', stream: 'Merch store and drops' },
  { id: 'audience', group: 'Artist', asset: 'A social media following', stream: 'Owned email customer base' },
  { id: 'fans', group: 'Artist', asset: 'Superfans who show up every release', stream: 'Memberships and fan clubs' },
  { id: 'beats', group: 'Producer', asset: 'Beats, samples and instrumentals', stream: 'Digital product store' },
  { id: 'presets', group: 'Producer', asset: 'Presets, kits or signature sounds', stream: 'Sound packs and bundles' },
  { id: 'knowledge', group: 'Producer', asset: 'Production or music knowledge', stream: 'Courses, guides and lessons' },
  { id: 'services', group: 'Business', asset: 'Creative services you already offer', stream: 'Structured, priced offers' },
  { id: 'studio', group: 'Business', asset: 'A studio or session setup', stream: 'Bookable sessions and packages' },
  { id: 'brand', group: 'Business', asset: 'A recognizable personal brand', stream: 'Brand partnerships and premium clients' },
  { id: 'content', group: 'Business', asset: 'A library of videos and visuals', stream: 'Content licensing and ad revenue' },
  { id: 'roster', group: 'Business', asset: 'A label or roster of artists', stream: 'Shared infrastructure across artists' },
]

export const SEPARATE_HIRES = [
  'Designer',
  'Web developer',
  'Copywriter',
  'Automation specialist',
  'Marketing consultant',
]

export const PRICE_PRESETS = [
  {
    group: 'Artist',
    items: [
      { label: 'Album', price: 10 },
      { label: 'Show ticket', price: 35 },
      { label: 'T-shirt', price: 62 },
      { label: 'VIP experience', price: 150 },
    ],
  },
  {
    group: 'Producer & educator',
    items: [
      { label: 'Sample pack', price: 29 },
      { label: 'Course', price: 197 },
      { label: 'Mentorship', price: 997 },
    ],
  },
  {
    group: 'Label & business',
    items: [
      { label: 'Sync license', price: 750 },
      { label: 'Artist services package', price: 2500 },
    ],
  },
]

export const FIT_QUESTIONS = [
  {
    id: 'traction',
    question: 'Do you already have traction?',
    detail: 'An engaged audience, paying fans or clients, or music people already buy, stream or book.',
  },
  {
    id: 'assets',
    question: 'Do you have creative assets to package?',
    detail: 'Music, beats, samples, knowledge, merch ideas, visuals or services.',
  },
  {
    id: 'onboarding',
    question: 'Can you show up for onboarding?',
    detail: 'Share your assets and direction, and give timely approvals during the 30-day build.',
  },
  {
    id: 'budget',
    question: 'Do you have steady income to invest?',
    detail: "It doesn't have to come from music. It just needs to support the build without strain.",
  },
]

export const ARTIST_TESTIMONIALS = [
  {
    name: 'Jozy',
    role: 'Artist',
    avatar:
      'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc120a7728534876c64b.png',
    screenshot:
      'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc1276f60c1083fd0333.png',
    highlight: 'The best investment I could have made for my music.',
    quote: [
      'Working with you has been the best investment I could have made for my music. Your knowledge and understanding of how to bring creative ideas to life has not only been a huge pleasure to witness, but also an undeniable asset to every song.',
      "As I continue to grow as an artist, I think that it's extremely important to keep in mind all the concepts that you've taught me throughout the years.",
      'I look forward to all the future projects together!',
    ],
  },
  {
    name: 'Moqemae',
    role: 'Artist',
    avatar:
      'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc124bc20a014e0890b9.png',
    screenshot:
      'https://storage.googleapis.com/msgsndr/F1J2yvd2AUT4owDs9EPl/media/67dcfc124bc20a323c0890ba.png',
    highlight: 'Truly taken my career to the next level.',
    quote: [
      'Working with Isiata has truly taken my career to the next level. His mixing and mastering services have elevated my tracks to a professional standard, and his production quality is top-tier.',
      "He delivers work in a timely manner and treats every project with the same care and passion as if it were his own. If you're looking for someone who can bring out the best in your music, I highly recommend working with Isiata. He is the FUTURE!",
    ],
  },
]
