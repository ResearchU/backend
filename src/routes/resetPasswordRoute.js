import bcrypt from 'bcrypt';
import { getDbConnection } from "../db";

export const resetPasswordRoute = {
    path: '/api/ResearchU/studentProfile/:passwordResetCode/reset-password',
    method: 'put',
    handler: async (req, res) => {
        const { passwordResetCode }  = req.params;
        const { newPassword } = req.body;

        const db = getDbConnection('ResearchU');

        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        const result = await db.collection('studentProfile')
            .findOneAndUpdate({ passwordResetCode }, {
                $set: { passwordHash: newPasswordHash },
                $unset: { passwordResetCode: ''},
            });

        if (result.lastErrorObject.n === 0) return res.sendStatus(404);

        res.sendStatus(200);
    }
}