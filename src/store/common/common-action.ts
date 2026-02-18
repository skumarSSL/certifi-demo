import { ProjectUrl } from "@/env";
import { commonSetFields } from "./commonSlice";
import { AppDispatch } from "@/store";
const load = require("@cashfreepayments/cashfree-js");

export const CommonSetSessionToken =
  (value: string) => (dispatch: AppDispatch) => {
    dispatch(commonSetFields(value));
  };

export const _cashfreeCheckOut = async (
  session_id: string,
  order_id: string,
  return_url?: string,
) => {
  let paymentOptions = {
    paymentSessionId: session_id,
    returnUrl: return_url
      ? return_url
      : `${ProjectUrl}compose-mail?orderId=${order_id}`,
  };

  const cashfree = await load({
    mode: "sandbox", //or production / sandbox
  });

  cashfree.checkout(paymentOptions).then((result: any) => {
    console.log(result);
  });
};
