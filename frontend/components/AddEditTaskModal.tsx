"use client";
import { cloneElement, useEffect, useState } from "react";
import Button from "./Button";
import Icon from "./Icon";
import { useCookieStorage } from "@/utils/storage";
import { useRouter } from "next/navigation";
import validator from "validator";
import { useNotification } from "@/context/notification-context";
import { patchRequest, postRequest } from "@/utils/api";

const STATIC_FORM = {
    details: "",
    deadline: "",
};

export default function AddEditTaskModal({ children, data, onSuccess }: any) {
    const [show, setShow] = useState(false);

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
                data: { message, data: resp },
            } = data?.id
                    ? await patchRequest("/tasks/" + data?.id, formData)
                    : await postRequest("/tasks", formData);
            showSuccessMessage(message);
            close();
            onSuccess && onSuccess(resp?.task);
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
                console.log(err?.response?.data?.errors);
                setFormErrors((prev) =>
                    Object.assign(prev, err?.response?.data?.errors)
                );
                setFormIsValid(false);
            }
        }
        setSubmitLoading(false);
    }

    function close() {
        setFormData({ ...STATIC_FORM });
        setFormErrors({ ...STATIC_FORM });
        setShow(false);
    }

    useEffect(() => {
        if (data) {
            let form = {
                details: data?.details,
                deadline: data?.deadline?.substring(0, 10),
            };
            setFormData(form);
            validateForm(form, "details");
            validateForm(form, "deadline");
        }
    }, [show]);
    return (
        <>
            {show && (
                <div
                    className="fixed top-0 left-0 h-screen w-screen max-h-screen overflow-y-auto animate-in fade-in fade-out bg-gray-950/20 grid place-items-center"
                    id="add-task-modal"
                >
                    <div className="container px-4 mx-auto grid place-items-center">
                        <div className="bg-white rounded-lg w-full max-w-[387px] p-8 relative">
                            <button
                                className="w-fit h-fit absolute top-6 right-6"
                                onClick={close}
                            >
                                <Icon
                                    icon="mdi:close-circle"
                                    className="text-2xl text-inherit"
                                />
                            </button>
                            <h4 className="text-lg font-bold mb-3 text-blue-700 dark:text-white">
                                {data?.id ? "Edit " : "Add "} task
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                {data?.id ? "Update " : "Enter "} task details and deadline.
                            </p>
                            <div className="form-ctn grid gap-[20px] my-[30px]">
                                <div className="input-ctn">
                                    <textarea
                                        placeholder="Details"
                                        rows={3}
                                        name="details"
                                        className={formErrors?.details ? "resize-none error" : "resize-none"}
                                        value={formData.details}
                                        onInput={handleInput}
                                    ></textarea>
                                    {formErrors.details && (
                                        <p className="error-text">{formErrors.details}</p>
                                    )}
                                </div>
                                <div className="input-ctn">
                                    <input
                                        type="date"
                                        name="deadline"
                                        className={formErrors?.deadline ? "error" : ""}
                                        value={formData.deadline}
                                        onInput={handleInput}
                                    />
                                    {formErrors.deadline && (
                                        <p className="error-text">{formErrors.deadline}</p>
                                    )}
                                </div>
                            </div>
                            <Button className="text-sm font-medium mb-4" disabled={!formIsValid} loading={submitLoading} onClick={submit}>{data?.id ? "Update" : "Save"}</Button>
                        </div>
                    </div>
                </div>
            )}
            {cloneElement(children, { onClick: () => setShow(!show) })}
        </>
    );
}
