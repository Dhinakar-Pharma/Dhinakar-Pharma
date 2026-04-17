export interface NutritionItem {
  component: string;
  amount: string;
  label?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  focus: string;
  tagline: string;
  description: string;
  image: string;
  benefits: string[];
  nutrition: NutritionItem[];
  faq: FAQItem[];
  ingredients: string[]; // Keeping this for the list view
}

export const products: Product[] = [
  {
    id: "dina-ova-m",
    name: "DINA OVA-M",
    category: "Metabolic Health",
    focus: "PCOS MANAGEMENT",
    tagline: "Hormonal Harmony & Fertility Support.",
    description: "Providing a holistic approach to PCOS management, DINA OVA-M targets the root causes of metabolic and reproductive imbalances. By combining Myo-Inositol and D-Chiro-Inositol with essential co-factors, this formulation restores ovarian regularity and improves oocyte quality, empowering patients on their journey to hormonal health.",
    image: "/dina-ova-m.jpg",
    benefits: [
      "Comprehensive management of Polycystic Ovary Syndrome (PCOS)",
      "Regulates irregular menstrual cycles and restores rhythm",
      "Addresses core insulin resistance safely and effectively",
      "Supports fertility and improves overall oocyte quality"
    ],
    nutrition: [
      { component: "Myo-Inositol", amount: "2000 mg", label: "" },
      { component: "D-Chiro-Inositol", amount: "50 mg", label: "40:1 Ratio" },
      { component: "L-Methylfolate", amount: "100 mcg", label: "" },
      { component: "Vitamin D3", amount: "1000 IU", label: "" },
      { component: "Melatonin", amount: "1 mg", label: "" },
      { component: "Chromium Picolinate", amount: "200 mcg", label: "" }
    ],
    faq: [
      { question: "How should DINA OVA-M be consumed?", answer: "Dissolve one sachet in a glass of water, ideally in the morning, or as directed by your physician." },
      { question: "Are there any side effects?", answer: "DINA OVA-M is generally well-tolerated. However, consult your doctor if you experience any unusual symptoms." }
    ],
    ingredients: ["MYO-INOSITOL", "D-CHIRO-INOSITOL", "L-METHYLFOLATE", "CHROMIUM PICOLINATE", "MELATONIN", "VITAMIN D3"]
  },
  {
    id: "dina-q10",
    name: "DINA Q-10",
    category: "Cellular Energy",
    focus: "ANTIOXIDANT & METABOLIC SUPPORT",
    tagline: "High-Potency Bio-Available Energy Shield.",
    description: "A potent antioxidant and metabolic support formula combining Coenzyme Q10, Lycopene, Omega-3 fatty acids, and Biotin to enhance cellular energy, protect against oxidative stress, and support cardiovascular and reproductive health.",
    image: "/dina-q10.png",
    benefits: [
      "Boosts cellular energy (ATP) production and cardiac health",
      "Neutralizes harmful free radicals with 5000mcg Lycopene",
      "Reduces systemic inflammation with Omega-3 fatty acids",
      "Supports healthy hair, skin, and nail growth via Biotin"
    ],
    nutrition: [
      { component: "Ubidecarenone (Coenzyme Q10)", amount: "100 mg" },
      { component: "Lycopene 10%", amount: "5000 mcg" },
      { component: "Omega-3", amount: "90 mg" },
      { component: "Fatty Acids", amount: "80 mg" },
      { component: "Biotin", amount: "30 mcg" },
      { component: "Essential Vitamins", amount: "q.s." },
      { component: "Excipients", amount: "q.s." }
    ],
    faq: [
      { question: "How does DINA Q-10 support fertility?", answer: "The combination of CoQ10 and Lycopene acts as a powerful antioxidant system that helps improve egg and sperm quality by reducing oxidative stress." },
      { question: "What is the role of Omega-3 in this formula?", answer: "Omega-3 fatty acids help maintain healthy blood circulation and support cognitive function while reducing naturally occurring systemic inflammation." }
    ],
    ingredients: ["COQ10 100MG", "LYCOPENE 10% 5000MCG", "OMEGA-3 90MG", "FATTY ACIDS 80MG", "BIOTIN 30MCG", "ESSENTIAL VITAMINS"]
  },
  {
    id: "dina-q300",
    name: "DINA Q-300",
    category: "Cellular Energy",
    focus: "MITOCHONDRIAL SUPPORT",
    tagline: "High-Potency ATP Optimization & Antioxidant Defense.",
    description: "Built for intensive mitochondrial support, DINA Q-300 combines a high-potency dosage of Coenzyme Q10 with L-Carnitine and powerful antioxidants like Astaxanthin and Lycopene. This formulation is engineered to optimize fatty acid metabolism, enhance cellular energy production, and provide a systemic shield against oxidative stress in high-metabolic tissues.",
    image: "/dina-q300.png",
    benefits: [
      "Advanced Mitochondrial Support with 300mg CoQ10",
      "Optimizes ATP synthesis and cellular energy yields",
      "Potent antioxidant defense with Astaxanthin and Lycopene",
      "Supports efficient fatty acid metabolism and transport"
    ],
    nutrition: [
      { component: "Ubidecarenone (Coenzyme Q10)", amount: "300 mg" },
      { component: "L-Carnitine L-Tartrate", amount: "200 mg" },
      { component: "Lycopene", amount: "5000 mcg" },
      { component: "Astaxanthin", amount: "4 mg" },
      { component: "Piperine Extract", amount: "5 mg" },
      { component: "Vitamins & Minerals", amount: "q.s." },
      { component: "Excipients", amount: "q.s." }
    ],
    faq: [
      { question: "What is the clinical role of CoQ10 at 300mg?", answer: "The 300mg dosage is designed for intensive mitochondrial catalyst support, helping optimize ATP production in tissues with high energy demands." },
      { question: "How does Piperine Extract help in this formula?", answer: "Piperine extract is included to enhance the bio-availability and absorption of the primary ingredients, ensuring maximum therapeutic density." }
    ],
    ingredients: ["COQ10 300MG", "L-CARNITINE", "LYCOPENE", "ASTAXANTHIN", "PIPERINE EXTRACT", "VITAMINS & MINERALS"]
  },
  {
    id: "dina-qlc",
    name: "DINA Q-LC",
    category: "Antioxidant Support",
    focus: "ANTIOXIDANT & NUTRITIONAL SUPPORT",
    tagline: "Systemic Antioxidant Shield.",
    description: "DINA Q-LC represents the pinnacle of multi-faceted antioxidant therapy using N-Acetyl L-Cysteine alongside essential minerals.",
    image: "/dina-qlc.png",
    benefits: [
      "Multi-faceted antioxidant defense system",
      "Reduces cellular damage from environmental stressors",
      "Provides essential minerals like Zinc and Selenium",
      "Supports overall nutritional stability in complex cases"
    ],
    nutrition: [
      { component: "N-Acetyl L-Cysteine", amount: "600 mg", label: "" },
      { component: "Zinc", amount: "12 mg", label: "" },
      { component: "Selenium", amount: "40 mcg", label: "" }
    ],
    faq: [
      { question: "Is DINA Q-LC suitable for long-term use?", answer: "Yes, it is designed for consistent nutritional and antioxidant support." }
    ],
    ingredients: ["COQ10", "L-CARNITINE", "NAC", "LYCOPENE", "ASTAXANTHIN", "VITAMIN C", "SELENIUM", "ZINC"]
  },
  {
    id: "dinaquin-l",
    name: "DINAQUIN-L",
    category: "Reproductive Health",
    focus: "ADVANCED FERTILITY & VITALITY",
    tagline: "Precision Fertility Optimization.",
    description: "A specialized fertility optimization formula, DINAQUIN-L combines Ubiquinol Acetate and L-Ornithine to support the journey to parenthood.",
    image: "/dinaquin-l.png",
    benefits: [
      "Evidence-based fertility support",
      "Hormonal and cellular reproductive optimization",
      "Combines Ubiquinol with L-Ornithine",
      "Clinically targeted for improving reproductive outcomes"
    ],
    nutrition: [
      { component: "Ubiquinol Acetate", amount: "100 mg", label: "" },
      { component: "L-Ornithine HCL", amount: "150 mg", label: "" },
      { component: "Melatonin", amount: "3 mg", label: "" }
    ],
    faq: [
      { question: "Who should take DINAQUIN-L?", answer: "It is specifically formulated for individuals seeking advanced reproductive and fertility support." }
    ],
    ingredients: ["UBIQUINOL ACETATE", "L-ORNITHINE HCL", "PIPERINE EXTRACT", "MELATONIN", "L-METHYL FOLATE", "VITAMIN-D3"]
  }
];
