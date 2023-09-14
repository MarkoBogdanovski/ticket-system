
#  Ticket System

#### How to run project
1. Open project directory and run following command:
`docker compose up --build`
2. Open postman and import collection located in the project directory
`testing.postman_collection.json`
3. Use the saved endpoints to test functionality

When docker is initiated the Users table is seeded with 4 users.

#### 1. Creating New Tickets
Creating more than 4 tickets using Create new Ticket endpoint without resolving any of them, all new tickets will be unassigned.

#### 2. Assigning tickets
Assigning tickets using Asssign Ticket endpoint will fetch the list of available agents and depending on the number of available agents it will fetch the list of unresolved tickets.
Then it will loop through the list of agents, update their availability and assign them a ticket.

#### 3. Resolving tickets
Resolving ticket using Resolve Ticket endpoint will automatically assign unassigned and unresolved ticket to the agent that was assigned the ticket that's being resolved. If there are no unresolved tickets, the agent will be marked as available, else, he will be assigned with a new ticket.
