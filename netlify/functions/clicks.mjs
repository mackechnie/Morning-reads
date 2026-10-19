import { getStore } from "@netlify/blobs";

const clean = (v, n) => String(v || "").slice(0, n);

export default async (req) => {
  const store = getStore("clicks");
  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch { return new Response("bad request", { status: 400 }); }
    const u = clean(body.u, 500);
    if (!/^https?:\/\//.test(u)) return new Response("bad request", { status: 400 });
    const rec = { u, t: clean(body.t, 200), slot: clean(body.slot, 60), m: clean(body.m, 60), at: new Date().toISOString() };
    const key = "log/" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
    await store.setJSON(key, rec);
    return new Response("ok");
  }
  const { blobs } = await store.list({ prefix: "log/" });
  const keys = blobs.map((b) => b.key).sort().slice(-400);
  const recs = (await Promise.all(keys.map((k) => store.get(k, { type: "json" })))).filter(Boolean);
  const count = (field) => {
    const out = {};
    for (const r of recs) { const k = r[field] || "(none)"; out[k] = (out[k] || 0) + 1; }
    return Object.fromEntries(Object.entries(out).sort((a, b) => b[1] - a[1]));
  };
  const body = {
    total: recs.length,
    bySlot: count("slot"),
    bySource: count("m"),
    recent: recs.slice(-40).reverse().map(({ t, u, slot, m, at }) => ({ t, u, slot, m, at })),
  };
  return Response.json(body, { headers: { "cache-control": "no-store" } });
};

export const config = { path: "/api/clicks" };
