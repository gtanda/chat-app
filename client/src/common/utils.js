const validateUsernameAndPassword = (setErrorMessage, state, dispatch) => {
    const username = state.username.replace(/\s/g, ""); // remove whitespace
    const password = state.password.replace(/\s/g, ""); // remove whitespace

    if (!username || !password) {
        dispatch(setErrorMessage("Username and Password Required"));
        setTimeout(() => {
            dispatch(setErrorMessage(null));
        }, 5000);
        return;
    }
    return { username, password };
};

module.exports = { validateUsernameAndPassword };
