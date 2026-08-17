/**
 * MAGAZINE / DIGITAL EDITION CONFIG
 * ---------------------------------------------------------
 * Replace `file` with the path to the real magazine PDF once
 * it's ready. Drop the PDF into public/magazine/ and point
 * `file` at it (no leading slash needed before BASE_URL).
 *
 * import.meta.env.BASE_URL respects Vite's configured `base`
 * (see vite.config.ts), so this works both locally and when
 * deployed under a subpath (e.g. GitHub Pages' /repo-name/).
 */

export interface MagazineIssue {
  title: string;
  issueLabel: string;
  file: string;
}

export const currentIssue: MagazineIssue = {
  title: "Looking Up — Digital Edition",
  issueLabel: "Issue No. 2026",
  file: `${import.meta.env.BASE_URL}magazine/Looking Up_Brochure Nov 25.pdf`,
};
