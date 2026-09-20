import { z } from 'zod';

export const registrationSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100, "Full name is too long"),
  age: z.coerce.number().int().min(10, "Age must be at least 10").max(120, "Please enter a valid age"),
  mobileNumber: z.string().trim().regex(/^[0-9+\s-]{10,15}$/, "Please enter a valid mobile number (at least 10 digits)"),
  address: z.string().trim().min(5, "Address must be at least 5 characters"),
  programPreference: z.string().optional().default("General Rehabilitation"),
  pickupRequired: z.boolean().optional().default(false),
  hpField: z.string().optional()
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const adminLoginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const userLoginSchema = z.object({
  userId: z.string().trim().min(4, "User ID is required"),
  mobileNumber: z.string().trim().min(10, "Mobile number is required")
});

export type UserLoginInput = z.infer<typeof userLoginSchema>;

export const statusUpdateSchema = z.object({
  status: z.enum(['Pending', 'Under Review', 'Approved', 'Not Approved']),
  notes: z.string().optional()
});

export type StatusUpdateInput = z.infer<typeof statusUpdateSchema>;

export const blogSectionSchema = z.object({
  sectionHeading: z.string().trim().min(1, "Section heading is required"),
  paragraphs: z.array(z.string().trim().min(1)),
  bulletPoints: z.array(z.string().trim()).optional()
});

export const blogPostSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters").max(200),
  slug: z.string().trim().min(3).regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and dashes"),
  subtitle: z.string().trim().min(5, "Subtitle must be at least 5 characters").max(250),
  category: z.string().trim().default("Recovery Guide"),
  author: z.string().trim().default("Mitrangan Clinical Editorial Team"),
  read_time: z.string().trim().default("5 min read"),
  excerpt: z.string().trim().min(10, "Excerpt must be at least 10 characters").max(500),
  cover_image: z.string().trim().min(1, "Cover image URL is required"),
  content: z.array(blogSectionSchema).min(1, "At least one content section is required")
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

