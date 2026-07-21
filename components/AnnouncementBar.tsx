// Simple, easy-to-edit announcement bar shown across the site.
// Change the text below to update the message everywhere.
const ANNOUNCEMENT_TEXT = "Limited first release coming soon";

export default function AnnouncementBar() {
  return (
    <div className="border-b border-brand-silver/10 bg-brand-black py-2 text-center text-xs font-semibold uppercase tracking-widest2 text-brand-silver">
      {ANNOUNCEMENT_TEXT}
    </div>
  );
}
