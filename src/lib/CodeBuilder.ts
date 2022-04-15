import { CodeRandom } from "./CodeRandom";
import { ValueBuilder } from "./ValueBuilder";

export class CodeBuilder {
  private code: string = "";
  private spaces = 0;

  constructor() {}

  static random() {
    const code = new CodeBuilder();

    CodeBuilder.block(code);

    code.if(ValueBuilder.random(), CodeRandom.symbol(), ValueBuilder.random());
    CodeBuilder.block(code);
    code.end();

    code.if(ValueBuilder.random(), CodeRandom.symbol(), ValueBuilder.random());
    CodeBuilder.block(code);

    code.if(ValueBuilder.random(), CodeRandom.symbol(), ValueBuilder.random());
    CodeBuilder.block(code);
    CodeBuilder.block(code);
    code.end();

    CodeBuilder.block(code);

    code.end();

    return code.build();
  }

  private static block(code: CodeBuilder) {
    code.var("right", ValueBuilder.random());
    code.var("top", ValueBuilder.random());
    code.var("bottom", ValueBuilder.random());
    code.numVarOpr("bottom", "-", ValueBuilder.random());
    code.const("left", ValueBuilder.random());
    code.numVarOpr("left", "+", ValueBuilder.random());
    code.numVarOpr("right", "*", ValueBuilder.random());

    code.log("error", ValueBuilder.random());
    code.log("warn", ValueBuilder.random());
    code.log("log", ValueBuilder.random());
  }

  private if(val1: string, symbol: string, val2: string) {
    // TODO: And, Or
    this.lineBreak();
    this.spacing();
    this.code += `if(${val1} ${symbol} ${val2}) {`;
    this.lineBreak();

    this.spaces += 2;
  }

  private end() {
    this.spaces -= 2;

    this.spacing();
    this.code += `}`;
    this.lineBreak();
    this.lineBreak();
  }

  private build() {
    return this.code;
  }

  private lineBreak() {
    do {
      this.code += "\n";
    } while (Math.random() < 0.2);
  }

  private spacing() {
    for (let i = 0; i < this.spaces; i++) {
      this.code += " ";
    }
  }

  private var(name: string, value: string) {
    CodeRandom.addVar(name);

    this.spacing();
    this.code += `let ${name} = ${value}`;
    this.lineBreak();
  }

  private const(name: string, value: string) {
    CodeRandom.addVar(name);

    this.spacing();
    this.code += `const ${name} = ${value}`;
    this.lineBreak();
  }

  private numVarOpr(
    name: string,
    operation: "+" | "-" | "*" | "/" | "%",
    value: string
  ) {
    this.spacing();
    this.code += `${name} ${operation}= ${value}`;
    this.lineBreak();
  }

  private log(
    type: "log" | "error" | "warn" | "debug" | "info",
    value: string
  ) {
    this.spacing();
    this.code += `console.${type}(${value})`;
    this.lineBreak();
  }
}
