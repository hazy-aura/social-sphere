"use client";

import { useFormStatus } from "react-dom";

function AddPostButton({}) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-500 dark:bg-blue-600 p-2 mt-2 rounded-md text-white disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed hover:bg-blue-600 dark:hover:bg-blue-700"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <div className="inline-block h-[10px] w-[10px] animate-spin rounded-full border-2 border-white-300 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          Sending
        </div>
      ) : (
        "Send"
      )}
    </button>
  );
}

export default AddPostButton;
