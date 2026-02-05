# JLR Knowledge Workspace - Demo Script

## 🎯 Executive Summary (30 seconds)

> "This is not a chatbot. This is an engineering knowledge system where every answer is backed by verified evidence, comparable across versions, and exportable as structured data. Think Bloomberg Terminal meets Apple design, built specifically for automotive engineering."

---

## 📋 Full Demo Script (5-7 minutes)

### Opening (30 seconds)

**Say**: "Let me show you how JLR engineers will interact with their technical documentation. Notice we're not looking at a chat interface—this is a knowledge workspace."

**Show**: Home screen with global navigation and scope selector

---

### Scene 1: Ask Mode - The Main Product (90 seconds)

**Say**: "An engineer needs torque specifications for the Defender 2022 powertrain."

**Do**:
1. Point to the filter chips: "Defender • MY2022 • Powertrain • Service Manual"
2. Type or show pre-loaded query: "What is the torque specification for M12 cylinder head bolts?"
3. Wait for answer to appear with animations

**Say**: "Notice this isn't a paragraph of text. It's a structured answer."

**Point out**:
- ✅ **Summary** at the top
- ✅ **Key Values** as cards (20 Nm → 70 Nm + 180°)
- ✅ **Procedure Steps** numbered and clear
- ✅ **97% Confidence** score
- ✅ **Citation chips** at the bottom

**Say**: "Every claim has a source. Let me show you."

---

### Scene 2: Evidence Viewer - The Trust Engine (60 seconds)

**Do**:
1. Click any citation chip (e.g., "p. 127 §3.2.4")
2. Watch evidence viewer slide in from right

**Say**: "This is what makes it enterprise-grade. We're not just citing a document—we're showing you the exact page, section, and highlighted passage."

**Point out**:
- ✅ **Breadcrumb**: Doc → Section → Page
- ✅ **PDF preview** (mock for now)
- ✅ **Highlighted passage** with yellow glow
- ✅ **"Show surrounding context"** option
- ✅ **"Export evidence pack"** button

**Say**: "This is audit-ready. Every answer is traceable to source."

**Do**: Close evidence viewer

---

### Scene 3: Compare Mode - The Differentiator (90 seconds)

**Say**: "Now here's something no other RAG tool does well: version comparison."

**Do**:
1. Navigate to Compare tab
2. Show selectors: "2021 vs 2022 Powertrain Service Manual"
3. Click "Run Comparison"

**Say**: "Watch this."

**Point out** (as animations play):
- ✅ **Summary cards**: 47 total changes
- ✅ **Delta table** with color coding
- ✅ **Green badges** for Added
- ✅ **Yellow badges** for Modified
- ✅ **Red badges** for Removed
- ✅ **Significance levels**: Critical, High, Medium, Low

**Do**: Expand a "Modified" row (e.g., torque spec change)

**Say**: "Look at this—before was 15 Nm → 65 Nm, now it's 20 Nm → 70 Nm. The numeric change briefly pulses to draw attention."

**Point out**:
- ✅ **Side-by-side** before/after
- ✅ **Citations** for both versions
- ✅ **Animated transitions**

**Say**: "This is critical for change management and compliance."

---

### Scene 4: Upload & Conflict Detection (90 seconds)

**Say**: "Now let's show the scope system. This prevents the #1 trust killer: 'Where did this answer come from?'"

**Do**:
1. Point to scope selector: "JLR Library" is active
2. Click "Upload..."
3. Drawer slides in

**Say**: "An engineer uploads a supplier manual."

**Do**:
1. Click "Select File"
2. Watch processing animation (2 seconds)
3. Wait for "Ready" status
4. Click "Ask on this document"

**Say**: "Now the scope switches to the uploaded document. Same question, different answer."

**Point out**:
- ✅ Different torque spec (75 Nm ± 5 Nm)
- ✅ Different procedure (single-stage vs multi-stage)
- ✅ Scope badge shows "Upload Active"

**Say**: "But here's the magic. Let's ask across both sources."

**Do**:
1. Change scope to "Library + Upload"
2. Ask same question again

**Say**: "Watch what happens."

**Point out** (as conflict banner appears):
- ✅ **Red conflict banner** at top
- ✅ **"CONFLICT DETECTED"** message
- ✅ **Side-by-side** comparison of conflicting specs
- ✅ **Recommendation**: "Verify component being serviced"
- ✅ **Click to view evidence** for each source

