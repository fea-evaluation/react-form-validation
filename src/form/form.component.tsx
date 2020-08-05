import React from "react";

export default function Form() {
  return (
    <form onSubmit={(e, ...args) => console.log("submit", e, ...args)}>
      <div>
        <label htmlFor="required">
          Required* <input id="required" type="text" required />
        </label>
      </div>
      <div>
        <label htmlFor="not_required">
          Not Required <input id="not_required" type="number" />
        </label>
      </div>
      <div>
        <label htmlFor="asynchronous">
          Asynchronus* <input id="asynchronous" type="text" required />
        </label>
      </div>
      <div>
        <label htmlFor="combined1">
          Combined 1* <input id="combined1" type="text" required />
        </label>
      </div>
      <div>
        <label htmlFor="combined2">
          Combined 2* <input id="combined2" type="text" required />
        </label>
      </div>
      <div>
        <label htmlFor="nested.a">
          Nested.a* <input id="nested.a" type="text" required />
        </label>
      </div>
      <div>
        <label htmlFor="nested.b">
          Nested.b* <input id="nested.b" type="text" required />
        </label>
      </div>
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
}
