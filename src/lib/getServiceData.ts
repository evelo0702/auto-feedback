export const getServiceData = async (categoryCode: number) => {
  let url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/service?code=${categoryCode}`;
  try {
    let res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Service Network response was not ok");
    }
  } catch (err) {
    console.error(err);
  }
};
