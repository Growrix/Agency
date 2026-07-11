import { z } from 'zod';

const serviceSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1)
});

const teamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  initials: z.string().min(1)
});

const proofStatSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1)
});

const optionalSectionsSchema = z.object({
  statusLabel: z.string(),
  ratingLabel: z.string(),
  proofStats: z.array(proofStatSchema),
  portfolioLabels: z.array(z.string().min(1)),
  techStack: z.array(z.string().min(1)),
  processSteps: z.array(z.string().min(1)),
  deliveryInfo: z.string(),
  bookingLink: z.string()
});

const normalizedBriefSchema = z.object({
  clientId: z.string().min(1),
  revision: z.string().min(1),
  businessName: z.string().min(1),
  tagline: z.string().min(1),
  businessType: z.enum(['cafe', 'restaurant', 'photography', 'agency', 'retail', 'salon', 'other']),
  colorVibe: z.enum(['warm', 'dark', 'fresh', 'minimal', 'bold']),
  deliveryTier: z.enum(['starter', 'professional', 'premium']),
  contact: z.object({
    phone: z.string().min(1),
    whatsapp: z.string().min(1),
    email: z.string().min(1)
  }),
  location: z.object({
    address: z.string().min(1),
    googleMapsLink: z.string().min(1)
  }),
  social: z.object({
    facebook: z.string(),
    instagram: z.string(),
    website: z.string()
  }),
  services: z.array(serviceSchema),
  hours: z.object({
    mondayFriday: z.string().min(1),
    saturday: z.string().min(1),
    sunday: z.string().min(1),
    publicHolidays: z.string().min(1)
  }),
  aboutText: z.string().min(1),
  team: z.array(teamMemberSchema),
  assets: z.object({
    logoPath: z.string().min(1),
    gallery: z.array(z.string().min(1))
  }),
  optionalSections: optionalSectionsSchema
});

function validateNormalizedBrief(value) {
  return normalizedBriefSchema.parse(value);
}

export { normalizedBriefSchema, optionalSectionsSchema, validateNormalizedBrief };