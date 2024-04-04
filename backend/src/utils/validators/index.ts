import * as yup from 'yup';

export const validateRequest = async (body: any, rules: any) => {
    try {
        const schema = yup.object().shape(rules);
        await schema.validate(body, { abortEarly: false });

        return { isValid: true, error: { message: '', status: 200, data: [] } };
    } catch (error: any) {
        return {
            isValid: false,
            error: { message: error?.errors?.join('; '), status: 400, data: [] },
        };
    }
};
