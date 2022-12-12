const escodegen = require('escodegen')
const fs = require("fs")
let node_path = process.argv[2]
try {

    let ast_node = fs.readFileSync(node_path)
    let ast_node_json = JSON.parse(ast_node.toString())
    let decode = escodegen.generate(ast_node_json)
    if (decode.startsWith('(') && decode.endsWith(')')) {
        decode = decode.substring(1, decode.length - 1)
    }
    console.log(decode.trim());
} catch (error) {
    console.log("Error")
} finally {
    fs.unlinkSync(node_path)
}

// const str = '{\n  "type": "CallExpression",\n  "start": 224,\n  "end": 248,\n  "callee": {\n    "type": "MemberExpression",\n    "start": 224,\n    "end": 236,\n    "object": {\n      "type": "Identifier",\n      "start": 224,\n      "end": 228,\n      "name": "left"\n    },\n    "property": {\n      "type": "Identifier",\n      "start": 229,\n      "end": 236,\n      "name": "replace"\n    },\n    "computed": false,\n    "optional": false\n  },\n  "arguments": [\n    {\n      "type": "Literal",\n      "start": 237,\n      "end": 242,\n      "value": {},\n      "raw": "/11/g",\n      "regex": {\n        "pattern": "11",\n        "flags": "g"\n      }\n    },\n    {\n      "type": "Literal",\n      "start": 244,\n      "end": 247,\n      "value": "2",\n      "raw": "\'2\'"\n    }\n  ],\n  "optional": false\n}'
// console.log(node.replaceAll('"','\"'))
// const ast = `{
//   "type": "Program",
//   "start": 0,
//   "end": 10,
//   "body": [
//         ${node}
//   ],
//   "sourceType": "module"
// }
// `
// const json_file = JSON.parse(ast)
// let decode = escodegen.generate(json_file)
// if(decode.startsWith('(') && decode.endsWith(')')){
//     decode = decode.substring(1,decode.length- 1)
// }
// console.log(decode);