import { Resend } from "resend";
import { ENV } from "../utils/env.js";
export const resendClient=new Resend(ENV.RENDER_API_KEY)
export const sender={
    email:ENV.EMAIL_FROM,
    name:ENV.EMAIL_FROM_NAME
}