import { contentRepo } from '@/lib/content/providers/local';

export {
  contentRepo,
  contentRepo as getContentRepo,
};

export async function getNavigation() {
  return contentRepo.getNavigation();
}

export async function getAnnouncements() {
  return contentRepo.getAnnouncements();
}

export async function getHomePage() {
  return contentRepo.getHomePage();
}

export async function getServices() {
  return contentRepo.getServices();
}

export async function getProjects() {
  return contentRepo.getProjects();
}

export async function getFaq() {
  return contentRepo.getFaq();
}

export async function getTestimonials() {
  return contentRepo.getTestimonials();
}

export async function getBlogPosts() {
  return contentRepo.getBlogPosts();
}

export async function getForms() {
  return contentRepo.getForms();
}

export async function getAboutPage() {
  return contentRepo.getAboutPage();
}

export async function getServicesPage() {
  return contentRepo.getServicesPage();
}

export async function getProjectsPage() {
  return contentRepo.getProjectsPage();
}

export async function getIndustriesPage() {
  return contentRepo.getIndustriesPage();
}

export async function getCareersPage() {
  return contentRepo.getCareersPage();
}

export async function getInsightsPage() {
  return contentRepo.getInsightsPage();
}

export async function getContactPage() {
  return contentRepo.getContactPage();
}
