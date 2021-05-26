describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('log in').click();
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in').click();
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();

      cy.contains('Matti Luukkainen logged-in');
    });

    it('fails with wrong credentials', function () {
      cy.contains('log in').click();
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.contains('Wrong username or password');
      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('A Lovely Blog');
      cy.get('#author').type('Huong Nguyen');
      cy.get('#url').type('url link');
      cy.contains('save').click();

      cy.contains('A Lovely Blog');
    });

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'Huong Nguyen',
          url: 'url link',
        });
      });

      it('user can like a blog', function () {
        cy.get('#view-button').click();
        cy.get('#like-button').click();

        cy.contains('first blog').contains('likes 1');
      });
    });
  });
});
