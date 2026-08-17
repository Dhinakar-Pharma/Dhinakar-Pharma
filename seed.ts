import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const realProducts = [
  {
    name: 'DINA Q-300 Tablets',
    price: 1650,
    category: 'High-Potency CoQ10 Complex',
    focus: 'Male & Female Reproductive Health',
    tagline: 'Advanced Antioxidant & Nutritional Support for Reproductive Health',
    description: 'High-potency formulation featuring Coenzyme Q10, L-Carnitine L-Tartrate, Lycopene, Astaxanthin, Piperine Extract, and essential vitamins & minerals to power fertility through advanced mitochondrial energy and cellular protection.',
    images: ['/products/dina-q-300.jpg'],
    benefits: [
      'ENHANCES CELLULAR ENERGY — Supports mitochondrial ATP synthesis and cell energy.',
      'PROMOTES HEART HEALTH — Improves overall cardiac efficiency and vascular health.',
      'REDUCES FATIGUE — Helps reduce persistent fatigue and boosts daily stamina.',
      'POWERFUL ANTIOXIDANT — Protects cells and DNA from oxidative damage.',
      'SUPPORTS VITALITY & WELLNESS — Maintains overall vitality and reproductive health.'
    ],
    nutrition: {
      packInfo: [
        { component: 'Pack Size', amount: '10 x 10 Tablets (1x10 Blister Strip)' },
        { component: 'Formulation Class', amount: 'Rx Prescription Nutritional Supplement' },
        { component: 'Dosage Form', amount: 'Tablets' }
      ],
      overallSupports: [
        'Fertility & Reproductive Health',
        'Energy & Stamina',
        'Antioxidant Protection',
        'Heart & Cardiovascular Health',
        'Immunity & Overall Wellness',
        'Mitochondrial Energy',
        'Sperm Quality & Motility'
      ],
      ingredientBenefits: [
        {
          ingredient: 'Coenzyme Q10',
          benefits: 'Supports cellular energy production and mitochondrial function. Improves sperm quality, motility and overall fertility.'
        },
        {
          ingredient: 'L-Carnitine L-Tartrate',
          benefits: 'Enhances energy metabolism and reduces fatigue. Supports sperm motility and reproductive performance.'
        },
        {
          ingredient: 'Lycopene',
          benefits: 'Potent antioxidant that protects cells from oxidative stress. Supports prostate health and improves sperm parameters.'
        },
        {
          ingredient: 'Astaxanthin',
          benefits: 'Strong antioxidant that reduces oxidative damage. Supports endurance, stamina and reproductive health.'
        },
        {
          ingredient: 'Piperine Extract',
          benefits: 'Enhances absorption and bioavailability of nutrients. Supports digestive health and nutrient intake.'
        },
        {
          ingredient: 'Vitamins (A, C, D3, E, B-Complex)',
          benefits: 'Support immunity, energy production and cell protection. Improve overall vitality and reproductive health.'
        },
        {
          ingredient: 'Minerals (Zinc, Selenium, Copper)',
          benefits: 'Essential for hormone balance and enzyme function. Supports sperm quality, immunity and antioxidant defense.'
        }
      ]
    },
    ingredients: [
      'Coenzyme Q10',
      'L-Carnitine L-Tartrate',
      'Lycopene',
      'Astaxanthin',
      'Piperine Extract',
      'Vitamins (A, C, D3, E, B-Complex)',
      'Minerals (Zinc, Selenium, Copper)'
    ],
    faq: [
      {
        question: 'What is the primary role of Coenzyme Q10 in DINA Q-300?',
        answer: 'Coenzyme Q10 powers mitochondrial ATP production in gamete cells, improving motility, sperm quality, and oocyte cellular energy.'
      },
      {
        question: 'Why is Piperine extract included in DINA Q-300?',
        answer: 'Piperine extract acts as a natural bio-enhancer, significantly increasing gastrointestinal absorption of lipid-soluble antioxidants like CoQ10, Astaxanthin, and Lycopene.'
      }
    ]
  },
  {
    name: 'DINA OVA-M Capsules',
    price: 1350,
    category: 'Female Reproductive Health',
    focus: 'PCOS & Fertility Management',
    tagline: 'The Right Choice for PCOS & Fertility Management',
    description: 'Scientifically calibrated formulation combining Myo-Inositol, D-Chiro-Inositol, L-Methylfolate Calcium, Chromium Picolinate, Melatonin, and Vitamin D3 to support ovulatory regularity, lower excessive androgen/testosterone levels, improve insulin sensitivity, and protect oocyte quality.',
    images: ['/products/dina-ova-[#0c2160]'.includes('ova') ? '/products/dina-ova-m.jpg' : '/products/dina-ova-m.jpg'],
    benefits: [
      'LOWERS TESTOSTERONE LEVELS — Decreases insulin resistance & excessive androgen levels in PCOS.',
      'IMPROVES INSULIN LEVELS — Lowers triglycerides & improves ovarian response to hormones.',
      'IMPROVES OOCYTE QUALITY — Melatonin & L-Methylfolate protect ovarian follicles & form healthy RBCs.',
      'RESTORES OVULATORY ACTIVITY — Achieves egg maturation (lutein & successful ovulation).',
      'SUPPORTS HEALTHY PREGNANCY — Ideal preconception support for women undergoing fertility treatment.'
    ],
    nutrition: {
      packInfo: [
        { component: 'Pack Size', amount: '10 x 1 x 10 Capsules' },
        { component: 'Formulation Class', amount: 'Rx Prescription PCOS & Fertility Supplement' },
        { component: 'Dosage', amount: '1 Capsule Daily or as directed by the physician' }
      ],
      overallSupports: [
        'Hormonal Balance',
        'Improves Ovarian Function',
        'Supports Egg Quality',
        'Promotes Ovulation Naturally',
        'Healthy Pregnancy Outcomes'
      ],
      ingredientBenefits: [
        {
          ingredient: 'Myo-Inositol & D-Chiro-Inositol',
          benefits: 'Decreases insulin & excessive androgen. Improves ovarian response to gonadotropins, helps egg maturation, and lowers triglycerides.'
        },
        {
          ingredient: 'L-Methylfolate Calcium',
          benefits: 'Helps to form healthy RBCs and treats anaemia in pre-conception care.'
        },
        {
          ingredient: 'Melatonin',
          benefits: 'Protects ovarian follicles from oxidative damage during follicular maturation.'
        },
        {
          ingredient: 'Chromium Picolinate',
          benefits: 'Ensures better ovulation rate and potentiates insulin action.'
        },
        {
          ingredient: 'Vitamin D3',
          benefits: 'Improves follicular development and ovulatory function.'
        }
      ]
    },
    ingredients: [
      'Myo-Inositol',
      'D-Chiro-Inositol',
      'L-Methylfolate Calcium',
      'Chromium Picolinate',
      'Melatonin',
      'Vitamin D3'
    ],
    faq: [
      {
        question: 'What are the major clinical indications for DINA OVA-M?',
        answer: 'DINA OVA-M is indicated for Polycystic Ovary Syndrome (PCOS), Oligomenorrhea (irregular or infrequent ovulation), Amenorrhoea / Anovulation, Infertility associated with PCOS, and Insulin Resistance & Metabolic Dysfunction.'
      },
      {
        question: 'Who is DINA OVA-M suitable for?',
        answer: 'It is recommended for women with PCOS, women trying to conceive, preconception care, and women undergoing IVF or fertility treatments.'
      }
    ]
  },
  {
    name: 'DINA Q-10 Capsules',
    price: 1250,
    category: 'Cardiovascular & Fertility Support',
    focus: 'OAT-Related Male & Female Fertility',
    tagline: 'A Complete Approach to OAT-Related Fertility & Bio-Energizer Support',
    description: 'Advanced antioxidant and nutritional support combining Ubidecarenone (Coenzyme Q10 100 mg), Lycopene (10% 5000 mcg), Omega 3-Fatty Acids (90 mg & 80 mg), Essential Vitamins, and Biotin (30 mcg). Formulated to power mitochondrial energy, improve sperm motility & count, and nourish ovarian egg quality.',
    images: ['/products/dina-q-10.jpg'],
    benefits: [
      'ENHANCES MITOCHONDRIAL ENERGY — Coenzyme Q10 increases ATP production in mitochondria & improves sperm motility.',
      'POWERFUL ANTIOXIDANT PROTECTION — Lycopene & Essential Vitamins shield cellular membranes from oxidative damage.',
      'IMPROVES SPERM MOTILITY & MORPHOLOGY — Omega 3-Fatty Acids elevate seminal fluid antioxidant activity.',
      'SUPPORTS OVARIAN & EGG QUALITY — CoQ10 and Lycopene support egg maturation and endometrial health.',
      'SUPPORTS FERTILITY OUTCOMES — Advanced formulation for men with OAT and women preparing for IVF/IUI.'
    ],
    nutrition: {
      packInfo: [
        { component: 'Pack Size', amount: '1 x 10 Tablets / 10 x 1 x 10 Capsules' },
        { component: 'Formulation Class', amount: 'Rx Bioenergizer & Antioxidant Formula' },
        { component: 'Dosage Form', amount: 'Capsules / Tablets' }
      ],
      overallSupports: [
        'Mitochondrial ATP Energy',
        'Antioxidant Protection',
        'Sperm Motility & Count',
        'Ovarian Function & Egg Quality',
        'Fertility & Conception Outcomes'
      ],
      ingredientBenefits: [
        {
          ingredient: 'Ubidecarenone (Coenzyme Q10 100 mg)',
          benefits: 'Powerful bioenergizer that increases ATP production in mitochondria, boosting sperm motility, mean concentration, and egg quality.'
        },
        {
          ingredient: 'Lycopene (10% 5000 mcg)',
          benefits: 'Potent carotenoid antioxidant that protects cells from oxidative stress and improves sperm count and viability.'
        },
        {
          ingredient: 'Omega 3-Fatty Acids (90 mg & 80 mg)',
          benefits: 'Provides higher antioxidant activity in seminal fluid and supports hormone balance & endometrial health.'
        },
        {
          ingredient: 'Essential Vitamins',
          benefits: 'Protects cellular membranes, inhibits oxidation, and boosts immunity & healthy conception.'
        },
        {
          ingredient: 'Biotin (30 mcg)',
          benefits: 'Supports cell growth & metabolism, increasing sperm motility & longevity in cryopreserved samples and supporting fetal development.'
        }
      ]
    },
    ingredients: [
      'Ubidecarenone (Coenzyme Q10) 100 mg',
      'Lycopene 10% 5000 mcg',
      'Omega 3-fatty acid 90 mg & 80 mg',
      'Essential Vitamins',
      'Biotin 30 mcg'
    ],
    faq: [
      {
        question: 'What male infertility conditions is DINA Q10 indicated for?',
        answer: 'DINA Q10 is clinically indicated for Oligoasthenoteratozoospermia (OAT), Aspermia, Oligospermia, Asthenozoospermia, Teratozoospermia, and Hypospermia.'
      },
      {
        question: 'How does DINA Q10 benefit female fertility?',
        answer: 'In female fertility, DINA Q10 enhances ovarian mitochondrial energy, improves egg maturation, reduces oxidative stress in ovaries, and supports endometrial health for better IVF/IUI outcomes.'
      }
    ]
  },
  {
    name: 'DINAQUIN-L Tablets',
    price: 1550,
    category: 'Cellular & Oocyte Quality Complex',
    focus: 'Advanced Antioxidant & Fertility Support',
    tagline: 'Supporting Oocyte Quality, Fertility & Healthy Pregnancy for Successful Conception',
    description: 'High-performance fertility tablet combining Ubiquinol Acetate (Reduced CoQ10), L-Ornithine HCl, Piperine Extract, Melatonin, Folic Acid & Vitamin D2. Scientifically engineered to improve oocyte quality, reduce oxidative stress, and support early embryo development.',
    images: ['/products/dinaquin-l.jpg'],
    benefits: [
      'IMPROVES OOCYTE QUALITY — Ubiquinol Acetate supports mitochondrial energy & embryo development.',
      'ENHANCES FERTILITY POTENTIAL — L-Ornithine HCl supports nitric oxide production & reproductive organ blood flow.',
      'REDUCES OXIDATIVE STRESS — Melatonin & Folic Acid shield oocytes and nuclear DNA from free radicals.',
      'SUPPORTS EMBRYO DEVELOPMENT — Essential cofactors promote healthy cell division & implantation.',
      'SUPPORTS HEALTHY PREGNANCY — Vitamin D2 & bio-enhancers support hormonal balance & successful conception.'
    ],
    nutrition: {
      packInfo: [
        { component: 'Pack Size', amount: '10 x 10 Tablets' },
        { component: 'Formulation Class', amount: 'Rx Oocyte & Conception Support Supplement' },
        { component: 'Dosage Form', amount: 'Tablets' }
      ],
      overallSupports: [
        'Oocyte Quality',
        'Fertility Potential',
        'Oxidative Stress Defense',
        'Embryo Development',
        'Healthy Pregnancy'
      ],
      ingredientBenefits: [
        {
          ingredient: 'Ubiquinol Acetate (Reduced CoQ10)',
          benefits: 'Active reduced form of CoQ10 providing immediate mitochondrial energy production, improving oocyte quality and embryo development.'
        },
        {
          ingredient: 'L-Ornithine HCl',
          benefits: 'Supports nitric oxide production, improving vascular blood flow to reproductive organs and enhancing overall fertility.'
        },
        {
          ingredient: 'Piperine Extract',
          benefits: 'Bio-availability enhancer that increases intestinal absorption of co-formulated antioxidants.'
        },
        {
          ingredient: 'Melatonin',
          benefits: 'Intra-follicular antioxidant protecting oocytes from oxidative damage and supporting follicular maturation.'
        },
        {
          ingredient: 'Folic Acid',
          benefits: 'Essential for DNA synthesis and pre-conception support to prevent neural tube defects.'
        },
        {
          ingredient: 'Vitamin D2',
          benefits: 'Supports hormonal balance and improves reproductive outcomes in ART / IVF treatments.'
        }
      ]
    },
    ingredients: [
      'Ubiquinol Acetate',
      'L-Ornithine HCl',
      'Piperine Extract',
      'Melatonin',
      'Folic Acid',
      'Vitamin D2'
    ],
    faq: [
      {
        question: 'Who are the ideal patients for DINAQUIN-L?',
        answer: 'DINAQUIN-L is recommended for women planning conception, low ovarian reserve, poor oocyte quality, ART / IVF / IUI patients, recurrent implantation failure, and preconception nutritional care.'
      }
    ]
  },
  {
    name: 'DINA Q-LC Capsules',
    price: 1450,
    category: 'Male Reproductive Health',
    focus: 'Male Fertility & Antioxidant Protection',
    tagline: 'Comprehensive Antioxidant & Nutritional Support for Male Fertility',
    description: 'Advanced antioxidant formulation combining Coenzyme Q10, L-Carnitine, N-Acetyl L-Cysteine, Lycopene, Astaxanthin, Zinc & Essential Vitamins. Specifically formulated to support sperm motility, count, morphology, and mitochondrial energy while shielding cellular DNA from oxidative stress.',
    images: ['/products/dina-q-lc.jpg'],
    benefits: [
      'ENHANCES SPERM COUNT & MOTILITY — Improves total sperm density and progressive motility.',
      'PROTECTS DNA INTEGRITY — Neutralizes reactive oxygen species (ROS) and reduces DNA fragmentation.',
      'BOOSTS MITOCHONDRIA ENERGY — Supplies essential cofactors for sperm flagellar motion.',
      'PROMOTES SPERM MORPHOLOGY — Preserves normal sperm head & tail architecture.',
      'SUPPORT FOR IVF / ICSI — Ideal pre-treatment nutritional support prior to assisted reproduction.'
    ],
    nutrition: {
      packInfo: [
        { component: 'Pack Size', amount: '10 x 1 x 10 Capsules' },
        { component: 'Dosage Form', amount: 'Softgel / Hard Capsules' }
      ],
      overallSupports: [
        'Male Fertility & Spermatogenesis',
        'Mitochondrial Energy',
        'Antioxidant ROS Defense',
        'DNA Fragmentation Reduction',
        'IVF / ICSI Pre-Treatment'
      ],
      ingredientBenefits: [
        {
          ingredient: 'Coenzyme Q10',
          benefits: 'Drives ATP energy synthesis in sperm mitochondria, promoting progressive motility.'
        },
        {
          ingredient: 'L-Carnitine',
          benefits: 'Facilitates fatty acid transport into mitochondria for flagellar energy.'
        },
        {
          ingredient: 'N-Acetyl L-Cysteine (NAC)',
          benefits: 'Precursor to Glutathione, lowering semen ROS and cellular inflammation.'
        },
        {
          ingredient: 'Lycopene & Astaxanthin',
          benefits: 'Lipid-soluble antioxidants that protect sperm membrane from lipid peroxidation.'
        },
        {
          ingredient: 'Zinc Sulphate & Selenium',
          benefits: 'Essential trace elements required for testosterone synthesis and sperm maturation.'
        }
      ]
    },
    ingredients: [
      'Coenzyme Q10',
      'L-Carnitine',
      'N-Acetyl L-Cysteine (NAC)',
      'Lycopene',
      'Astaxanthin',
      'Vitamin C',
      'Selenium',
      'Zinc Sulphate',
      'Vitamin E'
    ],
    faq: [
      {
        question: 'What are the main indications for DINA Q-LC?',
        answer: 'DINA Q-LC is indicated for Oligospermia, Asthenozoospermia, Teratozoospermia, OAT Syndrome, Male Infertility, and IVF/ICSI preparation.'
      }
    ]
  }
];

async function main() {
  console.log('Clearing old products & order items from database...');
  try {
    await prisma.orderItem.deleteMany({});
  } catch (e) {
    console.error('OrderItem cleanup note:', e);
  }

  await prisma.product.deleteMany({});
  console.log('Old products cleared.');

  console.log('Seeding All 5 Official Dhinakar Pharma Products with Flyer Data...');
  for (const prod of realProducts) {
    const created = await prisma.product.create({
      data: prod
    });
    console.log(`Successfully added product: ${created.name} (ID: ${created.id})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
