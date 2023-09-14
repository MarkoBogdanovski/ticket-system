const express = require('express'); //import express
const router  = express.Router();
const ticketController = require('../controllers/ticket');

// Route for creating a new ticket
router.post('/api/tickets', ticketController.newTicket);

// Route for assigning a ticket to an available support agent
router.post('/api/assign-ticket', ticketController.assignTicket);

// Route for resolving a ticket
router.put('/api/resolve-ticket/:ticketId', ticketController.resolveTicket);

module.exports = router; // export to use in server.js
