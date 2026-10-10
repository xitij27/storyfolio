- The latency result is 200 ms to 120 ms at the 95th percentile, meaning the
  time within which 95% of requests in that test finished. That is 40%, not
  60%. It was a replay benchmark for one endpoint, not measured production
  traffic. We have no customer outcome figure for it.
- Six engineers delivered the migration. I designed how repeat requests are
  recognised through idempotency keys and wrote the replay verifier. I was
  not the architect of the whole migration.
- parcelcheck: two merged patches and a regression test. I did not create
  it and I am not a maintainer. The public patches can be linked.
- Harrowfin's traces and diagrams cannot be published. I can draw a new
  example using invented requests if it is labelled illustrative. There is
  no public screenshot or source dump to use.
- I want a senior backend role, with an engineering manager able to see
  exactly which decisions and tests were mine. The call to action is email.
- My daily artifacts are design proposals, event sequences and regression
  tests. I care about what happens when a request arrives twice.
- There is no old site, testimonial, award or extra usage figure to add.
