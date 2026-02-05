# Quick Start Guide

## 🚀 Get Running in 30 Seconds

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Start the dev server
npm run dev

# 3. Open your browser
# Navigate to: http://localhost:3000
```

## 🎯 Demo Flow (5 Minutes)

### 1. Ask Mode (Home Page)
**URL**: `http://localhost:3000`

**What to do**:
1. Type any question in the search bar (or use the pre-loaded query)
2. Watch the structured answer appear with animations
3. Click any citation chip to open the Evidence Viewer
4. See the PDF preview and highlighted passage

**What to show**:
- ✅ Structured answer blocks (not chat bubbles)
- ✅ Key values as interactive cards
- ✅ Procedure steps with progressive reveal
- ✅ Citation chips that open evidence
- ✅ Confidence scoring

### 2. Compare Mode
**URL**: `http://localhost:3000/compare`

**What to do**:
1. Select two documents from the dropdowns (default: 2021 vs 2022)
2. Click "Run Comparison"
3. Watch the animated delta table appear
4. Expand rows to see before/after changes
5. Notice the pulse animation on numeric changes

**What to show**:
- ✅ Side-by-side document comparison
- ✅ Animated deltas (Added/Modified/Removed)
- ✅ Significance badges
- ✅ Jump-to-source citations
- ✅ Expandable detail rows

### 3. Extract Mode
**URL**: `http://localhost:3000/extract`

**What to do**:
1. Toggle between Table / JSON / Checklist views
2. Try the checklist view and check off items
3. Watch the progress bar update
4. Click "Download JSON" to export

**What to show**:
- ✅ Three view modes with smooth transitions
- ✅ Structured data extraction
- ✅ Progress tracking in checklist mode
- ✅ Export functionality

### 4. Library Mode
**URL**: `http://localhost:3000/library`

**What to do**:
1. Browse the document corpus
2. Use the search bar to filter
3. Click on a document card to preview
4. Notice the index health stats

**What to show**:
- ✅ Document browsing and search
- ✅ Version tracking
- ✅ Access level indicators
- ✅ Quick preview modal

### 5. Admin Mode
**URL**: `http://localhost:3000/admin`

**What to do**:
1. View ingestion status dashboard
2. Check index health metrics
3. Scroll through audit trail
4. Review role-based permissions

**What to show**:
- ✅ System monitoring
- ✅ Ingestion jobs with progress
- ✅ Audit trail
- ✅ Permissions management

### 6. Upload Flow
**From any page**:

**What to do**:
1. Click "Upload..." in the top scope selector
2. Click "Select File" in the drawer
3. Watch the processing animation
4. Click "Ask on this document" when ready
5. Switch scope to "Library + Upload"
6. Ask the same question again
7. See the conflict detection banner

**What to show**:
- ✅ Upload drawer with smooth slide-in
- ✅ Processing status with progress bars
- ✅ Scope switching
- ✅ Conflict detection across sources

## 🎨 Key Animations to Highlight

1. **Citation Click**: Click any citation chip → Evidence viewer slides in with pulse glow
2. **Delta Animations**: In Compare mode, expand rows to see before/after transitions
3. **Progressive Reveal**: Watch answer blocks appear one by one
4. **Conflict Banner**: Switch to combined scope to see conflict detection
5. **Progress Bars**: Check items in Extract checklist mode
6. **Hover States**: Hover over any interactive element for smooth transitions

## 🔄 Scope Selector Demo

**This is critical for enterprise trust**:

1. Start with **"JLR Library"** scope (default)
   - Ask a question → Get JLR specification
   
2. Click **"Upload..."**
   - Upload a document → Switch to upload scope
   - Ask same question → Get different specification
   
3. Click **"Library + Upload"**
   - Ask same question → Get conflict detection banner
   - See side-by-side evidence with recommendations

## 🎯 Best Demo Order for JLR

```
1. Home (Ask Mode) - Show the main product
   ↓
2. Click citation - Show evidence viewer
   ↓
3. Compare Mode - Show version delta
   ↓
4. Upload - Show conflict detection
   ↓
5. Extract - Show structured outputs
   ↓
6. Library - Show corpus transparency
   ↓
7. Admin - Show governance
```

## 💡 Pro Tips

- **Filters are always visible** in the global bar - change them to see "Scope changed" indicator
- **All animations are meaningful** - they explain hierarchy and relationships
- **Click everything** - all interactive elements have hover states and transitions
- **Evidence viewer** - This is the trust engine, emphasize it
- **Conflict detection** - This is unique, no competitor does this well

## 🐛 Troubleshooting

### Port already in use?
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Dependencies not installed?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build errors?
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Safari
- ✅ Firefox
- ✅ Edge

## 🎬 Recording a Demo

1. Use **1920x1080** resolution for best results
2. Enable **smooth scrolling** in browser settings
3. Use **Chrome DevTools** to simulate slower animations if needed
4. Record at **60fps** to capture all animations

## 📊 Mock Data Customization

All mock data is in `/data` directory:

- `mockAnswers.json` - Modify answer scenarios
- `mockComparison.json` - Add more document deltas
- `mockExtract.json` - Change extracted data
- `mockLibrary.json` - Add more documents
- `mockAdmin.json` - Update system stats

## 🚀 Next Steps

After the demo, you can:

1. **Customize colors** - Edit `tailwind.config.ts`
2. **Add more mock data** - Edit JSON files in `/data`
3. **Integrate backend** - Replace mock data with API calls
4. **Add authentication** - Implement user login
5. **Deploy** - Use Vercel, Netlify, or your preferred platform

---

**Ready to impress JLR?** 🎯

Open `http://localhost:3000` and start the demo!
