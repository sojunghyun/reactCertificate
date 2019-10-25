import express from 'express';
import User from '../schemas/user';

const router = express.Router();

router.get('/', async (req, res, next) => {
    res.json([{
        id: 1,
        name: "Kim"
    }]);
    // const users = await User.find({});
    // res.json(users);
});

export default router;