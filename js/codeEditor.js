import { EditorState, basicSetup } from "@codemirror/basic-setup"
import { indentWithTab } from "@codemirror/commands"
import { EditorView, keymap } from "@codemirror/view"
import { json } from "@codemirror/lang-json"



export default function setupEditor () {
	const request_body = document.querySelector('[data_request_contaner]')
	const responce_body = document.querySelector('[tab-responce-comtent]')
    
	const basicEextensions = [
		basicSetup,
		keymap.of([indentWithTab]),
		json(),
		EditorState.tabSize.of(2),
		EditorView.theme({
			".cm-content": {
				color: "#000",
				fontFamily: "Operator Mono"
			},
			"&.cm-focused.cm-content": {
				color: "#000",
				fontFamily: "Operator Mono"
			},
			".cm-gutters": {
				background: "#fff",
				color: "#000",
				fontFamily: "Operator Mono"
			},
			".cm-activeLine.cm-line": {
				background: "rgb(243, 243, 243)",
				fontFamily: "Operator Mono",
				color: "#000",
				fontWeight: "200"
			},
			".cm-line": {
				fontFamily: "Operator Mono"
			},
			".ͼc": {
				color: "hsl(271, 76%, 53%)"
			},
			".ͼd": {
				color:"hsl(221, 98%, 50%)"
			},
			".cm-gutterElement.cm-activeLineGutter": {
				background: "rgb(243, 243, 243)",
				fontWeight: "200"
			},
			".cm-editor": {
				border: "none",
				outline:"none"
			}
		})
	]

	const requestEditor = new EditorView({
		state: EditorState.create({
			doc: "\"your code starts hear\"\n",
			extensions: basicEextensions,
		}),
		parent: request_body
	});
	
	const responceEditor = new EditorView({
		state: EditorState.create({
			doc: "",
			extensions: [...basicEextensions, EditorView.editable.of(false)],
		}),
		parent: responce_body
	});


	const updateResponceEditor = (value) => {
		
		responceEditor.dispatch({
			changes: {
				from: 0,
				to: responceEditor.state.doc.tength,
				insert: JSON.stringify(value, null, 2)
			}
		})
	}

	return { requestEditor , updateResponceEditor }
}

