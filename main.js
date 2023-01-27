



const form = document.getElementById('user-input')
const colorContainer = document.getElementById('color-container')
const copiedTxt = document.getElementById('copied-txt')

form.addEventListener('submit',onSubmit)

colorContainer.addEventListener('click',copyToClipboard)


function copyToClipboard(e){
    const text = e.target.parentElement.dataset.name
    if(text){
        navigator.clipboard.writeText(text)
        copiedTxt.textContent = `Clipped : ${text}`

        console.log(copiedTxt)
        copiedTxt.style.visibility = 'visible'
        setTimeout(()=>{
            copiedTxt.style.visibility = 'hidden'
        },1500)

    }
}



function onSubmit(e){
    e.preventDefault()

    //gets data from form
    const formData = new FormData(form)

    const color = formData.get('input-color').substring(1)
    const scheme = formData.get('scheme')

    

    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}`)
    .then(res => res.json())
    .then(data => renderColors(data.colors))
    
    //data.colors[0].hex.value (for getting hex from data)
}

function renderColors(data){
    const colorsArr = data.map(item => {
        return item.hex.value
    })

    const fragment =  document.createDocumentFragment()

    colorsArr.forEach(element => {
        const color =  createColors(element)
        fragment.append(color)
    })

    colorContainer.innerText = ''
    colorContainer.append(fragment)
    console.log(colorsArr)
}


/*
Creates a color image with label
    <div class="colors">
        <div class="color-image" id="red"></div>
        <div class="color-name">red</div>
    </div>

*/
function createColors(hex){
    const colorsDiv = document.createElement('div')
    colorsDiv.classList.add('colors')
    colorsDiv.dataset.name = hex

        const colorImage = document.createElement('div')
        colorImage.classList.add('color-image')
        colorImage.style.background = hex

        const colorName = document.createElement('div')
        colorName.classList.add('color-name')
        colorName.textContent = hex

        colorsDiv.append(colorImage)
        colorsDiv.append(colorName)

    return colorsDiv
}
