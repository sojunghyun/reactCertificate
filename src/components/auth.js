// const users = [
//     { email: '1', name: '1' }
//   ]
  
  export function signIn({ email, name }) {
    const user = { email, name };
    if (user === undefined) throw new Error();
    console.log('로그인 성공!');
    return user;
  }