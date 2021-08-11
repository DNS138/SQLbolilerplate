import expressJoiValidation from 'express-joi-validation';
export const validator = expressJoiValidation.createValidator({
    passError: true}
);

