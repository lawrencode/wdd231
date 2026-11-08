const activities = [
  {
    id: 1,
    name: 'To Sua Ocean Trench',
    region: 'Upolu',
    difficulty: 'Easy',
    duration: '2 hours',
    cost: '$15',
    bestFor: 'Scenic exploration',
    description: 'A dramatic volcanic swimming hole surrounded by tropical greenery and panoramic island views.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Lalomanu Beach',
    region: 'Upolu',
    difficulty: 'Easy',
    duration: 'Half day',
    cost: 'Free',
    bestFor: 'Beach time',
    description: 'Golden sands and warm shallows make this an ideal spot for a slow, relaxing day by the water.',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Papaseea Sliding Rocks',
    region: 'Upolu',
    difficulty: 'Moderate',
    duration: '3 hours',
    cost: '$10',
    bestFor: 'Adventure',
    description: 'A chain of natural rock pools and slides that appeal to adventurous travelers and families.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Samoan Village Welcome',
    region: 'Apia',
    difficulty: 'Easy',
    duration: '2 hours',
    cost: '$20',
    bestFor: 'Culture',
    description: 'Experience traditional hospitality through music, storytelling, and local cultural demonstrations.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Falealupo Beach',
    region: 'Savai\'i',
    difficulty: 'Easy',
    duration: 'Half day',
    cost: 'Free',
    bestFor: 'Sunset',
    description: 'Known for dramatic cliffs and a beautiful beach curve, making it a favorite for sunset photography.',
    image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'A\'opo Waterfall Hike',
    region: 'Savai\'i',
    difficulty: 'Moderate',
    duration: '4 hours',
    cost: '$12',
    bestFor: 'Nature lovers',
    description: 'A rewarding forest trek leading to a refreshing waterfall and immersive green landscapes.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    name: 'Apia Market Morning',
    region: 'Apia',
    difficulty: 'Easy',
    duration: '1.5 hours',
    cost: '$5',
    bestFor: 'Food & shopping',
    description: 'Browse fresh fruit, street snacks, and local goods while enjoying the lively tropical market energy.',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    name: 'Afu Aau Falls',
    region: 'Savai\'i',
    difficulty: 'Moderate',
    duration: '3 hours',
    cost: '$8',
    bestFor: 'Swimming',
    description: 'A deep blue waterfall pool where cool water and rainforest atmosphere create an unforgettable break.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 9,
    name: 'Tropical Food Tour',
    region: 'Apia',
    difficulty: 'Easy',
    duration: '2.5 hours',
    cost: '$25',
    bestFor: 'Local flavors',
    description: 'Sample fresh seafood, tropical fruit, and traditional dishes served with warm Samoan hospitality.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 10,
    name: 'Matafa\'a Coastal Walk',
    region: 'Coastal',
    difficulty: 'Easy',
    duration: '1 hour',
    cost: 'Free',
    bestFor: 'Sunrise strolls',
    description: 'A scenic shoreline walk with ocean views, gentle breezes, and the relaxed rhythm of island mornings.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 11,
    name: 'Snorkel at Palolo Deep',
    region: 'Coastal',
    difficulty: 'Moderate',
    duration: '2 hours',
    cost: '$18',
    bestFor: 'Ocean adventure',
    description: 'Crystal-clear water and reef life create a memorable undersea experience for beginner and intermediate snorkelers.',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 12,
    name: 'Samoan Dance Evening',
    region: 'Apia',
    difficulty: 'Easy',
    duration: '2 hours',
    cost: '$30',
    bestFor: 'Evening culture',
    description: 'Enjoy live drumbeats, storytelling, and dance that celebrate the energy and spirit of the islands.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 13,
    name: 'Lefaga Bay Picnic',
    region: 'Coastal',
    difficulty: 'Easy',
    duration: '3 hours',
    cost: '$12',
    bestFor: 'Relaxed day',
    description: 'Pack a simple picnic and enjoy a calm shoreline full of blue water, island air, and easygoing vibes.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 14,
    name: 'Island Garden Tour',
    region: 'Upolu',
    difficulty: 'Easy',
    duration: '1.5 hours',
    cost: '$10',
    bestFor: 'Nature & wellness',
    description: 'Walk through lush tropical gardens and discover locally grown fruit, flowers, and native plants.',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 15,
    name: 'Sunset Cruise',
    region: 'Coastal',
    difficulty: 'Easy',
    duration: '2.5 hours',
    cost: '$35',
    bestFor: 'Romantic evenings',
    description: 'Glide across warm waters while the sky turns gold and pink, ending with a peaceful island sunset.',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80'
  }
];

export { activities };










