"use client";

import { useFormStatus } from "react-dom";

function UpdateButton(){
    const {pending} = useFormStatus();
    return (
        <button className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white p-2 mt-2 rounded-md disabled:bg-opacity-50 disabled:cursor-not-allowed transition-colors" disabled={pending}>
            {pending ? "Updating..." : "Update"}
        </button>
        
    );
};

export default UpdateButton;