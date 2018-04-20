import stringSimilarity from 'string-similarity';

const THRESHOLD = 0.8;

class GuessHeaders {
  constructor(parser) {
    this.parser = parser;

    this.fieldMap = {
      first_name: ['first_name', 'first', 'first name', 'name1'],
      last_name: ['last_name', 'last', 'last name', 'name2', 'name3'],
      usag_id: ['usag_id', 'usag', 'usag id', 'athleteid', 'athlete_id', 'athlete id', 'id'],
      gender: ['gender', 'sex'],
      birthdate: ['birthdate', 'birth', 'birthyear', 'dob', 'date_of_birth', 'date of birth', 'birthday', 'birth_date', 'birth date'],
      tra_level: ['tra', 'tr', 'trampoline', 'tra_level', 'tra level', 'trampoline level', 'tramp'],
      dmt_level: ['dmt', 'dm', 'double mini', 'double-mini', 'dmt_level', 'dmt level', 'double mini level', 'double-mini level'],
      tum_level: ['tum', 'tu', 'tumbling', 'tum_level', 'tum level', 'tumbling level'],
    };
  }

  guess() {
    const fieldMapping = {};
    const headers = this.parser.meta.fields;
    let similarityCheck;

    Object.keys(this.fieldMap).forEach((key) => {
      this.fieldMap[key].forEach((fieldKey) => {
        similarityCheck = GuessHeaders.similarityScore(fieldKey, headers);
        if (similarityCheck.topScore >= THRESHOLD) {
          fieldMapping[key] = similarityCheck.best;
        }
      });
    });

    return fieldMapping;
  }

  static similarityScore(target, comparisons) {
    let topScore = 0;
    let best = {};

    const compare = stringSimilarity.findBestMatch(target, comparisons);

    if (compare.bestMatch.rating > topScore) {
      topScore = compare.bestMatch.rating;
      best = compare.bestMatch.target;
    }

    return { topScore, best };
  }
}

export default GuessHeaders;
