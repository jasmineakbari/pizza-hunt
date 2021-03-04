const router = require('express').Router();
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router
    .route('/:pizzaId')
    .post(addComment);

// /api/comments/<pizzaId>/<commentId>
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);

// deleting route needs a new route since you need to the id of the Reply and 
// not the parent
router
    .route('/:pizzaId/:commentId/:replyId')
    .delete(removeReply);

module.exports = router;