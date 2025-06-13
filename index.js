// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  pages;
  posts;
  contactSubmissions;
  tastemakerArticles;
  currentUserId;
  currentPageId;
  currentPostId;
  currentContactId;
  currentTastemakerArticleId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.pages = /* @__PURE__ */ new Map();
    this.posts = /* @__PURE__ */ new Map();
    this.contactSubmissions = /* @__PURE__ */ new Map();
    this.tastemakerArticles = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentPageId = 1;
    this.currentPostId = 1;
    this.currentContactId = 1;
    this.currentTastemakerArticleId = 1;
    this.initializeDefaultPages();
    this.initializeDefaultTastemakerArticles();
  }
  initializeDefaultPages() {
    const defaultPages = [
      {
        id: this.currentPageId++,
        slug: "home",
        title: "JOURLEV - Empathy-Driven Product Strategy",
        content: JSON.stringify({
          hero: {
            headline: "Build Products That Truly Connect",
            subheadline: "We help product leaders create meaningful experiences through empathy-driven strategy and human-centered design.",
            ctaText: "Start Your Strategy"
          },
          humanAi: {
            headline: "Human-AI Collaboration",
            description: "Meet Zane, our AI team member who amplifies human insight with data-driven analysis."
          },
          services: {
            headline: "Strategic Services",
            description: "From customer research to product strategy, we guide you through every step of building with empathy."
          }
        }),
        metaDescription: "JOURLEV provides empathy-driven product strategy and customer experience design"
      },
      {
        id: this.currentPageId++,
        slug: "about",
        title: "About JOURLEV",
        content: JSON.stringify({
          hero: {
            headline: "Building with Empathy",
            description: "Our story and mission"
          },
          story: {
            content: "Tell your brand story here"
          },
          mission: {
            content: "Your mission statement here"
          },
          values: {
            items: [
              { title: "Value 1", description: "Description of first core value" },
              { title: "Value 2", description: "Description of second core value" },
              { title: "Value 3", description: "Description of third core value" }
            ]
          }
        }),
        metaDescription: "Learn about JOURLEV's mission and values"
      },
      {
        id: this.currentPageId++,
        slug: "services",
        title: "Our Services",
        content: JSON.stringify({
          hero: {
            headline: "Services That Drive Results",
            description: "Comprehensive product strategy and design services"
          },
          services: [
            {
              title: "Product Strategy",
              description: "Strategic guidance for product development",
              features: ["Feature 1", "Feature 2", "Feature 3"]
            },
            {
              title: "Customer Research",
              description: "Deep insights into customer needs",
              features: ["Feature 1", "Feature 2", "Feature 3"]
            },
            {
              title: "Experience Design",
              description: "Creating meaningful user experiences",
              features: ["Feature 1", "Feature 2", "Feature 3"]
            }
          ]
        }),
        metaDescription: "Discover JOURLEV's product strategy and design services"
      },
      {
        id: this.currentPageId++,
        slug: "team",
        title: "Our Team",
        content: JSON.stringify({
          hero: {
            headline: "Meet the Team",
            description: "The people behind JOURLEV's success"
          },
          members: [
            {
              name: "Team Member 1",
              role: "Role/Title",
              bio: "Bio content for team member",
              image: "path/to/image"
            },
            {
              name: "Team Member 2",
              role: "Role/Title",
              bio: "Bio content for team member",
              image: "path/to/image"
            }
          ]
        }),
        metaDescription: "Meet the JOURLEV team"
      },
      {
        id: this.currentPageId++,
        slug: "zane",
        title: "Meet Zane",
        content: JSON.stringify({
          hero: {
            headline: "Meet Zane, Our AI Team Member",
            description: "Discover how human-AI collaboration enhances our work"
          },
          intro: {
            content: "Introduction to Zane and their role"
          },
          capabilities: [
            {
              title: "Capability 1",
              description: "Description of what Zane can do"
            },
            {
              title: "Capability 2",
              description: "Description of what Zane can do"
            }
          ]
        }),
        metaDescription: "Meet Zane, JOURLEV's AI team member"
      },
      {
        id: this.currentPageId++,
        slug: "insights",
        title: "Insights",
        content: JSON.stringify({
          hero: {
            headline: "Industry Insights & Thought Leadership",
            description: "Exploring the intersection of empathy, technology, and product strategy"
          },
          tastemakers: {
            headline: "Tastemakers We're Watching",
            description: "Curated insights from industry leaders shaping the future of product development"
          },
          blog: {
            headline: "Latest Thinking",
            description: "Our perspectives on building better products through human-centered design"
          }
        }),
        metaDescription: "Industry insights and thought leadership from JOURLEV"
      },
      {
        id: this.currentPageId++,
        slug: "contact",
        title: "Contact Us",
        content: JSON.stringify({
          hero: {
            headline: "Let's Build Something Amazing Together",
            description: "Ready to transform your product strategy?"
          }
        }),
        metaDescription: "Contact JOURLEV for product strategy consultation"
      }
    ];
    defaultPages.forEach((page) => {
      this.pages.set(page.slug, page);
    });
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Page management methods
  async getPage(slug) {
    return this.pages.get(slug);
  }
  async getAllPages() {
    return Array.from(this.pages.values());
  }
  async createPage(insertPage) {
    const id = this.currentPageId++;
    const page = { ...insertPage, id };
    this.pages.set(page.slug, page);
    return page;
  }
  async updatePage(slug, updateData) {
    const existingPage = this.pages.get(slug);
    if (!existingPage) {
      throw new Error(`Page with slug '${slug}' not found`);
    }
    const updatedPage = { ...existingPage, ...updateData };
    this.pages.set(slug, updatedPage);
    return updatedPage;
  }
  // Blog post management methods
  async getPost(slug) {
    return this.posts.get(slug);
  }
  async getAllPosts() {
    return Array.from(this.posts.values());
  }
  async getPublishedPosts() {
    return Array.from(this.posts.values()).filter((post) => post.published);
  }
  async createPost(insertPost) {
    const id = this.currentPostId++;
    const post = { ...insertPost, id };
    this.posts.set(post.slug, post);
    return post;
  }
  async updatePost(slug, updateData) {
    const existingPost = this.posts.get(slug);
    if (!existingPost) {
      throw new Error(`Post with slug '${slug}' not found`);
    }
    const updatedPost = { ...existingPost, ...updateData };
    this.posts.set(slug, updatedPost);
    return updatedPost;
  }
  async deletePost(slug) {
    this.posts.delete(slug);
  }
  async createContactSubmission(insertSubmission) {
    const id = this.currentContactId++;
    const submission = {
      ...insertSubmission,
      id,
      submittedAt: /* @__PURE__ */ new Date()
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  async getAllContactSubmissions() {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()
    );
  }
  initializeDefaultTastemakerArticles() {
    const defaultArticles = [
      {
        id: this.currentTastemakerArticleId++,
        title: "The UX Research Trends Shaping the Industry in 2025",
        source: "Maze",
        published: "March 2025",
        summary: "Highlights AI integration into modern UX research",
        url: "https://maze.co/resources/user-research-report/",
        year: 2025,
        featured: true
      },
      {
        id: this.currentTastemakerArticleId++,
        title: "An Archaeologist and UX Researcher at Google Says the Best AI Strategy Starts with Understanding People",
        source: "Business Insider",
        published: "May 14, 2025",
        summary: "Explores how anthropological methods inform AI development and user experience design",
        url: "https://www.businessinsider.com/experiment-with-ai-tools-to-upskill-employees-says-google-researcher-2025-5",
        year: 2025,
        featured: true
      },
      {
        id: this.currentTastemakerArticleId++,
        title: "I'm a VP at Dropbox. This is My Advice to Product Managers in the Age of AI.",
        source: "Business Insider",
        published: "May 2025",
        summary: "Framework for creating AI solutions that solve real human problems",
        url: "https://www.businessinsider.com/dropbox-product-vp-advice-to-product-managers-ai-2025-5",
        year: 2025,
        featured: true
      },
      {
        id: this.currentTastemakerArticleId++,
        title: "Top 9 AI Tools for UX Research in 2025",
        source: "BuildBetter AI",
        published: "2025",
        summary: "Argues for prioritizing human understanding in artificial intelligence development",
        url: "https://blog.buildbetter.ai/top-9-ai-tools-for-ux-research-in-2025/",
        year: 2025,
        featured: true
      },
      {
        id: this.currentTastemakerArticleId++,
        title: "Accelerating Research with AI",
        source: "Nielsen Norman Group",
        published: "2025",
        summary: "Practical approaches to creating more intuitive AI interactions",
        url: "https://www.nngroup.com/articles/research-with-ai/",
        year: 2025,
        featured: true
      },
      {
        id: this.currentTastemakerArticleId++,
        title: "From UX Research to Product Management: A Career Transition Story",
        source: "LinkedIn",
        published: "2025",
        summary: "Essential considerations for ethical AI product development",
        url: "https://www.linkedin.com/pulse/from-ux-research-product-management-career-transition-andrew-warr-w4c2c",
        year: 2025,
        featured: true
      },
      {
        id: this.currentTastemakerArticleId++,
        title: "Digital Storytelling for Social Impact",
        source: "Stanford Social Innovation Review",
        published: "2025",
        summary: "Makes the case for empathy-driven leadership in AI transformation",
        url: "https://ssir.org/articles/entry/digital_storytelling_for_social_impact#",
        year: 2025,
        featured: true
      }
    ];
    defaultArticles.forEach((article) => {
      this.tastemakerArticles.set(article.id, article);
    });
  }
  async getAllTastemakerArticles() {
    return Array.from(this.tastemakerArticles.values());
  }
  async getTastemakerArticlesByYear(year) {
    return Array.from(this.tastemakerArticles.values()).filter((article) => article.year === year);
  }
  async createTastemakerArticle(insertArticle) {
    const id = this.currentTastemakerArticleId++;
    const article = { ...insertArticle, id };
    this.tastemakerArticles.set(id, article);
    return article;
  }
  async updateTastemakerArticle(id, updateData) {
    const existingArticle = this.tastemakerArticles.get(id);
    if (!existingArticle) {
      throw new Error(`Tastemaker article with id ${id} not found`);
    }
    const updatedArticle = { ...existingArticle, ...updateData };
    this.tastemakerArticles.set(id, updatedArticle);
    return updatedArticle;
  }
  async deleteTastemakerArticle(id) {
    if (!this.tastemakerArticles.has(id)) {
      throw new Error(`Tastemaker article with id ${id} not found`);
    }
    this.tastemakerArticles.delete(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  // 'home', 'about', 'services', etc.
  title: text("title").notNull(),
  content: text("content").notNull(),
  metaDescription: text("meta_description")
});
var posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at")
});
var contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow()
});
var tastemakerArticles = pgTable("tastemaker_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  source: text("source").notNull(),
  published: text("published").notNull(),
  summary: text("summary").notNull(),
  url: text("url").notNull(),
  year: integer("year").notNull(),
  featured: boolean("featured").default(true)
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertPageSchema = createInsertSchema(pages);
var insertPostSchema = createInsertSchema(posts);
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  company: true,
  message: true
});
var insertTastemakerArticleSchema = createInsertSchema(tastemakerArticles);

