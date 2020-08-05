import React from "react";
import { useForm } from "react-hook-form";

import "./form.styles.css";

interface FormValues {
  required: string;
  not_required?: number;
  asynchronous: string;
  combined1: string;
  combined2: string;
  nested: {
    a: string;
    b: string;
  };
}

export default function Form() {
  const { register, handleSubmit, formState, errors, getValues } = useForm<FormValues>({ mode: "onChange" });

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit((values) => console.log("submit", values))}>
        <h4>Form</h4>
        <div>
          <label htmlFor="required">
            Required*{" "}
            <input id="required" name="required" type="text" ref={register({ required: "field is required" })} />{" "}
            {errors.required?.message}
          </label>
        </div>
        <div>
          <label htmlFor="not_required">
            Not Required <input id="not_required" name="not_required" type="number" ref={register} />
            {errors.not_required?.message}
          </label>
        </div>
        <div>
          <label htmlFor="asynchronous">
            Asynchronus*{" "}
            <input
              id="asynchronous"
              name="asynchronous"
              type="text"
              ref={register({
                validate: async (value) => {
                  await sleep(3000);
                  return value === "bla" ? true : `you have to type "bla"`;
                },
              })}
            />
            {errors.asynchronous?.message}
          </label>
        </div>
        <div>
          <label htmlFor="combined1">
            Combined 1*{" "}
            <input id="combined1" name="combined1" type="text" ref={register({ required: "field is required" })} />
            {errors.combined1?.message}
          </label>
        </div>
        <div>
          <label htmlFor="combined2">
            Combined 2*{" "}
            <input id="combined2" name="combined2" type="text" ref={register({ required: "field is required" })} />
            {errors.combined2?.message}
          </label>
        </div>
        <div>
          <label htmlFor="nested.a">
            Nested.a*{" "}
            <input id="nested.a" name="nested.a" type="text" ref={register({ required: "field is required" })} />
            {errors.nested?.a?.message}
          </label>
        </div>
        <div>
          <label htmlFor="nested.b">
            Nested.b*{" "}
            <input id="nested.b" name="nested.b" type="text" ref={register({ required: "field is required" })} />
            {errors.nested?.b?.message}
          </label>
        </div>
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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
