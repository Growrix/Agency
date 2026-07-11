"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { contactPage } from "@/data/pages";
import { submitContactForm } from "@/lib/foundation/client";
import { useUtility } from "@/state/UtilityContext";

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactUsPage() {
  const [formState, setFormState] = useState<ContactFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { t } = useUtility();

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await submitContactForm({
      ...formState,
      website: "",
    });

    if (!result.accepted) {
      setSubmitted(false);
      setSubmitError(t("contact.submitFailed"));
      setIsSubmitting(false);
      return;
    }

    setSubmitted(true);
    setFormState(initialState);
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 text-[14px] text-[#777] sm:px-6 lg:px-10">
        <Link href="/" className="hover:text-[#ff3434]">
          {t("common.home")}
        </Link>{" "}
        <span className="px-2">›</span> <span>{t("common.contact")}</span>
      </div>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-10">
        <div className="relative h-150 overflow-hidden">
          <Image src={contactPage.image} alt={`Contact ${t("common.contact")}`} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
        </div>
        <div className="pt-4">
          <h1 className="text-[34px] font-black uppercase text-[#222]">{t("contact.title")}</h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-8 text-[#666]">{t("contact.intro")}</p>
          <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block border-b border-[#ddd] pb-2 text-[16px] text-[#222]">
                <span className="sr-only">{t("contact.name")}</span>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder={t("contact.name")}
                  className="w-full bg-transparent outline-none placeholder:text-[#555]"
                />
              </label>
              <label className="block border-b border-[#ddd] pb-2 text-[16px] text-[#222]">
                <span className="sr-only">{t("auth.email")}</span>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder={t("auth.email")}
                  className="w-full bg-transparent outline-none placeholder:text-[#555]"
                />
              </label>
            </div>
            <label className="block border-b border-[#ddd] pb-2 text-[16px] text-[#222]">
              <span className="sr-only">{t("contact.phone")}</span>
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                placeholder={t("contact.phone")}
                className="w-full bg-transparent outline-none placeholder:text-[#555]"
              />
            </label>
            <label className="block border-b border-[#ddd] pb-2 text-[16px] text-[#222]">
              <span className="sr-only">{t("contact.message")}</span>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder={t("contact.message")}
                className="w-full resize-none bg-transparent outline-none placeholder:text-[#555]"
              />
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 h-12 w-full bg-[#ff3434] text-[14px] font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#d92424] disabled:cursor-not-allowed disabled:bg-[#9a9a9a]"
            >
              {isSubmitting ? t("contact.submitting") : t("common.submit")}
            </button>
            {submitted ? <p className="text-[14px] font-medium text-[#1d7a34]">{t("contact.success")}</p> : null}
            {submitError ? <p className="text-[14px] font-medium text-[#9f1b1b]">{submitError}</p> : null}
          </form>
        </div>
      </section>
    </div>
  );
}
