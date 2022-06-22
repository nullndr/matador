import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  throw redirect("/matador");
};
