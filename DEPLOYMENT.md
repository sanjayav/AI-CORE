# 🚀 AI CORE - Vercel Deployment Guide

## Quick Deploy (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AI CORE RAG Demo"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ai-core.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy" ✅

3. **Done!** 🎉
   - Your app will be live at: `https://your-project.vercel.app`
   - Automatic deployments on every push

### Option 2: Deploy via Vercel CLI (Advanced)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Accept defaults for Next.js app
   - Deploy! 🚀

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## Configuration

### Environment Variables (Optional)
If you add a backend API in the future:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-api.com
   NEXT_PUBLIC_API_KEY=your-key-here
   ```

### Custom Domain (Optional)
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `aicore.yourcompany.com`)
3. Update DNS records as instructed
4. SSL automatically configured ✅

---

## Build Settings (Auto-configured)

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

---

## Performance Optimizations

### Already Configured ✅
- ✅ **Static Generation** for fast page loads
- ✅ **Automatic Code Splitting**
- ✅ **Image Optimization** (Next.js Image component)
- ✅ **Edge Functions** for global performance
- ✅ **Gzip/Brotli Compression**

### Vercel Analytics (Recommended)
1. Go to Vercel Dashboard → Your Project → Analytics
2. Enable Analytics (free tier available)
3. Monitor:
   - Page views
   - Real user metrics (Core Web Vitals)
   - Performance scores

---

## Deployment Checklist

- [x] `package.json` configured ✅
- [x] `next.config.ts` optimized ✅
- [x] `vercel.json` created ✅
- [x] `.gitignore` includes `.vercel` ✅
- [x] All dependencies installed ✅
- [x] Build passes locally (`npm run build`) ✅
- [ ] GitHub repository created
- [ ] Connected to Vercel
- [ ] Deployed successfully

---

## Testing Locally Before Deploy

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test production build
npm run build
npm start

# Access at http://localhost:3000
```

---

## Troubleshooting

### Build Fails on Vercel
```bash
# Test build locally first
npm run build

# Check for errors in terminal
# Fix any TypeScript/ESLint errors
npm run lint
```

### Module Not Found Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Vercel CLI Issues
```bash
# Update Vercel CLI
npm i -g vercel@latest

# Clear Vercel cache
vercel --force
```

---

## Post-Deployment

### Share Your Demo! 🎉
- **Live URL**: `https://your-project.vercel.app`
- **Custom Domain**: `https://aicore.yourcompany.com`
- **Preview URLs**: Every branch gets a unique URL

### Monitoring
- **Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Deployments**: View all deployments and rollback if needed
- **Analytics**: Real user metrics
- **Logs**: Runtime and build logs

---

## Advanced Features

### Preview Deployments
- Every `git push` to a branch creates a preview URL
- Test changes before merging to main
- Automatic preview URLs in PR comments

### Rollback
- Instant rollback to any previous deployment
- Zero downtime
- One-click in Vercel Dashboard

### CI/CD Integration
- Automatic deployments on push
- Run tests before deployment (add to `vercel.json`)
- Deployment protection for production

---

## Next Steps After Deployment

1. ✅ **Add Backend API** (when ready)
   - Deploy API separately or use Vercel Serverless Functions
   - Add environment variables

2. ✅ **Enable Authentication** (when ready)
   - Add Auth0, Clerk, or NextAuth.js
   - Configure in Vercel dashboard

3. ✅ **Connect Database** (when ready)
   - Vercel Postgres, Supabase, or PlanetScale
   - Add connection strings to environment variables

4. ✅ **Set Up Analytics**
   - Vercel Analytics (built-in)
   - Google Analytics (add to `app/layout.tsx`)
   - Posthog, Mixpanel, etc.

---

## Cost Estimate

### Vercel Pricing (as of 2024)
- **Hobby (Free)**: Perfect for demos
  - 100GB bandwidth
  - 6,000 build minutes
  - Unlimited deployments
  - Custom domains

- **Pro ($20/month)**: For production
  - 1TB bandwidth
  - 24,000 build minutes
  - Team collaboration
  - Analytics included

**Your demo will run perfectly on the FREE tier!** 🎉

---

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

---

**Ready to deploy?** Let's go! 🚀
