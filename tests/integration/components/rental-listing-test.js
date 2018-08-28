import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | rental-listing', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.rentalTest = EmberObject.create({
      image: 'fake.png',
      title: 'test-title',
      owner: 'test-owner',
      category: 'test-type',
      city: 'test-city',
      bedrooms: 3
    });
  });

  test('should display rental details', async function(assert) {
    await render(hbs`{{rental-listing rental=rentalTest}}`);
    assert.equal(this.element.querySelector('.listing h3').textContent.trim(), 'test-title', 'Title: test-title');
    assert.equal(this.element.querySelector('.listing .owner').textContent.trim(), 'Owner: test-owner', 'Owner: test-owner');
    assert.equal(this.element.querySelector('.listing .type').textContent.trim(), 'Type: test-type', 'Type: test-type');
    assert.equal(this.element.querySelector('.listing .location').textContent.trim(), 'Location: test-city', 'Location: test-city');
    assert.equal(this.element.querySelector('.listing .bedrooms').textContent.trim(), 'Number of bedrooms: 3', 'Number of bedrooms: 3');
  });

  test('should toggle wide class on click', async function(assert) {
    await render(hbs`{{rental-listing rental=rentalTest}}`);
    assert.notOk(this.element.querySelector('.image.wide'), 'Initially rendered small');
    await click('.image');
    assert.ok(this.element.querySelector('.image.wide'), 'Rendered wide after click');
    await click('.image');
    assert.notOk(this.element.querySelector('.image.wide'), 'Rendered small after second click');
  });

});
