"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { HOSPITAL } from "@/lib/constants";
import { formatPhoneHref } from "@/lib/utils";

const MENUS = [
  {
    title: "Νοσοκομείο",
    links: [
      { href: "/", label: "Αρχική" },
      { href: "/about", label: "Το νοσοκομείο" },
      { href: "/mission", label: "Αποστολή" },
      { href: "/organization", label: "Οργάνωση" },
      { href: "/departments", label: "Κλινικές" },
      { href: "/contact", label: "Επικοινωνία" },
    ],
  },
  {
    title: "Υπηρεσίες",
    links: [
      { href: "/outpatient", label: "Εξωτερικά ιατρεία" },
      { href: "/emergency", label: "Επείγοντα" },
      { href: "/departments/ypervariki", label: "Υπερβαρική" },
      { href: "/eligibility", label: "Δικαιούχοι" },
      { href: "/admission", label: "Εισαγωγή" },
      { href: "/portal", label: "Portal" },
      { href: "/phones", label: "Τηλέφωνα" },
    ],
  },
  {
    title: "Ενημέρωση",
    links: [
      { href: "/announcements", label: "Ανακοινώσεις" },
      { href: "/guidelines", label: "Οδηγίες" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Επικοινωνία",
    links: [
      {
        href: formatPhoneHref(HOSPITAL.phones.emergency[0]),
        label: `Επείγοντα ${HOSPITAL.phones.emergency[0]}`,
      },
      {
        href: formatPhoneHref(HOSPITAL.phones.appointments[0]),
        label: `Ραντεβού ${HOSPITAL.phones.appointments[0]}`,
      },
      {
        href: formatPhoneHref(HOSPITAL.phones.hyperbaric),
        label: `Υπερβαρική ${HOSPITAL.phones.hyperbaric}`,
      },
    ],
  },
] as const;

const LEGAL = [
  { href: "/privacy", label: "Προστασία δεδομένων" },
  { href: "/rights", label: "Δικαιώματα" },
  { href: "/privacy", label: "Cookies" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Newsletter only — no health data. Wire to backend when ready.
    setStatus("done");
  }

  return (
    <footer className="footer mt-auto bg-[var(--black)] text-white">
      <div className="wrapper-footer">
        <div className="flex-footer">
          <div className="subscribe-newsletter">
            <form className="form-subscribe" onSubmit={onSubscribe}>
              <div className="title-subscribe">
                Μιλήστε με
                <br />
                τη γραμματεία του ΝΝΚ
              </div>
              {status === "done" ? (
                <p className="thanks-footer">
                  Ευχαριστούμε. Θα επικοινωνήσουμε για ενημερώσεις — όχι για δεδομένα υγείας.
                </p>
              ) : (
                <div className="subscribe-form">
                  <input
                    className="input-field"
                    type="email"
                    name="email"
                    placeholder="Διεύθυνση email"
                    required
                    autoComplete="email"
                    aria-label="Διεύθυνση email για ενημερώσεις"
                  />
                  <button type="submit" className="subscribe-button">
                    Εγγραφή
                  </button>
                </div>
              )}
            </form>
          </div>

          <nav className="menu-grid" aria-label="Υποσέλιδο">
            {MENUS.map((menu) => (
              <div key={menu.title} className="menu-box">
                <div className="title-menu">{menu.title}</div>
                <div className="list-links">
                  {menu.links.map((link) => (
                    <Link key={link.href + link.label} href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="last-line">
          <div className="flex-last">
            <Link href="/" className="logo-footer" aria-label={HOSPITAL.name}>
              <span className="logo-footer-mark" aria-hidden="true">
                <svg viewBox="0 0 40 40" className="size-full">
                  <rect width="40" height="40" className="fill-white" />
                  <path
                    d="M8 8h6v6H8zm9 0h6v6h-6zm9 0h6v6h-6zM8 17h6v6H8zm9 0h6v6h-6zm9 0h6v6h-6zM8 26h6v6H8zm9 0h6v6h-6zm9 0h6v6h-6z"
                    className="fill-[var(--black)]"
                    opacity="0.35"
                  />
                  <path
                    d="M8 8h6v6H8zm9 9h6v6h-6zm9 9h6v6h-6z"
                    className="fill-[var(--black)]"
                  />
                </svg>
              </span>
              <span className="logo-footer-word">{HOSPITAL.shortName}</span>
            </Link>
            <div className="caption-box">
              <span className="auto-year">©{year} {HOSPITAL.shortName}</span>
            </div>
          </div>

          <div className="pp-et">
            <div className="last-pp">
              {LEGAL.map((item) => (
                <Link key={item.label} href={item.href} className="footer-last-link">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="caption-box caption-desktop">
              <span className="all-rights">All Rights Reserved.</span>
              <span className="all-rights">
                {HOSPITAL.addressLine}, {HOSPITAL.postalCode}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
