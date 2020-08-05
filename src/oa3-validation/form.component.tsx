import React from "react";
import { useForm } from "react-hook-form";

import { prescription } from "./schema/typings/prescription";

import "../form/form.styles.css";

export default function Form() {
  const { handleSubmit, formState, errors, getValues } = useForm<prescription>({ mode: "onChange" });

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit((values) => console.log("submit", values))}>
        <h4>Form</h4>

        <div>
          <button type="submit">submit</button>
        </div>
      </form>

      <div>
        <h4>State</h4>
        <pre>{JSON.stringify(formState, (_: string, value: any) => value ?? `${value}`, 2)}</pre>
      </div>

      <div>
        <h4>Values</h4>
        <pre>{JSON.stringify(getValues(), (_: string, value: any) => value ?? `${value}`, 2)}</pre>
      </div>

      <div>
        <h4>Errors</h4>
        <pre>
          {JSON.stringify(errors, (key: string, value: any) => (key === "ref" ? undefined : value ?? `${value}`), 2)}
        </pre>
      </div>
    </div>
  );
}
