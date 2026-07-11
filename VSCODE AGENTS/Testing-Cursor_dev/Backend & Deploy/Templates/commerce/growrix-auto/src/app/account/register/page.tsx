"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import { routeConfig } from "@/data/routes";
import { useAuth } from "@/state/AuthContext";
import { useUtility } from "@/state/UtilityContext";

type RegisterForm = {
  fullName: string;
  email: string;
  password: string;
};

const initialState: RegisterForm = {
  fullName: "",
  email: "",
  password: "",
};

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { t } = useUtility();
  const [formState, setFormState] = useState<RegisterForm>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register(formState.fullName, formState.email);
    setSubmitted(true);
    setFormState(initialState);
    router.push(routeConfig.account);
  };

  return (
    <div className="bg-white">
      <Breadcrumbs items={["Home", "Account", "Register"]} />

      <section className="mx-auto max-w-xl px-4 pb-16 sm:px-6 lg:px-10">
        <h1 className="text-[34px] font-black uppercase text-[#222]">{t("auth.registerTitle")}</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            required
            value={formState.fullName}
            onChange={(event) => setFormState((prev) => ({ ...prev, fullName: event.target.value }))}
            placeholder={t("auth.fullName")}
            className="h-12 w-full border border-[#ddd] px-4"
          />
          <input
            type="email"
            required
            value={formState.email}
            onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
            placeholder={t("auth.email")}
            className="h-12 w-full border border-[#ddd] px-4"
          />
          <input
            type="password"
            required
            value={formState.password}
            onChange={(event) => setFormState((prev) => ({ ...prev, password: event.target.value }))}
            placeholder={t("auth.password")}
            className="h-12 w-full border border-[#ddd] px-4"
          />
          <button type="submit" className="h-12 w-full bg-[#ff3434] text-[13px] font-bold uppercase text-white">
            {t("auth.createAccount")}
          </button>
          {submitted ? <p className="text-[14px] font-medium text-[#1d7a34]">{t("auth.registerSuccess")}</p> : null}
        </form>

        <p className="mt-5 text-[14px] text-[#666]">
          {t("auth.haveAccount")}{" "}
          <Link href={routeConfig.login} className="font-bold text-[#ff3434] hover:underline">
            {t("common.login")}
          </Link>
        </p>
      </section>
    </div>
  );
}
