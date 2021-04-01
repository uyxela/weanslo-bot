# weanslo

Discord bot for tracking hackathons

Track list of hackathons to do, hackathons done, and submissions for each

Weanslo list (all)

- list upcoming hackathons (id, name, url, date) by order of date
- lists the hackathon marked 'current' first
- optional argument all lists all hackathons by order of date

Weanslo add <url>

- adds a new hackathon to the list
- parses the url for the title of the hackathon and the deadline

Weanslo remove <id>

- removes the hackathon marked with num

Weanslo set <id> submitted <url>

- sets the hackathon as submitted and adds the submission url to the database entry

Weanslo set <id> current

- sets the hackathon as current
