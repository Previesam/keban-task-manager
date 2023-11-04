"use client"

import Button from "@/components/Button";
import { useLoginForm } from "@/context/login-form";
import Link from "next/link";

export default function Login() {
    const {
        formData,
        formErrors,
        formIsValid,
        handleInput,
        resetForm,
        submitLoading,
        submit,
    } = useLoginForm();
    return (
        <main className="w-screen h-screen min-h-screen grid place-items-center">
            <div className="container px-4 mx-auto grid place-items-center">
                <div className="card bg-white dark:bg-gray-800 w-full max-w-[385px] rounded-md p-10">
                    <h4 className="text-xl font-bold mb-4 text-blue-700 dark:text-white">
                        Login
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        Please enter your email and password to login.
                    </p>
                    <div className="form-ctn grid gap-[30px] my-[30px]">
                        <div className="input-ctn">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
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
                                name="password"
                                placeholder="Password"
                                className={formErrors.password ? "error" : ""}
                                value={formData.password}
                                onInput={handleInput}
                            />
                            {formErrors.password && (
                                <p className="error-text">{formErrors.password}</p>
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
                    <Link className="w-fit h-fit" href="/auth/register">
                        <Button className="text-sm font-medium bg-transparent text-blue-700 dark:text-white mt-[10px]">
                            Don't have an account? Sign up
                        </Button>
                    </Link>
                </div>
            </div>

        </main>
    );
}
