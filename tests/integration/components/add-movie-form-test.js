import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | add-movie-form', function (hooks) {
  setupRenderingTest(hooks);

  test('The title label has the correct text', async function (assert) {
    await render(hbs`<AddMovieForm />`);
    assert.dom('#form-title').hasText('Title');
  });

  test('The description label has the correct text', async function (assert) {
    await render(hbs`<AddMovieForm />`);
    assert.dom('#form-description').hasText('Description');
  });

  test('The title input has the correct placeholder text', async function (assert) {
    await render(hbs`<AddMovieForm />`);
    assert.dom('.form-title').hasProperty('placeholder', 'Title..');
  });

  test('The description input has the correct placeholder text', async function (assert) {
    await render(hbs`<AddMovieForm />`);
    assert.dom('.form-description').hasProperty('placeholder', 'Description..');
  });
});
