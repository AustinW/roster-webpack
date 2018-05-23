import FieldOptions from './field-options';

class Level {
  constructor(value) {
    const fieldOptions = new FieldOptions();
    this.dictionary = fieldOptions.levels;

    this.changeLevel(value);
  }

  getKey() { return this.level.key; }
  getDisplay() { return this.level.value; }

  changeLevel(value) {
    this.level = this.dictionary.find(levelObj => levelObj.key === value);
  }

  getDictionary() { return this.dictionary; }
}

export default Level;
