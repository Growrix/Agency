import { contentRepo } from '@/lib/content/providers/local';

export { contentRepo };

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

export async function getFaq() {
  return contentRepo.getFaq();
}

export async function getTestimonials() {
  return contentRepo.getTestimonials();
}

export async function getPage(slug: string) {
  return contentRepo.getPage(slug);
}

export async function getBlogPosts() {
  return contentRepo.getBlogPosts();
}

export async function getBlogPost(id: string) {
  return contentRepo.getBlogPost(id);
}

export async function getCaseStudies() {
  return contentRepo.getCaseStudies();
}

export async function getCaseStudy(id: string) {
  return contentRepo.getCaseStudy(id);
}

export async function getStates() {
  return contentRepo.getStates();
}

export async function getForms() {
  return contentRepo.getForms();
}
