# JLR Knowledge Workspace

A premium enterprise RAG (Retrieval-Augmented Generation) system for JLR technical documentation with evidence-backed answers, document comparison, structured data extraction, and full audit capabilities.

## 🎯 Product Vision

**"Engineering Truth, Verified"** — A Knowledge Workspace where every answer is clickable back to proof, scoped correctly, and comparable across versions/programs—with zero chatbot vibes.

## ✨ Key Features

### 1. **Ask Mode** (Main Product)
- Structured answer canvas (not chat bubbles)
- Key values displayed as interactive cards
- Procedure steps with progressive reveal
- Citation chips that open evidence viewer
- Conflict detection for multi-source queries
- Real-time confidence scoring

### 2. **Compare Mode** (Differentiator)
- Side-by-side document comparison
- Animated delta table (Added/Modified/Removed)
- Numeric changes with pulse animations
- Jump-to-source citations
- Significance badges (Critical/High/Medium/Low)

### 3. **Extract Mode** (Structured Outputs)
- Table view with sortable columns
- JSON view with syntax highlighting
- Checklist view with progress tracking
- Export to CSV/JSON
- Citations per row/field

### 4. **Library Mode** (Corpus Transparency)
- Document browsing and search
- Version tracking
- Index status and health
- Access level indicators
- Quick preview functionality

### 5. **Admin Mode** (Enterprise Governance)
- Ingestion status dashboard
- Index health metrics
- Audit trail with user activity
- Role-based permissions management

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State**: Zustand
- **Icons**: Lucide React

### Project Structure
```
/Users/kick/Desktop/marklytics/rag demo/
├── app/                      # Next.js app router pages
│   ├── page.tsx             # Ask Mode (home)
│   ├── compare/             # Compare Mode
│   ├── extract/             # Extract Mode
│   ├── library/             # Library Mode
│   └── admin/               # Admin Mode
├── components/
│   ├── layout/              # Navigation and global components
│   ├── modes/               # Main screen components
│   ├── answer/              # Answer canvas components
│   ├── compare/             # Comparison components
│   ├── evidence/            # Evidence viewer
│   ├── upload/              # Upload drawer
│   └── filters/             # Filter components
├── data/                    # Mock JSON data
│   ├── mockAnswers.json     # Answer scenarios (library/upload/conflict)
│   ├── mockComparison.json  # Document delta data
│   ├── mockExtract.json     # Extracted structured data
│   ├── mockLibrary.json     # Document corpus
│   └── mockAdmin.json       # Admin dashboard data
└── lib/
    └── store.ts             # Zustand state management
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open your browser:
```
http://localhost:3000
```

## 🎨 Design System

### Colors
- **Primary**: Deep navy (#0A2540) - Trust, enterprise
- **Secondary**: Teal (#00D9A3) - Success, verification
- **Accent**: Blue (#5B8DEE) - Interactive elements
- **Status Colors**: Success, Warning, Error, Info

### Animations
- **Constraint-based** with Framer Motion
- **Meaningful, not flashy** - animations explain hierarchy
- **Progressive reveal** for answer blocks
- **Pulse glow** for citation highlights
- **Smooth transitions** for all interactions

## 🎯 User Flows

### Primary Flow (Demo Ready)
1. User selects: **Defender → MY2022 → Powertrain**
2. Asks: **"What is the torque specification for M12 cylinder head bolts?"**
3. Gets structured answer + key values + procedure steps
4. Clicks citation → Evidence viewer opens with PDF + highlights
5. Switches to **Compare → MY2021 vs MY2022**
6. Views animated delta table showing specification changes
7. Uploads supplier report via upload drawer
8. Asks on combined scope → **Detects conflict** between JLR and supplier specs
9. Views conflict banner with side-by-side evidence

### Scope Selector (Critical for Trust)
- **Library**: JLR documentation corpus
- **Upload**: User-uploaded documents
- **Library + Upload**: Combined sources with conflict detection

## 📊 Mock Data Scenarios

### 1. Library Answer
Standard JLR documentation query with high confidence, structured answer, and citations.

### 2. Upload Answer
Query against uploaded supplier documentation with different specifications.

### 3. Combined Conflict
Query across both sources detecting specification mismatch with conflict banner and recommendations.

### 4. Comparison Delta
Document version comparison showing 47 changes (12 added, 8 removed, 27 modified) with significance levels.

### 5. Extract Data
24 torque specifications extracted as structured data with table/JSON/checklist views.

## 🎭 Animations Showcase

1. **Citation Clicks**: Pulse glow effect highlighting evidence
2. **Delta Animations**: 
   - Added lines glow in (green)
   - Removed lines fade out (red)
   - Modified lines show before→after with pulse
3. **Answer Blocks**: Progressive reveal with stagger
4. **Evidence Drawer**: Smooth slide-in from right
5. **Progress Bars**: Animated width transitions
6. **Hover States**: Scale and color transitions
7. **Filter Changes**: Smooth expand/collapse

## 🔐 Enterprise Features (Mocked)

- **Role-Based Access**: Engineering, Technician, Management, Supplier
- **Audit Trail**: Who asked what, which sources accessed
- **Document Versioning**: Track changes across model years
- **Index Health Monitoring**: Real-time status dashboard
- **Conflict Detection**: Automatic specification mismatch alerts

## 🚀 Production Readiness

### What's Implemented (Frontend)
✅ All 5 main screens fully functional  
✅ Complete state management with Zustand  
✅ Responsive design (desktop-first)  
✅ All animations and micro-interactions  
✅ Mock data for realistic demos  
✅ Evidence viewer with citations  
✅ Upload flow with status tracking  
✅ Conflict detection UI  
✅ Compare with animated deltas  
✅ Extract with 3 view modes  

### Backend Integration Points (Future)
- [ ] Real PDF rendering/highlighting
- [ ] Vector database for RAG
- [ ] LLM integration for answers
- [ ] Document ingestion pipeline
- [ ] User authentication
- [ ] Real-time index monitoring
- [ ] Export functionality

## 🎯 Demo Script for JLR

1. **Landing** - Show command center with global scope selector
2. **Ask** - Demonstrate structured answer with citations
3. **Evidence** - Click citation to show evidence viewer
4. **Compare** - Show MY2021 vs MY2022 delta animations
5. **Extract** - Toggle between table/JSON/checklist views
6. **Upload** - Show upload flow and conflict detection
7. **Library** - Browse document corpus
8. **Admin** - Show governance and audit capabilities

## 📝 Customization

### Changing Colors
Edit `tailwind.config.ts` to update the color palette.

### Adding Mock Data
Edit JSON files in `/data` directory to add more scenarios.

### Adding Animations
Use Framer Motion in components with:
```tsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

## 🏆 Why This is Best-in-Class

1. **Not a chatbot** - Structured answers, not endless text
2. **Evidence-native** - Every claim is clickable to source
3. **Compare-first** - Document deltas with animations
4. **Multi-scope** - Library/Upload/Combined with conflict detection
5. **Enterprise-ready** - Audit, permissions, governance built-in
6. **Delightful UX** - Bloomberg Terminal meets Apple design

## 📞 Support

For questions or issues, contact the development team.

---

Built with ❤️ for JLR Engineering
