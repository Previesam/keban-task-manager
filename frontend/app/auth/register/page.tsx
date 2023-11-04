"use client";

import Button from "@/components/Button";
import { useNotification } from "@/context/notification-context";
import { postRequest } from "@/utils/api";
import { useCookieStorage } from "@/utils/storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import validator from "validator";

const STATIC_FORM = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
};

export default function Register() {
    const navigate = useRouter().push;

    const { set, get } = useCookieStorage();

    const [formData, setFormData] = useState({ ...STATIC_FORM });

    const [formErrors, setFormErrors] = useState({ ...STATIC_FORM });

    const [formIsValid, setFormIsValid] = useState(false);

    function handleInput(e: any) {
        let name = e?.target?.name;
        let val = e?.target?.value;

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
                key == field && (message = "Field is required");
            } else if (data?.[key].length < 3) {
                results[key] = false;
                key == field && (message = "Field must be atleast 3 characters long");
            } else if (key.includes("email") && !validator.isEmail(data?.[key])) {
                results[key] = false;
                key == field && (message = "Invalid email address please check");
            } else if (
                key.includes("password") &&
                !validator.isStrongPassword(data?.[key], {
                    minLength: 6,
                    minLowercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                    minUppercase: 1,
                })
            ) {
                results[key] = false;
                key == field &&
                    (message =
                        "Weak password, should more tha 6 chars long and include at least on of each of uppercase, lowercase, number and symbols");
            } else if (
                key.includes("confirm_password") &&
                data?.password !== data?.confirm_password
            ) {
                results[key] = false;
                key == field && (message = "Password mismatch, please check");
            } else {
                results[key] = true;
                key == field && (message = "");
            }
        }

        setFormIsValid(!Object.values(results).includes(false));

        setFormErrors((prev) => ({ ...prev, [field]: message }));
    }

    function resetForm() {
        setFormData({ ...STATIC_FORM });
        setFormErrors({ ...STATIC_FORM });
        setFormIsValid(false);
    }

    const { showErrorMessage, showSuccessMessage } = useNotification();

    const [submitLoading, setSubmitLoading] = useState(false);

    async function submit() {
        setSubmitLoading(true);
        try {
            const {
                data: { message, data },
            } = await postRequest("/auth/register", formData);
            showSuccessMessage(message);
            navigate("/auth/login");
        } catch (err: any) {
            console.log(err);
            showErrorMessage(
                err?.response?.data?.message ||
                err?.request?.message ||
                err?.message ||
                err ||
                "Unknown error occured"
            );
            if (err?.response?.data?.errors) {
                setFormErrors((prev) =>
                    Object.assign(prev, err?.response?.data?.errors)
                );
                setFormIsValid(false);
            }
        }
        setSubmitLoading(false);
    }
    return (
        <main className="w-screen h-screen min-h-screen grid place-items-center">
            <div className="container px-4 mx-auto grid place-items-center">
                <div className="card bg-white dark:bg-gray-800 w-full max-w-[385px] rounded-md p-10">
                    <h4 className="text-xl font-bold mb-4 text-blue-700 dark:text-white">
                        Register
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        Please enter your details to sign up.
                    </p>
                    <div className="form-ctn grid gap-[30px] my-[30px]">
                        <div className="input-ctn">
                            <input
                                type="text"
                                placeholder="First name"
                                name="first_name"
                                className={formErrors.first_name ? "error" : ""}
                                value={formData.first_name}
                                onInput={handleInput}
                            />
                            {formErrors.first_name && (
                                <p className="error-text">{formErrors.first_name}</p>
                            )}
                        </div>
                        <div className="input-ctn">
                            <input
                                type="text"
                                placeholder="Last name"
                                name="last_name"
                                className={formErrors.last_name ? "error" : ""}
                                value={formData.last_name}
                                onInput={handleInput}
                            />
                            {formErrors.last_name && (
                                <p className="error-text">{formErrors.last_name}</p>
                            )}
                        </div>
                        <div className="input-ctn">
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                className={formErrors.email ? "error" : ""}
                                value={formData.email}
                                onInput={handleInput}
                            />
                            {formErrors.email && (
                                <p className="error-text">{formErrors.email}</p>
                            )}
                        </div>
                        <div className="input-ctn">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className={formErrors.password ? "error" : ""}
                                value={formData.password}
                                onInput={handleInput}
                            />
                            {formErrors.password && (
                                <p className="error-text">{formErrors.password}</p>
                            )}
                        </div>
                        <div className="input-ctn">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="confirm_password"
                                className={formErrors.confirm_password ? "error" : ""}
                                value={formData.confirm_password}
                                onInput={handleInput}
                            />
                            {formErrors.confirm_password && (
                                <p className="error-text">{formErrors.confirm_password}</p>
                            )}
                        </div>
                    </div>
                    <Button
                        className="text-base font-medium"
                        disabled={!formIsValid}
                        loading={submitLoading}
                        onClick={submit}
                    >
                        Login
                    </Button>
                    <Link className="w-fit h-fit" href="/auth/login">
                        <Button className="text-sm font-medium bg-transparent text-blue-700 dark:text-white mt-[10px]">
                            Already have an account? Login
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
