# SCHOLARSHIP KNOWLEDGE BASE
## Product Requirements Document & AI Agent Implementation Prompt

Project Type: Knowledge Base Web Application  
Domain: Education & Scholarship Information  
Development Approach: Static Frontend Application  
Target Technology: HTML5, CSS3, Vanilla JavaScript, JSON  
Deployment: GitHub Pages

---

# 01. PROJECT OVERVIEW

## 1.1 Project Description

Develop a modern, responsive, and user-friendly Scholarship Knowledge Base website.

The application serves as a centralized knowledge platform that provides structured information about scholarships, application procedures, eligibility requirements, selection preparation, and experiences from scholarship recipients.

The primary purpose is to help students understand the scholarship application process through organized and accessible knowledge.

This project is developed as an academic group assignment. The application must demonstrate the implementation of a Knowledge Base system through structured information, categorization, search functionality, and detailed knowledge presentation.

## 1.2 Project Objectives

1. Provide centralized information about scholarship opportunities.
2. Organize scholarship-related knowledge into structured categories.
3. Help students find relevant information through search and filtering.
4. Present detailed knowledge in an accessible format.
5. Preserve information obtained from interviews and reliable references.

## 1.3 Target Users

- University students looking for scholarships.
- Students preparing scholarship applications.
- Students seeking information about scholarship requirements.
- Students preparing for scholarship selection.
- Students interested in learning from scholarship recipients.

---

# 02. TECHNOLOGY STACK

Use ONLY the following technologies:

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive layouts |
| Vanilla JavaScript | Application logic and interactions |
| JSON | Static knowledge database |
| LocalStorage | Optional browser-side temporary storage |
| GitHub Pages | Website deployment |

## Technical Restrictions

IMPORTANT:

- Do NOT use React.
- Do NOT use Next.js.
- Do NOT use Vue.
- Do NOT use Angular.
- Do NOT use TypeScript.
- Do NOT use Node.js as a backend.
- Do NOT use PHP.
- Do NOT use Supabase.
- Do NOT use Firebase.
- Do NOT use external databases.
- Do NOT create REST APIs.
- Do NOT require authentication.
- Do NOT build a complicated backend.

The application must operate entirely on the frontend.

JSON files serve as the primary source of knowledge data.

JavaScript handles data retrieval, searching, filtering, and rendering.

LocalStorage is optional and must not replace the original JSON data source.

Ensure compatibility with GitHub Pages.

Use relative asset paths and avoid server-side routing.

---

# 03. APPLICATION STRUCTURE

Create the following website pages.

## 3.1 HOME PAGE

File: index.html

Purpose:

Introduce the Scholarship Knowledge Base and help users access information quickly.

Required Sections:

A. Navigation Bar
- Website logo or wordmark.
- Home.
- Categories.
- Knowledge Library.
- About.
- Responsive mobile navigation.

B. Hero Section
- Main headline.
- Short website description.
- Prominent search bar.
- Primary call-to-action leading to the Knowledge Library.

Suggested headline:

"Your Guide to Finding and Securing Scholarships."

Supporting text:

"Explore scholarship opportunities, understand application requirements, and prepare yourself for the selection process through a centralized knowledge resource."

C. Featured Categories

Display the five main knowledge categories.

Each category card must contain:
- Category icon.
- Category name.
- Short description.
- Number of available articles.

D. Featured Knowledge

Display selected knowledge articles.

Each card must contain:
- Article title.
- Category.
- Short description.
- Read More button.

E. Latest Knowledge

Display recently added knowledge articles.

F. Footer

Include:
- Website identity.
- Project description.
- Navigation links.
- Knowledge source disclaimer.
- Copyright information.

---

## 3.2 CATEGORIES PAGE

File: categories.html

Purpose:

Display all knowledge categories and allow users to explore information based on specific topics.

Create five main categories:

01. Scholarship Information

Description:
Information about scholarship programs, funding coverage, scholarship providers, and available opportunities.

Example knowledge:
- Introduction to KIP Kuliah.
- Understanding LPDP Scholarships.
- Government Scholarship Programs.
- Private Scholarship Programs.
- University Scholarship Programs.

02. Application Guide

Description:
Practical guidance for preparing and submitting scholarship applications.

Example knowledge:
- How to Find Suitable Scholarships.
- How to Prepare a Scholarship Application.
- Writing a Motivation Letter.
- Preparing a Scholarship CV.
- Preparing Recommendation Letters.

03. Eligibility & Requirements

Description:
Information about scholarship eligibility, qualifications, and required documents.

Example knowledge:
- Minimum GPA Requirements.
- Academic Achievement Requirements.
- Financial Eligibility.
- Required Application Documents.
- English Language Requirements.

04. Selection Preparation

Description:
Knowledge and guidance for preparing scholarship selection stages.

