// Netlify serverless function: fetches "order-request" Netlify Form
// submissions server-side and returns them as JSON.
//
// This exists so /admin-requests (app/admin-requests/page.tsx) never needs
// a Netlify personal access token in client-side JS. The token lives only
// in this function's environment, which the Netlify dashboard keeps
// server-side.
//
// REQUIRED SETUP (dashboard-only, cannot be done from code):
//   1. Generate a Netlify personal access token: Netlify dashboard ->
//      User settings -> Applications -> Personal access tokens -> New
//      access token.
//   2. Add it as an environment variable named NETLIFY_API_TOKEN under
//      this site's Site settings -> Environment variables.
//   3. Add this site's Site ID (found on Site settings -> General ->
//      Site details -> Site ID, a UUID-looking string) as NETLIFY_SITE_ID
//      in the same place.
//   4. Redeploy so the function picks up the new environment variables.
//
// See .env.example and README.md ("Admin Panel Setup") for more detail.

export const handler = async () => {
  const token = process.env.NETLIFY_API_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;

  if (!token || !siteId) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error:
          "NETLIFY_API_TOKEN and/or NETLIFY_SITE_ID are not configured. Set them in the Netlify dashboard under Site settings -> Environment variables, then redeploy.",
      }),
    };
  }

  try {
    const authHeaders = { Authorization: `Bearer ${token}` };

    // Step 1: list forms for this site to find the "order-request" form id.
    const formsRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/forms`, {
      headers: authHeaders,
    });
    if (!formsRes.ok) {
      return {
        statusCode: formsRes.status,
        body: JSON.stringify({ error: `Failed to list forms (status ${formsRes.status}).` }),
      };
    }
    const forms = (await formsRes.json()) as Array<{ id: string; name: string }>;
    const orderForm = forms.find((f) => f.name === "order-request");

    if (!orderForm) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          submissions: [],
          note: "No 'order-request' form found yet -- it appears in the Netlify dashboard's Forms tab only after the first real submission or after a deploy that includes the hidden detection form (public/__forms.html).",
        }),
      };
    }

    // Step 2: fetch submissions for that form.
    const submissionsRes = await fetch(
      `https://api.netlify.com/api/v1/forms/${orderForm.id}/submissions`,
      { headers: authHeaders }
    );
    if (!submissionsRes.ok) {
      return {
        statusCode: submissionsRes.status,
        body: JSON.stringify({ error: `Failed to list submissions (status ${submissionsRes.status}).` }),
      };
    }
    const submissions = await submissionsRes.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submissions }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unexpected error contacting the Netlify API.", detail: String(err) }),
    };
  }
};
