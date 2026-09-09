import { Router } from 'express';

const router = Router();

const LEGACY_REDIRECTS: Record<string, string> = {
  '/about-us': '/about',
  '/about-us/': '/about',
  '/contact-us': '/contact',
  '/contact-us/': '/contact',
  '/press-or-government-program': '/press',
  '/press-or-government-program/': '/press',
  '/best-nasha-mukti-kendra-chhindwara-complete-guide-to-addiction-recovery': '/blogs/chhindwara-recovery-guide',
  '/best-nasha-mukti-kendra-chhindwara-complete-guide-to-addiction-recovery/': '/blogs/chhindwara-recovery-guide',
  '/signs-someone-needs-a-nasha-mukti-centre-in-nagpur': '/blogs/signs-addiction-nagpur',
  '/signs-someone-needs-a-nasha-mukti-centre-in-nagpur/': '/blogs/signs-addiction-nagpur',
  '/google-ads': '/contact',
  '/google-ads/': '/contact'
};

router.use((req, res, next) => {
  const target = LEGACY_REDIRECTS[req.path];
  if (target) {
    return res.redirect(301, target);
  }
  next();
});

export default router;