Example knowledge:
- Scholarship Interview Preparation.
- Common Scholarship Interview Questions.
- Preparing for Academic Tests.
- Common Application Mistakes.
- Tips for Scholarship Selection.

05. Scholarship Experience

Description:
Experiences, lessons, and recommendations from scholarship recipients.

Example knowledge:
- Experience Applying for Scholarships.
- Challenges During Scholarship Applications.
- Lessons from Scholarship Recipients.
- Maintaining Scholarship Eligibility.
- Managing Responsibilities as a Scholarship Recipient.

Each category card must display:
- Category name.
- Description.
- Icon.
- Article count.
- Explore Category button.

When users click a category, redirect them to the Knowledge Library with the selected category filter activated.

---

## 3.3 KNOWLEDGE LIBRARY PAGE

File: library.html

Purpose:

Display all knowledge articles stored in the application.

Required Features:

A. Page Header
- Page title.
- Short description.
- Total knowledge count.

B. Search Bar
- Search by article title.
- Search by description.
- Search by keywords.
- Search by relevant content.

C. Category Filtering

Provide category filters:
- All Knowledge.
- Scholarship Information.
- Application Guide.
- Eligibility & Requirements.
- Selection Preparation.
- Scholarship Experience.

D. Knowledge Cards

Each article card must display:
- Article title.
- Category badge.
- Short description.
- Publication date.
- Read More button.

E. Additional Interface States

Implement:
- Empty search results.
- No articles available.
- Active category indicator.
- Clear filter button.

The search and category filters must work together.

Example:

A user searches for "Motivation Letter" and selects "Application Guide".

The application must display only relevant articles matching both conditions.

---

## 3.4 KNOWLEDGE DETAIL PAGE

File: detail.html

Purpose:

Display complete information about a selected knowledge article.

Use URL query parameters to identify articles.

Example:

detail.html?id=001

Required Content:

1. Breadcrumb navigation.
2. Article category.
3. Article title.
4. Short description.
5. Publication date.
6. Main knowledge content.
7. Relevant lists or step-by-step instructions.
8. Practical recommendations.
9. Source information.
10. Related knowledge articles.

Article Content Structure:

Each knowledge article should support the following fields:

- Overview.
- Background.
- Main Explanation.
- Requirements (when relevant).
- Procedures or Steps (when relevant).
- Tips and Recommendations.
- Important Notes.
- Sources and References.

The layout must remain readable for long-form articles.

Use proper typography, spacing, headings, lists, and content hierarchy.

Related articles must be generated dynamically based on the selected article's category.

If an article ID does not exist, display a proper 404-style message with a button returning to the Knowledge Library.

---

## 3.5 SEARCH FUNCTIONALITY

Search is a mandatory core feature.

Implement search using Vanilla JavaScript.

Search must support:

- Article title.
- Article description.
- Article content.
- Article keywords.
- Category name.

Requirements:

1. Case-insensitive searching.
2. Partial keyword matching.
3. Real-time search results.
4. Search query preserved when navigating between relevant pages where appropriate.
5. Clear search button.
6. Empty result message.
7. Search results displayed as knowledge cards.

Example:

Search query: "IPK"

Expected results:
- Minimum GPA Requirements.
- Academic Eligibility for Scholarships.
- Understanding Scholarship Selection Criteria.

---

## 3.6 CATEGORY MANAGEMENT AND GROUPING

All articles must belong to a defined category.

Use category IDs as references.

The application must dynamically:
- Retrieve categories from JSON.
- Retrieve knowledge articles from JSON.
- Group articles based on category.
- Calculate article counts.
- Filter articles by category.
- Display category information on article detail pages.

Do not hardcode article cards individually inside HTML.

All article cards must be generated dynamically using JavaScript.

---

# 04. KNOWLEDGE DATABASE STRUCTURE

Use JSON files as the application's static knowledge database.

Create the following files:

assets/data/categories.json

assets/data/knowledge.json

## 4.1 categories.json

Example structure:

[
  {
    "id": "CAT001",
    "name": "Scholarship Information",
    "slug": "scholarship-information",
    "description": "Explore scholarship programs and funding opportunities.",
    "icon": "graduation-cap"
  },
  {
    "id": "CAT002",
    "name": "Application Guide",
    "slug": "application-guide",
    "description": "Learn how to prepare and submit scholarship applications.",
    "icon": "file-text"
  },
  {
    "id": "CAT003",
    "name": "Eligibility & Requirements",
    "slug": "eligibility-requirements",
    "description": "Understand scholarship qualifications and required documents.",
    "icon": "clipboard-check"
  },
  {
    "id": "CAT004",
    "name": "Selection Preparation",
    "slug": "selection-preparation",
    "description": "Prepare for scholarship selection and interviews.",
    "icon": "target"
  },
  {
    "id": "CAT005",
    "name": "Scholarship Experience",
    "slug": "scholarship-experience",
    "description": "Learn from scholarship recipients and their experiences.",
    "icon": "users"
  }
]

