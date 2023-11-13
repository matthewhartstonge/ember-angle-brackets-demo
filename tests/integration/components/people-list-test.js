import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

import { testData } from "angle-brackets-demo/utils/data";

module("Integration | Component | people-list", function(hooks) {
  setupRenderingTest(hooks);

  test("should display first name", async function(assert) {
    // we can get really selective in terms of the test data we are building to
    // pump the component with:
    let data = [
      {
        firstName: "Bob"
      }
    ];

    // Set any properties with this.set('myProperty', 'value');
    this.set("data", data);

    // Then we can access it within our render phase from `this`:
    await render(hbs`
        <PeopleList @people={{this.data}} />
    `);

    assert.
      dom("[data-test-people-list-name]").
      containsText("Bob");
  });

  test("should display full name", async function(assert) {
    // we can get really selective in terms of the test data we are building to
    // pump the component with:
    let data = [
      {
        firstName: "Bob",
        lastName: "The Builder"
      }
    ];

    this.set("data", data);
    await render(hbs`
        <PeopleList @people={{this.data}} />
    `);

    assert.
      dom("[data-test-people-list-name]").
      containsText("firstName lastName");
  });

  test("should display image if provided", async function(assert) {
    const expected = testData()[0];

    let data = [
      expected,
    ];

    this.set("data", data);
    await render(hbs`
        <PeopleList @people={{this.data}} />
    `);

    // ensure it exists...
    assert.dom('[data-test-people-list-profile-image]').exists();

    // ensure it has the correct properties set:
    assert
      .dom('[data-test-people-list-profile-image]')
      .hasAttribute('alt', `${expected.firstName} ${expected.lastName}`);
    assert
      .dom('[data-test-people-list-profile-image]')
      .hasAttribute('src', `${expected.img}`);

    // Can even check for CSS ...
    assert
      .dom('[data-test-people-list-profile-image]')
      .hasAttribute('class', "md-avatar");
  });

  test("should not display avatar if not available", async function(assert) {
    const expected = testData()[0];

    // Remove the image data...
    expected.img = null;

    let data = [
      expected,
    ];
    this.set("data", data);

    await render(hbs`
        <PeopleList @people={{this.data}} />
    `);

    // check the profile image doesn't exist...
    assert.
      dom('[data-test-people-list-profile-image]').
      doesNotExist();

    // But ensure to check that we are also still displaying the person's
    // data, in case we accidentally aren't actually rendering anything at
    // all...
    assert.
      dom('[data-test-people-list-name]').
      exists();
    assert.
      dom('[data-test-people-list-name]').
      containsText(`${expected.firstName} ${expected.lastName}`);
  });

  test("should display machine icon", async function(assert) {
    const expected = {
      img:
        'data:image/jpeg;base64,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',
      firstName: 'Dizzy',
      lastName: 'ConcreteMixer',
      email: 'dizzeeRascal@example.com',
      isMachine: true,
    };

    // Remove the image data...
    expected.img = null;

    let data = [
      expected,
    ];
    this.set("data", data);

    await render(hbs`
      <PeopleList @people={{this.data}} />
    `);

    // check the icon exists...
    assert.
      dom('[data-test-people-list-icon]').
      exists();

    // ensure the ligature being set is "machine"
    assert.
      dom('[data-test-people-list-icon]').
      containsText("machine");
  });

  test("should display person icon", async function(assert) {
    const expected = {
      img:
        'data:image/jpeg;base64,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',
      firstName: 'Farmer',
      lastName: null,
      email: 'farmer-pickles@example.com',
      isMachine: false,
    };

    // Remove the image data...
    expected.img = null;

    let data = [
      expected,
    ];
    this.set("data", data);

    await render(hbs`
      <PeopleList @people={{this.data}} />
    `);

    // check the icon exists...
    assert.
      dom('[data-test-people-list-icon]').
      exists();

    // ensure the ligature being set is "machine"
    assert.
      dom('[data-test-people-list-icon]').
      containsText("person");
  });
});
