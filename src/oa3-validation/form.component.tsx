import React from "react";
import { FieldError, useForm } from "react-hook-form";

import { useResolver } from "./schema/use-resolver";
import { useSchemas } from "./schema/use-schemas";
import { prescription } from "./schema/typings/prescription";

import "../form/form.styles.css";

export default function Form() {
  const schemas = useSchemas();
  const resolver = useResolver<prescription>(schemas?.prescription);
  const { handleSubmit, formState, errors, getValues, register } = useForm<prescription>({
    mode: "all",
    resolver,
  });

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit((values) => console.log("submit", values))}>
        <h4>Rezept</h4>

        <div>
          <label htmlFor="rezeptTyp">
            rezeptTyp
            <input id="rezeptTyp" name="rezeptTyp" type="text" ref={register} />
            {(errors.rezeptTyp as FieldError | undefined)?.message}
          </label>
        </div>

        <div>
          <label htmlFor="gebuehrenfrei">
            gebuehrenfrei
            <input id="gebuehrenfrei" name="gebuehrenfrei" type="checkbox" ref={register} />
            {errors.gebuehrenfrei?.message}
          </label>
        </div>

        <div>
          <label htmlFor="gebuehrenpflichtig">
            gebuehrenpflichtig
            <input id="gebuehrenpflichtig" name="gebuehrenpflichtig" type="checkbox" ref={register} />
            {errors.gebuehrenpflichtig?.message}
          </label>
        </div>

        <h5>Versicherter</h5>

        <div>
          <label htmlFor="versicherter.vorname">
            vorname
            <input id="versicherter.vorname" name="versicherter.vorname" type="text" ref={register} />
            {errors.versicherter?.vorname?.message}
          </label>
        </div>

        <div>
          <label htmlFor="versicherter.nachname">
            nachname
            <input id="versicherter.nachname" name="versicherter.nachname" type="text" ref={register} />
            {errors.versicherter?.nachname?.message}
          </label>
        </div>

        <h6>Adresse</h6>

        <div>
          <label htmlFor="versicherter.adresse.strasse">
            strasse
            <input id="versicherter.adresse.strasse" name="versicherter.adresse.strasse" type="text" ref={register} />
            {errors.versicherter?.adresse?.strasse?.message}
          </label>
        </div>

        <div>
          <label htmlFor="versicherter.adresse.hausnummer">
            hausnummer
            <input
              id="versicherter.adresse.hausnummer"
              name="versicherter.adresse.hausnummer"
              type="text"
              ref={register}
            />
            {errors.versicherter?.adresse?.hausnummer?.message}
          </label>
        </div>

        <div>
          <button type="submit">submit</button>
        </div>
      </form>

      <div>
        <h4>Errors</h4>
        <pre>
          {JSON.stringify(errors, (key: string, value: any) => (key === "ref" ? undefined : value ?? `${value}`), 2)}
        </pre>
      </div>

      <div>
        <h4>State</h4>
        <pre>{JSON.stringify(formState, (_: string, value: any) => value ?? `${value}`, 2)}</pre>
      </div>

      <div>
        <h4>Values</h4>
        <pre>{JSON.stringify(getValues(), (_: string, value: any) => value ?? `${value}`, 2)}</pre>
      </div>
    </div>
  );
}