## 4.2 knowledge.json

Use the following structure:

[
  {
    "id": "001",
    "title": "Understanding Scholarship Opportunities",
    "slug": "understanding-scholarship-opportunities",
    "categoryId": "CAT001",
    "description": "An introduction to different scholarship programs and opportunities.",
    "keywords": [
      "scholarship",
      "beasiswa",
      "opportunities",
      "funding"
    ],
    "content": {
      "overview": "An introduction to scholarship opportunities for university students.",
      "sections": [
        {
          "heading": "What Is a Scholarship?",
          "body": "Detailed explanation of scholarship programs."
        },
        {
          "heading": "Types of Scholarships",
          "body": "Explanation of different scholarship types."
        }
      ],
      "tips": [
        "Research scholarship providers.",
        "Check eligibility requirements.",
        "Prepare documents early."
      ],
      "notes": "Always verify information through official scholarship providers."
    },
    "source": {
      "name": "Official Reference or Interview Source",
      "type": "Official Website",
      "url": "",
      "dateVerified": ""
    },
    "publishedAt": "2026-11-12"
  }
]

IMPORTANT DATA REQUIREMENTS:

- Use Indonesian as the primary language for knowledge articles.
- Use English for interface labels only where appropriate.
- Every article must have a category.
- Every article must have a source.
- Include relevant keywords for search.
- Use structured content instead of one large text field.
- Support multiple content sections.
- Allow optional external reference URLs.
- Display verification dates for information that changes over time.

Do not invent interview results, personal experiences, or statements from actual sources.

Use clearly labeled sample content during development.

Replace sample content with verified interview findings and reliable references before final submission.

---

# 05. USER INTERFACE AND DESIGN DIRECTION

Design the application as a modern educational knowledge portal.

Design references:

- Modern academic information platforms.
- Editorial-style documentation websites.
- Minimalist knowledge management interfaces.
- Modern education directories.

## 5.1 Visual Identity

Primary direction:
Clean, modern, professional, and accessible.

Suggested color palette:

Primary Navy:
#17365D

Secondary Blue:
#315B88

Background:
#F7F8FA

Surface:
#FFFFFF

Text:
#202B3C

Secondary Text:
#6B7280

Border:
#E5E7EB

Accent:
#E7B75A

Use colors consistently.

## 5.2 Typography

Recommended:
- Inter.
- Plus Jakarta Sans.
- Manrope.

Use clear typographic hierarchy.

Headings should have strong visual distinction.

Body text should prioritize readability.

## 5.3 Layout

Use:
- Consistent navigation.
- Spacious layouts.
- Clear content hierarchy.
- Rounded cards with restrained shadows.
- Consistent spacing.
- Simple icons.
- Responsive grids.
- Clear hover states.
- Visible active navigation states.

Avoid:
- Excessive gradients.
- Excessive animations.
- Too many colors.
- Overly decorative elements.
- Cluttered layouts.
- Unnecessary dashboard aesthetics.

## 5.4 Responsive Design

The website must work on:

- Desktop.
- Laptop.
- Tablet.
- Mobile phone.

Ensure navigation, search, article cards, and content layouts adapt to smaller screens.

---

# 06. PROJECT FILE STRUCTURE

Use this structure:

scholarship-knowledge-base/
│
├── index.html
├── categories.html
├── library.html
├── detail.html
│
├── assets/
│   │
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── app.js
│   │   ├── home.js
│   │   ├── categories.js
│   │   ├── library.js
│   │   ├── detail.js
│   │   └── search.js
│   │
│   ├── data/
│   │   ├── categories.json
│   │   └── knowledge.json
│   │
│   └── images/
│
└── README.md

Keep JavaScript modular and avoid unnecessary code duplication.

Use reusable rendering functions where appropriate.

---

# 07. FUNCTIONAL REQUIREMENTS

The AI agent must ensure all mandatory features work.

| ID | Requirement | Expected Result |
|---|---|---|
| FR-01 | Home Page | Displays website introduction and featured knowledge |
| FR-02 | Categories Page | Displays all knowledge categories |
| FR-03 | Knowledge Library | Displays all available articles |
| FR-04 | Knowledge Detail | Displays complete selected article |
| FR-05 | Search | Finds articles using keywords |
| FR-06 | Category Filtering | Filters articles by category |
| FR-07 | Responsive UI | Works on desktop and mobile |

Additional technical requirements:

