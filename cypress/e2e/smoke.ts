import faker from "@faker-js/faker";

describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to register and login", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };
    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visit("/");
    cy.findByRole("link", { name: /sign up/i }).click();

    cy.get("#email").type(loginForm.email);
    cy.get("#password").type(loginForm.password);
    cy.findByRole("button", { name: /create account/i }).click();

    cy.findByRole("link", {
      name: /media all/i,
    }).click();
    cy.findByRole("button", { name: /logout/i }).click();
    cy.findByRole("link", { name: /log in/i });
  });

  // it("should allow you to bookmark a media", () => {
  //   const testNote = {
  //     title: faker.lorem.words(1),
  //     body: faker.lorem.sentences(1),
  //   };
  //   cy.login();
  //   cy.visit("/");

  //   cy.findByRole("link", { name: /notes/i }).click();
  //   cy.findByText("No notes yet");

  //   cy.findByRole("link", { name: /\+ new note/i }).click();

  //   cy.findByRole("textbox", { name: /title/i }).type(testNote.title);
  //   cy.findByRole("textbox", { name: /body/i }).type(testNote.body);
  //   cy.findByRole("button", { name: /save/i }).click();

  //   cy.findByRole("button", { name: /delete/i }).click();

  //   cy.findByText("No notes yet");
  // });
});
