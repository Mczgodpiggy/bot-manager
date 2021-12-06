// Packages
const crypto = require('crypto');
const { Signale } = require('signale');

// Variables
const logger = new Signale({ scope: 'Pool' });
let linkPool = [];

// Functions
// Create a link ID for a user
function createLink(link) {
  const linkID = link
    linkPool.push({
        linkID: link
    });
    logger.info('Created new link ID:', linkID);
    return linkID;
}

// Checks if link ID exists
function isValidLink(linkID) {
    for (let i = 0; i < linkPool.length; i++) if (linkPool[i].linkID == linkID) return true;
    return false;
}

// Remove link
function removeLink(linkID) {
    for (let i = 0; i < linkPool.length; i++) if (linkPool[i].linkID == linkID) delete linkPool[i];
    linkPool = linkPool.filter(n => n);
}

module.exports = {
    isValidLink,
    removeLink,
    createLink,
};