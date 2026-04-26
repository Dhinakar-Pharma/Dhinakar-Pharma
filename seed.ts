import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const newProducts = [
  {
    name: 'NutriGRA',
    price: 1200, // You can adjust the exact price here
    category: 'Men\'s Health & Wellness',
    focus: 'Stress Relief & Testosterone Booster',
    tagline: 'Clinically Proven Patented Formula',
    description: 'NutriGRA is a clinically proven, 100% natural, patented product designed to reduce stress and anxiety, act as a mood elevator, and naturally boost testosterone levels safely and effectively.',
    image: '/nutrigra.jpg', // Ensure you save the image as public/nutrigra.jpg
    benefits: [
      'Reduces Stress & Anxiety',
      'Mood Elevator',
      'Testosterone Booster',
      '100% Natural, Safe & Effective'
    ],
    nutrition: [
      { component: 'Serving', amount: '1 Capsule' },
      { component: 'Quantity', amount: '30 Veg Capsules' }
    ],
    ingredients: ['Clinically Proven Patented Ingredients'],
    faq: [
      {
        question: 'What is the dosage?',
        answer: 'Take as directed by your healthcare professional. Contains 30 Veg Capsules per bottle.'
      }
    ]
  },
  {
    name: 'Herbosome',
    price: 850,
    category: 'Pain Relief & Digestive Health',
    focus: 'Natural Analgesic & Anti-inflammatory',
    tagline: 'Curcumin 500 mg + Piperine 5 mg Capsules',
    description: 'Herbosome is a powerful 100% natural analgesic and antipyretic formulation. It reduces inflammation, aids in the management of IBS/IBD, and supports overall digestive health.',
    image: '/herbosome.jpg', // Ensure you save the image as public/herbosome.jpg
    benefits: [
      'Natural Pain Relief',
      'Reduces Inflammation & Peptic ulcers',
      'Supports Digestive Health',
      'Helps in the Management of IBS / IBD'
    ],
    nutrition: [
      { component: 'Curcumin', amount: '500 mg' },
      { component: 'Piperine', amount: '5 mg' },
      { component: 'Quantity', amount: '30 Veg Capsules' }
    ],
    ingredients: ['Curcumin 500mg', 'Piperine 5mg'],
    faq: [
      {
        question: 'Is this formula safe?',
        answer: 'Yes, it is a clinically proven formula with 100% natural ingredients.'
      }
    ]
  },
  {
    name: 'Bonfortis-K2',
    price: 750,
    category: 'Bone Health',
    focus: 'Bone Formation & Strength',
    tagline: 'Advanced Bone Health Supplement',
    description: 'Bonfortis-K2 provides comprehensive support for bone formation and strength. It features 3 different sources of calcium with an ideal Ca:P ratio of 2:1, enhanced by Vitamin K2-7 from natural sources.',
    image: '/bonfortis-k2.jpg', // Ensure you save the image as public/bonfortis-k2.jpg
    benefits: [
      'Supports Bone Strength & Health',
      '3 Different Sources of Calcium',
      'Ideal Ca:P Ratio 2:1 for Bone Formation',
      'Vitamin K2-7 from Natural Source'
    ],
    nutrition: [
      { component: 'Calcium', amount: '3 Sources' },
      { component: 'Ca:P Ratio', amount: '2:1' },
      { component: 'Quantity', amount: '30 Tablets' }
    ],
    ingredients: ['Calcium (3 sources)', 'Phosphorus', 'Vitamin K2-7 (Natural Source)'],
    faq: [
      {
        question: 'Who should take Bonfortis-K2?',
        answer: 'Anyone looking to help in strong bone formation naturally and effectively.'
      }
    ]
  },
  {
    name: 'Charcoal Probiotic',
    price: 950,
    category: 'Gut Health',
    focus: 'Gut Detox & Digestion',
    tagline: 'Natural Gut Detox Formula',
    description: 'A 100% natural product designed to cleanse and detoxify the gut. Charcoal Probiotic reduces bloating, relieves gas and discomfort, and supports smooth digestion and overall gut balance.',
    image: '/charcoal-probiotic.jpg', // Ensure you save the image as public/charcoal-probiotic.jpg
    benefits: [
      'Natural Gut Detox (cleanses naturally)',
      'Reduce Bloating and Flatulence',
      'Helps relieve gas and discomfort',
      'Helps in Digestion (supports smooth digestion & gut balance)'
    ],
    nutrition: [
      { component: 'Product Type', amount: '100% Natural' },
      { component: 'Quantity', amount: '30 Veg Capsules' }
    ],
    ingredients: ['Activated Charcoal', 'Probiotics'],
    faq: [
      {
        question: 'Is this safe for daily use?',
        answer: 'Yes, it is a safe & effective formula designed for gut health support.'
      }
    ]
  },
  {
    name: 'Green DETOX',
    price: 1100,
    category: 'Detox & Rejuvenation',
    focus: 'Oxygenation & Vitality',
    tagline: 'Chlorophyll + Guarana',
    description: 'Green DETOX is a natural, plant-based drink mix that revitalizes the body and mind. It improves oxygen saturation, naturally increases haemoglobin levels, and detoxifies your system for overall well-being.',
    image: '/green-detox.jpg', // Ensure you save the image as public/green-detox.jpg
    benefits: [
      'Improves Oxygen Saturation Levels (better oxygen utilisation)',
      'Improves Haemoglobin Levels naturally',
      'Revitalises the Body and Mind',
      'Detoxifies & Rejuvenates for overall well-being'
    ],
    nutrition: [
      { component: 'Serving Size', amount: '1 Scoop (1g)' },
      { component: 'Quantity', amount: '30 Serves' }
    ],
    ingredients: ['Chlorophyll', 'Guarana'],
    faq: [
      {
        question: 'How do I use Green DETOX?',
        answer: 'Mix 1 Scoop with 200 ml of Water.'
      }
    ]
  }
];

async function main() {
  console.log('Clearing old products from database...');
  try {
    await prisma.orderItem.deleteMany({});
  } catch (e) {
    // Ignore if table is empty or error occurs
  }

  await prisma.product.deleteMany({});
  console.log('Database wiped.');

  console.log('Seeding new products...');
  for (const prod of newProducts) {
    const created = await prisma.product.create({
      data: prod
    });
    console.log(`Successfully added: ${created.name}`);
  }
  
  console.log('\nAll 5 products have been added to the database!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
