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