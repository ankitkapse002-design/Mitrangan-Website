import { Router } from 'express';
import { blogPostSchema } from '../../shared/schema.js';
import {
  getBlogs,
  getBlogBySlug,
  getLatestBlogs,
  createBlog,
  updateBlog,
  deleteBlog
} from '../db/index.js';
import { requireAdmin, type AuthenticatedAdminRequest } from '../middleware/auth.js';

const router = Router();

// -------------------------------------------------------------
// Public Blog APIs
// -------------------------------------------------------------

// 1. Get all published blogs
router.get('/blogs', async (_req, res) => {
  try {
    const blogs = await getBlogs();
    return res.json({ success: true, count: blogs.length, blogs });
  } catch (err: any) {
    console.error('Error fetching blogs:', err);
    return res.status(500).json({ error: 'Failed to retrieve blog articles.' });
  }
});

// 2. Get latest N blogs for homepage preview
router.get('/blogs/latest', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 3;
    const blogs = await getLatestBlogs(limit);
    return res.json({ success: true, blogs });
  } catch (err: any) {
    console.error('Error fetching latest blogs:', err);
    return res.status(500).json({ error: 'Failed to retrieve latest blog articles.' });
  }
});

// 3. Get single blog by slug
router.get('/blogs/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await getBlogBySlug(slug);
    if (!blog) {
      return res.status(404).json({ error: 'Article not found.' });
    }
    return res.json({ success: true, blog });
  } catch (err: any) {
    console.error('Error fetching blog by slug:', err);
    return res.status(500).json({ error: 'Failed to retrieve article.' });
  }
});

// -------------------------------------------------------------
// Protected Admin Blog Management APIs
// -------------------------------------------------------------

// 4. Create new blog
router.post('/admin/blogs', requireAdmin, async (req: AuthenticatedAdminRequest, res) => {
  try {
    const parseResult = blogPostSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.errors[0].message });
    }

    const created = await createBlog(parseResult.data, req.admin?.username || 'Admin');
    return res.status(201).json({
      success: true,
      message: 'Blog article successfully published.',
      blog: created
    });
  } catch (err: any) {
    console.error('Error creating blog:', err);
    return res.status(500).json({ error: 'Failed to publish blog article.' });
  }
});

// 5. Update blog by ID
router.put('/admin/blogs/:id', requireAdmin, async (req: AuthenticatedAdminRequest, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid blog ID.' });
    }

    const updated = await updateBlog(id, req.body, req.admin?.username || 'Admin');
    if (!updated) {
      return res.status(404).json({ error: 'Blog article not found.' });
    }

    return res.json({
      success: true,
      message: 'Blog article successfully updated.',
      blog: updated
    });
  } catch (err: any) {
    console.error('Error updating blog:', err);
    return res.status(500).json({ error: 'Failed to update blog article.' });
  }
});

// 6. Delete blog by ID
router.delete('/admin/blogs/:id', requireAdmin, async (req: AuthenticatedAdminRequest, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid blog ID.' });
    }

    const success = await deleteBlog(id, req.admin?.username || 'Admin');
    if (!success) {
      return res.status(404).json({ error: 'Blog article not found or already deleted.' });
    }

    return res.json({
      success: true,
      message: 'Blog article removed successfully.'
    });
  } catch (err: any) {
    console.error('Error deleting blog:', err);
    return res.status(500).json({ error: 'Failed to remove blog article.' });
  }
});

export default router;
