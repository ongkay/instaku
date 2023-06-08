
import { TokenGenerator } from 'totp-generator-ts';

const tokenGen = new TokenGenerator();

const getTotp = (token: string) => {
    const res = tokenGen.getToken(token);
    console.log(res);

    return res

}

export default getTotp