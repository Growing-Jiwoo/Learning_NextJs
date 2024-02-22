"use server";

import { redirect } from "next/navigation";

export const onSubmit: any = async (
  prevState: { message: string | null },
  formData: FormData
) => {
  if (!formData.get("id")) {
    return { message: "no_id" };
  }
  if (!formData.get("name")) {
    return { message: "no_name" };
  }
  if (!formData.get("password")) {
    return { message: "no_password" };
  }
  if (!formData.get("image")) {
    return { message: "no_image" };
  }

  let shouldRedirect = false;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "post",
        body: formData,
        credentials: "include",
      }
    );
    console.log(response.status);
    if (response.status === 403) {
      return { message: "user-exists" };
    }
    console.log(await response.json());
    shouldRedirect = true;
  } catch (error) {
    console.error(error);
    return;
  }

  if (shouldRedirect === true) {
    redirect("/home");
  }
};
