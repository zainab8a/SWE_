const CoachingRequest = require('../models/CoachingRequest');
const User = require('../models/User');

const assignClient = async (req, res) => {
  const { trainerId, clientEmail } = req.body;

  try {
    const client = await User.findOne({ email: clientEmail, role: 'user' });
    if (!client) return res.status(404).json({ message: 'Client not found' });

    const existing = await CoachingRequest.findOne({ trainer: trainerId, client: client._id });
    if (existing) return res.status(400).json({ message: 'Request already exists' });

    const newRequest = new CoachingRequest({ trainer: trainerId, client: client._id });
    await newRequest.save();

    res.status(201).json({ message: 'Trainer assigned to client successfully' });
  } catch (err) {
    console.error('Error assigning client:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getClientsForTrainer = async (req, res) => {
    try {
      const trainerId = req.params.id;
  
      // Get all coaching requests for this trainer
      const requests = await CoachingRequest.find({ trainer: trainerId }).populate('client');
      
      const clients = requests.map(req => req.client);
      res.status(200).json(clients);
    } catch (err) {
      console.error('Error fetching coaching clients:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };


  const deleteCoachingRequest = async (req, res) => {
    try {
      const { trainerId, clientId } = req.params;
      await CoachingRequest.findOneAndDelete({ trainer: trainerId, client: clientId });
      res.status(200).json({ message: 'Client removed successfully' });
    } catch (err) {
      console.error('Error deleting client:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Get the trainer a user is registered with
  const getTrainerForClient = async (req, res) => {
    try {
      const clientId = req.params.clientId;
      const request = await CoachingRequest.findOne({ client: clientId, status: 'approved' }).populate('trainer');
      if (!request) {
        return res.status(404).json({ message: 'No approved trainer found' });
      }
      res.status(200).json(request.trainer);
    } catch (err) {
      console.error('Error getting trainer for client:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { assignClient, getClientsForTrainer, deleteCoachingRequest, getTrainerForClient };
