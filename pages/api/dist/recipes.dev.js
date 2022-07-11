"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handler;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
function handler(req, res) {
  var response, recipes_list;
  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/recipes"));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          recipes_list = _context.sent;
          res.json(recipes_list);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}