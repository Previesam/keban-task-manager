"use client";

import { useCookieStorage } from "@/utils/storage";
import { createContext, useContext, useState } from "react";

import validator from "validator";
import { useNotification } from "./notification-context";
import { postRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

const STATIC_FORM = {
    email: "",
    password: ""
}

const LoginFormContext = createContext({
    formData: STATIC_FORM,
    formErrors: STATIC_FORM,
    formIsValid: false,
    handleInput: (e: any) => { },
    resetForm: () => { },
    submitLoading: false,
    submit: async () => { }
})

export default function LoginFormProvider({ children }: any) {
    const navigate = useRouter().push;

    const { set, get, remove } = useCookieStorage();

    const [formData, setFormData] = useState({ ...STATIC_FORM })

    const [formErrors, setFormErrors] = useState({ ...STATIC_FORM })

    const [formIsValid, setFormIsValid] = useState(false);

    function handleInput(e: any) {
        let name = e?.target?.name
        let val = e?.target?.value

        let data = { ...formData, [name]: val };

        setFormData(data);

        validateForm(data, name);
    }

    function validateForm(data: any, field: string) {
        let keys = Object.keys(data);
        let results: any = {};
        let message = "";

        for (let key of keys) {
            if (validator.isEmpty(data?.[key])) {
                results[key] = false;
                key == field && (message = "Field is required")
            } else if (data?.[key].length < 3) {
                results[key] = false;
                key == field && (message = "Field must be atleast 3 characters long")
            } else if (key.includes("email") && !validator.isEmail(data?.[key])) {
                results[key] = false;
                key == field && (message = "Invalid email address please check")
            } else {
                results[key] = true;
                key == field && (message = "")
            }
        }

        setFormIsValid(!Object.values(results).includes(false))

        setFormErrors(prev => ({ ...prev, [field]: message }))
    }

    function resetForm() {
        setFormData({ ...STATIC_FORM });
        setFormErrors({ ...STATIC_FORM });
        setFormIsValid(false);
    }

    const { showErrorMessage, showSuccessMessage } = useNotification()

    const [submitLoading, setSubmitLoading] = useState(false);

    async function submit() {
        setSubmitLoading(true)
        try {
            const { data: { message, data } } = await postRequest("/auth/login", formData);
            showSuccessMessage(message);
            set("task-effect:token", data.token);
            set("task-effect:user", data.user);
            navigate(get("task-effect:redirect") || "/");
            remove("task-effect:redirect")
        } catch (err: any) {
            console.log(err)
            showErrorMessage(err?.response?.data?.message || err?.request?.message || err?.message || err || "Unknown error occured");
            if (err?.response?.data?.errors) {
                console.log(err?.response?.data?.errors)
                setFormErrors(prev => Object.assign(prev, err?.response?.data?.errors))
                setFormIsValid(false)
            }
        }
        setSubmitLoading(false)
    }
    return <LoginFormContext.Provider value={{ formData, formErrors, formIsValid, handleInput, resetForm, submitLoading, submit }} >{children}</LoginFormContext.Provider>
}

export function useLoginForm() {
    return useContext(LoginFormContext)
}