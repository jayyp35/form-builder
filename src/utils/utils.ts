export const getFormId = () =>
  `form_${Date.now()}_${Math.random().toString(36).substring(2, 4)}`;

export const emailRegex = new RegExp(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);
