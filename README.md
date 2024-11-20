# Basic information about project

Greetings! Thank you for the opportunity to participate in the selection process. Here you can find some information about the things I did and things I did not.


## Important: CORS policy handling

Since the CORS policy is strict on the API server, I used following ways of getting around it: in the development environment Vite is set up to use proxy, and in the production environment Netlify's proxy functions are utilized.


## Scalability

I tended to make this project as much future friendly as possible. I did not find the need to set up the application state using Pinia or some other tool, since the things that could be shared across composable functions, at the moment, would only clutter the App state if one was really necessary for a big app scaling, so I chose to define and pass around some extra parameters and arguments. I pulled all the constants into a single file, adhering to Single Source of Truth and No 'magic numbers' principles.


## Components and composables

I orientated towards creating generic components and composables, which can always backfire and result in trade-of where they are reusable, but less understandable. I am passionate about both approaches, and would in many cases choose to build tightly coupled components or composables. I believe it is important to put a lot of work into contemplating, modeling and refactoring generics into their best version, which these might not be at the moment.


## Optimization

I hold optimization in high regards. In this case I did not find many places to implement it, except evading recursive approaches and setting a very simple request memoization with time revalidation.


## Styling

In this application, styles exist only to make the content slightly more appealing to the eye and to make manual testing more comfortable. Responsiveness of the design has not been tested and has not been focused on, since it has not been specified in the requirements.


## Testing

I strive to implement integration and unit tests into every application I contribute to, but since it was not requested, I skipped it on this occasion, considering time frames, as well. Some things were more important (Unfortunate excuse for many apps in the world). My choices would be Jest (in the case of Vue - Vitest) and Pupeteer, for E2E testing.