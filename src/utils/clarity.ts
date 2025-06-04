import clarity from "@microsoft/clarity";

export const initClarity = () => {
  if (typeof window !== "undefined") {
    clarity.init("rq5qg2xqp4");
  }
};

export { clarity };
