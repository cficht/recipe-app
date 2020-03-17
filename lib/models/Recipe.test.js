const mongoose = require('mongoose');
const Recipe = require('./Recipe');

describe('Recipe model', () => {
  it('has a required name', () => {
    const recipe = new Recipe();
    const { errors } = recipe.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('name needs to be a string', () => {
    const recipe = new Recipe({
      name: { object: 'object' },
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ]
    });
    const { errors } = recipe.validateSync();

    expect(errors.name.message).toEqual('Cast to String failed for value "{ object: \'object\' }" at path "name"');
  });

  it('values in the directions array need to be a string', () => {
    const recipe = new Recipe({
      name: 'Cookies',
      directions: [
        { object: 'object' },
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ]
    });
    const { errors } = recipe.validateSync();

    expect(errors.directions.reason.message).toEqual('Cast to string failed for value "{ object: \'object\' }" at path "directions"');
  });

  it('has a name and directions field', () => {
    const recipe = new Recipe({
      name: 'Cookies',
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ]
    });

    expect(recipe.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Cookies',
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ]
    });
  });
});
