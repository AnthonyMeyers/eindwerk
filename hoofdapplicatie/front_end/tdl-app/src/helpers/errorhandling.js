//Function to check for invalid registration values
export function errorhandlingreg(context, variable)
{
    const regExp = /^[A-Za-z0-9]*$/;
    const regExpMail = /\S+@\S+\.\S+/;

    if(context === "register-username")
    {
        if(variable.length < 6)
        {
            return "The username is to short";
        }
        if(variable.length >= 20)
        {
            return "The username is to long";
        }
        if(!regExp.test(variable))
        {
            return "The username may not contain any special signs"
        }
    return null;
    }
    if(context === "register-password")
    {
        if(variable.length < 6)
        {
            return "The password is to short";
        }
        if(variable.length >= 20)
        {
            return "The password is to long";
        }

        return null;
    }

    if(context === "register-email")
    {
        if(!regExpMail.test(variable))
        {
            return "Invalid email address"
        }

        return null;
    }

    if(context === "register-agreed"){
        if(variable === false)
        {
            return "Please confirm the user agreement."
        }
        return null
    }
}

//Function to check server response & login verification
export function errorhandlinglogin(statuscode)
{

    const responses = 
    {
        401: "Username or password incorrect"
    }


    return responses[statuscode] || "Server is unavailable";
}

//Function to check todo page
export function errorhandlingtodos(context, variable)
{
    const regExp = /^[A-Za-z0-9\s]*$/;

    if(context === "todo-title")
    {   console.log(variable);
        if(variable.length <= 2)
        {
            return "To short to add.";
        }
        if(variable.length > 30)
        {
            return "To long to add."
        }
        if(!regExp.test(variable))
        {
            return "Invalid characters"
        }

        return null
    }
    return null;

}