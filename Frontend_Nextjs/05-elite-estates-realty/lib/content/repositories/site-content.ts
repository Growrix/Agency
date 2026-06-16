import { contentRepo } from '@/lib/content/providers/local';

export async function getSiteNavigation() {
  return contentRepo.getNavigation();
}

export async function getHomeContent() {
  return contentRepo.getHome();
}

export async function getProperties() {
  return contentRepo.getProperties();
}

export async function getAgents() {
  return contentRepo.getAgents();
}

export async function getAgentsPage() {
  return contentRepo.getAgentsPage();
}

export async function getFaq() {
  return contentRepo.getFaq();
}

export async function getPageContent(slug: string) {
  return contentRepo.getPage(slug);
}

export async function getContactPage() {
  return contentRepo.getContactPage();
}

export async function getContactForm() {
  return contentRepo.getContactForm();
}
