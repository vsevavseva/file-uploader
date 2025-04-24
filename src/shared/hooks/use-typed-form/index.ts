import { FormikConfig, FormikValues, useFormik } from 'formik';

type UseFormikReturn<T extends FormikValues> = ReturnType<typeof useFormik<T>>;
type UseFormikConfig<T> = FormikConfig<T>;

export const useTypedForm = <Values extends FormikValues>(config: UseFormikConfig<Values>): UseFormikReturn<Values> => {
    const formik= useFormik<Values>({
        initialValues: config.initialValues,
        validationSchema: config.validationSchema,
        onSubmit: config.onSubmit,
    });

    return {...formik};
}