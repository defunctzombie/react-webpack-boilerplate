import { NotFound } from 'httperrors';

export default function(req, res, next) {
  next(NotFound());
}
