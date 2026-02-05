# Real Data Structure Implementation

## Overview

The application has been updated to use **real PowerPoint engineering analysis data** from battery pack structural analyses. All mock data has been replaced with actual data extracted from engineering presentations.

## Data Files

### Original PowerPoint Extractions

1. **`powerpoint_slides (1).json`** - EMA LR IPB2 BEM Battery Pack Shock Analysis
   - Author: C. Gowda (cgowda)
   - Date: 2024-12-13
   - Slides: 9
   - Content: Shock analysis with critical contactor carrier failure

2. **`powerpoint_slides.json`** - EMA LR 26MY IPB Pack Lid Pressurisation Analysis
   - Author: Nagesh.G (nguruvar)
   - Date: 2025-05-13
   - Slides: 22
   - Content: Pressurisation analysis with CFD venting studies

3. **`a.json`** - EMA Battery Pack Shock Analysis - Retention Plate Study
   - Author: U. Kanumarlapudi (ukanumar)
   - Date: 2024-05-29
   - Slides: 9
   - Content: Comparative analysis between baseline and proposed designs

### PowerPoint Data Structure

```json
{
  "presentation_info": {
    "author": "string",
    "subject": "string",
    "title": "string"
  },
  "slides": [
    {
      "slide_number": 1,
      "text_blocks": [
        {
          "text": "string",
          "type": "Title" | "Header" | "Text" | "Table"
        }
      ]
    }
  ],
  "total_characters": number,
  "total_slides": number,
  "total_text_blocks": number,
  "total_words": number
}
```

### Processed Data Files

#### 1. `realPresentations.json` - Document Library

Maps the PowerPoint files to document metadata:

```json
{
  "documents": [
    {
      "id": "edd231804_b246",
      "name": "EMA LR IPB2 BEM Battery Pack Shock Analysis",
      "author": "C. Gowda (cgowda)",
      "date": "2024-12-13",
      "slides": 9,
      "type": "Shock Analysis",
      "status": "active",
      "file": "powerpoint_slides (1).json",
      "tags": ["BEM", "Shock", "IPB2", "Battery Pack"]
    }
  ]
}
```

#### 2. `realSuggestions.json` - Suggested Questions

Engineering-relevant questions based on the actual analysis content:

```json
{
  "categories": [
    {
      "name": "Shock Analysis",
      "icon": "AlertCircle",
      "questions": [
        "What are the plastic strain results for the BEM contactor carrier?",
        "Compare shock analysis results between baseline b227 and proposed design b229"
      ]
    }
  ]
}
```

#### 3. `realAnswers.json` - AI-Generated Answers

Contains detailed answers extracted from the PowerPoint analyses:

- **shock_analysis**: Critical contactor carrier failure (37.2% strain)
- **pressurisation_analysis**: Pack lid at 7.28% strain, CFD pressure results
- **retention_plate_comparison**: Baseline vs. proposed design comparison

Structure:
```json
{
  "summary": "string",
  "key_values": [{ "label": "string", "value": "string" }],
  "procedure_steps": [{ "step": number, "description": "string", "critical": boolean }],
  "assumptions": ["string"],
  "conflicts": [{ "field": "string", "severity": "string", "recommendation": "string" }],
  "citations": [{ "docId": "string", "page": number, "section": "string", "confidence": number, "excerpt": "string" }]
}
```

#### 4. `realExtract.json` - Structured Data Extraction

18 component records extracted from analysis tables:

```json
{
  "query": "Extract all component stress and strain analysis results",
  "extractType": "structural_analysis_results",
  "totalRecords": 18,
  "data": [
    {
      "id": "comp-1",
      "component": "Contactor Carrier BEM (Rev39P1)",
      "material": "PA6-GF30_Akromid_B28_GF30_FR_V1",
      "acceptance_criteria": "1.60%",
      "max_plastic_strain": ">3.80% (ALL AXES)",
      "test_axis": "X-Neg, Y-Pos, Z-Pos",
      "critical": true,
      "notes": "CRITICAL FAILURE - Exceeds acceptance criteria",
      "citations": [{ "docId": "string", "page": number, "section": "string" }]
    }
  ]
}
```

