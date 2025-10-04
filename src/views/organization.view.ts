import { IOrganization } from "../models/organization.model";

export const formatOrganizationsOutput = (
  organizations: IOrganization[] | null
) => {
  if (!organizations) return [];
  return organizations.map((org) => ({
    _id: org._id,
    name: org.name,
    status: org.status,
    mobileNumber: org.mobileNumber,
    createdAt: org.createdAt,
    district: org.district,
    state: org.state,
    country: org.country,
  }));
};
