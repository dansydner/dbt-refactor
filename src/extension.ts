// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dbt-cte-to-file" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('dbt-cte-to-file.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		performCustomRefactor();
	});

	context.subscriptions.push(disposable);
}

// Function to perform the custom refactoring
async function performCustomRefactor() {
	// Retrieve the active text editor
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		// Retrieve the selected text
		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);

		// Implement your refactoring logic using the selected text
		const refactoredText = selectedText; //yourRefactoringLogic(selectedText);

		const fileName = await promptForTextInput()

		const directory = path.dirname(editor.document.fileName);
		const fullFileName = path.join(directory, fileName!);

		createFile(fullFileName, selectedText);

		// Replace the selected text with the refactored text
		editor.edit((editBuilder) => {
			editBuilder.replace(selection, refactoredText);
		});
	}
}

async function promptForTextInput() {
  const userInput = await vscode.window.showInputBox({
    prompt: 'Enter new filename:',
    placeHolder: 'Type here...',
  });

  return userInput;
}

function createFile(fileName: string, content: string): void {
	fs.writeFileSync(fileName, content, 'utf8');
	console.log(`File '${fileName}' created successfully.`);
}

// This method is called when your extension is deactivated
export function deactivate() { }