1. Load JSON data dynamically using fetch().
2. Handle JSON loading errors.
3. Display loading states where appropriate.
4. Prevent broken navigation.
5. Handle missing article IDs.
6. Escape or safely render user-facing content.
7. Avoid unnecessary JavaScript dependencies.
8. Keep the website functional without a backend.
9. Use relative paths for GitHub Pages compatibility.
10. Ensure all internal links work after deployment.

IMPORTANT:

Because fetch() does not reliably work when opening HTML files directly through file://, instruct the user to run the application through a local development server.

For example:
- VS Code Live Server.
- Python HTTP Server.

The final application must also work through GitHub Pages.

---

# 08. CONTENT REQUIREMENTS

The Knowledge Base must contain meaningful scholarship-related information.

Create initial sample knowledge covering all five categories.

Recommended initial articles:

Scholarship Information:
1. Understanding Scholarship Opportunities.
2. Types of Scholarships Available for University Students.
3. Understanding Fully Funded and Partially Funded Scholarships.

Application Guide:
4. How to Find Suitable Scholarships.
5. Preparing a Scholarship Application.
6. How to Write a Motivation Letter.

Eligibility & Requirements:
7. Understanding Scholarship Eligibility.
8. Common Academic Requirements.
9. Documents Required for Scholarship Applications.

Selection Preparation:
10. Preparing for Scholarship Interviews.
11. Common Scholarship Interview Questions.
12. Common Mistakes During Scholarship Applications.

Scholarship Experience:
13. Lessons from Scholarship Recipients.
14. Challenges During Scholarship Applications.
15. Maintaining Scholarship Eligibility.

CONTENT ACCURACY:

These articles are initial content examples.

The AI agent must not fabricate interview findings.

Use official references when presenting specific scholarship requirements.

Clearly distinguish general guidance, official scholarship information, and interview-based knowledge.

Include source attribution for each article.

---

# 09. DEVELOPMENT PRIORITIES

Follow this implementation order.

PHASE 1. FOUNDATION
- Create project folders.
- Create HTML pages.
- Create global CSS.
- Create JSON data files.
- Establish shared navigation and footer.

PHASE 2. CORE PAGES
- Implement Home.
- Implement Categories.
- Implement Knowledge Library.
- Implement Knowledge Detail.

PHASE 3. CORE FUNCTIONALITY
- Implement JSON loading.
- Implement dynamic article rendering.
- Implement search.
- Implement category filtering.
- Implement related articles.

PHASE 4. UI REFINEMENT
- Improve typography.
- Improve spacing.
- Implement responsive layouts.
- Add loading and empty states.
- Fix navigation and interaction issues.

PHASE 5. TESTING AND DEPLOYMENT
- Test all pages.
- Test search.
- Test category filtering.
- Test article details.
- Test mobile responsiveness.
- Test GitHub Pages compatibility.
- Prepare README documentation.

---

# 10. ACCEPTANCE CRITERIA

The application is considered complete when:

[ ] Home page works.

[ ] Categories page works.

[ ] Knowledge Library displays JSON data.

[ ] Knowledge Detail displays the selected article.

[ ] Search returns relevant results.

[ ] Category filtering works.

[ ] Search and category filtering work together.

[ ] All articles have valid category references.

[ ] Articles display their sources.

[ ] Navigation works across all pages.

[ ] Loading and empty states are implemented.

[ ] Responsive design works.

[ ] No broken internal links.

[ ] No major JavaScript errors.

[ ] Website works on GitHub Pages.

---

# 11. FINAL INSTRUCTIONS TO AI CODING AGENT

Act as a senior frontend developer and UI/UX designer.

Your task is to build the complete Scholarship Knowledge Base application based on this PRD.

Follow these instructions strictly:

1. Read and understand the entire PRD before coding.
2. Use only HTML, CSS, Vanilla JavaScript, and JSON.
3. Do not introduce unnecessary frameworks or backend services.
4. Build all four HTML pages.
5. Implement all seven mandatory academic requirements.
6. Ensure knowledge data comes from JSON files.
7. Make search and category filtering fully functional.
8. Maintain consistent design across every page.
9. Use reusable JavaScript functions.
10. Prioritize functionality, accessibility, and readability.
11. Do not create fake interview results.
12. Do not leave mandatory sections as empty placeholders.
13. Do not stop after generating the homepage.
14. Test all navigation and application functionality.
15. Provide a README containing setup instructions and deployment instructions.

Before finishing, provide:

- Completed project structure.
- List of implemented features.
- Instructions for running locally.
- Instructions for updating JSON knowledge data.
- Instructions for deploying through GitHub Pages.
- Known limitations.

IMPORTANT FINAL DIRECTION:

Build a complete, functional Knowledge Base website, not merely a static visual mockup.

The primary objective is to demonstrate how scholarship-related knowledge can be collected, structured, categorized, searched, and presented to users.

Keep the implementation simple, maintainable, and suitable for an academic group project.