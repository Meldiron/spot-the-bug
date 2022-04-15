import { CodeRandom } from "./CodeRandom";

export class ValueBuilder {
  code = "";

  static random() {
    const code = new ValueBuilder();

    let isFirst = true;
    do {
      const operations = [
        () => code.value(CodeRandom.var()),
        () => code.value(CodeRandom.boolean()),
        () => code.value(CodeRandom.string()),
        () => code.value(CodeRandom.number()),
      ];

      !isFirst ? CodeRandom.symbol() : null;
      operations[Math.floor(Math.random() * operations.length)]();

      isFirst = false;
    } while (Math.random() < 0.2);

    return code.build();
  }

  public build() {
    return this.code;
  }

  private value(value: string) {
    if (this.code === "") {
      this.code += `${value}`;
    } else {
      this.code += ` ${value}`;
    }
  }
}
