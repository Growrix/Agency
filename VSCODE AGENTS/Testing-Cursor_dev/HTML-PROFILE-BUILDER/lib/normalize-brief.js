import { validateNormalizedBrief } from './brief-contract.js';
import { slugify } from './paths.js';

function safeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function parseJsonArray(value, fieldName) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== 'string' || value.trim() === '') {
    return [];
  }

  const parsed = JSON.parse(value);

  if (!Array.isArray(parsed)) {
    throw new Error(`${fieldName} must be a JSON array.`);
  }

  return parsed;
}

function normalizeStringList(value, fieldName) {
  if (Array.isArray(value)) {
    return value.map((item) => safeString(String(item))).filter(Boolean);
  }

  if (typeof value !== 'string' || value.trim() === '') {
    return [];
  }

  if (value.trim().startsWith('[')) {
    return parseJsonArray(value, fieldName)
      .map((item) => safeString(String(item)))
      .filter(Boolean);
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeProofStats(value) {
  return ensureArray(value)
    .map((entry) => ({
      label: safeString(entry?.label),
      value: safeString(entry?.value)
    }))
    .filter((entry) => entry.label && entry.value);
}

function normalizeServices(value) {
  return ensureArray(value)
    .map((service) => ({
      name: safeString(service?.name),
      description: safeString(service?.description),
      price: safeString(service?.price)
    }))
    .filter((service) => service.name && service.description && service.price);
}

function normalizeTeam(value) {
  return ensureArray(value)
    .map((member) => ({
      name: safeString(member?.name),
      role: safeString(member?.role),
      initials: safeString(member?.initials)
    }))
    .filter((member) => member.name && member.role && member.initials);
}

function normalizeRawBrief(rawBrief) {
  const businessName = safeString(rawBrief.businessName);
  const clientId = safeString(rawBrief.clientId) || slugify(businessName);
  const revision = safeString(rawBrief.revision) || 'v1';
  const services = normalizeServices(rawBrief.services ?? parseJsonArray(rawBrief.servicesJSON, 'servicesJSON'));
  const team = normalizeTeam(rawBrief.team ?? parseJsonArray(rawBrief.teamJSON, 'teamJSON'));

  const normalizedBrief = {
    clientId,
    revision,
    businessName,
    tagline: safeString(rawBrief.tagline),
    businessType: safeString(rawBrief.businessType),
    colorVibe: safeString(rawBrief.colorVibe),
    deliveryTier: safeString(rawBrief.deliveryTier || rawBrief.tier || 'professional'),
    contact: {
      phone: safeString(rawBrief.contact?.phone || rawBrief.phone),
      whatsapp: safeString(rawBrief.contact?.whatsapp || rawBrief.whatsapp),
      email: safeString(rawBrief.contact?.email || rawBrief.email)
    },
    location: {
      address: safeString(rawBrief.location?.address || rawBrief.address),
      googleMapsLink: safeString(rawBrief.location?.googleMapsLink || rawBrief.googleMapsLink)
    },
    social: {
      facebook: safeString(rawBrief.social?.facebook || rawBrief.facebook),
      instagram: safeString(rawBrief.social?.instagram || rawBrief.instagram),
      website: safeString(rawBrief.social?.website || rawBrief.website)
    },
    services,
    hours: {
      mondayFriday: safeString(rawBrief.hours?.mondayFriday || rawBrief.mondayFriday),
      saturday: safeString(rawBrief.hours?.saturday || rawBrief.saturday),
      sunday: safeString(rawBrief.hours?.sunday || rawBrief.sunday),
      publicHolidays: safeString(rawBrief.hours?.publicHolidays || rawBrief.publicHolidays)
    },
    aboutText: safeString(rawBrief.aboutText),
    team,
    assets: {
      logoPath: safeString(rawBrief.assets?.logoPath || rawBrief.logoPath || rawBrief.logoUpload),
      gallery: normalizeStringList(rawBrief.assets?.gallery || rawBrief.gallery || rawBrief.galleryJSON, 'gallery')
    },
    optionalSections: {
      statusLabel: safeString(rawBrief.optionalSections?.statusLabel || rawBrief.statusLabel),
      ratingLabel: safeString(rawBrief.optionalSections?.ratingLabel || rawBrief.ratingLabel),
      proofStats: normalizeProofStats(
        rawBrief.optionalSections?.proofStats || rawBrief.proofStats || parseJsonArray(rawBrief.proofStatsJSON, 'proofStatsJSON')
      ),
      portfolioLabels: normalizeStringList(
        rawBrief.optionalSections?.portfolioLabels || rawBrief.portfolioLabels || rawBrief.portfolioLabelsJSON,
        'portfolioLabels'
      ),
      techStack: normalizeStringList(rawBrief.optionalSections?.techStack || rawBrief.techStack, 'techStack'),
      processSteps: normalizeStringList(rawBrief.optionalSections?.processSteps || rawBrief.processSteps, 'processSteps'),
      deliveryInfo: safeString(rawBrief.optionalSections?.deliveryInfo || rawBrief.deliveryInfo),
      bookingLink: safeString(rawBrief.optionalSections?.bookingLink || rawBrief.bookingLink)
    }
  };

  return validateNormalizedBrief(normalizedBrief);
}

export { normalizeRawBrief };