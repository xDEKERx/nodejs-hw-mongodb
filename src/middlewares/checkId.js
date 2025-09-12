import createHttpError from 'http-errors';

import { ContactsCollection } from '../db/models/contacts.js';

export const checkId = async (req, res, next) => {
  const { user } = req;
  const { contactId } = req.params;

  if (!user) {
    next(createHttpError(401));
    return;
  }

  const contact = await ContactsCollection.findOne({
    _id: contactId,
    userId: user._id,
  });

  if (contact) {
    next();
    return;
  }

  next(createHttpError(403));
};