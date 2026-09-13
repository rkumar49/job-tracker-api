import express from "express";
import cors from "cors";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// What a valid "create application" body looks like
const ApplicationInput = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  status: z.enum(["applied", "interview", "offer", "rejected"]).default("applied"),
  url: z.string().url().optional(),
  notes: z.string().optional(),
});

// Health check — handy for deployment later
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// LIST all applications
app.get("/api/applications", async (_req, res) => {
  const applications = await prisma.application.findMany({
    orderBy: { appliedAt: "desc" },
  });
  res.json(applications);
});

// CREATE a new application
app.post("/api/applications", async (req, res) => {
  const parsed = ApplicationInput.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const created = await prisma.application.create({ data: parsed.data });
  res.status(201).json(created);
});

// UPDATE
app.patch("/api/applications/:id", async (req, res) => {
  const parsed = ApplicationInput.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  try {
    const updated = await prisma.application.update({
      where: { id: req.params.id },
      data: parsed.data,
    });
    res.json(updated);
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

// DELETE
app.delete("/api/applications/:id", async (req, res) => {
  try {
    await prisma.application.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

const PORT = Number(process.env.PORT ?? 4000);
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});