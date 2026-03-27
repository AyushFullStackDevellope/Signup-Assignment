export function getNextStep(user) {
  if (!user) {
    return { path: "error", message: "Invalid credentials" };
  }

  const instituteCount = user.institutes.length;
  const roleCount = user.roles.length;

  if (instituteCount === 0) {
    return { path: "no-institute", message: "Not associated with any institute" };
  }

  if (instituteCount === 1 && roleCount === 1) {
    return { path: "dashboard" };
  }

  if (instituteCount === 1 && roleCount > 1) {
    return { path: "select-role" };
  }

  if (instituteCount > 1 && roleCount === 1) {
    return { path: "select-institute" };
  }

  if (instituteCount > 1 && roleCount > 1) {
    return { path: "select-institute" };
  }

  return { path: "error" };
}