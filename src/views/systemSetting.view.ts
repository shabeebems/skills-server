import { ISystemSetting } from "../models/systemSetting.model";

export const formatSystemSettingOutput = (system: ISystemSetting | null) => {
  if (!system) return null;
  return {
    systemCode: system.systemCode,
    values: system.values,
  };
};
