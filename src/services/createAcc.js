export const createAccount = async (userInfo, rejected) => {
  const user = { user: { username: userInfo.username, email: userInfo.email, password: userInfo.password } };
  try {
    const singUpRequest = await fetch('https://blog-platform.kata.academy/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!singUpRequest.ok) {
      throw new Error('error in signUpRequest');
    }
    const succesRegistration = await singUpRequest.json();
    return succesRegistration;
  } catch (error) {
    return rejected(error);
  }
};

export const enterAccount = async (userInfo, rejected) => {
  const user = { user: { email: userInfo.email, password: userInfo.password } };
  try {
    const signInRequest = await fetch('https://blog-platform.kata.academy/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!signInRequest.ok) {
      throw new Error('error in signInRequest');
    }
    const successSignIn = await signInRequest.json();
    return successSignIn;
  } catch (error) {
    return rejected(error);
  }
};

export const editProfile = async (userInfo, rejected) => {
  try {
    const user = {
      user: {
        email: userInfo.email,
        password: userInfo.password,
        username: userInfo.username,
        image: userInfo.avatar,
        token: userInfo.token,
      },
    };
    const editProfileRequest = await fetch('https://blog-platform.kata.academy/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${userInfo.token}` },
      body: JSON.stringify(user),
    });
    if (!editProfileRequest.ok) {
      throw new Error('error in editProfileRequest');
    }
    const successEdition = editProfileRequest.json();
    return successEdition;
  } catch (error) {
    return rejected(error);
  }
};