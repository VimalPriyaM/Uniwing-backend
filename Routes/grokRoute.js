const { Router } = require('express');
const router = Router();
const { summarize } = require('../Controller/grokController');

router.post('/summarize', summarize);

module.exports = router;
