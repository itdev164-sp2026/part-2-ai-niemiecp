# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
**What I asked:**
> (Paste the exact prompt you gave to Copilot Agent Mode)
Look at the existing src/app/page.tsx and src/app/layout.tsx in this project.
Replace the current homepage content with a "Developer Profile" page for me.
It should include:
- My name: Parker Niemiec
- A short bio (1-2 sentences about being a web development student). Write me a bio involving somehow that I am a MATC Student pursuing an Associates degreee in IT Web and Software Developement
- A "Skills" section that displays at least 6 skills in a responsive
  Tailwind CSS grid (use cards with icons from lucide-react)

Keep the existing Header component and layout structure intact.
If you need to create new components, go ahead and create them in
the src/components/ folder.

**What happened:**
> (Describe what the Agent did. Did it understand your intent immediately?
> Did it create the right files? Were there any errors?)
The agent understood my intent immediately creating the right files. The only "error" was that it changed the content of the metadata to reflect the chnages but I don't see any issue with this and moved on. However I noticed a problem with the global.css import on the layout.tsx page, but I already commited my changes so I reverted the changes.
### Prompt 2
**What I asked:**
> (Paste your second prompt — this could be a follow-up correction or
> a completely new request)
My follow up prompt was a copy and paste of the first but in the same chat (I had to make a new chat and it made the program with no issues)
**What happened:**
> (Describe the result. Did you have to "steer" the Agent?
> What did you learn about writing effective prompts?)
I didn't steer the agent per say as I needed to create a new chat as repeating the exact same response after reverting the previous changes led the AI to chnage it differently and in a way that didn't work. I learned that I need to be more direct/precise with my statements when necessary
### Reflection
> Write 2-3 sentences reflecting on the experience. How did it feel
> to direct an AI to build something for you? What surprised you?
> What would you do differently next time?

I enjoyed directing AI to build something for me. Telling what I want AI to code and reviewing it is way more efficient then typing it out and the reviewing it. I think with the smaller sample size request and telling it where information is can greatly speed up the process, this was the suprise to me because I had seen AI used on other projects but the time to implement requests from the agent took longer and so did the reviewing. Next time I will be more thorough and direct with my statements.

-------------------------------------------------------------------------------------------------------

## Activity 2: Building the Dashboard Shell

### Prompt 1

**What I asked:**
> (Paste the main prompt you used to create the dashboard layout)
Using the shadcn sidebar components that are now in my src/components/ui/ folder,
create a professional, collapsible dashboard layout. It should include:

1. A sidebar (src/components/app-sidebar.tsx) with navigation links for:
   - Overview (use the Home icon from lucide-react)
   - Projects (use the FolderOpen icon)
   - Settings (use the Settings icon)

2. A top navigation area with breadcrumbs showing the current page.

3. A main content area that wraps the existing page content.

4. Update src/app/layout.tsx to use the new SidebarProvider and sidebar layout.

Important: Preserve the Developer Profile content from Activity 1 in
src/app/page.tsx — it should appear in the main content area of the new layout.
Keep the dark mode toggle working.

**What happened:**
> (Describe how the Agent handled multiple files. Did it create
> app-sidebar.tsx correctly? Did it modify layout.tsx as expected?)
The Agent handled multiple files well reviewing page and layout to make the necessary changes to layout and create our app-sidebar. Everything was produced as expected.

### Prompt 2

**What I asked:**
> (Paste any follow-up prompt — maybe a responsive fix, a styling
> adjustment, or recovering from an Agent mistake)
I provided the AI with a prompt to fix my global.css. Can you fix the global.css problom/error on ln20 of layout.tsx? I'd like it to stop saying that it can't find it. I don't want to completely overhaul anything though.

**What happened:**
> (Describe the result. Did the Agent fix the issue on the first try?)

The agent seems to have fixed the issue on the first try. I don't see any issues and haven't ran into any yet. Searched just about every file in my repo to determine the issue before applying the necessary changes.

### Reflection

> Did the Agent accidentally delete or overwrite any of your Activity 1
> code? If so, how did you recover? (Copilot Edits has an "Undo" /
> "Revert" button — did you use it?) What did you learn about giving
> the Agent context about existing code you want to preserve?
I had to delete the smaller theme from my app/globals.css not so much the agent deleting or overwriting anything. I have used the revert button... just not during this activity. I learned that AI will not touch existing code that you want to preserve. However, there are some occassions it might make/suggest a minor chnage in one of those files if it's not effecting the outcome of the content in that file.

-------------------------------------------------------------------------------------------------------

## Activity 3: Server-Side Data with Supabase

### Prompt 1

**What I asked:**
> (Paste the prompt you used to generate the projects page)
  Using the Supabase client at src/lib/supabase.ts, create a new Server Component
at src/app/projects/page.tsx that:

1. Fetches all records from the "projects" table in Supabase
2. Displays them in a professional layout using shadcn/ui Card components
   (run `npx shadcn@latest add card` if needed)
3. Each card should show the project title, description, and a status badge
4. The status badge should be color-coded:
   - "active" = green
   - "completed" = blue
   - "archived" = gray

Use @workspace context to match the styling of our existing Dashboard.
This must be a React Server Component (async function, no "use client").
Do NOT use useEffect or useState for data fetching.

**What happened:**
> (Did the Agent create a Server Component or a Client Component?
> Did it use async/await or useEffect? Did you have to correct it?)
The agent created a Server Component. The agent used async/await off the get go and I didn't need to correct it.

### Prompt 2
**What I asked:**
> (Paste any follow-up prompt — fixing a connection error, refactoring
> from useEffect to a Server Component, or adjusting the card layout)
  Get rid of the error check and change "supabaseAnonKey" to "supabaseKey"
**What happened:**
> (Describe the result and what you learned from the exchange)
  The Ai removed the error check it had created and changed the string naming but added ?? "" at the end of both string for createClient. It also failed to add !; to the keys.
### Reflection
> How does fetching data on the server feel different from the useEffect
> pattern you used in Web Programming 1? What are the advantages you
> noticed? Did anything surprise you about how simple server-side
> data fetching is in the App Router?
It felt a lot more efficient, both the setup and execution. Any changes are nearly istant.