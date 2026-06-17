import express from 'express'

const routerUser = express.Router();

router.post('/', Users.create)
router.post('auth/login', Users.login);

export default routerUser;
