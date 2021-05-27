describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user1 = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };

    const user2 = {
      name: 'Huong Nguyen',
      username: 'huongnguyen',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user1);
    cy.request('POST', 'http://localhost:3003/api/users', user2);
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

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'Huong Nguyen',
          url: 'url link',
        });

        cy.createBlog({
          title: 'second blog',
          author: 'Huong Nguyen',
          url: 'url link',
        });

        cy.createBlog({
          title: 'third blog',
          author: 'Huong Nguyen',
          url: 'url link',
        });
      });

      it('user can like a blog', function () {
        cy.contains('first blog').contains('view').click();
        cy.contains('first blog').find('button').contains('like').click();

        cy.contains('first blog').contains('likes 1');
      });

      it('the user who created a blog can delete it', function () {
        cy.contains('second blog').contains('view').click();
        cy.contains('second blog').find('button').contains('remove').click();

        cy.get('html').should('not.contain', 'second blog');
      });

      it('other users cannot delete the blog', function () {
        // logout of the current user who created these blogs
        cy.contains('logout').click();
        // and log into another user who did not created the blogs
        cy.login({ username: 'huongnguyen', password: 'salainen' });
        cy.contains('Huong Nguyen logged-in');

        cy.contains('third blog').contains('view').click();
        cy.contains('third blog').should('not.contain', 'remove');
      });

      describe('Like a blog', function () {
        beforeEach(function () {
          cy.contains('second blog').contains('view').click();
          cy.contains('second blog').find('button').contains('like').click();
          cy.contains('second blog').find('button').contains('like').click();
          cy.contains('second blog').find('button').contains('like').click();
          cy.contains('second blog').find('button').contains('like').click();
          cy.contains('second blog').find('button').contains('like').click();

          cy.contains('third blog').contains('view').click();
          cy.contains('third blog').find('button').contains('like').click();
          cy.contains('third blog').find('button').contains('like').click();
          cy.contains('third blog').find('button').contains('like').click();

          cy.visit('http://localhost:3000');
        });

        it('the blogs are ordered according to likes with the blog with the most likes being first', function () {
          cy.contains('first blog').contains('view').click();
          cy.contains('second blog').contains('view').click();
          cy.contains('third blog').contains('view').click();

          cy.get('.blog').eq(0).should('contain', '5');
          cy.get('.blog').eq(1).should('contain', '3');
          cy.get('.blog').eq(2).should('contain', '0');
        });
      });
    });
  });
});
