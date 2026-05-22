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

-------------------------------------------------------------------------------------------------------

## Activity 4: AI-Driven Forms & Validation

### Prompt 1
**What I asked:**
> (Paste the prompt you used to create the Zod schema)
Create a Zod validation schema in a new file src/lib/schemas.ts for a "Project"
with the following fields:

- title: string, minimum 3 characters, with a custom error message
  "Title must be at least 3 characters"
- description: string, minimum 10 characters, with a custom error message
  "Description must be at least 10 characters"
- status: enum with values "active", "completed", "archived"

Export the schema and also export the inferred TypeScript type using z.infer.

**What happened:**
> (Did the Agent create the schema correctly? Did it export both
> the schema and the inferred type?)
The agent created the schema correctly and exports both the schema and the inferred TypeScript type using z.infer.

### Prompt 2
**What I asked:**
> (Paste the prompt you used to generate the form and Server Action)
Using the Zod schema from src/lib/schemas.ts, do the following:

1. Create a form component at src/components/project-form.tsx that:
   - Is a Client Component ("use client") because it uses react-hook-form hooks
   - Uses react-hook-form with the zodResolver from @hookform/resolvers for validation
   - Uses shadcn/ui Field, FieldLabel, and FieldError for field layout
   - Uses shadcn/ui Input for title, Textarea for description, and Select for status
   - Shows inline error messages under each field when validation fails
   - Has a "Create Project" submit button
   - Shows a sonner toast notification on successful submission

2. Create a Server Action at src/app/actions.ts that:
   - Has "use server" at the top of the file
   - Accepts the validated form data
   - Validates it again with the Zod schema (server-side validation)
   - Inserts the validated data into the Supabase "projects" table
   - Returns a success or error response

3. Create a new page at src/app/projects/new/page.tsx that renders
   the project form within the dashboard layout.

4. Add a "New Project" button to the existing projects page
   (src/app/projects/page.tsx) that links to /projects/new.

Use @workspace to match the existing project styling.

**What happened:**
> (How did the Agent handle creating multiple files? Did it connect
> the form submission to the Server Action correctly? Did it include
> server-side Zod validation?)
The agent handled it well and it connected the form submission to the Server Action correctly. However it did not include the server-side Zod Validation which was then fixed with the follow up prompt pasted below.

    The Server Action should validate the form data with the Zod schema
    before inserting into Supabase. Never trust client-side validation alone —
    always re-validate on the server. Add projectSchema.safeParse() to the
    action and return an error if validation fails.

### Prompt 3 (if applicable)
**What I asked:**
> (Any follow-up prompt — fixing notifications, adding server-side
> validation, or correcting form field behavior)
Can you add <Toaster /> to layout.tsx? I've already made the proper import. This is so we can see the toast notification when we create a new project

**What happened:**
> (Describe the result)
### Reflection
The agent inserted <Toaster /> properly and notfications now work.

> How does the Schema-First approach with Zod change the way you think
> about forms? How does it help prevent "junk data" from entering the
> database? Compare this to how you handled form validation in
> previous courses.

Makes me like form creation a little more. It helps prevent "junk data" by validation before insertion.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Activity 5: Securing the App with Supabase Auth

### Prompt 1
**What I asked:**
> (Paste the main prompt you used for the full auth implementation)
Implement a complete email/password authentication flow for this Next.js 15
App Router project using @supabase/ssr. Here is what I need:

1. SUPABASE CLIENTS: Create server-side Supabase client utilities in
   src/lib/supabase/ that work correctly with Next.js cookies. I need
   separate clients for Server Components, Server Actions, and Middleware.

2. LOGIN PAGE: Create a page at src/app/(auth)/login/page.tsx with a
   shadcn/ui card-based login form. It should support both "Sign In"
   and "Sign Up" (toggle between them or use tabs). Handle the auth
   via Server Actions, not client-side fetch.

3. MIDDLEWARE: Create a middleware.ts file at src/middleware.ts (next to
   the app directory — Next.js looks for middleware as a sibling of app)
   that:
   - Refreshes the user's auth session on every request
   - Protects the /projects routes — redirect unauthenticated users to /login
   - Allows unauthenticated access to /login
   - Uses supabase.auth.getUser() (NOT getSession()) for verification

4. SIGN OUT: Add a "Sign Out" button to the existing sidebar component
   (src/components/app-sidebar.tsx) that calls a Server Action to sign
   the user out and redirect to /login. The button must only render
   when an authenticated user is present — pass the user as a prop from
   the root layout (which will need to fetch it via the server Supabase
   client) and gate the Sign Out UI on that prop.

