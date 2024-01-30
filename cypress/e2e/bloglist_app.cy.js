describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'German Bogdanov',
      username: 'gary',
      password: 'pass'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('http://localhost:5173')
  })
  it('front page can be opened', () => {
    cy.contains('Log in')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('login').click()
      cy.get('#username').type('gary')
      cy.get('#password').type('pass')
      cy.get('#login-button').click()

      cy.contains('German Bogdanov logged in')
    })

    it('fails with wrong credentials', () => {
      cy.contains('login').click()
      cy.get('#username').type('gary')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain','wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'German Bogdanov logged in')
    })

    describe('when logged in', () => {
      beforeEach(() => {
        cy.login({ username: 'gary', password: 'pass' })
      })

      it('a new blog can be created', () => {
        cy.contains('new blog').click()
        cy.get('#title-input').type('new blog created')
        cy.get('#author-input').type('Example')
        cy.get('#url-input').type('http://url-example')
        cy.get('#submit-button').click()

        cy.contains('new blog created')
      })

      describe('blog exist', () => {
        beforeEach(() => {
          cy.createBlog({
            title: 'new blog created',
            author: 'Example',
            url: 'http://url-example'
          })
        })

        it('can view', () => {
          cy.contains('new blog created')
            .contains('view')
            .click()

          cy.contains('gary')
        })
        it('can like', () => {
          cy.contains('new blog created')
            .contains('view')
            .click()
          cy.contains('like')
            .click()
        })

      })
    })
    describe('several blogs and users exist', () => {
      beforeEach(() => {
        const user = {
          name: 'Denis',
          username: 'den',
          password: 'admin'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('http://localhost:5173')
      })
      beforeEach(() => {
        cy.login({ username: 'gary', password:'pass' })
        cy.createBlog({
          title: 'first blog',
          author: 'Example',
          url: 'http://url-example1'
        })
        cy.createBlog({
          title: 'second blog',
          author: 'Example',
          url: 'http://url-example2'
        })
      })
      beforeEach(() => {

        cy.login({ username: 'den', password:'admin' })


        cy.createBlog({
          title: 'third blog',
          author: 'Example',
          url: 'http://url-example2'
        })
        cy.createBlog({
          title: 'fourth blog',
          author: 'Example',
          url: 'http://url-example3'
        })
      })
      it('can delete', () => {
        cy.contains('third blog')
          .contains('view')
          .click()
        cy.contains('remove')
          .click()
        cy.get('html').should('not.contain', 'third blog created')
      })
      it('can\'t see delete button', () => {
        cy.contains('second blog')
          .contains('view')
          .click()

        cy.contains('second blog').should('not.contain', 'remove')
      })

      it.only('ordered correctly by likes', () => {
        cy.contains('third blog')
          .contains('view')
          .click()
        cy.contains('third blog')
          .contains('like')
          .click()
        cy.wait(500)
        cy.contains('third blog')
          .contains('like')
          .click()
        cy.wait(500)

        cy.contains('fourth blog')
          .contains('view')
          .click()
        cy.contains('fourth blog')
          .contains('like')
          .click()
        cy.wait(500)
        cy.contains('fourth blog')
          .contains('like')
          .click()
        cy.wait(500)
        cy.contains('fourth blog')
          .contains('like')
          .click()
        cy.wait(500)

        cy.contains('fourth blog').contains(3)
        cy.get('.blog').eq(0).contains('fourth blog')
      })
    })
  })
})
