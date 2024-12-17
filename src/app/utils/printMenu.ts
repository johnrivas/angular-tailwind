export const printMenu = (mainMenu: any[], roles : string[]) : any[] =>
{
  return mainMenu
  .map((item) => {
    const hasPermission = item.permission.some((p: string) => roles.includes(p));
    if (item.items) {
      const filteredItems = printMenu(item.items, roles);
      if (filteredItems.length > 0) {
        return { ...item, items: filteredItems };
      }
    }
    return hasPermission ? { ...item } : null;
  })
  .filter((item) => item !== null);
}