// server/routes.ts
async function registerRoutes(app2) {
  app2.use((req, res, next) => {
    const host = req.get("host") || "";
    if (host.includes("jourlev.com") && !host.includes("replit")) {
      const redirectUrl = `https://jourlev-mvp-vanessa63.replit.app${req.originalUrl}`;
      return res.redirect(301, redirectUrl);
    }
    next();
  });
  app2.get("/api/pages", async (req, res) => {
    try {
      const pages2 = await storage.getAllPages();
      res.json(pages2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pages" });
    }
  });
  app2.get("/api/pages/:slug", async (req, res) => {
    try {
      const page = await storage.getPage(req.params.slug);
      if (!page) {
        return res.status(404).json({ error: "Page not found" });
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch page" });
    }
  });
  app2.put("/api/pages/:slug", async (req, res) => {
    try {
      const validatedData = insertPageSchema.partial().parse(req.body);
      const updatedPage = await storage.updatePage(req.params.slug, validatedData);
      res.json(updatedPage);
    } catch (error) {
      res.status(400).json({ error: "Failed to update page" });
    }
  });
  app2.get("/api/posts", async (req, res) => {
    try {
      const posts2 = await storage.getAllPosts();
      res.json(posts2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });
  app2.get("/api/posts/published", async (req, res) => {
    try {
      const posts2 = await storage.getPublishedPosts();
      res.json(posts2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch published posts" });
    }
  });
  app2.get("/api/posts/:slug", async (req, res) => {
    try {
      const post = await storage.getPost(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });
  app2.post("/api/posts", async (req, res) => {
    try {
      const validatedData = insertPostSchema.parse(req.body);
      const newPost = await storage.createPost(validatedData);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ error: "Failed to create post" });
    }
  });
  app2.put("/api/posts/:slug", async (req, res) => {
    try {
      const validatedData = insertPostSchema.partial().parse(req.body);
      const updatedPost = await storage.updatePost(req.params.slug, validatedData);
      res.json(updatedPost);
    } catch (error) {
      res.status(400).json({ error: "Failed to update post" });
    }
  });
  app2.delete("/api/posts/:slug", async (req, res) => {
    try {
      await storage.deletePost(req.params.slug);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const submission = await storage.createContactSubmission(req.body);
      console.log("Contact form submission saved:", submission);
      res.json({
        success: true,
        message: "Thank you for your message! We'll get back to you soon."
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again."
      });
    }
  });
  app2.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });
  app2.get("/api/tastemaker-articles", async (req, res) => {
    try {
      const year = req.query.year ? parseInt(req.query.year) : void 0;
      const articles = year ? await storage.getTastemakerArticlesByYear(year) : await storage.getAllTastemakerArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tastemaker articles" });
    }
  });
  app2.post("/api/tastemaker-articles", async (req, res) => {
    try {
      const validatedData = insertTastemakerArticleSchema.parse(req.body);
      const article = await storage.createTastemakerArticle(validatedData);
      res.json(article);
    } catch (error) {
      res.status(400).json({ error: "Failed to create tastemaker article" });
    }
  });
  app2.put("/api/tastemaker-articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertTastemakerArticleSchema.partial().parse(req.body);
      const updatedArticle = await storage.updateTastemakerArticle(id, validatedData);
      res.json(updatedArticle);
    } catch (error) {
      res.status(400).json({ error: "Failed to update tastemaker article" });
    }
  });
  app2.delete("/api/tastemaker-articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTastemakerArticle(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete tastemaker article" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
