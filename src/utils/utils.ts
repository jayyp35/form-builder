export const getFormId = () =>
  `form_${Date.now()}_${Math.random().toString(36).substring(2, 4)}`;
