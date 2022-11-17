const fs = require("fs")
const {Parser} = require("acorn")
try {
    let file_path = process.argv[2]
    src = fs.readFileSync(file_path, 'utf-8')
    const tree = Parser.parse(src, {'locations': false, 'ecmaVersion': '2022','ranges': false})
    fs.writeFile(file_path.split('.js')[0] + '-ast.json',JSON.stringify(tree),err => {
        if (err) throw err
        console.log('AST write successful')
    })
} catch (error) {
    console.error(error)
}