5. UPDATE DATA QUERIES: Modify the projects page and the create-project
   Server Action to use the authenticated Supabase client so that RLS
   policies filter data per user.

Use @workspace to understand the existing project structure. Do not remove
or break existing functionality — integrate auth around it.

**What happened:**
> (How many files did the Agent create or modify? Did it handle
> middleware, login page, sign out, and data scoping all in one pass?)

The agent created 6 files and modified 5 for a total of 11 total. The agent was able to handle all the changes in one pass with no issues.

### Prompt 2
**What I asked:**
> (Paste any follow-up — fixing the redirect after login, correcting
> getSession vs getUser, handling middleware route matching, etc.)
None

**What happened:**
> (Describe the fix and what you learned)
N/A

### Reflection
> How did the Agent handle the creation of middleware.ts? Did you have
> to manually add files to the Working Set for context? What surprised
> you about how many files needed to change to add authentication?
> How does middleware-based auth compare to checking login status
> inside each page component?f

The agent handled the creation well, it created the middleware.ts ater working on the Supabase SSR CLient Utilities, Authenication Schema & Actions, and the Login Page. I did not have to manually add any files. I was suprised that we modified just about as many files as we created despite implementing new features/objects. From personal experience, middleware auth is easier because I only have to check login in one place. Checking inside each page works, but it gets repetitive and easier to forget on some pages. Middleware feels cleaner because it blocks users before the page loads.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Activity 6: Deployment, Webhooks, & AI-Testing

### Prompt 1
**What I asked:**
> (Paste the prompt you used to generate the Playwright tests)
I have a Next.js app with Supabase Auth. Using @workspace context to
understand the app structure, write an End-to-End (E2E) test file at
tests/auth.spec.ts using Playwright.

The tests should verify:

1. LOGIN PAGE VISIBLE: Navigate to /login and confirm the login form
   is visible (check for email input, password input, and submit button).

2. REDIRECT AFTER LOGIN: After a successful login with valid credentials,
   the user is redirected to the dashboard or projects page.

3. SIDEBAR NAVIGATION: After login, verify that the sidebar navigation
   links are visible: "Overview", "Projects", and "Settings".

Requirements:
- Use role-based locators (getByRole, getByLabel, getByText) instead of
  CSS selectors or test IDs. This makes tests more accessible and resilient
  to UI changes.
- Add clear test descriptions that explain what each test verifies.
- Handle the async nature of navigation and page loads with proper
  Playwright waiting strategies.
- Read test credentials from process.env.TEST_USER_EMAIL and
  process.env.TEST_USER_PASSWORD. Do not hardcode credentials. If those
  variables are not set, the credentialed tests should skip with a clear
  message rather than fail.

**What happened:**
> (Did the Agent use role-based locators? Did it understand the auth
> flow from your workspace context? Did the tests pass on the first run?)
The agent successfully used role-based locators but failed to understand some of the flow causing a lot of the tests to fail. The test did not pass on the first run


### Prompt 2
**What I asked:**
> (Paste the prompt you used to fix a failing test, or a follow-up
> to improve test coverage)
This Playwright test is failing with the following error:
◇ injected env (0) from .env.local // tip: ⌘ suppress logs { quiet: true }
  ✘  1 tests\auth.spec.ts:21:9 › Authentication Flow › 1. LOGIN PAGE VISIBLE › should display the login page with email, password inputs and submit button (5.9s)

Look at the actual component code in @workspace and fix the test
to match the real UI. Use role-based locators.


**What happened:**
> (Describe the iterative process — how many rounds did it take
> to get the tests passing?)
It failed twice. I was able to get it the after the second time.


### Reflection
> How does having an AI write and run tests change your confidence in
> "hitting the deploy button"? Did the Agent catch anything you would
> have missed? How does this compare to manually testing in the browser?
Having AI write and run tests boosts my confidence because I'm still monitoring the proccesses and can always do it myself if I don't trust it. I usually catch things the agent misses, or maybe that's all I noticed. This is better than manual testing, way less repetitive on the developers end and less "annoying" in comparison.


### Course Reflection
> Look back at your complete PROMPTS.md from Activity 1 to Activity 6.
> How has your prompting strategy evolved? What do you do differently
> now compared to your first prompt in Activity 1? What is the most
> important thing you learned about working with AI coding tools?

My prompts felt more direct and to the point with new topics being started in new chats versus one long running chat where the agent will eventually get confused. AI coding tools are greats tools for expediting your work flow and allowing you to better focus your brain power on tasks.