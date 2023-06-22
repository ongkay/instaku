
import { TokenGenerator } from 'totp-generator-ts';


const getTotp = (token: string) => {
    const tokenGen = new TokenGenerator({
        period: 30,

    });
    const res = tokenGen.getToken(token);
    console.log(res);

    return res

}

export default getTotp