import puppeteer from 'puppeteer';
import jwt from 'jsonwebtoken';
import { LoginData } from '../models/loginModel'; 

export const loginService = {
    login: async (username: string, password: string): Promise<string> => {
        const successURL = 'https://sigaa.uffs.edu.br/sigaa/portais/discente/discente.jsf';
        
        const browser = await puppeteer.launch({ headless: true }); 
        const page = await browser.newPage();
        await page.goto('https://sigaa.uffs.edu.br', { timeout: 60000 }); 
        
        await page.waitForSelector('input[name="user.login"]', { timeout: 60000 }); 
        await page.type('input[name="user.login"]', username);
        await page.waitForSelector('input[name="user.senha"]', { timeout: 60000 }); 
        await page.type('input[name="user.senha"]', password);
        
        await page.$eval('input[type="submit"][value="Entrar"]', (button: any) => button.click());
        
        await page.waitForNavigation({ timeout: 60000 });
        
        const isLoggedIn = page.url() === successURL;
        
        if (isLoggedIn) {
            const token = jwt.sign({ username }, 'secreto202');
            await browser.close();
            return token;
        } else {
            await browser.close();
            throw new Error('Credenciais inválidas');
        }
    }
};
