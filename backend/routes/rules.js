const express = require('express');
const router = express.Router();
const parseRule = require('../utils/parseRule');
const combineRules = require('../utils/combineRules');
const evaluateRule = require('../utils/evaluateRule');
const Rule = require('../models/Rule');


function preprocessRuleString(ruleString) {
  
  ruleString = ruleString.replace(/\bAND\b/g, '&&').replace(/\bOR\b/g, '||');
 
  ruleString = ruleString.replace(/(\w+)\s*=\s*('[^']*'|\d+)/g, '$1 == $2');
  
  ruleString = ruleString.replace(/(\))\s*(\()/g, '$1 && $2');

  return ruleString;
}




router.post('/create', async (req, res) => {
  try {
    let { ruleString, name } = req.body;

    ruleString = preprocessRuleString(ruleString);

    console.log('Preprocessed rule string:', ruleString);

    const rootNode = parseRule(ruleString);

    if (!rootNode) {
      return res.status(400).json({ error: 'Failed to parse rule string' });
    }

    const newRule = new Rule({ name, ruleString, root: rootNode });

    await newRule.save();

    res.status(200).json(newRule);
  } catch (error) {
    console.error('Error in create_rule endpoint:', error);
    res.status(500).json({ error: error.message });
  }
});


router.post('/combine', async (req, res) => {
  try {
    const { ruleIds, name } = req.body;

    const rules = await Rule.find({ _id: { $in: ruleIds } });

    const rootNodes = rules.map(rule => rule.root);
    const ruleStrings = rules.map(rule => rule.ruleString);

    const { root: combinedRoot, ruleString: combinedRuleString } = combineRules(rootNodes, ruleStrings);

    const combinedRule = new Rule({
      name,
      root: combinedRoot,
      ruleString: combinedRuleString,
    });

    await combinedRule.save();


    res.status(200).json(combinedRule);
  } catch (error) {
    console.error('Error combining rules:', error);
    res.status(400).json({ error: error.message });
  }
});


router.post('/evaluate', async (req, res) => {
  try {
    const { ruleId, data } = req.body;
    const rule = await Rule.findById(ruleId);

    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }

    const result = evaluateRule(rule.root, data);
    res.status(200).json({ result });
  } catch (error) {
    console.error('Error evaluating rule:', error);
    res.status(400).json({ error: error.message });
  }
});


router.put('/update/:id', async (req, res) => {
  try {
    let { ruleString } = req.body;

    ruleString = preprocessRuleString(ruleString);

    const rootNode = parseRule(ruleString);

    if (!rootNode) {
      return res.status(400).json({ error: 'Failed to parse rule string' });
    }

    const updatedRule = await Rule.findByIdAndUpdate(
      req.params.id,
      { ruleString, root: rootNode },
      { new: true }
    );

    if (!updatedRule) {
      return res.status(404).json({ error: 'Rule not found' });
    }

    res.status(200).json(updatedRule);
  } catch (error) {
    console.error('Error updating rule:', error);
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const rules = await Rule.find();
    res.status(200).json(rules);
  } catch (error) {
    console.error('Error fetching rules:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