**Say**: "No other system does this. We're not just retrieving—we're reasoning across sources."

---

### Scene 5: Extract Mode (60 seconds)

**Say**: "Engineers don't always want answers—sometimes they want data."

**Do**:
1. Navigate to Extract tab
2. Show query: "Extract all torque specs for Defender 2022 Powertrain"
3. Point to "24 records found"

**Say**: "Three ways to view the same data."

**Do**: Toggle between views
1. **Table View**: "Sortable, filterable, with citations per row"
2. **JSON View**: "For developers and API integration"
3. **Checklist View**: "For technicians doing actual work"

**In Checklist View**:
- Check off a few items
- Watch progress bar update

**Say**: "Everything exports to CSV or JSON. Citations included."

---

### Scene 6: Library & Admin (30 seconds)

**Say**: "Two more screens quickly."

**Do**:
1. Navigate to Library
2. Show document corpus: "6 documents, 2,055 pages, 98.5% index health"
3. Click a document card to preview

**Say**: "Full transparency into what's indexed."

**Do**:
1. Navigate to Admin
2. Scroll through ingestion jobs, audit trail, permissions

**Say**: "This is enterprise governance. Who asked what, which sources, when. Role-based access. Audit-ready."

---

## 🎬 Closing (30 seconds)

**Say**: 
> "So to recap: This isn't a chatbot. It's an engineering knowledge system. Every answer is backed by evidence. Every change is trackable. Conflicts are detected automatically. Data is exportable. And it's all governed and auditable.
> 
> This is what best-in-class looks like for automotive engineering documentation."

**Final screen**: Show home page with all filters active

---

## 🎯 Key Messages to Emphasize

1. **"Not a chatbot"** - Structured answers, not endless text
2. **"Evidence-native"** - Every claim is clickable to source
3. **"Conflict detection"** - Unique capability across sources
4. **"Audit-ready"** - Full governance and traceability
5. **"Engineer-first"** - Built for technical users, not consumers

---

## 💡 Handling Questions

### "How accurate is it?"
> "The frontend shows 97% confidence scoring. In production, this would be backed by your RAG pipeline with vector similarity scores and LLM confidence metrics."

### "Can it handle our document volume?"
> "This is a frontend demo with mock data. The architecture is designed to scale—vector databases like Pinecone or Weaviate can handle millions of documents."

### "What about security?"
> "Notice the role-based access in Admin mode. In production, this integrates with your SSO, and documents are permission-scoped at ingestion time."

### "How long to implement?"
> "The frontend is production-ready. Backend integration depends on your existing systems—typically 8-12 weeks for RAG pipeline, document ingestion, and auth integration."

### "What makes this better than Copilot/Glean/etc?"
> "Three things: 1) Evidence viewer with exact citations, 2) Version comparison with conflict detection, 3) Engineering-first UX, not generic search."

---

## 🎨 Animation Highlights to Point Out

1. **Citation pulse glow** - When clicking citations
2. **Progressive reveal** - Answer blocks appearing
3. **Delta animations** - Before/after transitions in Compare
4. **Conflict banner** - Smooth appearance with side-by-side
5. **Progress bars** - In upload and checklist views
6. **Drawer slides** - Evidence viewer and upload drawer

---

## 📊 Stats to Mention

- **Mock corpus**: 6 documents, 2,055 pages
- **Confidence**: 97% on library queries
- **Comparison**: 47 changes detected between versions
- **Extract**: 24 structured records
- **Roles**: 4 permission levels (Engineering, Technician, Management, Supplier)
- **Audit**: Full activity trail with timestamps

---

## 🚀 Demo Environment Checklist

Before the demo:

- [ ] Server running on `http://localhost:3000`
- [ ] Browser at 1920x1080 resolution
- [ ] All tabs closed except demo
- [ ] Notifications turned off
- [ ] Zoom at 100%
- [ ] Pre-load home page with query ready
- [ ] Test all navigation links
- [ ] Test citation clicks
- [ ] Test upload flow once

---

## 🎯 Success Metrics

After the demo, they should say:

- ✅ "This looks production-ready"
- ✅ "I've never seen conflict detection like this"
- ✅ "The evidence viewer is exactly what we need"
- ✅ "This is way better than a chatbot"
- ✅ "When can we start using it?"

---

**Ready to demo?** 🎬

Open `http://localhost:3000` and follow this script!
