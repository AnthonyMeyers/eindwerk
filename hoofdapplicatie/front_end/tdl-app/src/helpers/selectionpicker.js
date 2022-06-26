export function pickFromSelection(list = [], listitem = null, context) {
  if (list.length > 0 && listitem != null) {
    return list.reduce((toSelect, listing) => {
      return listing.id === listitem.id ? listing : toSelect;
    }, null);
  } else if (listitem.length > 0) {
    return list[Math.floor(Math.random() * list.length)];
  }
  return list[0];
}

export function switchNextSelection(list = [], listitem = null, context) {
  if (listitem && list.length > 0) {
    const maxId = list[list.length - 1].id;
    let isFound = false;
    if (listitem.id >= maxId) {
      return list[0];
    }
    if (listitem.id < maxId) {
      const subject = list.reduce((selected, listing) => {
        if (listing.id > listitem.id && !isFound) {
          isFound = true;
          return listing;
        }

        return selected;
      }, null);
      return subject;
    }
  }
  return list[0] || null;
}
