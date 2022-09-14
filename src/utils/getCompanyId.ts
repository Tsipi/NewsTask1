export const getCompanyId = () => {
  const url = new URL(window.location.href);
  const companyId = url.searchParams.get("companyId") as string;
  if (!companyId) {
    console.error("Company ID query string is missing");
  }
  return companyId;
};
