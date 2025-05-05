const express = require('express');
const router = express.Router();
const { assignClient, getClientsForTrainer, deleteCoachingRequest, getTrainerForClient } = require('../controllers/coachingController');

router.post('/assign', assignClient); 
router.get('/:id/clients', getClientsForTrainer);
router.delete('/:trainerId/:clientId', deleteCoachingRequest); 
router.get('/client/:clientId/trainer', getTrainerForClient);



module.exports = router;




