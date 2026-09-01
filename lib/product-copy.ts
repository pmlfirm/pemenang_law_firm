import { productGroupIds, productIds } from '@/lib/site-data'

export const productEnglishCopy = {
  [productIds.marine]: {
    description:
      'Structured consultation for cargo in transit, vessels, machinery, and maritime operating interests across trade, logistics, and shipping activities.',
    longDescription:
      'Marine Insurance covers two distinct areas: Marine Cargo for goods in transit and Marine Hull for the vessel, machinery, and related maritime interests. Our consultation helps organize the insured object, route or navigation area, declared value, risk profile, and supporting documents so each requirement can be discussed clearly.',
    keyPoints: [
      'Separate cargo-transit protection from vessel, machinery, and maritime operating protection.',
      'Organize information about the goods or vessel, route, declared value, voyage schedule, and supporting documents.',
      'Suitable for trading companies, logistics operators, shipping businesses, vessel owners, and organizations exposed to marine transportation risks.',
    ],
    groups: {
      [productGroupIds.marineCargo]: {
        description:
          'Protects the cargo being transported against damage or loss during transit by sea, air, or land. It covers various perils, including damage caused by accidents, theft, fire, and natural disasters.',
        highlights: [],
      },
      [productGroupIds.marineHull]: {
        description:
          'Covers physical damage or loss to the vessel itself, including the ship\'s hull, machinery, and equipment. It provides protection against risks like collisions, accidents, and other specified perils.',
        highlights: [],
      },
    },
  },
  [productIds.property]: {
    description:
      'Consultation for buildings, contents, stock, machinery, and business assets against fire and other relevant property risks.',
    longDescription:
      'FIRE / Property Insurance helps property owners and businesses structure protection for buildings, contents, machinery, inventory, and other property interests. The consultation considers location, occupancy, construction, asset values, fire-protection systems, and relevant extensions.',
    keyPoints: [
      'Relevant for homes, offices, shops, warehouses, factories, commercial buildings, and other business assets.',
      'Organize location, occupancy, construction, building and contents values, fire protection, and supporting documents.',
      'Help clients understand priority risks and relevant protection extensions before arranging coverage.',
    ],
    groups: {
      [productGroupIds.propertyProtection]: {
        description:
          'Protection for buildings, contents, machinery, inventory, and other property interests according to location, occupancy, asset value, protection systems, and required extensions.',
        highlights: ['Buildings and contents', 'Fire risk', 'Commercial assets'],
      },
    },
  },
  [productIds.vehicle]: {
    description:
      'Consultation for private vehicles, operational vehicles, and corporate fleets to manage mobility risks more effectively.',
    longDescription:
      'Motor Vehicle Insurance provides structured guidance for private and business vehicles. The consultation considers vehicle type and value, intended use, operating area, number of units, risk history, and supporting documents.',
    keyPoints: [
      'Suitable for private cars, commercial vehicles, operational units, and corporate fleets.',
      'Organize vehicle details, model year, declared value, use, operating area, and ownership documents.',
      'Help compare protection requirements according to the vehicle profile and actual operational exposure.',
    ],
    groups: {
      [productGroupIds.vehicleProtection]: {
        description:
          'Protection planning for private vehicles, operational units, and fleets based on value, use, operating territory, and risk profile.',
        highlights: ['Private vehicles', 'Operational fleets', 'Vehicle risks'],
      },
    },
  },
  [productIds.travel]: {
    description:
      'Consultation for domestic and international travel protection for individuals, families, groups, and business travellers.',
    longDescription:
      'Travel Insurance helps structure protection according to destination, trip duration, activities, participant count, travel frequency, and administrative requirements. The consultation is designed to clarify benefits, limitations, and the documents that should be prepared.',
    keyPoints: [
      'Map the destination, duration, purpose, special activities, participant count, and travel frequency.',
      'Suitable for individual, family, group, and recurring business travel.',
      'Prepare participant and travel information so the consultation can proceed efficiently.',
    ],
    groups: {
      [productGroupIds.personalTravel]: {
        description:
          'Protection for individual or family travel, domestically or internationally, based on destination, duration, activities, and participant needs.',
        highlights: ['Personal travel', 'Family travel', 'Domestic and international'],
      },
      [productGroupIds.businessTravel]: {
        description:
          'Protection for business trips, groups, and recurring travel with more structured participant data and documentation.',
        highlights: ['Business travel', 'Group protection', 'Recurring trips'],
      },
    },
  },
  [productIds.liability]: {
    description:
      'Consultation for third-party legal liability arising from business activities, products, services, premises, or contracted work.',
    longDescription:
      'Liability Insurance helps businesses identify and organize potential legal liability to third parties. The consultation covers business activities, product or service characteristics, contractual scope, operating locations, required limits, and supporting documents.',
    keyPoints: [
      'Identify potential third-party claims involving injury, property damage, products, services, or operations.',
      'Organize contracts, scope of work, business profile, locations, required limits, and risk information.',
      'Relevant for business owners, contractors, service providers, premises operators, distributors, and manufacturers.',
    ],
    groups: {
      [productGroupIds.publicLiability]: {
        description:
          'Legal-liability protection for third-party injury or property damage arising from business activities, premises, events, or contracted work.',
        highlights: ['Third-party injury', 'Property damage', 'Business activities'],
      },
      [productGroupIds.productLiability]: {
        description:
          'Legal-liability protection associated with products that are manufactured, marketed, distributed, or used by customers and third parties.',
        highlights: ['Product exposure', 'Consumer risks', 'Distribution activities'],
      },
    },
  },
  [productIds.claim]: {
    description:
      'Administrative assistance for organizing chronology, incident evidence, policy documents, communication, and follow-up during the claim process.',
    longDescription:
      'Claim Assistance helps clients organize information and documents from the initial notification through subsequent follow-up. Support may include chronology preparation, evidence review, tracking additional document requests, and communication coordination.',
    keyPoints: [
      'Organize the chronology, policy number, claim form, incident photographs, loss evidence, and supporting documents.',
      'Track additional document requirements and communication so the process is easier to follow.',
      'Provide structured administrative support without changing policy terms or the insurer’s decision-making authority.',
    ],
    groups: {
      [productGroupIds.claimPreparation]: {
        description:
          'Initial review of chronology, claim forms, policy documents, incident evidence, photographs, and supporting information.',
        highlights: ['Chronology', 'Policy documents', 'Supporting evidence'],
      },
      [productGroupIds.claimCoordination]: {
        description:
          'Support for communication, additional-document tracking, and status follow-up during the administrative claim process.',
        highlights: ['Communication flow', 'Status follow-up', 'Additional documents'],
      },
    },
  },
} as const

export type ProductId = keyof typeof productEnglishCopy
