import React from "react";

import "./form.styles.css";

export default function Form() {
  const values = {
    required: undefined,
    not_required: undefined,
    asynchronous: undefined,
    combined1: undefined,
    combined2: undefined,
    nested: {
      a: undefined,
      b: undefined,
    },
  };

  const validationResults = {
    required: undefined,
    not_required: undefined,
    asynchronous: undefined,
    combined1: undefined,
    combined2: undefined,
    nested: {
      a: undefined,
      b: undefined,
    },
  };
  return (
    <div className="container">
      <form className="form" onSubmit={(e, ...args) => console.log("submit", e, ...args)}>
        <h4>Form</h4>
        <div>
          <label htmlFor="required">
            Required* <input id="required" name="required" type="text" required value={values.required} />
          </label>
        </div>
        <div>
          <label htmlFor="not_required">
            Not Required <input id="not_required" name="not_required" type="number" value={values.not_required} />
          </label>
        </div>
        <div>
          <label htmlFor="asynchronous">
            Asynchronus*{" "}
            <input id="asynchronous" name="asynchronous" type="text" required value={values.asynchronous} />
          </label>
        </div>
        <div>
          <label htmlFor="combined1">
            Combined 1* <input id="combined1" name="combined1" type="text" required value={values.combined1} />
          </label>
        </div>
        <div>
          <label htmlFor="combined2">
            Combined 2* <input id="combined2" name="combined2" type="text" required value={values.combined2} />
          </label>
        </div>
        <div>
          <label htmlFor="nested.a">
            Nested.a* <input id="nested.a" name="nested.a" type="text" required value={values.nested.a} />
          </label>
        </div>
        <div>
          <label htmlFor="nested.b">
            Nested.b* <input id="nested.b" name="nested.b" type="text" required value={values.nested.b} />
          </label>
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>

      <div>
        <h4>Values</h4>
        <pre>{JSON.stringify(values, (_: any, value: any) => value ?? `${value}`, 2)}</pre>
      </div>

      <div>
        <h4>Validation</h4>
        <pre>{JSON.stringify(validationResults, (_: any, value: any) => value ?? `${value}`, 2)}</pre>
      </div>
    </div>
  );
}
