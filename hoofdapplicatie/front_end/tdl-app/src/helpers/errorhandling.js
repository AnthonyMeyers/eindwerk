//Function to check for invalid registration values
export function errorhandlingreg(context, variable) {
  const regExp = /^[A-Za-z0-9\s.ç'_,]*$/;
  const regExpMail = /\S+@\S+\.\S+/;

  if (context === "register-username") {
    if (variable.length < 6) {
      return "The username is to short";
    }
    if (variable.length >= 20) {
      return "The username is to long";
    }
    if (!regExp.test(variable)) {
      return "The username may not contain any special signs";
    }
    return null;
  }
  if (context === "register-password") {
    if (variable.length < 6) {
      return "The password is to short";
    }
    if (variable.length >= 20) {
      return "The password is to long";
    }

    return null;
  }

  if (context === "register-email") {
    if (!regExpMail.test(variable)) {
      return "Invalid email address";
    }

    return null;
  }

  if (context === "register-agreed") {
    if (variable === false) {
      return "Please confirm the user agreement.";
    }
    return null;
  }
}

//Function to check server response & login verification
export function errorhandlinglogin(statuscode) {
  const responses = {
    401: "Username or password incorrect",
  };

  return responses[statuscode] || "Server is unavailable";
}

//Function to check todo page
export function errorhandlingtodos(context, variable) {
  const regExp = /^[A-Za-z\s._']*$/;

  if (context === "todo-title") {
    if (variable.length <= 2) {
      return "Todo to short to add.";
    }
    if (variable.length > 22) {
      return "Todo to long to add.";
    }
    if (!regExp.test(variable)) {
      return "Invalid characters";
    }

    return null;
  }
  return null;
}

//Function to check appointments page
export function errorhandlingappointments(context, variable) {
  const regExp = /^[A-Za-z\s_.']*$/;

  if (context === "appointment-title") {
    if (variable.length <= 3) {
      return "To short to add.";
    }
    if (variable.length > 22) {
      return "To long to add.";
    }
    if (!regExp.test(variable)) {
      return "Invalid characters";
    }

    return null;
  }
  return null;
}

//Function to check contacts page
export function errorhandlingcontacts(context, variable) {
  const regExp = /^[A-Za-z\s.ç'_,]*$/;
  const regExpStreet = /^[A-Za-z0-9\s.']*$/;
  const regExpPostal = /^[A-Za-z0-9\s]*$/;
  const regExpMail = /\S+@\S+\.\S+/;

  if (context === "contact-title") {
    if (variable.length <= 3) {
      return "To short to add.";
    }
    if (variable.length > 22) {
      return "To long to add.";
    }
    if (!regExp.test(variable)) {
      return "Invalid characters";
    }

    return null;
  }

  if (context === "contact-details") {
    const { name, tel, street, postal, city, mail } = variable;

    if (name.length <= 2) {
      return "Name is to short.";
    }

    if (name.length > 22) {
      return "Name is to long.";
    }

    if (!regExp.test(name)) {
      return "Name has Invalid characters";
    }

    if (tel) {
      if (tel.length > 15) {
        return "Phonenumber to long";
      }

      if (tel.length != 0 && tel.length < 9) {
        return "Phonenumber to short";
      }
    }

    if (street) {
      if (street.length > 0 && street.length <= 6) {
        return "The streetname is to short.";
      }
      if (street.length > 40) {
        return "The streetname is to long.";
      }

      if (!regExpStreet.test(street)) {
        return "street has Invalid characters";
      }
    }

    if (postal) {
      if (postal.length > 10) {
        return "Postal code to long";
      }

      if (postal.length != 0 && postal.length < 4) {
        return "Postal code to short";
      }

      if (!regExpPostal.test(postal)) {
        return "Invalid postal code characters";
      }
    }
    if (city) {
      if (city.length != 0 && city.length <= 3) {
        return "City name to short";
      }

      if (city.length > 22) {
        return "City name to long";
      }

      if (!regExp.test(city)) {
        return "City has Invalid characters";
      }
    }

    if (mail) {
      if (mail.length > 0 && !regExpMail.test(mail)) {
        return "Invalid email address";
      }
    }
  }

  return null;
}
