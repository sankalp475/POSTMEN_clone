import setupEditor from './codeEditor.js'


const { requestEditor, updateResponceEditor } = setupEditor()

const json_editor = document.querySelector('div[data_request_contaner]')
const tab_content = document.querySelectorAll('.tab-comtent')
const tab = document.querySelectorAll('.nav-lnk')
const tab_res = document.querySelectorAll('.nav-lnk-res')
//  (tab_res)

let dset = [] // dataset list
let newdset = [] // dataset list
let idT_ = [] // id list

// selecting each tab
tab_content.forEach((tab_div) => {
	idT_.push(tab_div.id)
	if (tab_div.className == 'active-tab') {
		(tab_div)
		// setting attribute display block
		tab_div.setAttribute(
			'style',
			'display:block;'
		)
	} else {
		// setting attribute display none
		tab_div.setAttribute(
			'style',
			'display:none;'
		)
	}

})


tab.forEach(tabBtn => {

	tabBtn.addEventListener('click', (e) => {
		(e.target)
		// selecting previous element
		const prav_element = document.querySelectorAll('.nav-lnk')
		prav_element.forEach(prav => {
			//removing active tab
			prav.classList.remove("active-tab")
			dset.push(e.target.dataset.tabUlLiReqTav)
			//  (dset, idT_)

		})
		e.target.classList.add("active-tab")

		idT_.forEach(id => {
			const tabId_ = id
			const ct_dset = e.target.dataset.tabUlLiReqTav;

			// checking if id matches
			if (tabId_ === ct_dset) {
				//  (tabId_, ct_dset)
				const tab_data = document.querySelector(`#${tabId_}`)
				const active_tab = document.querySelector('.active-tab_div')


				active_tab.classList.remove('active-tab_div')
				tab_data.classList.add('active-tab_div')
			}

		})
	})
})
tab_res.forEach(tabBt => {

	tabBt.addEventListener('click', (e) => {
		//  (e.target)
		// selecting previous element
		const prav_element = document.querySelectorAll('.nav-lnk-res')
		prav_element.forEach(prav => {
			//removing active tab
			prav.classList.remove("active-tab-res")
			newdset.push(e.target.dataset.tabUlLiReqTav)
			//  (dset, idT_)

		})
		e.target.classList.add("active-tab-res")
		// const responce_header_tab_ = document.querySelector('[class="nav-lnk-res active-tab-res"]')

		const headers_responce_tab = document.querySelector('[id="headers_tab"]')
		const headers_responce = document.querySelector('[headers-responce]')
		const params_div = document.querySelector('.params_div')
		// const headers_ = document.querySelector('[id="headers_tab"]')

		//  (headers_responce_tab)
		//  (headers_responce.className.includes('active-tab-res'))

		if (headers_responce.className.includes('active-tab-res')) {
			params_div.classList.add('none')
			headers_responce_tab.classList.add('active-tab_div')

		} else {
			params_div.classList.remove('none')
			headers_responce_tab.classList.remove('active-tab_div')
		}
	})
})




const temp = document.querySelector("#template_div_content")
const input_div_container = document.querySelectorAll(".param-inp")
const add_params_query_btn = document.querySelectorAll(".add-params-query")



const display_input = () => {
	const clone = temp.content.cloneNode(true)
	return clone
}
input_div_container.forEach(props => {

	props.append(display_input())
})


add_params_query_btn.forEach(add => {
	add.addEventListener('click', (e) => {
		input_div_container.forEach(props => {

			props.append(display_input())
		})
		const tab_content_ = document.querySelector('.tab-comtent')
	})
})
// add_params_query_btn.




const input = document.querySelectorAll('.input-params-data')
let key = []
let value = []
let JSON = []
const key_ = document.querySelector('[placeholder="key"]')
const value_ = document.querySelector('[placeholder="value"]')
input.forEach(feild => {
	feild.addEventListener('keyup', (e) => {

		if (e.keyCode == 13) {
			key.push(key_.value)
			value.push(value_.value)

		}
	})
})

// const data = (requestEditor.state.doc.toString())
//  (data)




const submit_btn = document.querySelector('[data-send]')
const select_ = document.querySelector('[data-option]')

select_.value = localStorage.getItem('Method')
const Method = select_.value = localStorage.getItem('Method')
select_.addEventListener('change', (e) => {
	setMethod(e.target.value)
})

const setMethod = (propsMethod) => {
	propsMethod = localStorage.setItem('Method', propsMethod) || 'GET'
}
submit_btn.addEventListener('click', (e) => {
	e.preventDefault()
	const url = document.querySelector('[id="postmen_url_"]')
	//  (url.value)


	// if (Method == "GET") {
	//     console.log(Method)
	// 	get_request_(url.value, Method)
	// } else
	// 	if (Method == "POST") {
	// 	console.log(Method)
	// 	post_request_()
	// }
	let inp = ""
	let data;
	try {
		data = JSON.parse(requestEditor.state.doc.toString() || null)
	} catch (error) {
		console.log(error.massage)
	}
	input_div_container.forEach(value => {
		inp = value

		axios({
			url: document.querySelector("[data-url]").value,
			method: document.querySelector("[data-option]").value,
			params: keyValuePairsToObjects(inp),
			headers: keyValuePairsToObjects(inp),
			data,
		}).then(
			response => {
				// handle success
				console.log("get method success")
				const status_span_ = document.querySelector('#status_text')
				const header_span = document.querySelector('[id="headers_tab"]')
				status_span_.setAttribute(
					'style',
					'color: hsl(171, 100%, 41%)'
				)
				status_span_.innerHTML = response.status + " OK"
				header_span.innerHTML = `
						    cache-control: "max-age=43200"
						    content-type: "application/json; charset=utf-8"
						    expires: "-1"
						    pragma: "no-cache"
						`
				console.log(response.headers)
				// let headers_ = response.headers

				if (response.status == 200) {
					updateResponceEditor(response.data);
				} else {
					updateResponceEditor(response.data);
				}

			}
		).catch(
			error => {
				// handle  errors 
				console.log(error)
				const status_span_ = document.querySelector('#status_text')
				status_span_.setAttribute(
					'style',
					'color: hsl(348, 100%, 61%)'
				)
				status_span_.innerHTML = "404 not found"
			}
		)
		const status_div_ = document.querySelector('[status_text_div]')
	    const status_headding_ = document.querySelector('#status_text_')
	    const change_Attr = document.querySelector('[data-api-responce-editor]')
	    status_div_.className -= " none"
	    status_headding_.className -= " none"
	    change_Attr.className -= " none"
	})

})


function keyValuePairsToObjects(container) {
	const pairs = container.querySelectorAll("[data-key-value-pair]")
	return [...pairs].reduce((data, pair) => {
		const key = pair.querySelector("[data-key]").value
		const value = pair.querySelector("[data-value]").value

		if (key === "") return data
		return { ...data, [key]: value }
	}, {})
}