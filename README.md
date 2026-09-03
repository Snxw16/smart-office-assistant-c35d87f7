# Smart Office Assistant

Build the initial version of a modern SaaS web application called Smart Office Assistant.

This is an AI-powered office productivity workspace with three core capabilities:

Meeting Assistant

Research Assistant

AI Chat

The goal of this first phase is to build the complete frontend application structure and polished UI only. Do not implement the AI, database, authentication, web search, or other backend functionality yet.

1. BRAND & PRODUCT IDENTITY

Application name:

Smart Office Assistant

The product should feel like a professional, intelligent and trustworthy office productivity platform.

Use the name "Smart Office Assistant" consistently throughout the application.

Create a simple, modern visual identity suitable for a professional SaaS product.

The design should communicate:

Intelligence

Productivity

Simplicity

Professionalism

Trust

Modern technology

Avoid making the application look like a generic ChatGPT clone.

2. APPLICATION LAYOUT

Create a responsive application shell with:

Desktop

Fixed left sidebar

Main content area

Clean top/header area where appropriate

Mobile

Collapsible navigation

Responsive content

Mobile-friendly cards, forms and chat interface

The sidebar should contain:

Smart Office Assistant

Navigation:

Dashboard

Meeting Assistant

Research Assistant

AI Chat

Saved

Settings

Clearly show the currently active section.

Include a user/profile area at the bottom of the sidebar as a placeholder.

3. DASHBOARD

Create a polished dashboard.

At the top display:

Welcome to Smart Office Assistant

Supporting text:

Your intelligent workspace for meetings, research and everyday productivity.

Then display:

What would you like to do?

Create three attractive capability cards.

Meeting Assistant

Icon: meeting/document-related icon

Title:
Meeting Assistant

Description:
Summarize meetings, extract decisions and identify action items.

Button:
Start Meeting

Research Assistant

Icon: search/research-related icon

Title:
Research Assistant

Description:
Research topics, compare information and organize findings with sources.

Button:
Start Research

AI Chat

Icon: chat/AI-related icon

Title:
AI Chat

Description:
Chat with your AI assistant, ask questions, brainstorm and analyze information.

Button:
Start Chat

Make these three cards visually consistent but subtly distinguishable.

Below the cards, create a:

Recent Activity

section containing placeholder items for:

Recent meeting summaries

Recent research

Recent AI conversations

Include an attractive empty state when there is no activity.

4. MEETING ASSISTANT PAGE

Create the frontend page for the Meeting Assistant.

Header:

Meeting Assistant

Description:

Turn your meeting notes and transcripts into clear summaries, decisions and actionable tasks.

Create a large input workspace.

Include:

Large text area with placeholder:
"Paste your meeting notes or transcript here..."

Upload button:
Upload Notes

Supported file types displayed as placeholder text:
"PDF, DOCX, TXT"

Primary button:
Summarize Meeting

Create a section below called:

Recent Meeting Summaries

Show an empty state if no summaries exist.

Important: Do not connect any AI functionality yet.

5. RESEARCH ASSISTANT PAGE

Create the frontend page for Research Assistant.

Header:

Research Assistant

Description:

Explore topics, analyze information and organize research with reliable sources.

Create a large research input area.

Placeholder:

What would you like to research?

Primary button:

Start Research

Create a small research settings area with placeholder options such as:

Research depth

Source preferences

Date range

These controls can be visual placeholders for now.

Below this, create:

Recent Research

Show an attractive empty state when there is no research.

Important: Do not connect web search or AI functionality yet.

6. AI CHAT PAGE

Create a modern AI chat interface.

The page should contain:

Left conversation panel

New Chat button

Search conversations

Conversation history

Empty state when there are no conversations

Main chat area

When no conversation exists, display:

How can I help you today?

Supporting text:

Ask questions, brainstorm ideas, analyze information or get help with your work.

Show a few example prompts such as:

"Summarize this document"

"Help me prepare for a meeting"

"Research this topic"

"Draft a professional email"

At the bottom create the message composer:

Text input

Attachment button

Send button

Placeholder:

Message Smart Office Assistant...

Include visual loading and error states as placeholders.

Do not connect an AI API yet.

7. SAVED PAGE

Create a unified Saved section.

Header:

Saved

Description:

Access your saved meetings, research and conversations in one place.

Create category/filter controls:

All

Meetings

Research

Conversations

Include search functionality visually.

Create an empty state when nothing has been saved.

8. SETTINGS PAGE

Create a professional Settings page.

Sections:

Profile

Name

Email

Profile picture placeholder

AI Preferences

Response style

Preferred response length

Other AI preferences

Notifications

Email notifications

Product notifications

Appearance

Theme selector

Security

Password/security placeholder

Do not implement account authentication or security functionality yet.

9. DESIGN SYSTEM

Use a premium modern SaaS aesthetic.

Design characteristics:

Clean typography

Generous spacing

Rounded cards

Subtle borders

Modern icons

Professional navigation

Clear hierarchy

Excellent empty states

Smooth hover states

Subtle transitions

Consistent buttons

Consistent form elements

Responsive layouts

Do not overuse gradients, excessive shadows, animations or decorative elements.

The application should look credible enough to be presented as a real professional software product.

10. COMPONENT STRUCTURE

Create reusable components for:

Sidebar

Header

Capability cards

Buttons

Input fields

Text areas

Empty states

Loading states

Error states

Search

Filters

Chat messages

File upload area

Page headers

Keep the three core capabilities modular so their backend functionality can be added later without redesigning the application.

11. NAVIGATION

Make all navigation functional between:

Dashboard
Meeting Assistant
Research Assistant
AI Chat
Saved
Settings

The buttons on the dashboard should navigate to their corresponding sections.

12. IMPORTANT — DO NOT BUILD THESE YET

This is Phase 1 only.

Do NOT implement:

OpenAI API

Any AI API

Web search APIs

Supabase

Authentication

Database

User registration/login

Document processing

Audio transcription

Billing

Subscriptions

Payment systems

We will add these in separate phases.

13. IMPORTANT LOVABLE INSTRUCTION

Do not unnecessarily add features that were not requested.

Do not rebuild or introduce unnecessary architecture for backend services.

Focus on creating a polished, responsive and modular frontend foundation for Smart Office Assistant.

Before finishing, verify that:

All navigation works

Dashboard cards navigate correctly

All pages load correctly

Desktop layout works

Mobile layout works

Buttons have appropriate states

Empty states are polished

There are no obvious UI errors

The application consistently uses the name "Smart Office Assistant"

Build this as a clean foundation that we can progressively turn into a fully functional AI application in later phases.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/956fe769-cee4-41df-a6d5-20532474dcbe).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
