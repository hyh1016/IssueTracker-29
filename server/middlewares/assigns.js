const db = require('../models/connection');
const { CREATE_ASSIGNS, READ_ASSIGNS_BY_ID, DELETE_ASSIGNS } = require('../models/query');

const createAssigns = async (req, res) => {
  const { issueID } = req.params;
  const userID = req.user.id;
  if (!issueID) {
    return res.status(403).json({ success: false, message: '없는 이슈입니다.' });
  }
  await db(CREATE_ASSIGNS, [userID, issueID]);
  return res.status(200).json({ success: true });
};

const readAssignsById = async (req, res) => {
  const { issueid: issueID } = req.params;
  const result = await db(READ_ASSIGNS_BY_ID, [issueID]);

  return res.status(200).json({ success: true, result });
};

const deleteAssigns = async (req, res) => {
  const { assignsID } = req.params;

  await db(DELETE_ASSIGNS, [assignsID]);
  return res.status(200).json({ success: true });
};

module.exports = { createAssigns, readAssignsById, deleteAssigns };