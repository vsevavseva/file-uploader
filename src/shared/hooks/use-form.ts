import {Form} from 'antd';
import {useState} from 'react';

type ErrorField = {
    name: string[];
    errors: string[];
};

export type FormErrors<T> = {
    values: T;
    errorFields: Array<ErrorField>;
    outOfDate: boolean;
};

type UseFormProps = {
    defaultDirty?: boolean;
    defaultDisabled?: boolean;
};

/** Абстрактный хук, расширяющий useForm из antd функционал валидации */
export function useForm<T>({defaultDirty = false, defaultDisabled = true}: UseFormProps) {
    const [form] = Form.useForm<T>();
    const [disabled, setDisabled] = useState(defaultDisabled);
    const [dirty, setDirty] = useState(defaultDirty);
    const [errors, setErrors] = useState<FormErrors<T> | null>(null);

    const onValuesChange = () => {
        if (!dirty) {
            setDirty(form.isFieldsTouched());
        }

        form
            .validateFields({validateOnly: true})
            .then(() => {
                setDisabled(false)
            })
            .catch((errorInfo: FormErrors<T>) => {
                const disabled = Boolean(errorInfo.errorFields.length);
                console.log(errorInfo)
                setDisabled(disabled);
                setErrors(errorInfo);
            });
    };

    const resetForm = (
        params: Partial<{ resetDisabled: boolean; resetDirty: boolean }> = {
            resetDisabled: false,
            resetDirty: true,
        },
    ) => {
        form.resetFields();
        params?.resetDisabled && setDisabled(true);
        params?.resetDirty && setDirty(false);
    };

    return {
        form,
        disabled,
        dirty,
        errors,
        onValuesChange,
        resetForm,
    };
}
