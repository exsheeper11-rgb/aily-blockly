import { ToolUseResult } from "./tools";

/**
 * ABS (Aily Block Syntax) Syntax Reference Tool
 * Provides concise but complete syntax specification for LLM code generation
 */

/**
 * Concise ABS Syntax Specification (English)
 */
const ABS_SYNTAX_SPECIFICATION = `# ABS (Aily Block Syntax) Quick Reference

## Syntax Rules

| Element | Syntax | Example |
|---------|--------|---------|
| Block call | \`block_type(param1, param2)\` | \`serial_println(Serial, text("Hi"))\` |
| Empty params | \`block_type()\` | \`time_millis()\` |
| Statement body | Indent 4 spaces | See examples below |
| Named input | \`@INPUT_NAME: value\` | \`@IF0: condition\` |
| Statement input | \`@NAME:\` + newline + indent | \`@DO0:\\n    action()\` |
| Variable ref | \`$varName\` | \`$count\`, \`$sensor\` |
| Comment | \`# comment\` | \`# initialize\` |

## Parameter Types

| Type | Syntax | Maps To |
|------|--------|---------|
| Dropdown | \`ENUM_VALUE\` | field_dropdown: \`Serial\`, \`HIGH\`, \`OUTPUT\`, \`EQ\` |
| Text | \`"string"\` | field_input or text block |
| Number | \`123\` | field_number or math_number block |
| Variable | \`$name\` | field_variable or variables_get block |
| Value block | \`block(args)\` | input_value connection |

## Block Connection Types

| Type | Role | Example |
|------|------|---------|
| Hat | Root entry, no connections | \`arduino_setup()\`, \`arduino_loop()\`, \`arduino_global()\` |
| Statement | Chains vertically (next) | \`serial_println()\`, \`time_delay()\` |
| Value | Embedded in parameters | \`math_number(10)\`, \`logic_compare()\` |

## Variable Reference Context

| Target Type | \`$var\` Becomes |
|-------------|-----------------|
| field_variable | Variable field value: \`variables_set($x, ...)\` |
| input_value | variables_get block: \`serial_println(Serial, $x)\` |

## Core Value Blocks

| Block | Params | Output |
|-------|--------|--------|
| \`math_number(n)\` | Number | Number |
| \`text("s")\` | String | String |
| \`logic_boolean(B)\` | TRUE/FALSE | Boolean |
| \`variables_get($v)\` | Variable | Any |

## Basic Examples

### Program Structure
\`\`\`
# Global definitions
arduino_global()
    variables_define("hello", "String", text("Hello World"))

arduino_setup()
    serial_begin(Serial, 115200)

arduino_loop()
    serial_println(Serial, variables_get($hello))
    time_delay(math_number(1000))
\`\`\`

### If-Else
\`\`\`
controls_if()
    @IF0: logic_compare(GT, $temp, math_number(30))
    @DO0:
        serial_println(Serial, text("Hot"))
    @ELSE:
        serial_println(Serial, text("OK"))
\`\`\`

### If-ElseIf-Else
\`\`\`
controls_if()
    @IF0: logic_compare(GT, $v, math_number(100))
    @DO0:
        action1()
    @IF1: logic_compare(GT, $v, math_number(50))
    @DO1:
        action2()
    @ELSE:
        action3()
\`\`\`

### Loop
\`\`\`
controls_repeat_ext(math_number(10))
    serial_println(Serial, text("Loop"))

controls_for($i, math_number(0), math_number(10), math_number(1))
    serial_println(Serial, $i)
\`\`\`

### Variables
\`\`\`
variables_set($count, math_number(0))
math_change($count, math_number(1))
serial_println(Serial, $count)
\`\`\`

### Multi-line Params
\`\`\`
logic_operation(AND,
    logic_compare(GT, $a, math_number(0)),
    logic_compare(LT, $a, math_number(100)))
\`\`\`

## Checklist
- Parentheses required: \`block()\` not \`block\`
- Numbers in input_value → \`math_number(n)\`
- Text in input_value → \`text("s")\`
- Dropdown values: uppercase \`HIGH\`, \`Serial\`, \`EQ\`
- 4-space indent for statement body
- Named inputs: \`@IF0:\`, \`@DO0:\`, \`@ELSE:\`
`;

/**
 * Get ABS syntax specification tool implementation
 */
export async function getAbsSyntaxTool(): Promise<ToolUseResult> {
    try {
        return {
            is_error: false,
            content: ABS_SYNTAX_SPECIFICATION
        };
    } catch (error) {
        return {
            is_error: true,
            content: `Failed to get ABS syntax specification: ${error instanceof Error ? error.message : String(error)}`
        };
    }
}
