import { useCallback } from "react";
import { Schema } from "@hapi/joi";
import { Resolver } from "react-hook-form";
import set from "lodash.set";

const emptyResolver: Resolver<any, object> = (values: any) => ({ values, errors: {} });

function createResolver<TFieldValues>(schema: Schema): Resolver<TFieldValues, object> {
  return async (data: TFieldValues) => {
    const { error, value: values } = schema.validate(data, {
      abortEarly: false,
    });

    return {
      values: error ? {} : values,
      errors: error
        ? error.details.reduce((errors, { message, path }) => set({ ...errors }, path.join("."), { message }), {})
        : {},
    };
  };
}

/*const validationSchema = Joi.object({
  rezeptTyp: Joi.string().required(),
  gebuehrenfrei: Joi.boolean(),
  gebuehrenpflichtig: Joi.boolean(),
  versicherter: Joi.object({
    vorname: Joi.string().alphanum().min(3).max(30).required(),
    nachname: Joi.string().alphanum().min(3).max(30).required(),
    adresse: Joi.object({
      strasse: Joi.string().alphanum().min(3).max(30).required(),
      hausnummer: Joi.string().alphanum().min(1).max(10).required(),
    }).required(),
  }).required(),
});*/

export function useResolver<TFieldValues>(schema?: Schema): Resolver<TFieldValues, object> {
  const resolver = useCallback(schema ? createResolver(schema) : emptyResolver, [schema]);

  return resolver;
}
