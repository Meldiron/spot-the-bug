import { faker } from "@faker-js/faker";

export class CodeRandom {
  static vars: string[] = [];
  static addVar(varName: string) {
    this.vars.push(varName);
  }

  static symbol() {
    const symbols = ["+", "-", "*", "/", "%"];

    const symbol = symbols[Math.floor(Math.random() * symbols.length)];

    return symbol;
  }

  static var() {
    if (this.vars.length <= 0) {
      const options = [
        () => this.number(),
        () => this.boolean(),
        () => this.string(),
      ];

      return options[Math.floor(Math.random() * options.length)]();
    }

    return this.vars[Math.floor(Math.random() * this.vars.length)];
  }

  static number() {
    if (Math.random() < 0.5) {
      return (Math.random() * 100).toString();
    } else {
      return Math.round(Math.random() * 100).toString();
    }
  }

  static boolean() {
    return Math.random() < 0.5 ? "false" : "true";
  }

  static string() {
    const words = [
      () => {
        return faker.word.adjective();
      },
      () => {
        return faker.word.adverb();
      },
      () => {
        return faker.word.verb();
      },
      () => {
        return faker.word.noun();
      },
      () => {
        return faker.word.adjective() + " " + faker.word.noun();
      },

      () => {
        return (
          faker.word.adjective() +
          " " +
          faker.word.noun() +
          " " +
          faker.word.verb()
        );
      },
      () => {
        return faker.word.noun() + " " + faker.word.verb();
      },
      () => {
        return (
          faker.word.adjective() +
          " " +
          faker.word.noun() +
          " " +
          faker.word.verb() +
          " " +
          faker.word.noun()
        );
      },
      () => {
        return (
          faker.word.noun() + " " + faker.word.verb() + " " + faker.word.noun()
        );
      },
    ];

    const symbols = [
      () => "",
      () => ".",
      () => "...",
      () => "?",
      () => "!",
      () => "??",
      () => "!!",
      () => "???",
      () => "!!!",
      () => "?!?",
      () => "!?!",
    ];

    const word = words[Math.floor(Math.random() * words.length)];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    return '"' + word() + symbol() + '"';
  }
}
