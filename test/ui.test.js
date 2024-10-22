const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using Selenium', function() {
    this.timeout(30000); // Set timeout for Mocha tests

    let driver;
});
// Inisialisasi WebDriver sebelum menjalankan test case
before(async function() {
    driver = await new Builder().forBrowser('chrome').build(); // Bisa diganti 'firefox' untuk Firefox
});

// Tutup WebDriver setelah semua test selesai
after(async function() {
    await driver.quit();
});

it('should load the login page', async function() {
    await driver.get('C:/Users/ASUS/Documents/semester 5/PPML/ui-testing-selenium/test/login.html'); // Ubah path sesuai lokasi file login.html
    const title = await driver.getTitle();
    expect(title).to.equal('Login Page');
});

it('should input username and password', async function() {
    await driver.findElement(By.id('username')).sendKeys('testuser');
    await driver.findElement(By.id('password')).sendKeys('password123');

    const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
    const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');

    expect(usernameValue).to.equal('testuser');
    expect(passwordValue).to.equal('password123');
});

it('should click the login button', async function() {
    await driver.findElement(By.id('loginButton')).click();
    // Lakukan tindakan lebih lanjut, seperti validasi login (ini disimulasikan di sini)
    // Misal: validasi pesan error jika login gagal atau redirect halaman jika berhasil
});

it('should fail login with invalid credentials', async function() {
    await driver.findElement(By.id('username')).sendKeys('invalidUser');
    await driver.findElement(By.id('password')).sendKeys('wrongPassword');
    await driver.findElement(By.id('loginButton')).click();

    const errorMessage = await driver.findElement(By.id('errorMessage')).getText(); // Assuming error message has id="error"
    expect(errorMessage).to.equal('Invalid username or password'); // Change based on your actual error message
    await driver.findElement(By.id('username')).clear();
    await driver.findElement(By.id('password')).clear();

});

it('should input username and password using CSS and XPath', async function() {
    await driver.findElement(By.css('#username')).sendKeys('testuser');
    await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');

    const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
    const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');

    expect(usernameValue).to.equal('testuser');
    expect(passwordValue).to.equal('password123');
});

it('should verify login button is visible', async function() {
    const isDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
    expect(isDisplayed).to.be.true;
});
