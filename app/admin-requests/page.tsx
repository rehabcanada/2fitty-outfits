"use client";

// Owner-only page for viewing Order Request form submissions without
// checking email.
//
// Gating: client-side check against Netlify Identity's currentUser(). The
// Netlify Identity widget script is loaded globally in app/layout.tsx, so
// `window.netlifyIdentity` is available here once that script has run.
// This is NOT a strong security boundary on its own (it's a client-side
// check, and the page's HTML shell is still publicly fetchable) -- the real
// protection is that the data itself only comes from
// netlify/functions/get-submissions.ts, which requires a server-side
// NETLIFY_API_TOKEN the browser never sees. Still, only invited Identity
// users can log in and trigger that function call in the first place.
//
// REQUIRED SETUP (dashboard-only, cannot be done from code -- see README
// "Admin Panel Setup"):
//   1. Site settings -> Identity -> Enable Identity.
//   2. Invite yourself (the owner) as a user under Identity.
//   3. Set NETLIFY_API_TOKEN and NETLIFY_SITE_ID environment variables
//      (see .env.example) so netlify/functions/get-submissions.ts can call
//      the Netlify API on your behalf.

import { useEffect, useState } from "react";

interface Submission {
  id: string;
  number: number;
  created_at: string;
  data: Record<string, string>;
}

type AuthStatus = "checking" | "signed-out" | "signed-in";

export default function AdminRequestsPage() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  // Poll briefly for window.netlifyIdentity since the widget script
  // (app/layout.tsx) loads with strategy="afterInteractive" and may not be
  // ready on the very first render.
  useEffect(() => {
    let cancelled = false;

    function checkUser() {
      const identity = (window as any).netlifyIdentity;
      if (!identity) return false;

      const user = identity.currentUser();
      if (!cancelled) setAuthStatus(user ? "signed-in" : "signed-out");

      identity.on("login", (u: unknown) => {
        if (!cancelled) setAuthStatus(u ? "signed-in" : "signed-out");
      });
      identity.on("logout", () => {
        if (!cancelled) setAuthStatus("signed-out");
      });
      return true;
    }

    if (!checkUser()) {
      const interval = setInterval(() => {
        if (checkUser()) clearInterval(interval);
      }, 300);
      return () => {
        cancelled = true;
        clearInterval(interval);
      };
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (authStatus !== "signed-in") return;

    let cancelled = false;
    setLoading(true);
    setError("");

    fetch("/.netlify/functions/get-submissions")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || `Request failed (status ${res.status}).`);
        return json;
      })
      .then((json) => {
        if (cancelled) return;
        setSubmissions(json.submissions || []);
        if (json.note) setNote(json.note);
      })
      .catch((err) => {
        if (!cancelled) setError(String(err.message || err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [authStatus]);

  function login() {
    const identity = (window as any).netlifyIdentity;
    if (identity) identity.open("login");
  }

  function logout() {
    const identity = (window as any).netlifyIdentity;
    if (identity) identity.logout();
  }

  if (authStatus === "checking") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center text-white/60">
        Checking sign-in status...
      </div>
    );
  }

  if (authStatus === "signed-out") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-white">Owner Sign-In Required</h1>
        <p className="text-sm text-white/60">
          This page shows Order Request submissions and is restricted to
          2Fitty Outfits' invited Netlify Identity user(s). Sign in to
          continue.
        </p>
        <button
          onClick={login}
          className="rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand-black hover:bg-brand-silverlight"
        >
          Log In
        </button>
        <p className="text-xs text-white/40">
          Not seeing a login option, or getting an error? Identity and Git
          Gateway need to be enabled for this site in the Netlify dashboard
          first -- see README.md &quot;Admin Panel Setup&quot;.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-wide text-white">Purchase Requests</h1>
          <p className="text-sm text-white/60">
            Order Request form submissions, pulled live from Netlify Forms.
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-full border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:border-white"
        >
          Log Out
        </button>
      </div>

      {loading && <p className="text-sm text-white/60">Loading submissions...</p>}

      {error && (
        <p className="mb-6 rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {note && !error && (
        <p className="mb-6 rounded-lg border border-white/10 bg-brand-charcoal px-4 py-3 text-sm text-white/60">
          {note}
        </p>
      )}

      {!loading && !error && submissions.length === 0 && !note && (
        <p className="text-sm text-white/60">No submissions yet.</p>
      )}

      {submissions.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-brand-charcoal text-xs uppercase tracking-wide text-white/60">
              <tr>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Colour</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Contact Method</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {submissions.map((s) => (
                <tr key={s.id} className="align-top text-white/80">
                  <td className="whitespace-nowrap px-4 py-3">
                    {new Date(s.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{s.data.fullName || "-"}</td>
                  <td className="px-4 py-3">{s.data.email || "-"}</td>
                  <td className="max-w-xs px-4 py-3">{s.data.product || "-"}</td>
                  <td className="px-4 py-3">{s.data.size || "-"}</td>
                  <td className="px-4 py-3">{s.data.colour || "-"}</td>
                  <td className="px-4 py-3">{s.data.quantity || "-"}</td>
                  <td className="px-4 py-3">{s.data.preferredContact || "-"}</td>
                  <td className="max-w-xs px-4 py-3">{s.data.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
