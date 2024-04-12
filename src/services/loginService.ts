
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import puppeteer from 'puppeteer';

dotenv.config();

class LoginService {

    private readonly successURL = 'https://sigaa.uffs.edu.br/sigaa/portais/discente/discente.jsf';
    private readonly successURLNotice = 'https://sigaa.uffs.edu.br/sigaa/telaAvisoLogon.jsf';
    private readonly continueButtonSelector = '#j_id_jsp_933481798_1 > div > input[type=submit]:nth-child(1)';
    private readonly SECRET_KEY = process.env.SECRET_KEY || 'defaultSecretKey';


    public async login(username: string, password: string): Promise<any> {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
    
        try {
            await page.goto('https://sigaa.uffs.edu.br', { timeout: 60000 });
            await page.waitForSelector('input[name="user.login"]', { timeout: 60000 });
            await page.type('input[name="user.login"]', username);
            await page.waitForSelector('input[name="user.senha"]', { timeout: 60000 });
            await page.type('input[name="user.senha"]', password);
    
            await Promise.all([
                page.waitForNavigation({ timeout: 60000 }),
                page.$eval('input[type="submit"][value="Entrar"]', button => button.click()),
            ]);
    
            let isLoggedIn = [this.successURL, this.successURLNotice].includes(page.url());
    
            if (isLoggedIn && page.url() === this.successURLNotice) {
                await Promise.all([
                    page.waitForNavigation({ timeout: 60000 }),
                    page.click(this.continueButtonSelector),
                ]);
                isLoggedIn = page.url() === this.successURL;
            }
    
            if (isLoggedIn) {
                const userInfo = await page.evaluate(() => {
                    // Ajuste a função cleanText para aceitar string, null ou undefined
                    const cleanText = (text: string | null | undefined) => {
                        if (text === null || text === undefined) return '';  // Retorna uma string vazia se o texto for null ou undefined
                        return text.replace(/\s+/g, ' ').trim();  // Limpa o texto como antes
                    };
                
                    // Uso da função cleanText com valores que podem ser string, null, ou undefined
                    const nome = cleanText(document.evaluate('//*[@id="perfil-docente"]/p[1]/span/small/b', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue?.textContent);
                    const matricula = document.evaluate('//*[@id="agenda-docente"]/table/tbody/tr[1]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue?.textContent;
                    const curso = cleanText(document.evaluate('//*[@id="agenda-docente"]/table/tbody/tr[2]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue?.textContent);
                    const nivel = cleanText(document.evaluate('//*[@id="agenda-docente"]/table/tbody/tr[3]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue?.textContent);
                    const status = cleanText(document.evaluate('//*[@id="agenda-docente"]/table/tbody/tr[4]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue?.textContent);
                    const email = cleanText(document.evaluate('//*[@id="agenda-docente"]/table/tbody/tr[5]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue?.textContent);
                    const entrada = cleanText(document.evaluate('//*[@id="agenda-docente"]/table/tbody/tr[6]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue?.textContent);
                    const integralizacao = cleanText(document.evaluate('//*[@id="agenda-docente"]/table/tbody/tr[10]/td/table/tbody/tr[6]/td', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue?.textContent);
                
                    return { nome, matricula, curso, nivel, status, email, entrada, integralizacao};
                });
                
                
    
                const token = jwt.sign({ username }, this.SECRET_KEY);
                return { token, userInfo }; 
            } else {
                throw new Error('Credenciais inválidas ou falha na navegação');
            }
        } catch (error) {
            console.error(`Erro durante o login: ` );
            throw new Error('Erro durante o processo de login');
        } finally {
            await browser.close();
        }
    }
    

    
}

export const loginService = new LoginService();
