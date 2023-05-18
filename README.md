# WEMINT Source Code
ASE 2023 paper #554 submission
## Prerequisites

**Install requirements for `wemint` first.**

```bash
# make sure node.js and npm is installed
node --version && cd wemint && npm i
cd wemint/wxappUnpacker && npm i
```

**Installing `graphviz`**

Download and install `graphviz` https://graphviz.org/download/

**Install requirements for python  (tested in 3.8 - 3.10).**

```bash
# install requirements
pip install -r requirements.txt
```

## Usage

```bash
cd wemint/src && python main.py <options> <arguments>
```

## Commands and Options

`wemint` can handle MiniApp source code or undecompiled MiniApp code packages

- `python main.py -s <mini-program source directory>` or `python main.py --source=<mini-program source directory>`: Process the MiniApp source code directory.
- `python main.py -p <mini-program code package>` or `python main.py --package=<mini-program code package>`: Process the MiniApp code package.

## Arguments

`<mini-program source directory>`: Specify the path to the MiniApp source code directory.

`<mini-program code package>`: Specify the path to the MiniApp code package.

## Examples

```bash
python main.py -s /path/to/mini-program-source-directory
python main.py --source=/path/to/mini-program-source-directory
python main.py -p /path/to/mini-program-code-package
python main.py --package=/path/to/mini-program-code-package
```

## Notes

- Ensure that you have the correct Python environment installed and have permission to execute the script.
- Provide a valid path to the MiniApp source code directory or code package, ensuring that the directory or file exists and contains the MiniApp code you want to process

## Result

The results of Taint Detection are generated in the root directory of the MiniApp's code and are named "check_report.json". The results of Sensitive Data Flow Path Analysis can be found in the source code directory of each page of the MiniApp.

We will continue to optimize our code