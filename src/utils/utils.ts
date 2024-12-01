export type ApiResponceType = {
  status: number;
  response: string;
};

export const parseErrorToJson = (error: ApiResponceType): string => {
  if (error.response) {
    return JSON.parse(error.response).reason;
  }

  return "Что то пошло не так!";
};

export const parseApiResponceToJson = <T>(props: ApiResponceType): T =>
  ({
    ...props,
    response: JSON.parse(props.response),
  }) as T;
