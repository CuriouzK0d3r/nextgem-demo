import { getGreeting } from '../support/app.po';

describe('nextgem-demo', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    console.log('Test')
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // // Function helper example, see `../support/app.po.ts` file
    // getGreeting().contains('Welcome nextgem-demo');
  });
});