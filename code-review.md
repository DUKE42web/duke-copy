# Code Review:

## [Code Reviews](https://confluence.duke-energy.com/display/DEPW/Code+Reviews)

- Created by Anonymous, last modified on [Oct 08, 2020](https://confluence.duke-energy.com/pages/diffpagesbyversion.action?pageId=77499805&selectedPageVersions=3&selectedPageVersions=4)

"Everybody is junior at something", or so they say. You may be fairly early on in your career but have some experience working in a large enterprise or business where structured Code Reviews were the order of the day. Or you may have many years experience on a loose team that didn't really take Code Review very seriously. Thus, you may find that while you are a senior developer, you are "junior" (I honestly hate that term) when it comes to Code Reviews, and vice versa. Whatever the case, Ninja Turtles values Code Review. _Let's talk about it._

The purpose of this document is to create a discussion from which we may create a kind of Working Agreement around Code Review on Ninja Turtles. It sets out to do so by addressing the following:

- The current state of our code review process
- Suggestions about moving forward
- How to improve at Code Reviews and PRs in general

### State of the Code Review

The way that Ninja Turtles does Code Review is pretty much exclusively via Pull Requests; if you are a developer on Ninja Turtles, this is where most of your feedback will come from. At present, the most experienced of our team does most of the Code Review, and indeed it sometimes seems as though every PR is reviewed by 1 or 2 people, one of whom approves the PR before it is merged. Put simply, it's sort of the exemplification of the [80/20 rule](https://en.wikipedia.org/wiki/Pareto_principle) in action. For the purposes of this conversation, I will refer to the ones doing _most_ of the reviewing as "the 20%" (following the adage that 80% of the work is done by 20% of the team) and the devs that are doing less of the reviewing as "the 80%". Obviously this is not exact, but you get the idea.

The goal should be to get all developers to the point where they're contributing (and receiving) a more equitable share of Code Review, rather than the current 80/20 divide.

### Why Improve Code Review?

As noted above, Ninja Turtles is a team that benefits from a diversity of experience levels, but the natural consequence of this is that the developers with the most knowledge and experience with code review (the 20%) end up doing most of the code review. This stands to reason, and is actually quite normal, and probably beneficial. But it can be taxing for those devs doing the lion's share of the reviewing. It is a knife that cuts both ways; while those experienced devs may begin to feel resentment that the responsibility rests on them, the other devs feel inadequate, that they're not pulling their weight, or that they aren't given a fair chance to review before the stuff in their wheelhouse is "taken". Thus, everyone gets further entrenched in their respective roles. This is not great, but it's a problem that won't solve itself. It will require action as a team (more on this later).

But beyond that, there are several compelling reasons for us to improve on our Code Reviews.

1. From a development standpoint, Code Review is the least expensive way to catch mistakes.
2. Code Review provides opportunities to spread domain knowledge across the team, thereby preventing a complete reliance on trickle-down economics, er, knowledge.
3. Code Reviews can provide opportunities to learn, mentor, and teach.
4. Code Review builds a stronger foundation of trust or something

> "Effectiveness of code review for determining faults in software is between 30% and 35% more effective than standard unit testing"
>
> - Steve McConnell, Code Complete

So, we understand the value of Code Review and we see a need to improve, but exactly how do we improve them?

### Going Forward

I did a lot of reading and consulted some mentors to arrive at some of these conclusions. I will provide the resources I consulted below; I found them to be quite useful, and I encourage all who are interested to review them. After this, I propose a few changes. I will lay them out here and my hope is we can have a conversation about which changes we would like to adopt going forward and thus create something of a "Working Agreement" surrounding Code Reviews.\
Doing so obviously won't cause a miraculous change overnight, but I think implementing some of these suggestions is a good first step toward moving away from the 80/20 divide described above and getting everyone on the same level.

#### General suggestions:

- With two approvals now required to on a PR, perhaps it would make sense to rotate a more senior reviewer with a less senior reviewer or two (this would fall inline with guidelines I've seen) and let them tackle it independently. Ideally, they are both able to approve or provide feedback to the dev until they are ready to approve, but if not, after a certain period of time, the devs could come together and talk about why they are not feeling comfortable approving the PR.
- Maybe we should define our [style guide](https://confluence.duke-energy.com/display/DEPW/Styleguide) a little bit more clearly (currently, it has exactly one entry ) and we should definitely set up linting to enforce some of the simple things, such as consistent formatting. Devs should not be pushing up code that has completely preventable errors and reviewers should not be wasting precious cognitive energy on simple errors that can be caught by computers
- Consider limiting how much code you will look at, at least in one sitting; looking at code you didn't write for a long time can be exhausting. You might consider timeboxing your reviews to one hour and come back later if there's more you feel that needs to be done, or you may set a line count of around 200-400 lines before taking a break and doing something else for awhile.

#### Things to think about and maybe discuss:

- Expecting someone to get better at code reviews by simply looking at someone else's code just isn't a very good or efficient methodology. (See Jim Bird's article below). What can we do bridge that gap in a more proactive way? Perhaps some kind of structured "pair reviewing"?
- I touched on this above but another thing that Jim Bird suggests is keeping the number of reviewers small. In the long run, I see the value in having all the devs swarm it and knocking out a PR, but in the shorter term, it might make sense to slow down and focus on the quality over quantity and getting all devs up to around the same contribution level?

#### For the 20% currently doing 80% of the reviewing:

- Consider **alternating PRs.** Maybe everyone doesn't need to look at every PR, but a few people look at different ones?
  - Not sure what this would look like, but I'm sure it's doable.
- **Step back.** Don't be the first to review. Give some space to let some of the other devs (the 80%) step up. This will hopefully take a bit of the pressure off of you and lets the 80% leave the kind of feedback that may be easier for them to recognize as they level up their Code Review game.
  - This may mean that we add a Bitbucket integration to Slack or Teams (if that's available) or when a new PR is submitted, the submitter alerts the team
- Be specific when answering questions. Answering a question about how or why something works with a block of code will solve the problem, but it doesn't help the asker understand the issue any better. A link to an article or MDN can be sufficient.

#### For the 80%:

- [**Have an algorithm/checklist**](https://confluence.duke-energy.com/display/DEPW/Code+Review+Checklist) for things you want to review. Below you'll find an overview of the kinds of things to look for.
- **Step up.**
- If we implement the changes suggested above, you will have some room to make some suggestions early on. But having the 20% step back only works if the 80% step up.
- **Ask questions.** Even in PRs. Questions like "Why are we doing it like this?" or "I'm having trouble understanding this block of code, can you explain it to me?" are totally valid within a PR. Doing it in the PR creates a paper trail of the conversation. If you've reviewed the code and you don't have feedback but you also don't feel you can approve the PR, it might be an indication that you need to ask more questions.
- Ask to **pair with somebody** more experienced at reviewing code. You can get a feel for their process and ask questions about how they approach Code Reviews and spot things.
- Don't underestimate the value of the input of someone with less context. Having anyone that isn't you review your code is helpful, because we all get myopic about our own code and can miss things that are really obvious to a fresh perspective.

---

Sources:

[https://www.javacodegeeks.com/2014/08/dont-waste-time-on-code-reviews.html](https://www.javacodegeeks.com/2014/08/dont-waste-time-on-code-reviews.html)

[https://www.youtube.com/watch?v=EXoSuqIp6Ns\&feature=youtu.be](https://www.youtube.com/watch?v=EXoSuqIp6Ns&feature=youtu.be)

[http://amlyhamm.com/talks/code-reviews/#/](http://amlyhamm.com/talks/code-reviews/#/)

[https://www.braintreepayments.com/blog/effective-pull-requests-a-guide/](https://www.braintreepayments.com/blog/effective-pull-requests-a-guide/)
