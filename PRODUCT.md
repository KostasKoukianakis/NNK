# Product

## Register

product

## Users

Three audiences share one hospital:

- **Patients and families** (active or retired Hellenic Navy, Coast Guard, other armed forces, allied personnel, eligible dependents, and civilians under the current regulatory framework). They use the site from a waiting room in Souda, a phone on a ship, or a kitchen table. Jobs: find a clinic, book a visit, read visiting rules, download results, call the right number in an emergency.
- **Doctors and clinical staff.** Jobs: see today's list, confirm or decline bookings, keep a bio and schedule current.
- **Admin / secretariat.** Jobs: post announcements, manage the doctor roster, approve appointments, keep public information accurate.

The public site is civic infrastructure, not a marketing landing page. The portal is a task surface.

## Product Purpose

NNK (Ναυτικό Νοσοκομείο Κρήτης) is the only Armed Forces hospital on Crete with joint staffing. This application replaces a brochure-style navy page with a working hospital website and patient portal: directories, guidelines, news, online booking, visit history, and role-based staff tools.

Success looks like: a δικαιούχος can book an outpatient slot without calling 28210 82628 first; a visitor can find visiting hours and the emergency numbers in one glance; staff can approve a request without a paper list.

## Brand Personality

Measured, civic, maritime. Voice is plain Greek, specific, and respectful of military medical protocol. No cheerleading. No spa-clinic softness. No parade-ground gold.

Emotional goal: calm operational trust. The building sits above Souda Bay; the interface should feel like enamel wayfinding in a sunlit courtyard, not a warship bridge and not a private clinic brochure.

## Anti-references

- The current hellenicnavy.gr NNK pages: dense tables, no patient task flow, no booking.
- nna.hellenicnavy.gr as a visual model: keep the information architecture (mission, clinics, contact, eligibility, FAQs), discard the dated brochure layout.
- Stock medical teal + smiling-doctor hero.
- Navy-and-gold military pageantry.
- Consumer health-app dashboards with gamified metrics.
- Gradient headlines, identical icon-card grids.

## Design Principles

- **Wayfinding first.** Every public screen answers "where do I go, whom do I call, what do I bring."
- **Protocol over personality.** Copy follows hospital procedure. Health-data requests never go through a contact form.
- **One hospital, three doors.** Public, patient, and staff share tokens; density and navigation change with the door.
- **Crete is the place, not a motif.** Location shows up in facts (Souda, hyperbaric coverage of the southern Aegean), not in decorative waves.
- **Accessible by default.** Older veterans, anxious parents, and staff on a noisy ward must be able to complete tasks.

## Accessibility & Inclusion

- Target WCAG 2.2 AA. Greek as the primary language (`lang="el"`).
- Body contrast ≥ 7:1. Focus rings visible on every control. Skip link on every page.
- `prefers-reduced-motion` is mandatory; wizard steps swap instantly when reduced motion is set.
- Touch targets ≥ 44px. Emergency numbers are always reachable, including from the header.
- AMKA and medical results are treated as sensitive: never in URLs, never in client-side logs.
