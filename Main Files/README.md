# Daily Ops Web App Prototype

This workspace contains a first-pass prototype for turning the current Excel-based daily operations schedule into a shared web experience for the team.

## What The Spreadsheet Is Doing Today

The uploaded workbook is functioning as a daily staffing board:

- Team members are listed as rows.
- Time blocks are listed as columns.
- Each time block stores an assignment such as `School Support Queue`, `Tier 2 Phones`, `Calibrations`, `Disputes`, or `OOO/Sick/PTO`.
- Phone coverage is tracked alongside each assignment.
- Supporting context includes manager, shift schedule, and state ownership.

## Proposed MVP

The MVP website should center on one main page: a daily operations board.

### Core features

1. View today's staffing assignments by time block.
2. See who is out and who is covering phones.
3. Filter by manager or assignment.
4. Show quick coverage counts for each queue.
5. Give leads a simple way to update assignments without editing a spreadsheet.

### Suggested pages

1. `Daily Board`
   The primary schedule view for the whole team.
2. `Team Roster`
   Staff details, shift times, managers, and state ownership.
3. `Coverage Summary`
   Totals by queue, phone coverage, and out-of-office status.
4. `Admin`
   Update assignments, time blocks, and queue definitions.

## Files

- `prototype/index.html`: main prototype page
- `prototype/styles.css`: visual design
- `prototype/app.js`: sample data and rendering logic
- `server.py`: local web server and OpenAI planning endpoint

## How To Use

### Static preview

Open `prototype/index.html` in a browser to review the UI without the OpenAI backend.

### OpenAI-powered mode

Run the local server:

```bash
export OPENAI_API_KEY="your_api_key_here"
python3 server.py
```

Then open:

```text
http://127.0.0.1:8000
```

Optional:

```bash
export OPENAI_MODEL="gpt-5.2"
```

In OpenAI-powered mode, chat requests are sent to the OpenAI Responses API and returned as structured plans for review before applying them.

## Recommended Next Build

If this concept fits your workflow, the next implementation step should be a real team app with:

- authentication
- shared database storage
- edit history
- role-based permissions
- mobile-friendly updates

Good stack options:

1. Next.js + Supabase
2. React + Firebase
3. Airtable-style internal tool with a custom frontend