## Component Updates

### 1. LibraryMode (`components/modes/LibraryMode.tsx`)

**Changes:**
- Import: `mockLibrary.json` → `realPresentations.json`
- Display fields updated:
  - `lastModified` → `date`
  - `accessLevel` → `author`
  - Added: `slides` count
  - Enhanced: Author names with usernames

**Features:**
- Shows 3 real engineering presentations
- Search by name, ID, or author
- Grid and list view modes

### 2. AskMode (`components/modes/AskMode.tsx`)

**Changes:**
- Import: `mockAnswers.json` → `realAnswers.json`
- Intelligent answer routing based on question keywords:
  - Keywords like "contactor", "busbar" → shock_analysis
  - Keywords like "pressurisation", "lid", "seal" → pressurisation_analysis
  - Keywords like "retention", "plate", "compare" → retention_plate_comparison

**Features:**
- Context-aware answers from real engineering data
- Rich citations with document IDs and page numbers
- Critical findings highlighted
- Procedure steps with engineering notes

### 3. ExtractMode (`components/modes/ExtractMode.tsx`)

**Changes:**
- Import: `mockExtract.json` → `realExtract.json`
- Table columns updated:
  - `Torque Spec` → `Material`
  - `Stage` → `Acceptance` + `Max Strain`
- Fields:
  - `torque` → `max_plastic_strain`
  - `stage` → `acceptance_criteria`
  - Added: `material`, `test_axis`

**Features:**
- 18 real component analysis records
- Critical failures highlighted (4 critical items)
- Material specifications
- Acceptance criteria vs. actual strain comparison

### 4. SuggestedQuestions (`components/answer/SuggestedQuestions.tsx`)

**Changes:**
- Import: `mockSuggestions.json` → `realSuggestions.json`
- Categories updated to match engineering domains:
  - Shock Analysis
  - Pressurisation Analysis
  - Materials & Specifications
  - Test Procedures

## Key Engineering Concepts in Data

### 1. **Plastic Strain Analysis**
- Measures permanent deformation under load
- Acceptance criteria: typically 1/2 of failure strain
- Critical when exceeds target (e.g., Contactor Carrier: 37.2% vs 1.6% target)

### 2. **Materials**
- **PA6-GF30**: Glass-filled nylon for structural plastics
- **Cu-ETP**: Copper for electrical busbars
- **EN_AC_46000**: Aluminum casting alloy
- **6111T4**: Aluminum alloy for retention plates

### 3. **Test Procedures**
- **TPJLR-00-047**: Shock durability test (25g/20g, 6ms half-sine)
- **TPJLR-14-105**: Emergency pressurisation test (400 mbar)
- **CFD Analysis**: Computational fluid dynamics for venting

### 4. **Critical Findings**
- Contactor carrier: 37.2% strain (23x over limit) → requires design fix
- Pack lid: 7.28% strain (91% of limit) → minimal margin
- Retention plate change: increased stress in adjacent components

## Testing the Demo

1. **Library Mode**: Browse the 3 engineering presentations
2. **Ask Mode**: Try these real questions:
   - "What are the plastic strain results for the BEM contactor carrier?"
   - "What is the maximum pack lid pressure and does it meet target?"
   - "Compare shock analysis results between baseline b227 and proposed design b229"
3. **Extract Mode**: View 18 component records with material and strain data
4. **Filtering**: Use "Critical Only" to see 4 failure cases

## Data Authenticity

All data is extracted from real engineering presentations:
- Actual component part numbers (e.g., T9U3-10D760-A-INS-01)
- Real analyst names and dates
- Genuine material specifications
- Authentic test procedures and standards
- True engineering findings and recommendations

## Next Steps

To add more presentations:
1. Add PowerPoint JSON to `/data/`
2. Update `realPresentations.json` with document metadata
3. Extract key findings into `realAnswers.json`
4. Add table data to `realExtract.json`
5. Create relevant questions in `realSuggestions.json`
