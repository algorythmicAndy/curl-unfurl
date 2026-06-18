# POC universal cURL unpacking, parsing, tokenization and type inferance engine

This was inspired by a spur of the moment thought whilst practicing various methodologies for injesting, error handling,
and outputting normalised api query resolutions.

After some market research, it is clear there are both commercial and open source offerings which do parts of the entire stack
this library could offer, but none are integrated well, nor do they work together.

## Project aim:

Our aim is to produce a bespoke one stop shop, if you like, for fast api onboarding and integration. This will generate infereed 
schema, normalise indeterminate structures, update dyanmic templated definitions which are designed to self review and improve as
APIs inevitably change over time.

The vision is to provide a power tool for engineers to review API mutations and decide on a course of action, being shown how auth,
headers, data response changes and the impact this will have on internal usage, inclusing insofar as middleware and query lifecycle
functions.
